<script setup lang="ts">
// A compact project row: photo on one side (with arrows when there are
// several), the facts on the other. Stats are the first thing you read.
interface Photo {
  src: string
  position?: string
}

interface Props {
  id?: string
  kicker: string
  title: string
  photos: Photo[]
  /** Labelled lines, e.g. { label: 'Platform', value: 'Chrome Web Store' } */
  facts?: { label: string; value: string }[]
  stats?: { value: string; label: string }[]
  links?: { label: string; url: string }[]
  reverse?: boolean
}

const props = defineProps<Props>()

const index = ref(0)
const photo = computed(() => props.photos[index.value]!)

function step(delta: number) {
  const count = props.photos.length
  index.value = (index.value + delta + count) % count
}

const isExternal = (url: string) => /^https?:/.test(url)
</script>

<template>
  <article :id="id" class="feature" :class="{ 'feature--reverse': reverse }">
    <div class="media">
      <Transition name="fade">
        <img
          :key="photo.src"
          :src="photo.src"
          alt=""
          class="media-image"
          :style="{ objectPosition: photo.position ?? 'center' }"
          loading="lazy"
        />
      </Transition>

      <div v-if="photos.length > 1" class="pager">
        <button class="pager-button" :aria-label="`Previous photo of ${title}`" @click="step(-1)">
          <Icon name="heroicons:chevron-left-20-solid" />
        </button>
        <span class="pager-count">{{ index + 1 }}/{{ photos.length }}</span>
        <button class="pager-button" :aria-label="`Next photo of ${title}`" @click="step(1)">
          <Icon name="heroicons:chevron-right-20-solid" />
        </button>
      </div>
    </div>

    <div class="info">
      <p class="kicker">{{ kicker }}</p>
      <h3 class="title">{{ title }}</h3>
      <div class="body"><slot /></div>

      <dl v-if="facts?.length" class="facts">
        <div v-for="fact in facts" :key="fact.label" class="fact">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>

      <dl v-if="stats?.length" class="stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <dt>{{ stat.value }}</dt>
          <dd>{{ stat.label }}</dd>
        </div>
      </dl>

      <div v-if="links?.length" class="links">
        <NuxtLink
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          :target="isExternal(link.url) ? '_blank' : undefined"
          :rel="isExternal(link.url) ? 'noopener' : undefined"
          class="link"
        >
          {{ link.label }}
          <Icon :name="isExternal(link.url) ? 'heroicons:arrow-up-right-20-solid' : 'heroicons:arrow-right-20-solid'" class="link-icon" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}

.feature--reverse .media {
  order: 2;
}

/* ---------- Photo ---------- */

.media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 6px;
  background: #0e0e0e;
  /* Faint edge so dark photos don't dissolve into the page */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.media::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.media-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pager {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.7);
}

.pager-button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
}

.pager-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.pager-button:focus-visible,
.link:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.pager-count {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #fff;
  min-width: 2rem;
  text-align: center;
}

/* ---------- Facts ---------- */

.kicker {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3, rgba(255, 255, 255, 0.55));
  margin: 0 0 0.6rem;
}

.title {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--text-1, #fff);
  margin: 0 0 0.75rem;
}

.body :deep(p) {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-2, rgba(255, 255, 255, 0.74));
  max-width: 52ch;
  margin: 0 0 0.6rem;
}

.facts {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin: 1rem 0 0;
}

.fact {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
  font-family: 'Nexa', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
}

.fact dt {
  font-weight: 700;
  color: #fff;
}

.fact dd {
  font-weight: 300;
  color: #fff;
  margin: 0;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.25rem;
  margin: 1.5rem 0 0;
}

.stat dt {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1;
  color: var(--text-1, #fff);
  margin-bottom: 0.3rem;
}

.stat dd {
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--text-2, rgba(255, 255, 255, 0.74));
  margin: 0;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1.5rem;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-display, 'Nexa', sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-1, #fff);
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .feature {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .feature--reverse .media {
    order: 0;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .link {
    transition: none;
  }
}
</style>
