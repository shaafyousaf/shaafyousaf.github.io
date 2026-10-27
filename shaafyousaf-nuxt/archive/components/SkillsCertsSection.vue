<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'

const certificates = [
  {
    title: 'Computer Networking',
    issuer: 'Google',
    issued: 'May 2026',
    credentialId: 'O44LJ54W9751',
    url: 'https://www.coursera.org/account/accomplishments/verify/O44LJ54W9751'
  },
  {
    title: 'WebSockets',
    issuer: 'Packt',
    issued: 'Dec 2025',
    credentialId: 'U1WI832I7IX4',
    url: 'https://www.coursera.org/account/accomplishments/verify/U1WI832I7IX4'
  },
  {
    title: 'Intro to Retrieval Augmented Generation (RAG)',
    issuer: 'Duke University',
    issued: 'May 2025',
    credentialId: 'KZZNVM5SZ4I5',
    url: 'https://www.coursera.org/account/accomplishments/verify/KZZNVM5SZ4I5'
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Codecademy',
    issued: 'Jun 2024',
    credentialId: '',
    url: 'https://www.codecademy.com/profiles/ShaafPlayz/certificates'
  },
  {
    title: 'Intro to Cloud Computing',
    issuer: 'Codecademy',
    issued: 'Jun 2024',
    credentialId: '',
    url: 'https://www.codecademy.com/profiles/ShaafPlayz/certificates'
  },
  {
    title: 'Machine Learning: Introduction with Regression',
    issuer: 'Codecademy',
    issued: 'Jun 2024',
    credentialId: '',
    url: 'https://www.codecademy.com/profiles/ShaafPlayz/certificates'
  }
]

// Group certs by issuer, preserving source order
const groupedCerts = computed(() => {
  const order: string[] = []
  const groups: Record<string, (typeof certificates[number])[]> = {}
  for (const cert of certificates) {
    if (!groups[cert.issuer]) {
      groups[cert.issuer] = []
      order.push(cert.issuer)
    }
    groups[cert.issuer]!.push(cert)
  }
  return order.map(issuer => ({ issuer, certs: groups[issuer]! }))
})
</script>

<template>
  <div class="certs-list">
    <Motion
      v-for="(group, gi) in groupedCerts"
      :key="group.issuer"
      :initial="{ opacity: 0, y: 10 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3, delay: gi * 0.07 }"
      class="issuer-group"
    >
      <p class="issuer-name">{{ group.issuer }}</p>

      <div class="cert-entries">
        <a
          v-for="cert in group.certs"
          :key="cert.title"
          :href="cert.url"
          target="_blank"
          rel="noopener noreferrer"
          class="cert-entry"
        >
          <div class="entry-left">
            <span class="entry-title">{{ cert.title }}</span>
            <span v-if="cert.credentialId" class="entry-id">{{ cert.credentialId }}</span>
          </div>
          <div class="entry-right">
            <span class="entry-date">{{ cert.issued }}</span>
            <svg class="entry-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </div>
        </a>
      </div>
    </Motion>
  </div>
</template>

<style scoped>
.certs-list {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.issuer-group {
  display: flex;
  flex-direction: column;
}

/* Issuer heading */
.issuer-name {
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #111111;
  margin: 0 0 0.35rem 0;
}

/* Cert rows */
.cert-entries {
  display: flex;
  flex-direction: column;
}

.cert-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: padding 0.15s ease;
}

.cert-entry:first-child {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.entry-left {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.entry-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: #333333;
  line-height: 1.4;
}

.entry-id {
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 0.65rem;
  color: #cccccc;
  letter-spacing: 0.3px;
}

.entry-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.entry-date {
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 0.78rem;
  color: #aaaaaa;
  white-space: nowrap;
}

.entry-arrow {
  color: #cccccc;
  flex-shrink: 0;
  transition: color 0.15s ease, transform 0.15s ease;
}

.cert-entry:hover .entry-title {
  color: #000000;
}

.cert-entry:hover .entry-arrow {
  color: #000000;
  transform: translate(2px, -2px);
}

@media (max-width: 480px) {
  .entry-date {
    display: none;
  }
}
</style>
