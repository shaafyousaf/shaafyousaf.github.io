<script setup lang="ts">
useHead({
  title: 'Shaaf Yousaf',
  meta: [
    { name: 'description', content: "Hi, I'm Shaaf. I build reliable software and systems." },
    // Global config uses initial-scale=0.9; this page is laid out for 1:1
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

const email = 'shaaf.yousaf@mail.utoronto.ca'

/* ---------- Experience: a briefing per role, no photos ---------- */

const jobs = [
  {
    dates: 'May 2026 to present',
    role: '.NET Developer',
    org: 'Ontario Government',
    brief: "Work on PICASSO, the C# .NET framework behind several of Ontario's education apps, and built the test automation QA uses to write tests in plain English.",
    stack: 'C#, .NET, Angular, Playwright, TypeScript, Azure',
    url: 'https://utsccoopshaaf.vercel.app/',
  },
  {
    dates: 'Sep 2025 to Apr 2026',
    role: 'Junior Software Developer',
    org: 'University of Toronto Schools',
    brief: 'Rebuilt two legacy apps used daily by staff and students on a modern .NET stack, and built the IT ticketing platform from scratch.',
    stack: 'C#, .NET, Blazor, GraphQL, EF Core, SignalR, SQL Server',
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
    text: 'An Android app for tracking your carbon footprint, with daily and habit trackers.',
    stack: 'Java, Android',
    image: '/images/pla2.jpeg',
    url: 'https://github.com/KrishnaManamohan/B07FinalProject',
  },
  {
    name: 'GLOW',
    text: 'A live map of water temperatures at Toronto beaches.',
    stack: 'Next.js, Express, MongoDB',
    image: '/resources/GLOW.png',
    url: 'https://github.com/UTSC-CSCC01-Software-Engineering-I/GLOW-WebApp.git',
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
    prize: '$600 cash prize',
    image: '/images/BannerLinkedin.png',
    url: 'https://devpost.com/software/idrak',
  },
  {
    id: 'imagehr',
    result: 'Best Healthcare AI Hack',
    project: 'imagEHR',
    event: 'GenAI Genesis 2025',
    line: 'Turns EHR text and X-rays into standard clinical data, a job that takes 6 to 8 weeks by hand.',
    prize: 'Awarded by Google and HBSU',
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

          <!-- Dates on the left, a rail down the middle, the role on the right.
               Skills is the last stop on the same rail. -->
          <ol class="jobs">
            <li
              v-for="job in jobs"
              :key="job.org"
              class="job"
              :class="{ 'job--current': job.dates.endsWith('present') }"
            >
              <p class="job-dates">{{ job.dates }}</p>
              <div class="job-body">
                <h3 class="job-role">{{ job.role }}</h3>
                <p class="job-org">{{ job.org }}</p>
                <p class="job-brief">{{ job.brief }}</p>
                <ul class="tags" :aria-label="`${job.role} stack`">
                  <li v-for="tech in job.stack.split(', ')" :key="tech" class="tag">{{ tech }}</li>
                </ul>
                <a :href="job.url" target="_blank" rel="noopener" class="link job-link">
                  Work sample <Icon name="heroicons:arrow-up-right-20-solid" class="link-icon" />
                </a>
              </div>
            </li>

            <li class="job job--skills">
              <h3 class="job-dates">Skills</h3>
              <dl class="record job-body">
                <div v-for="row in skills" :key="row.label">
                  <dt>{{ row.label }}</dt>
                  <dd>{{ row.value }}</dd>
                </div>
              </dl>
            </li>
          </ol>
        </div>
      </section>

      <!-- ============ Projects ============ -->
      <section id="projects" class="wrap group">
        <h2 class="group-title">Projects</h2>

        <div class="features">
          <Feature
            id="slowed-enhanced"
            kicker="Chrome extension, open source"
            title="Slowed Enhanced"
            :photos="[{ src: '/optimized/images/_DSC4383_compressed.webp', position: '70% 70%' }]"
            :stats="[
              { value: '1,500+', label: 'installs' },
              { value: '110+', label: 'weekly active users' },
              { value: '#14', label: 'on Product Hunt' },
            ]"
            :links="[
              { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/mbknnccopgggeedhnloodppflepboggp' },
              { label: 'Source', url: 'https://github.com/shaafyousaf/Slowed-Enhanced' },
              { label: 'Product Hunt', url: 'https://www.producthunt.com/products/slowed-enchanced/launches/slowed-enchanced' },
            ]"
          >
            <p>Volume, speed and reverb controls for any tab in Chrome, with pitch preservation. Collects no data.</p>
          </Feature>

          <Feature
            id="homelab"
            reverse
            kicker="Home server, running 24/7"
            title="HomeLab"
            :photos="[
              { src: '/optimized/images/homeserveroldPic.webp', position: 'center 40%' },
              { src: '/homelab/motherboardimage.jpeg', position: 'center' },
              { src: '/homelab/setupimage.jpeg', position: 'center 30%' },
            ]"
            :stats="[
              { value: '10+', label: 'self-hosted services' },
              { value: 'CI/CD', label: 'self-hosted GitHub Actions runner' },
            ]"
            :links="[{ label: 'Read the write-up', url: '/homelab' }]"
          >
            <p>The cloud is just someone else's computer. This one's mine.</p>
            <p>Ubuntu Server on a repurposed laptop, with Docker services behind Nginx and a Cloudflare Tunnel.</p>
          </Feature>
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
              <span class="win-prize">{{ w.prize }}</span>
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
      <img src="/images/_DSC4365 (Large).JPG" alt="" class="contact-image" loading="lazy" />
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
  padding-top: 6rem;
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
  margin: 0 0 2rem;
  padding-bottom: 0.85rem;
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
  margin-top: 4rem;
}

/* Labelled lines: the "clear subjects" used across the page */
.record {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
}

.record > div {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.record dt {
  color: var(--text-2);
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

/* The rail: bright at the top, fading out past the last stop */
.jobs::before {
  content: '';
  position: absolute;
  left: calc(var(--rail-x) - 1px);
  top: 0.75rem;
  bottom: -1.5rem;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.3) 60%,
    rgba(255, 255, 255, 0) 100%
  );
}

.job {
  position: relative;
  display: grid;
  grid-template-columns: var(--date-col) 1fr;
  column-gap: var(--rail-gap);
  padding-bottom: 3.25rem;
}

/* Stops on the rail: hollow for past roles */
.job::before {
  content: '';
  position: absolute;
  left: calc(var(--rail-x) - 7px);
  top: 0.3rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #000;
  border: 2px solid var(--text-2);
}

/* The current role glows */
.job--current::before {
  background: var(--text-1);
  border-color: var(--text-1);
  animation: job-glow 2.8s ease-in-out infinite;
}

.job--current .job-dates {
  color: var(--text-1);
}

@keyframes job-glow {
  0%,
  100% {
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.04), 0 0 22px rgba(255, 255, 255, 0.55);
  }
}

