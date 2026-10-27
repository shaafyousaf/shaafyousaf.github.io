<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'

const hackathons = [
  {
    event: 'Hack the 6ix 2026 (Toronto)',
    title: 'Rocky',
    subtitle: 'Unbeatable rock-paper-scissors robot with live gesture tracking.',
    description: 'A Raspberry Pi robot that plays rock paper scissors and never loses. Live camera feed runs through MediaPipe Hands for landmark tracking, a rule-based classifier locks in rock/paper/scissors after a stability check, then the backend picks the winning counter-move and drives GPIO/servo hardware while a real-time web UI stays in sync with the game loop.',
    prize: 'Built at Hack the 6ix',
    won: false,
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Raspberry Pi', 'GPIO', 'QNX', 'ElevenLabs'],
    buttons: [
      { label: 'DevPost', url: 'https://devpost.com/software/rocky-unbeatable-at-rps' },
      { label: 'GitHub', url: 'https://github.com/chantalzhang/ht62026' }
    ],
    image: '/images/rocky_hackthe6ix.jpg'
  },
  {
    event: 'OpenAI to Z Challenge 2025 (Kaggle, Global)',
    title: 'Lost City of Z',
    subtitle: 'Rediscovering Ancient Civilizations Across Earth',
    description: 'A submission to OpenAI\'s Kaggle-hosted "to Z Challenge," searching for undiscovered archaeological sites in the Amazon. The workflow fetches satellite imagery from Google Earth Engine, cross-references it against existing vector data, and prompts GPT-4.1\'s image model to flag anomalous surface features worth investigating as potential lost settlements.',
    prize: 'Built for OpenAI to Z Challenge',
    won: false,
    tech: ['Python', 'Jupyter Notebook', 'OpenAI GPT-4.1', 'Google Earth Engine'],
    buttons: [
      { label: 'Kaggle Writeup', url: 'https://www.kaggle.com/competitions/openai-to-z-challenge/writeups/multisource-anomaly-detection-workflow' },
      { label: 'GitHub', url: 'https://github.com/shaafyousaf/OpenAI-to-Z-challenge' }
    ],
    image: '/resources/openaitoz.png'
  },
  {
    event: 'GenAI Genesis 2025 (Toronto)',
    title: 'imagEHR',
    subtitle: 'AI-Powered Clinical Data Extraction & CDISC Mapping',
    description: 'Automates the extraction of EHR (text) and X-ray (image) data, then maps it to CDISC-compliant SDTM formats for streamlined research, clinical trials, and regulatory use.',
    prize: 'Google & HBSU Best Healthcare AI Hack',
    won: true,
    tech: ['Python', 'Flask', 'Cohere LLM', 'YOLOv5', 'JavaScript'],
    buttons: [
      { label: 'DevPost', url: 'https://devpost.com/software/imagehr' }
    ],
    image: '/images/genai_imagehr_wid_c.jpg'
  },
  {
    event: 'DaVinci Competition 2026 (Toronto)',
    title: 'idrak',
    subtitle: 'Early MVP for a Real-time assistant for context-aware visual tasks.',
    description: 'A camera-based assistant engine that builds temporal context from live video, enabling real-time visual guidance, safety warnings, and step-by-step assistance for hands-on tasks.',
    prize: '1st Place Overall Winner',
    won: true,
    tech: ['Python', 'TypeScript', 'Vue', 'FastAPI', 'OpenCV', 'Anthropic', 'Whisper'],
    buttons: [
      { label: 'DevPost', url: 'https://devpost.com/software/idrak' }
    ],
    image: '/images/BannerLinkedin.png'
  }
]

const sortedHackathons = computed(() => {
  return [...hackathons].sort((a, b) => Number(b.won !== false) - Number(a.won !== false))
})

const emit = defineEmits<{
  (e: 'item-click', item: any): void
}>()
</script>

<template>
  <div class="published-hackathons-section">
    <!-- Published Software Section -->
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3, delay: 0.1 }"
    >
      <h2 class="cs-section-title">Published Software</h2>
      <div class="featured-project-wrapper">
        <FeaturedProject @click="emit('item-click', $event)" />
      </div>
    </Motion>

    <!-- Hackathons Section -->
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3, delay: 0.2 }"
    >
      <h2 class="cs-section-title section-title-spaced">Hackathons</h2>
      <div class="hackathons-grid">
        <Motion
          v-for="(hack, index) in sortedHackathons"
          :key="'hack-' + index"
          :initial="{ opacity: 0, y: 15 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, delay: 0.25 + index * 0.1 }"
          :class="['hackathon-card', { 'is-win': hack.won !== false }]"
          @click="emit('item-click', hack)"
        >
          <div class="prize-header">
            <Icon
              :name="hack.won !== false ? 'heroicons:trophy-20-solid' : 'heroicons:code-bracket-20-solid'"
              class="trophy-icon"
            />
            <span class="prize-text">{{ hack.prize }}</span>
          </div>
          <div class="hack-body">
            <img v-if="hack.image" :src="hack.image" :alt="hack.title" loading="lazy" class="hack-bg-img" />
            <div class="hack-overlay"></div>
            <div class="hack-content">
              <h3 class="hack-title">{{ hack.title }}</h3>
              <p class="hack-event">{{ hack.event }}</p>
              <p class="hack-subtitle">{{ hack.subtitle }}</p>
              <div class="hack-tech-list">
                <span v-for="(tech, i) in hack.tech.slice(0, 3)" :key="i" class="hack-tech-tag">{{ tech }}</span>
                <span v-if="hack.tech.length > 3" class="hack-more-tag">+{{ hack.tech.length - 3 }}</span>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </Motion>
  </div>
</template>

<style scoped>
.published-hackathons-section { padding: 0; }

.section-title-spaced { margin-top: 3.5rem; }

.featured-project-wrapper {
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.hackathons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.hackathon-card {
  background: linear-gradient(145deg, #161616 0%, #0d0d0d 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.hackathon-card.is-win {
  border-color: rgba(255, 215, 0, 0.35);
}

.hackathon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
  border-color: rgba(255, 255, 255, 0.18);
}

.hackathon-card.is-win:hover {
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.12);
  border-color: rgba(255, 215, 0, 0.6);
}

/* Prize strip */
.prize-header {
  background: rgba(255, 255, 255, 0.06);
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.hackathon-card.is-win .prize-header {
  background: linear-gradient(135deg, #ffd700, #ff8c00);
}

.trophy-icon {
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
}

.hackathon-card.is-win .trophy-icon {
  color: #000000;
}

.prize-text {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: -0.2px;
}

.hackathon-card.is-win .prize-text {
  color: #000000;
}

/* Image + content overlay body */
.hack-body {
  position: relative;
  flex: 1;
  min-height: 200px;
  overflow: hidden;
}

.hack-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.hackathon-card:hover .hack-bg-img { transform: scale(1.04); }

.hack-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.92) 100%);
  pointer-events: none;
}

/* Card body */
.hack-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.1rem 1.1rem;
}

.hack-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #ffffff;
  margin-bottom: 0.2rem;
  line-height: 1.25;
}

.hack-event {
  font-family: 'Nexa', sans-serif;
  font-weight: 500;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hack-subtitle {
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.hack-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.hack-tech-tag {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.65);
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 0.68rem;
  padding: 0.22rem 0.5rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hack-more-tag {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.45);
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.68rem;
  padding: 0.22rem 0.5rem;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .section-title-spaced { margin-top: 2.75rem; }
  .hackathons-grid { grid-template-columns: 1fr; gap: 0.875rem; margin-bottom: 2.5rem; }
}
</style>
