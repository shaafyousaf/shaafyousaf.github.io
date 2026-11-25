<script setup lang="ts">
useHead({
  title: 'Shaaf Yousaf',
  meta: [
    { name: 'description', content: "Hi, I'm Shaaf. I write software across the stack, from bare-metal code to self-hosted infrastructure." },
    // Global config uses initial-scale=0.9; this page is laid out for 1:1
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

const email = 'shaaf.yousaf@mail.utoronto.ca'

/* ---------- HomeLab: live status from the server's observer endpoint ---------- */

const PING_INTERVAL_SECS = 60
const serverConnected = ref(false)
const uptime = ref('--')
const secondsUntilNextPing = ref(PING_INTERVAL_SECS)

let pollingTimer: ReturnType<typeof setInterval> | null = null
let countdownTimer: ReturnType<typeof setInterval> | null = null

async function checkServer() {
  secondsUntilNextPing.value = PING_INTERVAL_SECS
  try {
    const response = await fetch('https://the-great-server.shaafyousaf.com/Observer')
    serverConnected.value = response.ok && (await response.text()).includes('All Systems Nominal.')
  } catch {
    serverConnected.value = false
  }
  if (serverConnected.value) uptime.value = 'Connected to Server-Observer-Utility'
}

onMounted(async () => {
  await checkServer()
  pollingTimer = setInterval(checkServer, PING_INTERVAL_SECS * 1000)
  countdownTimer = setInterval(() => {
    if (secondsUntilNextPing.value > 0) secondsUntilNextPing.value--
  }, 1000)
})

onUnmounted(() => {
  if (pollingTimer) clearInterval(pollingTimer)
  if (countdownTimer) clearInterval(countdownTimer)
})

/* ---------- Experience: a briefing per role, no photos ---------- */

const jobs = [
  {
    dates: 'May 2026 to present',
    role: '.NET Developer',
    org: 'Ontario Government',
    brief: "I work on the shared framework behind several of Ontario's education apps, and I built a test tool that lets QA write tests in plain English instead of code.",
    stack: ['C#', '.NET', 'Angular', 'TypeScript', 'Playwright', 'Azure'],
    url: 'https://utsccoopshaaf.vercel.app/',
  },
  {
    dates: 'Sep 2025 to Apr 2026',
    role: 'Junior Software Developer',
    org: 'University of Toronto Schools',
    brief: "I rebuilt two old apps that staff and students use every day, and built the school's IT ticketing system from scratch.",
    stack: ['C#', '.NET', 'Blazor', 'GraphQL', 'EF Core', 'SignalR', 'SQL Server'],
    url: 'https://files.shaafyousaf.com/UTS%20-%20Sep%2025%20to%20Apr%2026/home_artifact-number-1-asset-tracker.html',
  },
]

const skills = [
  { label: 'Languages', value: 'C#, TypeScript, JavaScript, Python, SQL, C' },
  { label: 'Frameworks', value: '.NET, ASP.NET Core, EF Core, Blazor, GraphQL, Angular, Vue.js, Next.js, Flask, Playwright, WebSockets' },
  { label: 'Databases', value: 'SQL Server, PostgreSQL, Oracle SQL, MongoDB' },
  { label: 'Tools', value: 'Git, Docker, GitHub Actions, Azure DevOps, Nginx, Proxmox, Ubuntu Server' },
]

/* ---------- Projects ---------- */

const projects = [
  {
    name: 'Parsea',
    text: 'Reads my inbox over IMAP and sorts job applications into interviews, offers and rejections.',
    stack: 'Electron, Cohere',
    image: '/resources/parseaimg.png',
    url: 'https://github.com/ShaafPlayz/Parsea.git',
  },
  {
    name: 'Planetze',
    text: 'An Android app that tracks your carbon footprint and suggests habits to cut it. Built by a five-person Scrum team.',
    stack: 'Java, Android, Firebase',
    image: '/images/pla2.jpeg',
    url: 'https://github.com/KrishnaManamohan/B07FinalProject',
  },
  {
    name: 'Halo Pixel Edition',
    text: 'Halo, written entirely in MIPS assembly.',
    stack: 'MIPS, MARS simulator',
    image: '/images/gffe.png',
    url: 'https://github.com/ShaafPlayz/Halo-Pixel-Edition',
  },
]

/* ---------- Hackathons: one labelled record each ---------- */

const wins = [
  {
    id: 'idrak',
    result: '1st place overall',
    project: 'idrak',
    event: 'DaVinci Competition 2026',
    line: 'A camera-based assistant that guides you through hands-on tasks in real time.',
    image: '/images/BannerLinkedin.png',
    url: 'https://devpost.com/software/idrak',
  },
  {
    id: 'imagehr',
    result: 'Best Healthcare AI Hack',
    project: 'imagEHR',
    event: 'GenAI Genesis 2025',
    line: 'Turns EHR text and X-rays into standard clinical data, a job that takes 6 to 8 weeks by hand.',
    image: '/images/genai_imagehr_wid_c.jpg',
    url: 'https://devpost.com/software/imagehr',
  },
]
</script>

<template>
  <div class="page">
    <Starfield />
    <SiteNav />
    <SiteHero />

    <main class="main">
      <!-- ============ Experience ============ -->
      <section id="experience" class="wrap group">
        <div class="experience">
          <h2 class="group-title group-title--center">Experience</h2>

          <!-- A launch sequence read top-down: the current role is the rocket in
               flight, past roles are satellites it left in orbit, and Skills is the
               launch pad the trail rises from. Dates left, trail middle, role right. -->
          <ol class="jobs">
            <li
              v-for="job in jobs"
              :key="job.org"
              class="job"
              :class="{ 'job--current': job.dates.endsWith('present') }"
            >
              <span class="job-marker" aria-hidden="true">
                <svg v-if="job.dates.endsWith('present')" class="rocket" viewBox="0 0 24 24">
                  <path class="rocket-flame" d="M10.2 18.5c0 1.9.8 3.4 1.8 4 1-.6 1.8-2.1 1.8-4z" />
                  <path class="rocket-body" d="M12 1.5c2.9 2.4 4.4 5.9 4.4 9.9v5.6H7.6v-5.6c0-4 1.5-7.5 4.4-9.9z" />
                  <circle class="rocket-window" cx="12" cy="9" r="1.7" />
                  <path class="rocket-body" d="M7.6 12.6 4.8 15.8v3.4l2.8-1.7zM16.4 12.6l2.8 3.2v3.4l-2.8-1.7z" />
                </svg>
                <svg v-else class="satellite" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                  <path d="M1.5 9.5h5.5v5H1.5zM17 9.5h5.5v5H17zM4.25 9.5v5M19.75 9.5v5M7 12h2M15 12h2M12 9V5.5" />
                  <circle class="satellite-beacon" cx="12" cy="4.2" r="1.3" />
                </svg>
              </span>
              <p class="job-dates">
                {{ job.dates }}
                <span v-if="job.dates.endsWith('present')" class="job-status">In flight</span>
              </p>
              <div class="job-body">
                <h3 class="job-role">{{ job.role }}</h3>
                <p class="job-org">{{ job.org }}</p>
                <p class="job-brief">{{ job.brief }}</p>
                <ul class="chips" aria-label="Built with">
                  <li v-for="tool in job.stack" :key="tool">{{ tool }}</li>
                </ul>
                <a :href="job.url" target="_blank" rel="noopener" class="link job-link">
                  Work sample <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
                </a>
              </div>
            </li>

            <li class="job job--skills">
              <span class="job-marker" aria-hidden="true">
                <svg class="launchpad" viewBox="0 0 24 24">
                  <path d="M2.5 21.5h19M6 21.5V4M9.5 21.5V4M6 8l3.5-3M6 12.5 9.5 9M6 17l3.5-3.5M9.5 8.5H14M12.5 21.5v-3.5h6.5v3.5" />
                </svg>
              </span>
              <h3 class="job-dates">Skills</h3>
              <dl class="record job-body">
                <div v-for="row in skills" :key="row.label">
                  <dt>{{ row.label }}</dt>
                  <dd>
                    <ul class="chips">
                      <li v-for="item in row.value.split(', ')" :key="item">{{ item }}</li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </li>
          </ol>
        </div>
      </section>

      <!-- ============ Projects ============ -->
      <section id="projects" class="wrap group">
        <h2 class="group-title">Projects</h2>

        <div class="banners">
          <ProjectBanner
            id="slowed-enhanced"
            title="Slowed Enhanced"
            subtitle="An Open Source Google Chrome Extension for Advanced Audio Controls"
            meta="Published on Chrome Web Store"
            :photos="[{ src: '/optimized/images/slowed_enhanced_bg.webp', position: 'center 45%' }]"
            :stats="[
              { value: '2,200+', label: 'Installs' },
              { value: '110+', label: 'Weekly active users' },
              { value: '#14', label: 'Product Hunt' },
            ]"
            :links="[
              { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/mbknnccopgggeedhnloodppflepboggp' },
              { label: 'Source', url: 'https://github.com/shaafyousaf/Slowed-Enhanced' },
              { label: 'Product Hunt', url: 'https://www.producthunt.com/products/slowed-enchanced/launches/slowed-enchanced' },
            ]"
          />

          <ProjectBanner
            id="glow"
            title="GLOW"
            subtitle="A crowdsourced map of water temperatures at Toronto's beaches, built for a client by a four-person Scrum team."
            meta="Client project · Next.js, Express, MongoDB, Docker"
            align-right
            :photos="[{ src: '/images/glow-banner.jpg', position: 'center 95%', brightness: 0.7 }]"
            :stats="[
              { value: '4', label: 'Person team' },
              { value: '4', label: 'Sprints in Jira' },
              { value: '64', label: 'Pull requests' },
              { value: '105', label: 'Commits, most on the team' },
            ]"
            :links="[{ label: 'Source', url: 'https://github.com/UTSC-CSCC01-Software-Engineering-I/GLOW-WebApp' }]"
          />

          <ProjectBanner
            id="homelab"
            title="HomeLab"
            subtitle="The cloud is just someone else's computer. This one's mine."
            hero-title
            :photos="[
              { src: '/optimized/images/homeserveroldPic.webp', position: '0 40%' },
              { src: '/homelab/motherboardimage.jpeg', position: 'center' },
              { src: '/homelab/setupimage.jpeg', position: 'center 30%' },
            ]"
            :stats="[
              { value: '10+', label: 'Self-hosted services' },
              { value: 'CI/CD', label: 'Self-hosted GitHub Actions runner' },
            ]"
            :links="[{ label: 'Read the write-up', url: '/homelab' }]"
          >
            <!-- Only shown while the server answers; /homelab still shows LINK-DOWN -->
            <template v-if="serverConnected" #default>
              <ServerStatusPill
                hostname="the-great-library"
                :server-connected="serverConnected"
                :uptime="uptime"
                :seconds-until-next-ping="secondsUntilNextPing"
                :ping-interval="PING_INTERVAL_SECS"
              />
            </template>
          </ProjectBanner>
        </div>

        <h3 class="sub-title sub-title--spaced">More projects</h3>
        <ul class="projects">
          <li v-for="p in projects" :key="p.name">
            <a :href="p.url" target="_blank" rel="noopener" class="project">
              <span class="project-image"><img :src="p.image" :alt="`${p.name} screenshot`" loading="lazy" /></span>
              <span class="project-name">{{ p.name }} <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" /></span>
              <span class="project-text">{{ p.text }}</span>
              <span class="project-stack">{{ p.stack }}</span>
            </a>
          </li>
        </ul>
      </section>

      <!-- ============ Hackathons ============ -->
      <section id="hackathons" class="wrap group">
        <h2 class="group-title">Hackathon wins</h2>

        <div class="wins">
          <article v-for="w in wins" :id="w.id" :key="w.id" class="win">
            <div class="win-image">
              <img :src="w.image" alt="" loading="lazy" />
            </div>
            <p class="win-result">
              <Icon name="heroicons:trophy-20-solid" class="win-icon" />
              Won {{ w.result }} at {{ w.event }}
            </p>
            <h3 class="win-name">{{ w.project }}</h3>
            <p class="win-line">{{ w.line }}</p>
            <p class="win-foot">
              <a :href="w.url" target="_blank" rel="noopener" class="link">
                Devpost <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
              </a>
            </p>
          </article>
        </div>
      </section>
    </main>

    <!-- ============ Contact ============ -->
    <footer id="contact" class="contact">
      <img src="/images/footer-shuttle.jpg" alt="" class="contact-image" loading="lazy" />
      <div class="contact-shade" aria-hidden="true" />

      <div class="contact-inner">
        <h2 class="contact-title">Say hi.</h2>
        <a :href="`mailto:${email}`" class="contact-email">{{ email }}</a>
        <p class="contact-links">
          <a href="https://linkedin.com/in/shaafyousaf" target="_blank" rel="noopener" class="link">
            LinkedIn <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
          </a>
          <a href="https://github.com/ShaafPlayz" target="_blank" rel="noopener" class="link">
            GitHub <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
          </a>
        </p>

        <p class="credit">
          Made with ❤️ by Shaaf. <a href="https://github.com/ShaafPlayz/shaafplayz.github.io" target="_blank" rel="noopener">Source</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  /* Nexa throughout: Heavy for titles and labels, Light for everything else */
  --font-display: 'Nexa', sans-serif;
  /* Text tiers: what to read first, second, third. Off-white rather than pure
     white so text doesn't glare on black; tier 2 is kept bright because Nexa
     Light is thin. All pass 4.5:1. */
  --text-1: #ededed;
  --text-2: #c8c8c8;
  --text-3: #8a8a8a;
  position: relative;
  color: var(--text-1);
  font-family: var(--font-display);
  font-weight: 300;
}

