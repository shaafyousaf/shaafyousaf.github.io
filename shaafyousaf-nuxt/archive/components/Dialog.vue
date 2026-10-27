<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, computed } from 'vue'

// Props - data passed to the dialog
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  images: {
    type: Array as () => string[],
    default: () => []
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  tech: {
    type: Array as () => string[],
    default: () => []
  },
  link: {
    type: String,
    default: ''
  },
  buttons: {
    type: Array as () => Array<{ label: string; url: string; icon?: string }>,
    default: () => []
  },
  // Extra fields for different types of content
  prize: {
    type: String,
    default: ''
  },
  won: {
    type: Boolean,
    default: true
  },
  event: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  // Experience-specific fields
  location: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  employmentType: {
    type: String,
    default: ''
  },
  responsibilities: {
    type: Array as () => string[],
    default: () => []
  },
  achievements: {
    type: Array as () => string[],
    default: () => []
  },
  type: {
    type: String,
    default: ''
  },
  // Published Software fields
  stats: {
    type: Object as () => { users?: string; installs?: string; productHuntRank?: string; platform?: string },
    default: () => ({})
  },
  // Hackathon fields
  tagline: {
    type: String,
    default: ''
  },
  award: {
    type: String,
    default: ''
  },
  prizeAmount: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  demoType: {
    type: String,
    default: ''
  }
})

// Emit event to parent when dialog should close
const emit = defineEmits(['close'])

// Carousel state
const currentImageIndex = ref(0)

// Compute image array (use images prop if available, otherwise fallback to single image)
const imageArray = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images
  }
  return props.image ? [props.image] : []
})

// Carousel navigation
const nextImage = () => {
  if (imageArray.value.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % imageArray.value.length
  }
}

