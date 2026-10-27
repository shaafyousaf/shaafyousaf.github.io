<script setup lang="ts">
import { Motion } from 'motion-v'

// Emit for click events
const emit = defineEmits<{
  (e: 'click', job: any): void
}>()

// Featured internship data
const featuredJob = {
  position: 'Junior Software Developer',
  company: 'University of Toronto Schools',
  location: 'Toronto, ON',
  date: 'Sep 2025 - Apr 2026',
  current: false,
  image: '/images/open-house-blog-thumbnail.jpg',
  type: 'SWE Internships',
  duration: '8 months',
  employmentType: 'Full-Time',
  description: 'Spent my first co-op term at University of Toronto Schools inheriting two legacy ASP.NET applications that staff and students relied on daily. I rebuilt both from the ground up, migrating REST backends to GraphQL using HotChocolate and EF Core, and redesigning the frontends in Blazor with MudBlazor. The Asset Tracker was the bigger challenge, requiring Windows Authentication with JWT issuance, careful partial update logic against the database, and fixing the daily data persistence failures the IT department had just accepted as normal. Nomenclatura Porta, a chemistry practice app, had a deeply tangled relational data model that took two weeks just to understand before I could write a single optimized query. I also added a leaderboard nobody asked for, and it ended up being the feature students liked most.  By the end of the term I was building new systems from scratch. The Ticketing System handled the full lifecycle of IT support tickets, with a drag-and-drop Kanban board, assignee management, ticket detail modals with conversation history, and real-time status updates streamed over SignalR WebSockets. On top of that I designed a Plugin Architecture that let new modules be loaded into the system independently without modifying core application code, keeping the codebase extensible as requirements grew.',
  responsibilities: [],
  technologies: ['.NET', 'C#', 'Blazor Framework', 'WebSockets (SignalR)', 'Plugin Architecture', 'GraphQL (Hot Chocolate)', 'SQL Server', 'SSMS (SQL Server Management Studio)', 'LinQPad', 'Azure DevOps', 'REST APIs'],
  achievements: [],
  buttons: [
    { label: 'My Work Part 1 (of 2)', url: 'https://files.shaafyousaf.com/UTS%20-%20Sep%2025%20to%20Apr%2026/home_artifact-number-1-asset-tracker.html' },
        { label: 'temporarily unavailable - My Work Part 2 (of 2)' }

  ]
}

const overlayImage = '/optimized/resources/blackSideOverlayGradient.webp'

const handleClick = () => {
  emit('click', featuredJob)
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }"
    :while-in-view="{ opacity: 1, filter: 'blur(0px)', scale: 1 }"
    :transition="{ duration: 0.5, delay: 0.1 }"
    class="featured-internship"
    @click="handleClick"
  >
    <!-- Background Image -->
    <div class="featured-background">
      <img 
        :src="featuredJob.image" 
        alt="Background" 
        class="background-image"
      />
      <img 
        :src="overlayImage" 
        alt="Overlay" 
        class="gradient-overlay"
      />
    </div>

    <!-- Content -->
    <div class="featured-content">
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <h2 class="featured-position">{{ featuredJob.position }}</h2>
      </Motion>
      
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.25 }"
      >
        <p class="featured-company">{{ featuredJob.company }}</p>
      </Motion>

      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 10 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        class="featured-meta"
      >
        <span class="featured-date">{{ featuredJob.date }}</span>
      </Motion>
    </div>
  </Motion>
</template>

<style scoped>
.featured-internship {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 3rem;
}

.featured-internship:hover {
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
  object-position: 0 100%;
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

.featured-position {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin-bottom: 0;
  text-transform: none;
}

.featured-company {
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
}

.featured-date {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #cccccc;
}

.featured-badge {
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  color: #000000;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .featured-internship {
    height: 240px;
    margin-bottom: 2.5rem;
  }

  .featured-content {
    padding: 1.5rem;
  }

  .featured-position {
    font-size: 1.8rem;
  }

  .featured-company {
    font-size: 1rem;
  }

  .featured-date {
    font-size: 0.9rem;
  }

  .featured-badge {
    font-size: 0.7rem;
    padding: 0.3rem 0.7rem;
  }
}

@media (max-width: 480px) {
  .featured-internship {
    height: 200px;
  }

  .featured-position {
    font-size: 1.5rem;
  }

  .featured-company {
    font-size: 0.95rem;
  }
}
</style>
