<script setup lang="ts">
// The hero photo as a small 3D scene. A depth map (Depth Anything V2 Small, run
// once offline) turns the flat photo into depth, and a perspective camera
// orbits and eases in and out around it, so it is always gently moving.
//
// Two layers, drawn with the same camera:
//  - The photo itself, at full resolution, on a mesh shaped by the depth map.
//    This keeps you and the window as sharp and cinematic as the original.
//  - Gaussian splats where things are near: the nearer an object (the
//    curtain, pillar, ring light), the more it is made of floating balls and
//    the wider apart they are. Around the cursor a few balls ease away from it.
// On load it starts as the flat photo and eases into the 3D scene.
// Plain WebGL, no libraries.
//
// The original <img> stays underneath: once this is ready the hero turns it
// into a soft glow, so it only lends light to the gaps. Without WebGL
// or with reduced motion it is all visitors see.

interface Props {
  color: string
  depth: string
  /** object-position of the photo underneath, as fractions, so they line up */
  focus?: [number, number]
  focusPhone?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  focus: () => [0.5, 0.5],
  focusPhone: () => [0.62, 0.5],
})

// settled: the pop into 3D has finished, so the photo underneath can go
const emit = defineEmits<{ ready: []; settled: [] }>()

const canvas = ref<HTMLCanvasElement>()
const ready = ref(false)

const PHONE = '(max-width: 768px)'
const OVERSCAN = 1.04 // so small camera moves don't pull an edge into view
// Camera orbit, in radians: the idle sway and the extra the mouse can add
const YAW_IDLE = 0.036
const PITCH_IDLE = 0.018
const YAW_MOUSE = 0.075
const PITCH_MOUSE = 0.04
const DOLLY = 0.072 // how far the camera eases in and out, in scene units
// Hover is kept gentle so it still reads as a 3D scene
const HOVER_RADIUS_CSS_PX = 90
const HOVER_SWELL = 0.35 // extra splat size at the cursor, as a multiple of base
const HOVER_REPEL_CSS_PX = 12 // how far splats are pushed from the cursor
// On load the flat photo eases into the 3D scene
const SPATIAL_DELAY = 0.35 // hold the flat photo a beat before it pops into 3D
const SPATIAL_SECONDS = 1.3 // the pop, including a small overshoot
const CAMERA_SECONDS = 2.6 // the camera's push and swing, with a long ease-out
const MESH_COLS = 160 // vertices across the photo mesh
// Kept light on purpose: it's a portfolio hero, not a benchmark
const SPLAT_CSS_PX = 4.4 // one splat per this many CSS px of drawn photo
const MAX_DPR = 1.25
const IDLE_FPS = 30 // the idle motion is slow, so 30 fps looks the same
// Depth (0 far, 1 near) where things start turning into particles. Shared
// with the shaders, and used to skip drawing splats that can't show
const FOCUS_NEAR = 0.3