const prevImage = () => {
  if (imageArray.value.length > 0) {
    currentImageIndex.value = (currentImageIndex.value - 1 + imageArray.value.length) % imageArray.value.length
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

// Whether the right column has any content to show
const hasRightContent = computed(() => {
  return !!(
    props.tagline ||
    props.description ||
    (props.type === 'experience' && (props.responsibilities.length > 0 || props.achievements.length > 0))
  )
})

// Function to close the dialog
const closeDialog = () => {
  emit('close')
  currentImageIndex.value = 0
}

</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div 
        v-if="isOpen" 
        class="dialog-backdrop"
        @click="closeDialog"
      >
        <!-- Bento Wrapper (Transparent Grid on Desktop) -->
        <!-- Clicking the gaps/empty areas in the wrapper also closes -->
        <div class="bento-wrapper" @click="closeDialog">
          
          <!-- Close Button -->
          <button class="close-button" @click.stop="closeDialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- ================= LEFT COLUMN ================= -->
          <div class="bento-col bento-left">
            
            <!-- Module: Image Carousel -->
            <div v-if="imageArray.length > 0" class="bento-module module-image" @click.stop>
              <div class="carousel-wrapper">
                <div class="carousel-display">
                  <div 
                    v-for="(img, index) in imageArray" 
                    :key="index"
                    class="carousel-slide"
                    :class="{ active: index === currentImageIndex }"
                  >
                    <img :src="img" :alt="`${title} - Image ${index + 1}`" />
                  </div>
                </div>

                <div v-if="imageArray.length > 1" class="carousel-controls">
                  <button class="carousel-btn" @click="prevImage">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <div class="carousel-dots">
                    <button
                      v-for="(img, index) in imageArray"
                      :key="index"
                      class="dot"
                      :class="{ active: index === currentImageIndex }"
                      @click="goToImage(index)"
                    ></button>
                  </div>
                  <button class="carousel-btn" @click="nextImage">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
                <div v-if="imageArray.length > 1" class="image-badge">
                  {{ currentImageIndex + 1 }} / {{ imageArray.length }}
                </div>
              </div>
            </div>

            <!-- Module: Header & Meta -->
            <div class="bento-module module-header" @click.stop>
              <h2 class="title">{{ title }}</h2>
              <!-- Gold subtitle: project subtitle text, or company name for work entries -->
              <p v-if="subtitle || company" class="subtitle">{{ subtitle || company }}</p>

              <!-- Primary Info chips: company excluded (shown as subtitle above) -->
              <div v-if="prize || award || event" class="meta-info">
                <span v-if="prize" class="meta-item meta-prize">{{ won ? '🏆 ' : '' }}{{ prize }}</span>
                <span v-if="award && award !== prize" class="meta-item meta-award">{{ award }}</span>
                <span v-if="event" class="meta-item">{{ event }}</span>
              </div>

              <!-- Secondary Info -->
              <div 
                v-if="category || date || (type === 'experience' && (location || duration || employmentType)) || prizeAmount || status || demoType"
                class="meta-info meta-secondary"
              >
                <span v-if="category" class="meta-item">{{ category }}</span>
                <span v-if="date" class="meta-item">{{ date }}</span>
                <span v-if="prizeAmount" class="meta-item meta-prize">{{ prizeAmount }}</span>
                <span v-if="demoType" class="meta-item">{{ demoType }}</span>
                <span v-if="status" class="meta-item meta-prize">{{ status }}</span>
                <span v-if="type === 'experience' && employmentType" class="meta-item">{{ employmentType }}</span>
                <span v-if="type === 'experience' && duration" class="meta-item">{{ duration }}</span>
                <span v-if="type === 'experience' && location" class="meta-item">{{ location }}</span>
              </div>
            </div>

            <!-- Module: Stats (only in left when description is present) -->
            <div v-if="hasRightContent && stats && (stats.users || stats.installs || stats.productHuntRank)" class="bento-module" @click.stop>
              <div class="stats-grid">
                <div v-if="stats.users" class="stat-item">
                  <div class="stat-value">{{ stats.users }}</div>
                  <div class="stat-label">Active Users</div>
                </div>
                <div v-if="stats.installs" class="stat-item">
                  <div class="stat-value">{{ stats.installs }}</div>
                  <div class="stat-label">Installs</div>
                </div>
                <div v-if="stats.productHuntRank" class="stat-item">
                  <div class="stat-value">#{{ stats.productHuntRank }}</div>
                  <div class="stat-label">Product Hunt</div>
                </div>
              </div>
            </div>

            <!-- Tech always lives in the right column — never rendered here -->

            <!-- Module: Footer Actions (always in left column) -->
            <div v-if="buttons.length > 0 || link" class="bento-module module-footer" @click.stop>
              <div v-if="buttons.length > 0" class="action-buttons-container">
                <a 
                  v-for="(button, index) in buttons"
                  :key="index"
                  :href="button.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="action-button"
                >
                  <span>{{ button.label }}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              <a 
                v-else-if="link"
                :href="link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="action-button"
              >
                <span>View Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>

          </div>

          <!-- ================= RIGHT COLUMN ================= -->
          <!-- Always rendered; stats/tech shift here when no description -->
          <div class="bento-col bento-right">

            <!-- Stats shifted right when no description -->
            <div v-if="!hasRightContent && stats && (stats.users || stats.installs || stats.productHuntRank)" class="bento-module" @click.stop>
              <div class="stats-grid">
                <div v-if="stats.users" class="stat-item">
                  <div class="stat-value">{{ stats.users }}</div>
                  <div class="stat-label">Active Users</div>
                </div>
                <div v-if="stats.installs" class="stat-item">
                  <div class="stat-value">{{ stats.installs }}</div>
                  <div class="stat-label">Installs</div>
                </div>
                <div v-if="stats.productHuntRank" class="stat-item">
                  <div class="stat-value">#{{ stats.productHuntRank }}</div>
                  <div class="stat-label">Product Hunt</div>
                </div>
              </div>
            </div>

            <!-- Tech Stack shifted right when no description -->
            <div v-if="!hasRightContent && tech.length > 0" class="bento-module" @click.stop>
              <h4 class="section-heading">Technologies</h4>
              <div class="cs-tech-list">
                <span v-for="(techItem, index) in tech" :key="index" class="cs-tech-tag">
                  {{ techItem }}
                </span>
              </div>
            </div>

            <!-- Scrollable Description Area (only when description/responsibilities exist) -->
            <div v-if="hasRightContent" class="bento-module module-scrollable" @click.stop>

              <!-- Tech always first -->
              <div v-if="tech.length > 0" class="content-section">
                <h4 class="section-heading">Technologies</h4>
                <div class="cs-tech-list">
                  <span v-for="(techItem, index) in tech" :key="index" class="cs-tech-tag">
                    {{ techItem }}
                  </span>
                </div>
              </div>

              <div v-if="tagline" class="content-section">
                <p class="tagline">{{ tagline }}</p>
              </div>

              <div v-if="description" class="content-section">
                <h4 v-if="tagline" class="section-heading">Overview</h4>
                <p class="description">{{ description }}</p>
              </div>

              <div v-if="type === 'experience' && responsibilities.length > 0" class="content-section">
                <h4 class="section-heading">Responsibilities</h4>
                <ul class="info-list">
                  <li v-for="(item, index) in responsibilities" :key="index">{{ item }}</li>
                </ul>
              </div>

              <div v-if="type === 'experience' && achievements.length > 0" class="content-section">
                <h4 class="section-heading">Achievements</h4>
                <ul class="info-list">
                  <li v-for="(item, index) in achievements" :key="index">{{ item }}</li>
                </ul>
              </div>
              
            </div>


          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ===== GLOBAL RESET ===== */
* {
  box-sizing: border-box;
}

/* ===== BACKDROP ===== */
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}

/* ===== BENTO WRAPPER (Desktop Grid) ===== */
.bento-wrapper {
  font-family: 'Nexa', sans-serif;
  display: grid;
  grid-template-columns: 580px 1fr;
  gap: 1rem;
  width: 1120px;
  max-width: 100%;
  height: 80vh;
  position: relative;
  background: transparent;
}

/* ===== COLUMNS ===== */
.bento-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  overflow: hidden;
}

