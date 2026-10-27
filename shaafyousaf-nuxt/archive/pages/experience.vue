<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const activeSection = ref('professional-work')
const isDialogOpen = ref(false)
const selectedItem = ref<any>(null)
let closeTimeout: number | null = null
const slideDirection = ref(1) // 1 for right, -1 for left

// Check for tab parameter on mount
onMounted(() => {
  const tabParam = route.query.tab as string
  if (tabParam && sections.some(s => s.id === tabParam)) {
    activeSection.value = tabParam
  }
})

const sections = [
  { id: 'professional-work', label: 'Professional Work' },
  { id: 'published', label: 'Published & Hackathons' },
  { id: 'projects', label: 'Projects' }
]

const setActiveSection = (sectionId: string) => {
  const currentIndex = sections.findIndex(s => s.id === activeSection.value)
  const newIndex = sections.findIndex(s => s.id === sectionId)
  slideDirection.value = newIndex > currentIndex ? 1 : -1
  activeSection.value = sectionId
}

const openDialog = (item: any) => {
  // Clear any pending close timeout to prevent race conditions
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  selectedItem.value = item
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
  closeTimeout = setTimeout(() => {
    selectedItem.value = null
    closeTimeout = null
  }, 400)
}

const slideVariants = computed(() => ({
  initial: {
    opacity: 0,
    x: slideDirection.value * 50
  },
  animate: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: slideDirection.value * -50
  }
}))
</script>

<template>
  <div class="experience-page-wrapper">
    <div class="experience-page">
      <!-- Dialog Component -->
      <Dialog
      :isOpen="isDialogOpen"
      :title="selectedItem?.title || selectedItem?.position || ''"
      :subtitle="selectedItem?.subtitle || ''"
      :image="selectedItem?.image || ''"
      :description="selectedItem?.description || ''"
      :category="selectedItem?.category || ''"
      :tech="selectedItem?.tech || selectedItem?.technologies || []"
      :link="selectedItem?.link || ''"
      :buttons="selectedItem?.buttons || []"
      :prize="selectedItem?.prize || ''"
      :won="selectedItem?.won !== false"
      :event="selectedItem?.event || ''"
      :company="selectedItem?.company || ''"
      :position="selectedItem?.position || ''"
      :date="selectedItem?.date || ''"
      :location="selectedItem?.location || ''"
      :duration="selectedItem?.duration || ''"
      :employmentType="selectedItem?.employmentType || ''"
      :responsibilities="selectedItem?.responsibilities || []"
      :achievements="selectedItem?.achievements || []"
      :type="selectedItem?.type || ''"
      :stats="selectedItem?.stats || {}"
      :tagline="selectedItem?.tagline || ''"
      :award="selectedItem?.award || ''"
      :prizeAmount="selectedItem?.prizeAmount || ''"
      :status="selectedItem?.status || ''"
      :demoType="selectedItem?.demoType || ''"
      @close="closeDialog"
    />

    <!-- Hero Section -->
    <Motion
      :initial="{ opacity: 0, y: -20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4 }"
      class="hero-section"
    >
      <h1 class="hero-title">My Experience</h1>
      <p class="hero-description">
        Explore my professional work, hackathons, published work, and projects
      </p>

      <!-- Tab Pills -->
      <div class="tab-container">
        <Motion
          v-for="(section, index) in sections"
          :key="section.id"
          :initial="{ opacity: 0, scale: 0.95 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.3, delay: 0.1 + index * 0.05 }"
        >
          <button
            :class="['tab-pill', { active: activeSection === section.id }]"
            @click="setActiveSection(section.id)"
          >
            {{ section.label }}
          </button>
        </Motion>
      </div>
    </Motion>

    <!-- Content Sections with Sliding Animation -->
    <div class="content-wrapper">
      <Motion
        :key="activeSection"
        :initial="slideVariants.initial"
        :while-in-view="slideVariants.animate"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
        class="content-section"
      >
        <InternshipsSection v-if="activeSection === 'professional-work'" @item-click="openDialog" />
        <PublishedHackathonsSection v-if="activeSection === 'published'" @item-click="openDialog" />
        <ProjectsSection v-if="activeSection === 'projects'" @item-click="openDialog" />
      </Motion>
    </div>
    </div>
  </div>
</template>

<style scoped>
.experience-page-wrapper {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
}

.experience-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 100px 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  text-align: left;
  margin-bottom: 3rem;
  position: relative;
  z-index: 50;
}

.hero-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  color: #000000;
  margin-bottom: 0.6rem;
  letter-spacing: -2px;
  line-height: 1.05;
}

.hero-description {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: clamp(0.875rem, 1.6vw, 1rem);
  color: #888888;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: left;
}

/* Tab Pills Container */
.tab-container {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #f0f0f0;
  border-radius: 50px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
}

/* Tab Pills */
.tab-pill {
  padding: 0.6rem 1.35rem;
  background: transparent;
  border: none;
  border-radius: 50px;
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-pill:hover:not(.active) {
  background: rgba(0, 0, 0, 0.06);
  color: #222222;
}

.tab-pill.active {
  background: #000000;
  color: #ffffff;
  font-weight: 700;
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: auto;
  overflow: hidden;
  min-height: 400px;
}

.content-section {
  width: 100%;
}

/* Empty Section */
.empty-section {
  text-align: center;
  padding: 6rem 2rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-text {
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 1.8rem;
  color: #cccccc;
  letter-spacing: -0.5px;
}

/* Apply border-radius to featured internship in experience section only */
.experience-page :deep(.featured-internship) {
  border-radius: 40px;
}

@media (max-width: 968px) {
  .experience-page {
    padding: 90px 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .experience-page {
    padding: 90px 1.5rem 1.5rem;
    padding-top: 150px;
  }

  .hero-section {
    margin-bottom: 0.75rem;
  }

  .experience-logo {
    height: 32px;
    margin-bottom: 1.25rem;
  }

  .hero-title {
    font-size: 1.9rem;
    letter-spacing: -1.5px;
  }

  .hero-description {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }

  .tab-container {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    z-index: 90;
    margin: 0;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 0;
    padding: 0.65rem 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    overflow-x: auto;
    overflow-y: hidden;
    gap: 0.4rem;
    flex-wrap: nowrap;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .tab-container::-webkit-scrollbar {
    display: none;
  }

  .tab-pill {
    padding: 0.5rem 1.1rem;
    font-size: 0.8rem;
    flex-shrink: 0;
  }

  .empty-section {
    padding: 4rem 1rem;
    min-height: 300px;
  }

  .empty-text {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .experience-page {
    padding-top: 150px;
  }

  .tab-container {
    padding: 0.6rem 0.875rem;
    gap: 0.35rem;
  }

  .tab-pill {
    padding: 0.45rem 0.9rem;
    font-size: 0.78rem;
  }
}
</style>