// Shared by both layers: depth-map value -> 3D point -> back to the screen
// through the moving camera.
//  - The map is inverse depth (white = near), so values are mapped through 1/z
//    into distances between Z_NEAR and Z_FAR.
//  - The lens has a ~50 degree field of view; at rest it reproduces the photo.
//  - The camera orbits a pivot at your depth, so you stay put while nearer
//    things swing one way and farther ones the other.
const PROJECT = `
uniform vec2 uDispSize;
uniform vec2 uDispOffset;
uniform vec2 uRot;
uniform float uDolly;
uniform float uAspect;
// 0 = the flat photo, 1 = full depth; eased up once on load
uniform float uDepthAmt;

const float Z_NEAR = 1.4;
const float Z_FAR = 4.0;
const float FOCAL = 2.14;
const float PIVOT_DEPTH = 0.35;

// Depth of field, in depth-map units (0 far, 1 near): from FOCUS_NEAR things
// start turning into particles, fully by BOKEH_FULL. You sit around 0.35.
const float FOCUS_NEAR = ${FOCUS_NEAR.toFixed(3)};
const float BOKEH_FULL = 0.66;

float bokehAt(float d) {
  return clamp(smoothstep(FOCUS_NEAR, BOKEH_FULL, d) * uDepthAmt, 0.0, 1.0);
}

float distanceAt(float d) {
  return 1.0 / mix(1.0 / Z_FAR, 1.0 / Z_NEAR, d);
}

// Screen position in canvas px, and how much nearer (>1) or farther it got
vec3 project(vec2 uv, float d) {
  // Flattened onto your depth while the scene is still the flat photo
  float z = distanceAt(mix(PIVOT_DEPTH, d, uDepthAmt));
  vec2 sxy = vec2(uv.x - 0.5, (uv.y - 0.5) / uAspect) * 2.0;
  vec3 P = vec3(sxy * z / FOCAL, z);

  float pivot = distanceAt(PIVOT_DEPTH);
  P.z -= pivot;
  float cy = cos(uRot.x), sy = sin(uRot.x);
  P = vec3(cy * P.x + sy * P.z, P.y, -sy * P.x + cy * P.z);
  float cp = cos(uRot.y), sp = sin(uRot.y);
  P = vec3(P.x, cp * P.y - sp * P.z, sp * P.y + cp * P.z);
  P.z += pivot - uDolly;

  vec2 s2 = FOCAL * P.xy / P.z;
  vec2 uv2 = vec2(s2.x * 0.5 + 0.5, s2.y * uAspect * 0.5 + 0.5);
  return vec3(uDispOffset + uv2 * uDispSize, z / P.z);
}

vec4 toClip(vec2 p, vec2 canvas) {
  vec2 c = (p / canvas) * 2.0 - 1.0;
  return vec4(c.x, -c.y, 0.0, 1.0);
}
`

// ---------- Layer 1: the sharp photo on a depth mesh ----------

const MESH_VERT = `
attribute vec2 aUv;
attribute float aDepth;
uniform vec2 uCanvas;
varying vec2 vUv;
varying float vBokeh;
${PROJECT}
void main() {
  vUv = aUv;
  vBokeh = bokehAt(aDepth);
  gl_Position = toClip(project(aUv, aDepth).xy, uCanvas);
}
`

// Fades out where things turn into particles: near objects, and around the
// cursor, so the splats there take over
const MESH_FRAG = `
precision mediump float;
uniform sampler2D uColor;
uniform vec2 uMouse;
uniform float uHover;
uniform float uHoverRadius;
uniform float uCanvasH;
varying vec2 vUv;
varying float vBokeh;
void main() {
  vec2 fc = vec2(gl_FragCoord.x, uCanvasH - gl_FragCoord.y);
  float d = length(fc - uMouse);
  float k = exp(-(d * d) / (2.0 * uHoverRadius * uHoverRadius)) * uHover;
  // Under the cursor the photo gives way completely to its beads
  float a = (1.0 - 0.88 * vBokeh) * (1.0 - k);
  gl_FragColor = vec4(texture2D(uColor, vUv).rgb * a, a);
}
`

// ---------- Layer 2: splats, for near bokeh and around the cursor ----------

