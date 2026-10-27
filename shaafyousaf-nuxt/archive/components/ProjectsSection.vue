<script setup lang="ts">
import { ref, computed } from 'vue'
import { Motion } from 'motion-v'

const guiProjects = [
  {
    title: 'My Ugly Links',
    subtitle: 'A Home for Every Ugly URL You Can\'t Remember',
    category: 'Chrome Extension',
    badge: 'GUI',
    badgeClass: 'gui',
    date: '2026-06-29',
    image: '/images/my_ugly_links.png',
    description: 'A Chrome extension for saving and instantly launching the ugly links you can never remember — localhost ports, internal IPs, and long institutional URLs. Save any link from the toolbar, search and filter as you type, and launch it back with one click.',
    tech: ['JavaScript', 'Chrome Extension (Manifest V3)', 'HTML/CSS'],
    buttons: [
      { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/my-ugly-links/aohjhgogkcbgkdkpljpgeimpmdcdedhn' }
    ]
  },
  {
    title: 'GLOW',
    subtitle: 'Water Temperature Observation MVC Application',
    category: 'Production Web Application',
    badge: 'GUI',
    badgeClass: 'gui',
    date: '2025-05-17',
    image: '/resources/GLOW.png',
    description: 'A production-grade MVC web application for observing and tracking water temperature data. Built with a Next.js frontend and an Express/MongoDB backend, with automated testing in Jest and a full CI/CD pipeline using GitHub Actions and Docker, deployed on Render.',
    tech: ['JavaScript', 'Next.js', 'Express Backend', 'MongoDB', 'Jest', 'GitHub Actions', 'Docker', 'Render'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/UTSC-CSCC01-Software-Engineering-I/GLOW-WebApp.git' }
    ]
  },
  {
    title: 'Planetze',
    subtitle: 'Track and Reduce Your Carbon Footprint',
    category: 'Android App',
    badge: 'GUI',
    badgeClass: 'gui',
    date: '2024-11-05',
    image: '/images/planetzeandroidstudiosc.png',
    description: 'An Android application that helps users measure, track, and reduce their carbon footprint. Developed in Java with Android Studio, with unit testing in JUnit, a recorded demo, and full project documentation.',
    tech: ['Java', 'Android Studio', 'JUnit'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/KrishnaManamohan/B07FinalProject' },
      { label: 'Demo Video', url: 'https://www.youtube.com/watch?v=kPucqKiZSr8' },
      { label: 'Documentation', url: 'https://docs.google.com/document/d/1E8K7M2KeTI2QX76r0JHJFt2Dfh2fHfJYNujhZVbhaYI/edit?tab=t.0#heading=h.wkfbqc178vg8' }
    ]
  },
  {
    title: 'Zarab Collections',
    subtitle: 'An Online Clothing Brand in Pakistan',
    category: 'Production Web Application',
    badge: 'GUI',
    badgeClass: 'gui',
    date: '2025-06-21',
    image: '/resources/Zarab.png',
    description: 'A live e-commerce platform for a clothing brand based in Pakistan. Built with TypeScript and Next.js on top of Supabase and PostgreSQL, containerized with Docker, and deployed to a DigitalOcean Droplet with CI/CD through GitHub Actions.',
    tech: ['TypeScript', 'Next.js', 'SupaBase', 'PostgreSQL', 'GitHub Actions', 'Docker', 'Digital Ocean\'s (Droplet)'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/ShaafPlayz/farah-faiza' }
    ]
  },
  {
    title: 'Parsea',
    subtitle: 'A Tool That Reads My Inbox And Saves Me Time',
    category: 'Windows/MacOS App',
    badge: 'GUI',
    badgeClass: 'gui',
    date: '2025-06-16',
    image: '/resources/showcase.gif',
    description: 'A cross-platform desktop app that connects to an email inbox over IMAP and uses the Cohere LLM to parse, summarize, and surface what matters. Built with Electron for Windows and macOS.',
    tech: ['JavaScript', 'Electron', 'Cohere LLM', 'IMAP Protocol'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/ShaafPlayz/Parsea.git' }
    ]
  }
]

const backendProjects = [
  {
    title: 'Server Observer Utility',
    subtitle: 'Server Monitoring & Alerting Tool',
    category: 'API',
    badge: 'Backend',
    badgeClass: 'backend',
    date: '2026-02-17',
    image: '/homelab/sou.png',
    description: 'A server monitoring and alerting API built with C# and ASP.NET Core. Containerized with Docker and continuously built and deployed with GitHub Actions and a self-hosted runner.',
    tech: ['C#', 'ASP.NET Core', 'Docker', 'Github Actions & Runner'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/shaafyousaf/Server-Observer-Utility' }
    ]
  }
]

const infraProjects = [
  {
    title: 'The Great Library',
    subtitle: 'A Self-Hosted Home Server Built From Repurposed Hardware',
    category: 'Home Server',
    badge: 'Infra',
    badgeClass: 'infra',
    date: '2025-09-01',
    image: '/images/homeserveroldPic_Small.png',
    description: 'A 24/7 home server ("the-great-library") running on repurposed hardware, used as a production playground for real infrastructure. Publishes services through a Cloudflare Zero Trust Tunnel and Nginx reverse proxy with no exposed ports, stores everything on a Samba network drive, and stays reachable remotely over a WireGuard VPN with DuckDNS — all monitored live with Glances and a custom-built Server Observer Utility.',
    tech: ['Ubuntu Server', 'Docker', 'Nginx', 'Cloudflare Tunnel', 'WireGuard VPN', 'Samba', 'Glances'],
    buttons: [
      { label: 'View Homelab', url: '/homelab' }
    ]
  },
  {
    title: 'Self-Hosted File Vault',
    subtitle: 'Automated Google Drive Sync & Personal Knowledge Base',
    category: 'Self-Hosted Service',
    badge: 'Infra',
    badgeClass: 'infra',
    date: '2025-10-01',
    image: '/homelab/networkTopology.png',
    description: 'A self-hosted file server and personal knowledge base running on the homelab. Files sync automatically from Google Drive every 60 seconds via rclone, a GitHub Actions self-hosted runner auto-deploys config changes on push, and HTML/PDF files are auto-wrapped into browsable pages served through MkDocs and Nginx.',
    tech: ['Ubuntu Server', 'Docker', 'MkDocs', 'Nginx', 'rclone', 'GitHub Actions', 'Python', 'Google Drive'],
    buttons: [
      { label: 'Vault (Temporarily Offline)', url: 'https://vault.shaafyousaf.com' },
      { label: 'Files', url: 'https://files.shaafyousaf.com' }
    ]
  }
]

const cliProjects = [
  {
    title: 'Halo Pixel Edition',
    subtitle: 'A Classic Reimagined in MIPS Assembly',
    category: 'RICS MIPS GAME',
    badge: 'CLI/Retro',
    badgeClass: 'cli',
    date: '2025-03-15',
    image: '/images/gffe.png',
    description: 'A pixel-art reimagining of Halo written entirely in MIPS assembly and run on the MARS MIPS simulator — handling rendering, input, and game logic at the instruction level.',
    tech: ['Assembly', 'MARS MIPS Simulator'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/ShaafPlayz/Halo-Pixel-Edition' }
    ]
  },
  {
    title: 'Hawkeye',
    subtitle: 'Advanced UNIX System Monitoring',
    category: 'Command Line Tool',
    badge: 'CLI/Retro',
    badgeClass: 'cli',
    date: '2025-02-08',
    image: '/images/hawkeye.png',
    description: 'A command-line system monitoring tool for UNIX written in C, reporting live system metrics directly in the terminal.',
    tech: ['C', 'UNIX'],
    buttons: [
      { label: 'GitHub', url: 'https://github.com/ShaafPlayz/System-Monitoring-Tool-Unix' }
    ]
  }
]

const allProjects = [...backendProjects, ...guiProjects, ...cliProjects, ...infraProjects]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'gui', label: 'GUI' },
  { id: 'backend', label: 'Backend' },
  { id: 'cli', label: 'CLI/Retro' },
  { id: 'infra', label: 'Infra' }
]

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' }
]

