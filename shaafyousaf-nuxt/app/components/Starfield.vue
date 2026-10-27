<script setup lang="ts">
// Starfield behind the page. Five depth layers shift at different rates as you
// scroll, from near-still dust to fast foreground glints. Stars carry a slight
// colour temperature like real ones. Satellites cross every so often and the
// odd meteor streaks by. One still frame under reduced motion.
const canvas = ref<HTMLCanvasElement>()

type Rgb = [number, number, number]

interface Star { x: number; y: number; r: number; base: number; phase: number; speed: number; color: Rgb }
interface Layer {
  density: number
  parallax: number
  size: [number, number]
  alpha: [number, number]
  kind: 'dot' | 'halo' | 'glint'
  stars: Star[]
}
interface Mover { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }

const FRAME_MS = 1000 / 30
const DRIFT = 0.015 // px per frame, leftward, scaled by layer depth

// Mostly white, some blue-white, a few warm, as in a real sky
const TINTS: Rgb[] = [
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [214, 228, 255],
  [200, 218, 255],
  [255, 236, 210],
]

const layers: Layer[] = [
  { kind: 'dot', density: 1 / 900, parallax: 0.01, size: [0.4, 0.7], alpha: [0.12, 0.28], stars: [] }, // distant dust
  { kind: 'dot', density: 1 / 2600, parallax: 0.04, size: [0.7, 1.1], alpha: [0.3, 0.55], stars: [] }, // far
  { kind: 'dot', density: 1 / 7000, parallax: 0.09, size: [1.1, 1.6], alpha: [0.5, 0.8], stars: [] }, // mid
  { kind: 'halo', density: 1 / 45000, parallax: 0.16, size: [1.6, 2.2], alpha: [0.75, 1], stars: [] }, // near, soft glow
  { kind: 'glint', density: 1 / 160000, parallax: 0.26, size: [2, 2.6], alpha: [0.85, 1], stars: [] }, // foreground glints
]

