<script setup lang="ts">
import { Motion } from 'motion-v'

interface Props {
  backgroundImage?: string
  overlayImage?: string
  hostname?: string
  serverConnected?: boolean
  uptime?: string
  alignRight?: boolean
  secondsUntilNextPing?: number
  pingInterval?: number
}

withDefaults(defineProps<Props>(), {
  backgroundImage: '/optimized/images/homeserveroldPic_png.webp',
  overlayImage: '/optimized/resources/blackSideOverlayGradient.webp',
  hostname: 'the-great-library',
  serverConnected: false,
  uptime: '--',
  alignRight: false,
  secondsUntilNextPing: 60,
  pingInterval: 60
})
</script>

<template>
  <div class="homelab-section">
    <div class="homelab-background">
      <img 
        :src="backgroundImage" 
        alt="Background" 
        class="background-image"
        loading="lazy"
      />
      <img 
        :src="overlayImage" 
        alt="Overlay" 
        :class="['gradient-overlay', { 'flipped': alignRight }]"
        loading="lazy"
      />
    </div>

    <div class="homelab-content" :class="{ 'align-right': alignRight }">
      <div class="homelab-text-container">
        <ClientOnly>
          <Motion
            tag="h1"
            class="homelab-title"
            :initial="{ opacity: 0, filter: 'blur(10px)', y: 20 }"
            :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
            :transition="{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }"
          >
            HomeLab
          </Motion>
          <Motion
            tag="p"
            class="homelab-subtitle"
            :initial="{ opacity: 0, filter: 'blur(8px)', y: 15 }"
            :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
            :transition="{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }"
          >
            The cloud is just someone else's computer. This one's mine.
          </Motion>
          <template #fallback>
            <h1 class="homelab-title">HomeLab</h1>
            <p class="homelab-subtitle">The cloud is just someone else's computer. This one's mine.</p>
          </template>
        </ClientOnly>

        <ClientOnly>
          <!-- Motion wrapper handles the scroll-entrance animation only -->
          <Motion
            tag="div"
            class="server-status-motion-wrapper"
            :initial="{ opacity: 0, filter: 'blur(8px)', y: 20 }"
            :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
            :transition="{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }"
          >
            <ServerStatusPill
              :hostname="hostname"
              :server-connected="serverConnected"
              :uptime="uptime"
              :seconds-until-next-ping="secondsUntilNextPing"
              :ping-interval="pingInterval"
            />
          </Motion>

          <template #fallback>
            <div class="server-status-motion-wrapper">
              <ServerStatusPill :hostname="hostname" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homelab-section {
  position: relative;
  height: 40vh;
  min-height: 400px;
  width: 100%;
  overflow: hidden;
}

.homelab-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0 40%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

.gradient-overlay.flipped {
  transform: scaleX(-1);
}

.homelab-content {
  position: relative;
  z-index: 10;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.homelab-text-container {
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 5vh;
}

.homelab-content.align-right {
  align-items: flex-end;
}

.homelab-content.align-right .homelab-text-container {
  text-align: right;
}

.homelab-content.align-right .homelab-subtitle {
  margin-left: auto;
}

.homelab-content.align-right .server-status-motion-wrapper {
  margin-left: auto;
}

.homelab-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: clamp(3rem, 8vw, 5rem);
  color: #ffffff;
  line-height: 0.95;
  margin: 0; 
  margin-bottom: 0.5rem;
  letter-spacing: -2px;
  margin-left: -0.3rem;
}

.homelab-subtitle {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  color: #e0e0e0;
  margin: 0;
  margin-bottom: 0.5rem;
  max-width: 880px;
}

/* Motion entrance wrapper — just controls sizing */
.server-status-motion-wrapper {
  max-width: fit-content;
}

/* Responsive design */
@media (max-width: 768px) {
  .homelab-section {
    height: 45vh;
    min-height: 350px;
  }

  .background-image {
    transform: scale(1.2);
    object-position: center 40%;
  }

  .homelab-content {
    padding: 0 2rem;
  }

  .homelab-text-container {
    padding-top: 8vh;
  }

  .homelab-title {
    font-size: clamp(2.5rem, 10vw, 4rem);
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .homelab-section {
    height: 40vh;
    min-height: 320px;
  }

  .background-image {
    transform: scale(1.3);
    object-position: center 40%;
  }

  .homelab-content {
    padding: 0 1.5rem;
  }

  .homelab-title {
    letter-spacing: -1px;
  }
}
</style>