// Splats: near objects are made of them, spaced wider the nearer they are;
// around the cursor the photo breaks into them and they are pushed away
const SPLAT_VERT = `
attribute vec2 aUv;
attribute vec3 aColor;
attribute float aDepth;
attribute float aSeed;
uniform vec2 uCanvas;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uSpacing;
uniform float uDpr;
uniform float uHoverRadius;
uniform float uSwell;
uniform float uMaxSize;
uniform float uRepel;
varying vec3 vColor;
varying float vAlpha;
varying float vShape;
${PROJECT}

void cull() {
  gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
  gl_PointSize = 0.0;
}

void main() {
  float s = aSeed * 6.2831853;
  // 0 sharp, 1 nearest: how much this splat is a particle
  float b = bokehAt(aDepth);

  // Each particle sits at its own depth around the surface, so together they
  // form a volume that shifts in parallax instead of a flat sheet
  float scatter = (fract(aSeed * 91.7) - 0.5) * 0.3 * b;
  vec3 pr = project(aUv, clamp(aDepth + scatter, 0.0, 1.0));
  vec2 p = pr.xy;

  // Alive: particles float, slow and wide; the rest barely move
  float speed = mix(0.55, 0.3, b);
  float drift = (0.35 + b * 4.0) * uDpr;
  p += vec2(sin(uTime * speed + s), cos(uTime * speed * 0.85 + s * 1.7)) * drift;


  vec2 away = p - uMouse;
  float dist = length(away);
  float k = exp(-(dist * dist) / (2.0 * uHoverRadius * uHoverRadius)) * uHover;
  float kk = smoothstep(0.03, 0.3, k);

  // Spacing: the nearer, the fewer splats are kept (down to ~1 in 4.5). Under
  // the cursor every splat shows at full strength, so the beads rebuild the
  // image there with nothing behind them
  float keep = mix(1.0, 0.22, b);
  float show = max(smoothstep(0.02, 0.2, b), smoothstep(0.0, 0.25, k));
  if (show < 0.01 || aSeed > keep) {
    cull();
    return;
  }

  // Eased away from the cursor: no push at the exact centre (so no hole opens
  // there), strongest a little way out, fading off with distance
  if (dist > 0.001) p += (away / dist) * uRepel * k * smoothstep(0.0, uHoverRadius * 0.45, dist);

  float size = uSpacing * pr.z * mix(1.8, 2.7, b) * (1.0 + mix(0.08, 0.15, b) * sin(uTime * 0.9 + s * 3.0));
  size *= 1.0 + uSwell * k;

  gl_Position = toClip(p, uCanvas);
  gl_PointSize = min(size, uMaxSize);
  vColor = aColor;
  // Particles are soft-edged balls; in-focus splats stay Gaussian
  vShape = max(b, kk);
  vAlpha = show * mix(1.0, 0.92, b);
}
`

