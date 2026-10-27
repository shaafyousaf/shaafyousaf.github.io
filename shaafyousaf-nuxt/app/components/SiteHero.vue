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
      <h1 class="hello">Hi, I'm Shaaf.</h1>
      <p class="role">I build reliable software, and the systems it runs on.</p>

      <p class="about">
        By day, C# and .NET at the Ontario Government on the PICASSO framework. At home, a self-hosted
        server running 10+ services. I'm a third-year Software Engineering student at UofT.
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
  height: 90svh;
  min-height: 600px;
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
  padding: 0 2.5rem 4.5rem;
}

.hello {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 4.5vw, 3.75rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  text-transform: none;
  color: #fff;
  margin: 0 0 0.5rem;
}

.role {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: clamp(1.15rem, 1.7vw, 1.4rem);
  line-height: 1.3;
  color: #fff;
  margin: 0 0 1.25rem;
}

.about {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 300;
  font-size: 1.0625rem;
  line-height: 1.65;
  color: #e5e5e5;
  max-width: 34rem;
  margin: 0 0 2rem;
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
    padding: 0 1.5rem 3rem;
  }

  .about {
    font-size: 1rem;
  }
}
</style>
