<script setup lang="ts">
const backgroundImage = '/optimized/images/_DSC4379.webp'
const overlayImage = '/optimized/resources/blackSideOverlayGradient.webp'
</script>

<template>
  <header id="top" class="hero">
    <img :src="backgroundImage" alt="" class="hero-image" fetchpriority="high" />
    <img :src="overlayImage" alt="" class="hero-overlay" />
    <div class="hero-fade" aria-hidden="true" />

    <div class="hero-inner">
      <!-- "Shaaf" has a moon on a faint tilted orbit around it, slipping behind
           the letters on the far side, and its first "a" sits on a small
           ember-orange planet, the same warm accent as the rocket flame -->
      <h1 class="hello">
        Hi, I'm <span class="name">Sh<span class="planet-a">a</span>af<span class="name-orbit" aria-hidden="true"><span class="orbit-ring" /><span class="moon-path"><span class="moon-x"><span class="moon-y"><span class="moon" /></span></span></span></span></span>.
      </h1>
      <p class="role">I write software across the stack, from bare-metal code to self-hosted infrastructure.</p>

      <p class="about">
        HBSc in Software Engineering at UofT (2023–2028), with over a year of experience at the
        Ontario Government and UTS. I focus on low-level systems, reliability, and performance.
      </p>

      <p class="links">
        <a href="#projects" class="link">See my projects <Icon name="heroicons:arrow-down-20-solid" class="link-icon" /></a>
        <a href="https://github.com/ShaafPlayz" target="_blank" rel="noopener" class="link">
          GitHub <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
        </a>
        <a href="https://linkedin.com/in/shaafyousaf" target="_blank" rel="noopener" class="link">
          LinkedIn <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
        </a>
      </p>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  height: 78svh;
  min-height: 540px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-image,
.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-fade {
  position: absolute;
  /* Runs 2px past the bottom so no seam shows where the photo ends */
  inset: auto 0 -2px 0;
  height: 45%;
  background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem 3.5rem;
}

.hello {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 4.5vw, 3.75rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  text-transform: none;
  color: #fff;
  margin: 0 0 0.4rem;
}

.name {
  position: relative;
  display: inline-block;
}

/* The "a" on a planet: a warm ember sphere lit from the top left, with the
   letter kept white on top so the name still reads */
.planet-a {
  position: relative;
  display: inline-block;
}

.planet-a::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 50%;
  /* Measured in Nexa Heavy: the baseline sits 0.182em above this box's
     bottom and the "a" is 0.504em tall, so a 0.7em sphere centred on it
     starts 0.084em up */
  bottom: 0.084em;
  width: 0.7em;
  height: 0.7em;
  margin-left: -0.35em;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 26%, #ffd39a 0%, #e8913f 34%, #a84f1d 70%, #4a1d0a 100%);
  box-shadow:
    inset -0.07em -0.07em 0.12em rgba(0, 0, 0, 0.45),
    0 0 0.05em rgba(255, 190, 120, 0.8),
    0 0 0.3em rgba(255, 150, 60, 0.3);
}

/* Orbit around the whole name, drawn faintly behind the letters */
.name-orbit {
  position: absolute;
  left: -12%;
  right: -12%;
  top: 50%;
  height: 0.5em;
  margin-top: -0.2em;
  transform: rotate(-7deg);
  pointer-events: none;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  z-index: -2;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

/* x and y swing a quarter-turn apart to trace the ellipse; on the far half of
   each lap the moon drops behind the letters */
.moon-path {
  position: absolute;
  inset: 0;
  animation: moon-depth 9s linear infinite;
}

.moon-x {
  position: absolute;
  inset: 0;
  animation: moon-x 4.5s ease-in-out infinite alternate;
}

.moon-y {
  position: absolute;
  inset: 0;
  animation: moon-y 4.5s ease-in-out -2.25s infinite alternate;
}

.moon {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.09em;
  height: 0.09em;
  margin: -0.045em 0 0 -0.045em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff, #c9d0dc);
  box-shadow: 0 0 0.06em rgba(255, 255, 255, 0.7);
}

@keyframes moon-x {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(50%);
  }
}

@keyframes moon-y {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(50%);
  }
}

/* Near side for the first half of each lap, behind the letters for the second */
@keyframes moon-depth {
  0%,
  49.9% {
    z-index: 1;
  }
  50%,
  100% {
    z-index: -1;
  }
}

/* Still frame: the moon parked on the near side of its orbit */
@media (prefers-reduced-motion: reduce) {
  .moon-path,
  .moon-x,
  .moon-y {
    animation: none;
  }

  .moon-x {
    transform: translateX(-30%);
  }

  .moon-y {
    transform: translateY(40%);
  }
}

.role {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: clamp(1.15rem, 1.7vw, 1.4rem);
  line-height: 1.3;
  color: #fff;
  margin: 0 0 0.85rem;
}

.about {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 300;
  font-size: 1.0625rem;
  line-height: 1.55;
  color: #e5e5e5;
  max-width: 36rem;
  margin: 0 0 1.5rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.75rem;
  margin: 0;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  text-underline-offset: 0.3em;
}

.link:hover {
  color: #fff;
  text-decoration-color: #fff;
}

.link-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  /* Taller on phones so the title stays clear of the face in the photo */
  .hero {
    height: 90svh;
  }

  .hero-image {
    object-position: 62% center;
  }

  /* The side gradient image doesn't fit a tall phone frame; a bottom-up
     gradient does the same job and always lines up */
  .hero-overlay {
    display: none;
  }

  .hero-fade {
    height: 75%;
    background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.82) 40%, rgba(0, 0, 0, 0) 100%);
  }

  .hero-inner {
    padding: 0 1.5rem 2.5rem;
  }

  .about {
    font-size: 1rem;
  }
}
</style>