.page > :deep(header),
.main,
.contact {
  position: relative;
  z-index: 1;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.group {
  padding-top: 4.5rem;
  scroll-margin-top: 1rem;
}

.group-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-1);
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

/* Small labels for groups inside a section */
.sub-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  margin: 0 0 1rem;
}

.sub-title--spaced {
  margin-top: 3rem;
}

/* Labelled lines: the "clear subjects" used across the page */
.record {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 0;
}

.record > div {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  align-items: start;
  gap: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.record dt {
  color: var(--text-2);
  /* Lines the label up with the text in the first row of tags */
  padding-top: 0.25rem;
}

.record dd {
  color: var(--text-1);
  margin: 0;
}

/* ---------- Text link ---------- */

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-1);
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.3);
  text-underline-offset: 0.3em;
  transition: text-decoration-color 0.2s ease;
}

.link:hover {
  color: #fff;
  text-decoration-color: #fff;
}

.link-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* ---------- Experience ---------- */

.experience {
  max-width: 54rem;
  margin: 0 auto;
}

.group-title--center {
  text-align: center;
}

.jobs {
  /* The rail sits halfway across the gap between dates and content */
  --date-col: 12rem;
  --rail-gap: 3.5rem;
  --rail-x: calc(var(--date-col) + var(--rail-gap) / 2);
  position: relative;
  list-style: none;
}

