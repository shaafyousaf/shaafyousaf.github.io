<script setup lang="ts">
import { Motion } from 'motion-v'

// Emit for click events
const emit = defineEmits<{
  (e: 'click', project: any): void
}>()

// Featured project data
const featuredProject = {
  title: 'Slowed Enhanced',
  subtitle: 'An Open Source Google Chrome Extension for Advanced Audio Controls',
  category: 'Published on Chrome Web Store',
  image: '/optimized/images/_DSC4383_compressed.webp',
  stats: {
    installs: '1200+',
    users: '90 (Apr - May)',
    productHuntRank: '14'
  },
  tech: ['.NET C#', 'Blazor Framework', 'MudBlazor', 'JavaScript'],
  buttons: [
    { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/mbknnccopgggeedhnloodppflepboggp' },
    { label: 'Github (Open Source)', url: 'https://github.com/shaafyousaf/Slowed-Enhanced.git' },
    { label: 'Product Hunt', url: 'https://www.producthunt.com/products/slowed-enchanced/launches/slowed-enchanced' }
  ]
}

const overlayImage = '/optimized/resources/blackSideOverlayGradient.webp'

const handleClick = () => {
  emit('click', featuredProject)
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }"
    :while-in-view="{ opacity: 1, filter: 'blur(0px)', scale: 1 }"
    :transition="{ duration: 0.5, delay: 0.1 }"
    class="featured-project"
    @click="handleClick"
  >
    <!-- Background Image -->
    <div class="featured-background">
      <img 
        :src="featuredProject.image" 
        alt="Background" 
        class="background-image"
        loading="lazy"
      />
      <img 
        :src="overlayImage" 
        alt="Overlay" 
        class="gradient-overlay"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="featured-content">
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <h2 class="featured-title">{{ featuredProject.title }}</h2>
      </Motion>
      
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.25 }"
      >
        <p class="featured-subtitle">{{ featuredProject.subtitle }}</p>
      </Motion>

      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        class="featured-meta"
      >
        <span v-if="featuredProject.category" class="featured-category">{{ featuredProject.category }}</span>
      </Motion>

      <!-- Stats Section -->
      <Motion
        v-if="featuredProject.stats"
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.35 }"
        class="featured-stats"
      >
        <div v-if="featuredProject.stats.installs" class="stat-item">
          <div class="stat-value">{{ featuredProject.stats.installs }}</div>
          <div class="stat-label">Installs</div>
        </div>
        <div v-if="featuredProject.stats.users" class="stat-item">
          <div class="stat-value">{{ featuredProject.stats.users }}</div>
          <div class="stat-label">Active Users (last 30 days, 2026)</div>
        </div>
        <div v-if="featuredProject.stats.productHuntRank" class="stat-item">
          <div class="stat-value">#{{ featuredProject.stats.productHuntRank }}</div>
          <div class="stat-label">Product Hunt</div>
        </div>
      </Motion>
    </div>
  </Motion>
</template>

<style scoped>
.featured-project {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-project:hover {
  transform: scale(1.01);
}

.featured-background {
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
  object-position: 0 45%;
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

.featured-content {
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
}

.featured-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin-bottom: 0;
  text-transform: none;
}

.featured-subtitle {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  color: #e0e0e0;
  margin-bottom: 0;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.featured-category {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #cccccc;
}

.featured-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  line-height: 1;
}

.stat-label {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  color: #cccccc;
  line-height: 1;
}

@media (max-width: 768px) {
  .featured-project {
    height: 240px;
  }

  .background-image {
    transform: scale(1.3);
    object-position: center 45%;
  }

  .featured-content {
    padding: 1.5rem;
  }

  .featured-title {
    font-size: 1.8rem;
  }

  .featured-subtitle {
    font-size: 1rem;
  }

  .featured-category {
    font-size: 0.85rem;
  }

  .featured-stats {
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }
}
</style>
