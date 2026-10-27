<script setup lang="ts">
import { Motion } from 'motion-v'
import OPSDotnetDev from './OPSDotnetDev.vue';

const emit = defineEmits<{
  (e: 'item-click', item: any): void
}>()

const jobs = [
  {
    position: 'Design Director',
    company: 'Zainematics',
    location: 'Lahore, Pakistan',
    date: 'Sep 2022 - Dec 2022',
    duration: '4 months',
    employmentType: 'Full-Time',
    type: 'Arts Internship',
    current: false,
    description: '',
    responsibilities: [ ''],
    technologies: ['Sony ZV-E10', 'Dji Ronin', 'Adobe Creative Suite', 'Affinity Designer', 'After Effects', 'Davinci Resolve', 'Blender'],
    achievements: [ '' ],
    image: '/images/ThumbnailZainematics.png',
    buttons: [
      { label: 'My Digital Portfolio', url: 'https://drive.google.com/file/d/1fex-y7cQ5nDl3tTRKRzx0cr0foUuy36K/view' }
    ]
  },
  {
    position: 'Head of Media Production',
    company: 'International School Lahore',
    location: 'Lahore, Pakistan',
    date: 'Nov 2020 - May 2022',
    duration: '1 year 7 months',
    employmentType: 'Full-Time',
    type: 'Arts Internship',
    current: false,
    description: '',
    responsibilities: [ ''],
    technologies: ['Sony ZV-E10', 'Dji Mini 2', 'Dji Osmo', 'Dji Ronin', 'Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Blender', 'Affinity Designer'],
    achievements: ['' ],
    image: '/images/isl.png',
    buttons: [
      { label: 'My Digital Portfolio', url: 'https://drive.google.com/file/d/1fex-y7cQ5nDl3tTRKRzx0cr0foUuy36K/view' }
    ]
  }
]

// Group jobs by type
const artsJobs = jobs.filter(job => job.type === 'Arts Internship')
</script>

<template>
  <div class="internships-section">
    <!-- Featured Internship -->
    <h2 class="cs-section-title">Software Engineering</h2>
    <OPSDotnetDev @click="emit('item-click', $event)" />
    <UTSJuniorSWE @click="emit('item-click', $event)" />


    <!-- Arts Internships -->
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3, delay: 0.15 }"
    >
      <h2 class="cs-section-title section-title-spaced">Design & Media</h2>
      <div class="internships-grid">
        <Motion
          v-for="(job, index) in artsJobs"
          :key="index"
          :initial="{ opacity: 0, y: 15 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, delay: 0.2 + index * 0.1 }"
          class="cs-card cs-card--overlay"
          @click="emit('item-click', job)"
        >
          <div v-if="job.image" class="cs-card-image">
            <img :src="job.image" :alt="job.company" loading="lazy" />
            <div class="cs-card-image-fade"></div>
          </div>
          <div class="cs-card-content">
            <span class="cs-category-label">{{ job.type }}</span>
            <h3 class="cs-card-title">{{ job.position }}</h3>
            <p class="cs-card-subtitle">{{ job.company }}</p>
            <div class="job-meta">
              <span class="job-meta-item"><Icon name="heroicons:map-pin-20-solid" class="meta-icon" /> {{ job.location }}</span>
              <span class="job-meta-item"><Icon name="heroicons:calendar-20-solid" class="meta-icon" /> {{ job.date }}</span>
            </div>
            <div class="cs-tech-list">
              <span v-for="(tech, i) in job.technologies.slice(0, 3)" :key="i" class="cs-tech-tag">{{ tech }}</span>
              <span v-if="job.technologies.length > 3" class="cs-more-tag">+{{ job.technologies.length - 3 }}</span>
            </div>
          </div>
        </Motion>
      </div>
    </Motion>

    <!-- Certifications -->
    <div class="certs-wrapper">
      <h2 class="cs-section-title section-title-spaced">Certifications</h2>
      <SkillsCertsSection />
    </div>
  </div>
</template>

<style scoped>
.internships-section { padding: 0; }
.certs-wrapper { margin-top: 3.5rem; }

.section-title-spaced { margin-top: 3.5rem; }

.internships-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

/* Location / date meta row inside card */
.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}

.job-meta-item {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.meta-icon {
  width: 13px;
  height: 13px;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .internships-grid { grid-template-columns: 1fr; gap: 0.875rem; margin-bottom: 2.5rem; }
  .section-title-spaced { margin-top: 2.75rem; }
}
</style>