/* The trail, one segment per stop down to the launch pad: hot exhaust right
   under the rocket, cooling to a faint vapour trail further down */
.job:not(.job--skills)::after {
  content: '';
  position: absolute;
  left: calc(var(--rail-x) - 1px);
  top: 1.4rem;
  bottom: -0.6rem;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.22));
}

.job--current::after {
  background: linear-gradient(
    to bottom,
    rgba(255, 179, 71, 0.95) 0%,
    rgba(255, 220, 170, 0.8) 18%,
    rgba(255, 255, 255, 0.4) 100%
  );
}

.job {
  position: relative;
  display: grid;
  grid-template-columns: var(--date-col) 1fr;
  column-gap: var(--rail-gap);
  padding-bottom: 2.5rem;
}

/* Stops on the trail: a rocket for the current role, satellites for past
   ones. The black disc hides the trail behind each icon. */
.job-marker {
  position: absolute;
  left: calc(var(--rail-x) - 14px);
  top: -0.2rem;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #000;
}

.job-marker svg {
  position: relative;
  z-index: 1;
  width: 22px;
  height: 22px;
  overflow: visible;
}

.job--current .job-marker svg {
  width: 26px;
  height: 26px;
}

/* A faint tilted orbit around each satellite */
.job-marker:has(.satellite)::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 46px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-18deg);
}