let ctx: CanvasRenderingContext2D | null = null
let satellite: Mover | null = null
let meteor: Mover | null = null
let nextSatelliteAt = 0
let nextMeteorAt = 0
let width = 0
let height = 0
let raf = 0
let last = 0
let still = false

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]!
const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a})`

function seed() {
  const area = width * height
  for (const layer of layers) {
    const count = Math.max(layer.kind === 'glint' ? 3 : 0, Math.round(area * layer.density))
    layer.stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: rand(...layer.size),
      base: rand(...layer.alpha),
      phase: Math.random() * Math.PI * 2,
      speed: rand(0.3, 1),
      color: layer.kind === 'dot' && layer.parallax < 0.03 ? TINTS[0]! : pick(TINTS),
    }))
  }
}

function resize() {
  if (!canvas.value || !ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  seed()
  if (still) draw(0)
}

/** Wrap a scrolled y into the viewport so layers tile seamlessly */
const wrapY = (y: number) => ((y % height) + height) % height

function drawHalo(x: number, y: number, s: Star, a: number) {
  if (!ctx) return
  const radius = s.r * 5
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius)
  glow.addColorStop(0, rgba(s.color, 0.45 * a))
  glow.addColorStop(1, rgba(s.color, 0))
  ctx.fillStyle = glow
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  ctx.fillStyle = rgba(s.color, a)
  ctx.beginPath()
  ctx.arc(x, y, s.r * 0.6, 0, Math.PI * 2)
  ctx.fill()
}

function drawGlint(x: number, y: number, s: Star, a: number) {
  if (!ctx) return
  drawHalo(x, y, s, a)
  // Soft four-point diffraction spikes
  const spike = s.r * 7
  ctx.lineWidth = 0.8
  for (const [dx, dy] of [[1, 0], [0, 1]] as const) {
    const grad = ctx.createLinearGradient(x - dx * spike, y - dy * spike, x + dx * spike, y + dy * spike)
    grad.addColorStop(0, rgba(s.color, 0))
    grad.addColorStop(0.5, rgba(s.color, 0.7 * a))
    grad.addColorStop(1, rgba(s.color, 0))
    ctx.strokeStyle = grad
    ctx.beginPath()
    ctx.moveTo(x - dx * spike, y - dy * spike)
    ctx.lineTo(x + dx * spike, y + dy * spike)
    ctx.stroke()
  }
}

function launchSatellite(now: number) {
  const fromLeft = Math.random() < 0.6
  const frames = rand(11, 16) * 30
  const angle = (fromLeft ? 0.08 : 0.55) + Math.random() * 0.25
  const speed = Math.hypot(width, height) / frames
  satellite = {
    x: fromLeft ? -10 : Math.random() * width * 0.6,
    y: fromLeft ? Math.random() * height * 0.5 : -10,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: frames * 1.5,
  }
  nextSatelliteAt = now + rand(9000, 16000)
}

function launchMeteor(now: number) {
  const dir = Math.random() < 0.5 ? 1 : -1
  const angle = rand(0.35, 0.7)
  const speed = rand(14, 20)
  meteor = {
    x: dir > 0 ? rand(0, width * 0.6) : rand(width * 0.4, width),
    y: rand(0, height * 0.35),
    vx: Math.cos(angle) * speed * dir,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 22,
  }
  nextMeteorAt = now + rand(20000, 38000)
}

function drawStreak(m: Mover, headAlpha: number, tail: number, lineWidth: number) {
  if (!ctx) return
  const tx = m.x - m.vx * tail
  const ty = m.y - m.vy * tail
  const grad = ctx.createLinearGradient(m.x, m.y, tx, ty)
  grad.addColorStop(0, `rgba(255,255,255,${headAlpha})`)
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.strokeStyle = grad
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(m.x, m.y)
  ctx.lineTo(tx, ty)
  ctx.stroke()
}

function draw(t: number) {
  if (!ctx) return
  const scroll = window.scrollY
  ctx.clearRect(0, 0, width, height)

  for (const layer of layers) {
    for (const s of layer.stars) {
      const twinkle = still ? 1 : 0.7 + 0.3 * Math.sin(s.phase + t * 0.0012 * s.speed)
      const a = s.base * twinkle
      const y = wrapY(s.y - scroll * layer.parallax)

      if (layer.kind === 'dot') {
        ctx.fillStyle = rgba(s.color, a)
        ctx.fillRect(s.x, y, s.r, s.r)
      } else if (layer.kind === 'halo') {
        drawHalo(s.x, y, s, a)
      } else {
        drawGlint(s.x, y, s, a)
      }

      if (!still) {
        s.x -= DRIFT * layer.parallax * 10
        if (s.x < -10) s.x = width + 10
      }
    }
  }

  if (satellite) {
    const s = satellite
    s.x += s.vx
    s.y += s.vy
    s.life++
    const fade = Math.min(1, s.life / 30)
    ctx.fillStyle = `rgba(255,255,255,${0.8 * fade})`
    ctx.beginPath()
    ctx.arc(s.x, s.y, 1.3, 0, Math.PI * 2)
    ctx.fill()
    drawStreak(s, 0.3 * fade, 18, 1)
    if (s.x > width + 20 || s.y > height + 20 || s.life > s.maxLife) satellite = null
  }

  if (meteor) {
    const m = meteor
    m.x += m.vx
    m.y += m.vy
    m.life++
    // Bright at first, burning out by the end
    const alpha = Math.max(0, 1 - m.life / m.maxLife) * 0.9
    drawStreak(m, alpha, 7, 1.5)
    if (m.life >= m.maxLife) meteor = null
  }
}

function loop(now: number) {
  raf = requestAnimationFrame(loop)
  if (document.hidden || now - last < FRAME_MS) return
  last = now
  if (!satellite && now > nextSatelliteAt) launchSatellite(now)
  if (!meteor && now > nextMeteorAt) launchMeteor(now)
  draw(now)
}

function onScroll() {
  if (still) draw(0)
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize()
  window.addEventListener('resize', resize)
  if (still) {
    // No animation, but layers still settle into place on scroll
    window.addEventListener('scroll', onScroll, { passive: true })
    return
  }
  const now = performance.now()
  nextSatelliteAt = now + 4000
  nextMeteorAt = now + 10000
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <canvas ref="canvas" class="starfield" aria-hidden="true" />
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