/* Prevent left-column modules from being squished by flexbox */
.bento-left .bento-module {
  flex-shrink: 0;
}

/* Left Column - stacks modules, rarely needs scrolling */
.bento-left {
  overflow-y: auto;
  /* Hide scrollbar for clean aesthetic */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.bento-left::-webkit-scrollbar {
  display: none;
}

/* Right Column - strict height */
.bento-right {
  position: relative;
}

/* ===== RIGHT COLUMN WHITE THEME ===== */
@media (min-width: 801px) {
  .bento-right .bento-module {
    background: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }

  .bento-right .section-heading {
    color: rgba(0, 0, 0, 0.38);
  }

  .bento-right .description {
    color: rgba(0, 0, 0, 0.72);
  }

  .bento-right .tagline {
    color: rgba(0, 0, 0, 0.42);
  }

  .bento-right .info-list li {
    color: rgba(0, 0, 0, 0.72);
  }

  .bento-right .info-list li::before {
    background: rgba(0, 0, 0, 0.2);
  }

  .bento-right :deep(.cs-tech-tag) {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.65);
    border-color: rgba(0, 0, 0, 0.1);
  }

  .bento-right .stat-item {
    background: rgba(0, 0, 0, 0.04);
  }

  .bento-right .stat-value {
    color: #000000;
  }

  .bento-right .stat-label {
    color: rgba(0, 0, 0, 0.42);
  }

  .bento-right .module-scrollable::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
  }

  .bento-right .module-scrollable::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.28);
  }
}

/* ===== MODULES (The individual cards) ===== */
.bento-module {
  background: #000000;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.module-image {
  padding: 0;
  overflow: hidden;
  flex-shrink: 0;
}

/* Compact padding for the header/meta block */
.module-header {
  padding: 1rem 1.25rem;
}

/* Scrollable module on the right */
.module-scrollable {
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
}