/* Soft engine glow under the rocket */
.job--current .job-marker::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 70%;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 160, 60, 0.35) 0%, rgba(255, 160, 60, 0) 70%);
  transform: translate(-50%, -50%);
  animation: engine-glow 1.8s ease-in-out infinite;
}

.rocket {
  animation: rocket-hover 3s ease-in-out infinite;
}

.rocket-body {
  fill: var(--text-1);
}

.rocket-window {
  fill: #000;
}

.rocket-flame {
  fill: #ffb347;
  transform-box: fill-box;
  transform-origin: top center;
  filter: drop-shadow(0 0 3px rgba(255, 160, 60, 0.9));
  animation: rocket-flame 0.16s ease-in-out infinite alternate;
}

.satellite {
  fill: none;
  stroke: var(--text-2);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: satellite-drift 8s ease-in-out infinite;
}

.job--current .job-dates {
  color: var(--text-1);
}

@keyframes rocket-hover {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes rocket-flame {
  from {
    transform: scaleY(0.7);
    opacity: 0.75;
  }
  to {
    transform: scaleY(1.15);
    opacity: 1;
  }
}

.satellite-beacon {
  fill: #ff5a4e;
  stroke: none;
  animation: beacon 2.4s steps(1, end) infinite;
}

.launchpad {
  fill: none;
  stroke: var(--text-3);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.job-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  margin-top: 0.3rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: #ffb347;
}

.job-status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
  animation: beacon 1.6s ease-in-out infinite;
}