const activeCategory = ref('all')
const sortOrder = ref<'newest' | 'oldest'>('newest')

const filteredProjects = computed(() => {
  const filtered = activeCategory.value === 'all'
    ? [...allProjects]
    : allProjects.filter(p => p.badgeClass === activeCategory.value)

  return filtered.sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime()
    return sortOrder.value === 'newest' ? -diff : diff
  })
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const emit = defineEmits<{
  (e: 'item-click', item: any): void
}>()
</script>

<template>
  <div class="projects-section">
    <div class="filter-bar">
      <div class="filter-group">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['filter-pill', { active: activeCategory === cat.id }]"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="sort-group">
        <button
          v-for="opt in sortOptions"
          :key="opt.id"
          :class="['sort-pill', { active: sortOrder === opt.id }]"
          @click="sortOrder = opt.id as 'newest' | 'oldest'"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <div class="projects-list">
      <Motion
        v-for="(project, index) in filteredProjects"
        :key="project.title"
        :initial="{ opacity: 1, y: 20 }"
        :transition="{ duration: 0.35, delay: 0.05 + index * 0.06 }"
        class="cs-card"
        @click="emit('item-click', project)"
      >
        <div class="cs-card-image">
          <img :src="project.image" :alt="project.title" loading="lazy" />
          <div class="cs-card-image-fade"></div>
          <div class="image-overlay">
            <span class="date-label">{{ formatDate(project.date) }}</span>
          </div>
        </div>

        <div class="cs-card-content">
          <span class="cs-category-label">{{ project.category }}</span>
          <h3 class="cs-card-title">{{ project.title }}</h3>
          <p class="cs-card-subtitle">{{ project.subtitle }}</p>
          <p class="cs-card-description">{{ project.description }}</p>

          <div class="cs-tech-list">
            <span v-for="(tech, i) in project.tech.slice(0, 3)" :key="i" class="cs-tech-tag">{{ tech }}</span>
            <span v-if="project.tech.length > 3" class="cs-more-tag">+{{ project.tech.length - 3 }}</span>
          </div>

          <div class="cs-action-list">
            <a
              v-for="(btn, i) in project.buttons"
              :key="i"
              :href="btn.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="['cs-action-link', { primary: i === 0 }]"
              @click.stop
            >
              {{ btn.label }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.projects-section {
  padding: 0;
  padding-bottom: 5rem;
}

/* Filter / Sort Bar */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.filter-group,
.sort-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill,
.sort-pill {
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  color: #555555;
  background: #f2f2f2;
  border: 1.5px solid transparent;
  border-radius: 50px;
  padding: 0.45rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-pill:hover,
.sort-pill:hover {
  background: #e8e8e8;
  color: #000000;
}

.filter-pill.active {
  background: #000000;
  color: #ffffff;
}

.sort-pill.active {
  background: #5c5c5c;
  color: #ffffff;
}

.sort-group {
  padding-left: 1rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

/* Grid */
.projects-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* ─── Professional / understated card overrides ─── */

/* Kill the flashy gold glow pseudo-element */
.projects-list :deep(.cs-card::after) { display: none; }

/* Flat hover — border brightens, no lift, no shadow drama */
.projects-list :deep(.cs-card) {
  transition: border-color 0.2s ease, background 0.2s ease;
  border-radius: 14px;
}
.projects-list :deep(.cs-card:hover) {
  transform: none;
  box-shadow: none;
  border-color: rgba(255, 255, 255, 0.22);
  background: linear-gradient(145deg, #1c1c1c 0%, #111111 100%);
}

/* Shorter image, no zoom on hover */
.projects-list :deep(.cs-card-image) { height: 150px; }
.projects-list :deep(.cs-card:hover .cs-card-image img) { transform: none; }

/* Tighter body */
.projects-list :deep(.cs-card-content) {
  padding: 1.1rem 1.25rem 1.25rem;
}

/* Category label — smaller, quieter */
.projects-list :deep(.cs-category-label) {
  font-size: 0.63rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.28);
}

/* Title — tighter */
.projects-list :deep(.cs-card-title) {
  font-size: 1.05rem;
  letter-spacing: -0.2px;
  margin-bottom: 0.4rem;
}

/* Subtitle — no gold, just a muted secondary tone */
.projects-list :deep(.cs-card-subtitle) {
  font-size: 0.78rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.75rem;
}

/* Description — 2-line clamp, small and readable */
.projects-list :deep(.cs-card-description) {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.6;
  margin-bottom: 1rem;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Tech tags — flatter, no border change on hover */
.projects-list :deep(.cs-tech-list) { margin-bottom: 1rem; gap: 0.3rem; }
.projects-list :deep(.cs-tech-tag) {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.5);
}
.projects-list :deep(.cs-card:hover .cs-tech-tag) { border-color: rgba(255, 255, 255, 0.09); }
.projects-list :deep(.cs-more-tag) {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  color: rgba(255, 255, 255, 0.35);
}

/* Action links — plain text style, no pill */
.projects-list :deep(.cs-action-link) {
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.2);
}
.projects-list :deep(.cs-action-link:hover) {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  text-decoration-color: rgba(255, 255, 255, 0.5);
}
.projects-list :deep(.cs-action-link.primary) {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
}
.projects-list :deep(.cs-action-link.primary:hover) {
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
}

/* Image overlay labels */
.image-overlay {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  z-index: 2;
  pointer-events: none;
}


.date-label {
  font-family: 'Nexa', sans-serif;
  font-weight: 500;
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 0.22rem 0.55rem;
}

/* Responsive */
@media (max-width: 1100px) {
  .projects-list { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .projects-list { grid-template-columns: 1fr; gap: 0.85rem; }
  .filter-bar { flex-direction: column; align-items: flex-start; }
  .sort-group { padding-left: 0; border-left: none; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.1); width: 100%; }
  .image-overlay { top: 0.55rem; right: 0.55rem; }
}
</style>