/* Custom subtle scrollbar for the description */
.module-scrollable::-webkit-scrollbar {
  width: 6px;
}
.module-scrollable::-webkit-scrollbar-track {
  background: transparent;
}
.module-scrollable::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.module-scrollable::-webkit-scrollbar-thumb:hover {
  background: var(--color-gold, #FFD700);
}

/* Footer module on the right */
.module-footer {
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
}

/* ===== CLOSE BUTTON ===== */
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 20;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.close-button:hover {
  background: #ffffff;
  color: #000000;
  border-color: rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

/* ===== CAROUSEL ===== */
.carousel-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  background: #000000;
}

.carousel-display {
  position: absolute;
  inset: 0;
}

.carousel-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-controls {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.35rem 0.6rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 100px;
}

.carousel-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #e4e4e7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

.carousel-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.carousel-dots {
  display: flex;
  gap: 0.35rem;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  padding: 0;
}

.dot.active {
  width: 14px;
  border-radius: 10px;
  background: #ffffff;
}

.image-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 600;
  color: #ffffff;
}

/* ===== TYPOGRAPHY & CONTENT ===== */
.content-section {
  margin-bottom: 1.5rem;
}
.content-section:last-child {
  margin-bottom: 0;
}

.title {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.25;
  color: #ffffff;
  margin: 0 0 0 0;
  text-transform: none;
  letter-spacing: normal;
}

.subtitle {
  font-family: 'Nexa', sans-serif;
  font-weight: 200;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 1);
  margin: 0 0 0 0;
}

.description {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.section-heading {
  font-family: 'Nexa', sans-serif;
  font-weight: 500;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0 0.6rem 0;
}

.tagline {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.5);
  padding-left: 0;
  margin: 0;
}

/* ===== META CHIPS ===== */
.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.meta-item {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  font-family: 'Nexa', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  display: inline-flex;
  align-items: center;
}

.meta-prize {
  background: rgba(245, 158, 11, 0.1);
  color: #fbbf24;
}

.meta-award {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.meta-secondary .meta-item {
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 400;
}

/* ===== STATS ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.04);
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-value {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: #ffffff;
}

.stat-label {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.65rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

/* ===== LISTS ===== */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-list li {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 1.1rem;
  position: relative;
}

.info-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

/* Tech stack uses global cs- classes; no local overrides needed */

/* ===== BUTTONS ===== */
.action-buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  width: 100%;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  background: #ffffff;
  border-radius: 8px;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: #000000;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #e4e4e7;
  transform: translateY(-1px);
}

.action-button svg {
  width: 14px;
  height: 14px;
  opacity: 0.9;
}

/* ===== TRANSITIONS ===== */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .bento-wrapper,
.dialog-leave-to .bento-wrapper {
  transform: scale(0.97);
}

/* ===== MOBILE RESPONSIVE (Collapse into single scrollable dialog) ===== */
@media (max-width: 800px) {
  .dialog-backdrop {
    padding: 1rem;
  }
  
  .bento-wrapper {
    /* Transform grid into a single column, standard dialog */
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 90vh;
    width: 100%;
    background: #000000;
    border-radius: 16px;
    overflow-y: auto;
  }

  .bento-col {
    /* Remove strict heights on mobile columns */
    height: auto;
    overflow: visible;
    gap: 0;
  }

  .bento-module {
    /* Strip individual module styling to blend into one card */
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 1.5rem;
  }

  .module-image {
    padding: 0;
  }

  .module-scrollable {
    overflow-y: visible; /* Let the parent wrapper handle scrolling */
    padding-right: 1.5rem;
  }

  .module-footer {
    position: static;
  }

  .close-button {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: rgba(30, 30, 30, 0.85);
    color: rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: none;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
}

@media (max-width: 480px) {
  .dialog-backdrop {
    padding: 0.5rem;
  }
  
  .bento-wrapper {
    height: 95vh;
  }
  
  .bento-module {
    padding: 1.25rem;
  }

  .action-buttons-container {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>