@keyframes engine-glow {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes beacon {
  0%,
  60% {
    opacity: 1;
  }
  61%,
  100% {
    opacity: 0.25;
  }
}

@keyframes satellite-drift {
  0%,
  100% {
    transform: rotate(-14deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

.job--skills {
  padding-bottom: 0;
}


.job-dates {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.6;
  letter-spacing: 0.05em;
  text-align: right;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--text-3);
  margin: 0.2rem 0 0;
}

.job-body {
  max-width: 40rem;
}

.job-role {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.35;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--text-1);
  margin: 0;
}

.job-org {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-1);
  margin: 0.1rem 0 0.6rem;
}

.job-brief {
  font-size: 1rem;
  line-height: 1.55;
  color: var(--text-2);
  margin: 0 0 0.85rem;
}

/* Tags for tools: under each role and in Skills */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Kept quiet so the role and what you did lead */
.chips li {
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
  color: var(--text-3);
  padding: 0.38rem 0.6rem 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.job-body .chips {
  gap: 0.3rem;
  margin-bottom: 1rem;
}

.job-link {
  font-size: 0.875rem;
}

.job--skills .record > div {
  grid-template-columns: 8rem 1fr;
}

/* ---------- Projects ---------- */

.banners {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}


.projects {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem 1.5rem;
}

.project {
  display: flex;
  flex-direction: column;
  color: var(--text-1);
}

.project:hover {
  color: var(--text-1);
}

.project-image {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 6px;
  background: #111;
  margin-bottom: 0.75rem;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.6s ease;
}

.project:hover .project-image img {
  transform: scale(1.03);
}

.project-name {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.4rem;
}

.project-text {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--text-2);
  margin-bottom: 0.4rem;
}

.project-stack {
  font-size: 0.8125rem;
  color: var(--text-3);
}

/* ---------- Hackathons ---------- */

.wins {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 2.5rem;
}

.win {
  display: flex;
  flex-direction: column;
  scroll-margin-top: 5rem;
}

.win-image {
  aspect-ratio: 16 / 6;
  overflow: hidden;
  border-radius: 6px;
  margin-bottom: 0.85rem;
  background: #0e0e0e;
}

.win-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  display: block;
}