const SPLAT_FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying float vShape;
void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(c, c);
  if (r2 > 1.0) discard;
  // Gaussian when in focus; a lit sphere when it is a particle
  float gauss = exp(-r2 * 2.6);
  float disc = smoothstep(1.0, 0.75, sqrt(r2));
  float a = mix(gauss, disc, vShape) * vAlpha;
  // Sphere shading: light from the top left, a soft highlight, darker rim
  vec3 n = vec3(c.x, c.y, sqrt(max(0.0, 1.0 - r2)));
  float diffuse = max(0.0, dot(n, normalize(vec3(-0.45, -0.55, 0.7))));
  float spec = pow(diffuse, 18.0) * 0.35;
  vec3 lit = vColor * (0.55 + 0.6 * diffuse) + spec;
  vec3 col = mix(vColor, lit, vShape);
  gl_FragColor = vec4(col * a, a);
}
`

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function sample(img: HTMLImageElement, w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(img, 0, 0, w, h)
  return ctx.getImageData(0, 0, w, h).data
}

function program(gl: WebGLRenderingContext, vert: string, frag: string) {
  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader')
    return sh
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link')
  return prog
}

// WebGL1 has no vertex array objects, so each layer rebinds its buffers
function makeAttrs(gl: WebGLRenderingContext, prog: WebGLProgram, list: [string, Float32Array, number][]) {
  const bound = list.map(([name, data, size]) => {
    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    return { loc: gl.getAttribLocation(prog, name), buf, size }
  })
  return () => {
    for (let i = 0; i < 8; i++) gl.disableVertexAttribArray(i)
    for (const { loc, buf, size } of bound) {
      if (loc < 0) continue
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
    }
  }
}

let cleanup = () => {}

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Visitors on Data Saver keep the plain photo
  if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return
  const el = canvas.value
  if (!el) return
  // Wait until the page has painted and the browser is idle, so none of the
  // setup below competes with the photo and text showing up
  await new Promise<void>((resolve) => {
    const idle = () =>
      'requestIdleCallback' in window
        ? window.requestIdleCallback(() => resolve(), { timeout: 1500 })
        : setTimeout(resolve, 200)
    if (document.readyState === 'complete') idle()
    else window.addEventListener('load', idle, { once: true })
  })

  const gl = el.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true })
  if (!gl) return

  let colorImg: HTMLImageElement
  let depthImg: HTMLImageElement
  try {
    ;[colorImg, depthImg] = await Promise.all([loadImage(props.color), loadImage(props.depth)])
  } catch {
    return
  }

  const phone = window.matchMedia(PHONE).matches
  const imgAspect = colorImg.naturalWidth / colorImg.naturalHeight

  let meshProg: WebGLProgram
  let splatProg: WebGLProgram
  try {
    meshProg = program(gl, MESH_VERT, MESH_FRAG)
    splatProg = program(gl, SPLAT_VERT, SPLAT_FRAG)
  } catch {
    return
  }

  // ---------- Photo mesh ----------
  const mCols = MESH_COLS
  const mRows = Math.round(MESH_COLS / imgAspect)
  const mDepth = sample(depthImg, mCols, mRows)
  const mUv = new Float32Array(mCols * mRows * 2)
  const mDep = new Float32Array(mCols * mRows)
  for (let y = 0; y < mRows; y++) {
    for (let x = 0; x < mCols; x++) {
      const i = y * mCols + x
      mUv[i * 2] = x / (mCols - 1)
      mUv[i * 2 + 1] = y / (mRows - 1)
      mDep[i] = mDepth[i * 4]! / 255
    }
  }
  const idx = new Uint16Array((mCols - 1) * (mRows - 1) * 6)
  let n = 0
  for (let y = 0; y < mRows - 1; y++) {
    for (let x = 0; x < mCols - 1; x++) {
      const a = y * mCols + x
      const b = a + 1
      const c = a + mCols
      const d = c + 1
      idx.set([a, c, b, b, c, d], n)
      n += 6
    }
  }
  const meshAttrs = makeAttrs(gl, meshProg, [
    ['aUv', mUv, 2],
    ['aDepth', mDep, 1],
  ])
  const idxBuf = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW)

  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, colorImg)

  // ---------- Splats ----------
  // One per SPLAT_CSS_PX of drawn photo (~60k at 1440px wide)
  const heroRect = el.getBoundingClientRect()
  const drawnWidth = Math.max(heroRect.width, heroRect.height * imgAspect)
  const gridW = Math.round(Math.min(360, Math.max(120, drawnWidth / SPLAT_CSS_PX)))
  const gridH = Math.round(gridW / imgAspect)
  const colors = sample(colorImg, gridW, gridH)
  const depths = sample(depthImg, gridW, gridH)

  // Only the columns that can be on screen: on a portrait phone the photo is
  // cropped to about a third of its width, so the rest is never built.
  // A margin covers the camera's sway.
  const [fx] = phone ? props.focusPhone : props.focus
  const visibleShare = Math.min(1, heroRect.width / drawnWidth)
  const margin = 0.06
  const u0 = Math.max(0, (1 - visibleShare) * fx - margin)
  const u1 = Math.min(1, u0 + visibleShare + margin * 2)
  const x0 = Math.floor(u0 * gridW)
  const x1 = Math.ceil(u1 * gridW)
  const cells: number[] = []
  for (let y = 0; y < gridH; y++) for (let x = x0; x < x1; x++) cells.push(y * gridW + x)

  // Far splats first so near ones paint over them. Depths are bytes, so a
  // counting sort does it in one pass instead of a comparison sort
  const count = cells.length
  const starts = new Uint32Array(257)
  for (const i of cells) {
    const v = depths[i * 4]! + 1
    starts[v] = starts[v]! + 1
  }
  for (let v = 1; v < 257; v++) starts[v] = starts[v]! + starts[v - 1]!
  const order = new Uint32Array(count)
  for (const i of cells) {
    const v = depths[i * 4]!
    order[starts[v]!] = i
    starts[v] = starts[v]! + 1
  }

  const sUv = new Float32Array(count * 2)
  const sRgb = new Float32Array(count * 3)
  const sDep = new Float32Array(count)
  const sSeed = new Float32Array(count)
  for (let k = 0; k < count; k++) {
    const i = order[k]!
    const x = i % gridW
    const y = (i / gridW) | 0
    // Jitter inside each cell so the grid doesn't show
    sUv[k * 2] = (x + 0.5 + (Math.random() - 0.5) * 0.7) / gridW
    sUv[k * 2 + 1] = (y + 0.5 + (Math.random() - 0.5) * 0.7) / gridH
    sRgb[k * 3] = colors[i * 4]! / 255
    sRgb[k * 3 + 1] = colors[i * 4 + 1]! / 255
    sRgb[k * 3 + 2] = colors[i * 4 + 2]! / 255
    sDep[k] = depths[i * 4]! / 255
    sSeed[k] = Math.random()
  }
  // Without the cursor, only splats from FOCUS_NEAR forward can show; they
  // are the tail of the depth-sorted list, so draw just that range
  let firstNear = 0
  while (firstNear < count && sDep[firstNear]! < FOCUS_NEAR) firstNear++

  const splatAttrs = makeAttrs(gl, splatProg, [
    ['aUv', sUv, 2],
    ['aColor', sRgb, 3],
    ['aDepth', sDep, 1],
    ['aSeed', sSeed, 1],
  ])

  const loc = (prog: WebGLProgram) => (name: string) => gl.getUniformLocation(prog, name)
  const mu = loc(meshProg)
  const su = loc(splatProg)
  const maxPoint = (gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array)[1] || 64

  gl.useProgram(meshProg)
  gl.uniform1f(mu('uAspect'), imgAspect)
  gl.uniform1i(mu('uColor'), 0)
  gl.useProgram(splatProg)
  gl.uniform1f(su('uAspect'), imgAspect)
  gl.uniform1f(su('uSwell'), HOVER_SWELL)
  gl.uniform1f(su('uMaxSize'), maxPoint)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  let dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    const r = el.getBoundingClientRect()
    el.width = Math.max(1, Math.round(r.width * dpr))
    el.height = Math.max(1, Math.round(r.height * dpr))
    gl.viewport(0, 0, el.width, el.height)

    // Same cover crop as the photo underneath, slightly overscanned
    const [fx, fy] = window.matchMedia(PHONE).matches ? props.focusPhone : props.focus
    let dw: number
    let dh: number
    if (el.width / el.height > imgAspect) {
      dw = el.width
      dh = el.width / imgAspect
    } else {
      dh = el.height
      dw = el.height * imgAspect
    }
    const baseW = dw
    const baseH = dh
    dw *= OVERSCAN
    dh *= OVERSCAN
    const ox = (el.width - baseW) * fx - (dw - baseW) * fx
    const oy = (el.height - baseH) * fy - (dh - baseH) * fy

    for (const [prog, u] of [
      [meshProg, mu],
      [splatProg, su],
    ] as const) {
      gl.useProgram(prog)
      gl.uniform2f(u('uCanvas'), el.width, el.height)
      gl.uniform2f(u('uDispSize'), dw, dh)
      gl.uniform2f(u('uDispOffset'), ox, oy)
      gl.uniform1f(u('uHoverRadius'), HOVER_RADIUS_CSS_PX * dpr)
    }
    gl.useProgram(meshProg)
    gl.uniform1f(mu('uCanvasH'), el.height)
    gl.useProgram(splatProg)
    gl.uniform1f(su('uSpacing'), dw / gridW)
    gl.uniform1f(su('uDpr'), dpr)
    gl.uniform1f(su('uRepel'), HOVER_REPEL_CSS_PX * dpr)
  }
  resize()

  // Pointer: steer the camera and dissolve the photo into splats under it
  const mouse = { x: -9999, y: -9999, inside: false, nx: 0, ny: 0 }
  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mouse.inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height
    mouse.x = x * dpr
    mouse.y = y * dpr
    mouse.nx = (x / r.width) * 2 - 1
    mouse.ny = (y / r.height) * 2 - 1
  }
  const onLeave = () => {
    mouse.inside = false
  }

  let yaw = 0
  let pitch = 0
  let hover = 0
  let frame = 0
  let visible = true
  const start = performance.now()
  let spatialStart = -1 // set on the first frame
  let settled = false
  let settledCamera = false

  let lastDraw = 0
  const draw = (now: number) => {
    frame = 0
    // Idle frames are capped; the pop and hover run at the display's rate
    const busy = !settledCamera || mouse.inside || hover > 0.01
    if (!busy && now - lastDraw < 1000 / IDLE_FPS - 2) {
      if (visible && !document.hidden) frame = requestAnimationFrame(draw)
      return
    }
    lastDraw = now
    const t = (now - start) / 1000
    // The camera's slow idle orbit never stops, so the scene always reads as
    // 3D; with the mouse over the hero it eases to 40% and the mouse steers
    if (spatialStart < 0) spatialStart = t + SPATIAL_DELAY
    // Flat photo -> 3D scene: depth springs in past full and settles back
    // (ease-out-back), while the camera pushes in and swings once
    const x = Math.min(1, Math.max(0, (t - spatialStart) / SPATIAL_SECONDS))
    const depthAmt = x <= 0 ? 0 : 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2)
    // Camera: rises quickly to its peak a third of the way in, then glides back
    // to rest with no jolt when the idle orbit takes over (zero speed at the end)
    const xc = Math.min(1, Math.max(0, (t - spatialStart) / CAMERA_SECONDS))
    const camKick = 6.75 * xc * (1 - xc) * (1 - xc)
    if (xc >= 1) settledCamera = true
    if (x >= 1 && !settled) {
      settled = true
      emit('settled')
    }
    const idle = (mouse.inside ? 0.4 : 1) * Math.min(1, depthAmt)
    const yawTarget = Math.sin(t * 0.23) * YAW_IDLE * idle + (mouse.inside ? -mouse.nx * YAW_MOUSE * depthAmt : 0)
    const pitchTarget =
      Math.sin(t * 0.31 + 1) * PITCH_IDLE * idle + (mouse.inside ? mouse.ny * PITCH_MOUSE * depthAmt : 0)
    yaw += (yawTarget - yaw) * 0.05
    pitch += (pitchTarget - pitch) * 0.05
    hover += ((mouse.inside ? 1 : 0) - hover) * 0.08
    const dolly = Math.sin(t * 0.25) * DOLLY * Math.min(1, depthAmt) + camKick * 0.22
    const camYaw = yaw + camKick * 0.07
    const camPitch = pitch - camKick * 0.025

    gl.clear(gl.COLOR_BUFFER_BIT)

    // Layer 1: the sharp photo
    gl.useProgram(meshProg)
    meshAttrs()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.uniform2f(mu('uRot'), camYaw, camPitch)
    gl.uniform1f(mu('uDolly'), dolly)
    gl.uniform2f(mu('uMouse'), mouse.x, mouse.y)
    gl.uniform1f(mu('uHover'), hover)
    gl.uniform1f(mu('uDepthAmt'), depthAmt)
    gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0)

    // Layer 2: near bokeh and the splats around the cursor
    gl.useProgram(splatProg)
    splatAttrs()
    gl.uniform1f(su('uTime'), t)
    gl.uniform2f(su('uRot'), camYaw, camPitch)
    gl.uniform1f(su('uDolly'), dolly)
    gl.uniform2f(su('uMouse'), mouse.x, mouse.y)
    gl.uniform1f(su('uHover'), hover)
    gl.uniform1f(su('uDepthAmt'), depthAmt)
    if (hover > 0.002) gl.drawArrays(gl.POINTS, 0, count)
    else gl.drawArrays(gl.POINTS, firstNear, count - firstNear)

    if (!ready.value) {
      ready.value = true
      emit('ready')
    }
    if (visible && !document.hidden) frame = requestAnimationFrame(draw)
  }

  const kick = () => {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw)
  }

  // Only animate while most of the hero is on screen and the tab is in front
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = (entry?.intersectionRatio ?? 0) > 0.25
      kick()
    },
    { threshold: [0, 0.25, 0.5] },
  )
  io.observe(el)

  const ro = new ResizeObserver(resize)
  ro.observe(el)

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerup', onLeave)
  document.documentElement.addEventListener('pointerleave', onLeave)
  document.addEventListener('visibilitychange', kick)
  kick()

  cleanup = () => {
    if (frame) cancelAnimationFrame(frame)
    io.disconnect()
    ro.disconnect()
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onLeave)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    document.removeEventListener('visibilitychange', kick)
  }
})

onUnmounted(() => cleanup())
</script>

<template>
  <canvas ref="canvas" class="splats" :class="{ 'splats--ready': ready }" aria-hidden="true" />
</template>

<style scoped>
.splats {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* No fade: the first frame is the flat photo, so it takes over invisibly */
  opacity: 0;
  pointer-events: none;
}

.splats--ready {
  opacity: 1;
}
</style>