.job--skills {
  padding-bottom: 0;
}

.job--skills::before {
  left: calc(var(--rail-x) - 4px);
  top: 0.45rem;
  width: 8px;
  height: 8px;
  border: none;
  background: var(--text-3);
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
  margin: 0.15rem 0 0.85rem;
}

.job-brief {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-2);
  margin: 0 0 1rem;
}

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.1rem;
}

.tag {
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1;
  color: var(--text-1);
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.job-link {
  font-size: 0.875rem;
}

.job--skills .record > div {
  grid-template-columns: 8rem 1fr;
}

/* ---------- Projects ---------- */

.features {
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
}

.projects {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 1.5rem;
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
  margin-bottom: 0.9rem;
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
  line-height: 1.6;
  color: var(--text-2);
  margin-bottom: 0.5rem;
}

.project-stack {
  font-size: 0.8125rem;
  color: var(--text-3);
}

/* ---------- Hackathons ---------- */

.wins {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem 3rem;
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
  margin-bottom: 1rem;
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
  line-height: 1.65;
  color: var(--text-2);
  max-width: 62ch;
  margin: 0 0 0.75rem;
}

.win-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 1.25rem;
  margin: 0;
}

.win-prize {
  font-size: 0.875rem;
  color: var(--text-3);
}

/* ---------- Contact: 1.2x the original 60svh ---------- */

.contact {
  margin-top: 7rem;
  min-height: 72svh;
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
  object-position: 65% 30%;
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
    padding-top: 4.5rem;
  }

  /* Rail moves to the left edge; dates sit above each role */
  .jobs::before {
    left: 6px;
  }

  .job {
    grid-template-columns: 1fr;
    row-gap: 0.4rem;
    padding-left: 2rem;
    padding-bottom: 2.75rem;
  }

  .job::before {
    left: 0;
  }

  .job--skills::before {
    left: 3px;
  }

  .job-dates {
    text-align: left;
    white-space: normal;
    margin: 0;
  }

  .job--skills .record > div {
    grid-template-columns: 6.25rem 1fr;
  }

  .record > div {
    grid-template-columns: 6.25rem 1fr;
    gap: 0.75rem;
  }

  .wins {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .features {
    gap: 3rem;
  }

  .sub-title--spaced {
    margin-top: 3rem;
  }

  .contact {
    margin-top: 5rem;
    min-height: 72svh;
  }

  /* Centre the portrait and shade from the bottom instead of the side */
  .contact-image {
    object-position: 50% 25%;
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

  .job--current::before {
    animation: none;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 14px rgba(255, 255, 255, 0.4);
  }
}
</style>