.win-result {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-2);
  margin: 0 0 0.5rem;
}

.win-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.win-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.15;
  text-transform: none;
  color: var(--text-1);
  margin: 0 0 0.5rem;
}

.win-line {
  font-size: 1rem;
  line-height: 1.55;
  color: var(--text-2);
  max-width: 62ch;
  margin: 0 0 0.6rem;
}

.win-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 1.25rem;
  margin: 0;
}

/* ---------- Contact: a 16:9 frame (within 72-90svh) so more of the 3:2
   portrait shows than in a short, wide strip ---------- */

.contact {
  margin-top: 7rem;
  min-height: max(72svh, min(56.25vw, 90svh));
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.contact-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 100%;
}

.contact-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0) 22%),
    linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.35) 55%, rgba(0, 0, 0, 0.1) 100%);
}

.contact-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem 3rem;
}

.contact-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.25rem, 4vw, 3rem);
  letter-spacing: -0.02em;
  line-height: 1;
  text-transform: none;
  color: #fff;
  margin: 0 0 0.85rem;
}

.contact-email {
  display: inline-block;
  font-size: 1.25rem;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  text-underline-offset: 0.3em;
  margin-bottom: 1.25rem;
  word-break: break-word;
}

.contact-email:hover {
  color: #fff;
  text-decoration-color: #fff;
}

.contact-links {
  display: flex;
  gap: 1.75rem;
  margin: 0 0 3.5rem;
}

.credit {
  font-size: 0.875rem;
  color: #fff;
  margin: 0;
}

.credit a {
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  text-underline-offset: 0.25em;
}

@media (max-width: 1000px) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wrap {
    padding: 0 1.25rem;
  }

  .group {
    padding-top: 3.5rem;
  }

  /* Trail moves to the left edge; dates sit above each role */
  .job:not(.job--skills)::after {
    left: 6px;
  }

  .job {
    grid-template-columns: 1fr;
    row-gap: 0.4rem;
    padding-left: 2rem;
    padding-bottom: 2.25rem;
  }

  .job-marker {
    left: -7px;
  }


  .job-dates {
    text-align: left;
    white-space: normal;
    margin: 0;
  }

  .job-status {
    display: inline-flex;
    margin: 0 0 0 0.75rem;
  }

  /* Label above its tags; side by side leaves the tags too narrow */
  .job--skills .record > div,
  .record > div {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .record dt {
    padding-top: 0;
  }

  .record {
    gap: 1.1rem;
  }

  .wins {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }

  .banners {
    gap: 1rem;
  }

  /* Text only on phones; the screenshots are too small to read there */
  .project-image {
    display: none;
  }


  .sub-title--spaced {
    margin-top: 2.25rem;
  }

  .contact {
    margin-top: 5rem;
    min-height: 72svh;
  }

  /* Centre the portrait and shade from the bottom instead of the side */
  .contact-image {
    object-position: 55% 50%;
  }

  .contact-shade {
    background:
      linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0) 25%),
      linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0) 70%);
  }

  .contact-inner {
    padding: 0 1.25rem 2rem;
  }

  .contact-links {
    margin-bottom: 2.5rem;
  }
}

@media (max-width: 480px) {
  .projects {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-image img,
  .link {
    transition: none;
  }

  .rocket,
  .rocket-flame,
  .satellite,
  .satellite-beacon,
  .job-status::before,
  .job--current .job-marker::before {
    animation: none;
  }
}
</style>
