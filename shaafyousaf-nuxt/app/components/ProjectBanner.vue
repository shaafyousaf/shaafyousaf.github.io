<script setup lang="ts">
// A photo banner with the facts laid over a black side gradient, after the
// old FeaturedProject card on /experience and the HomelabHero banner.
// Several photos get a pager; the default slot sits under the subtitle.
interface Photo {
  src: string
  position?: string
}

interface Props {
  id?: string
  title: string
  subtitle: string
  meta?: string
  photos: Photo[]
  stats?: { value: string; label: string }[]
  links?: { label: string; url: string }[]
  /** Text on the right, gradient flipped, as HomelabHero did */
  alignRight?: boolean
  /** Large light title in the HomelabHero style */
  heroTitle?: boolean
}

const props = defineProps<Props>()

const overlayImage = '/optimized/resources/blackSideOverlayGradient.webp'

const index = ref(0)
const photo = computed(() => props.photos[index.value]!)

function step(delta: number) {
  const count = props.photos.length
  index.value = (index.value + delta + count) % count
}

const isExternal = (url: string) => /^https?:/.test(url)
</script>

<template>
  <article :id="id" class="banner" :class="{ 'banner--right': alignRight }">
    <Transition name="fade">
      <img
        :key="photo.src"
        :src="photo.src"
        alt=""
        class="banner-image"
        :style="{ '--image-position': photo.position }"
        loading="lazy"
      />
    </Transition>
    <img :src="overlayImage" alt="" class="banner-overlay" loading="lazy" />
    <div class="banner-shade" aria-hidden="true" />

    <div v-if="photos.length > 1" class="pager">
      <button class="pager-button" :aria-label="`Previous photo of ${title}`" @click="step(-1)">
        <Icon name="heroicons:chevron-left-20-solid" />
      </button>
      <span class="pager-count">{{ index + 1 }}/{{ photos.length }}</span>
      <button class="pager-button" :aria-label="`Next photo of ${title}`" @click="step(1)">
        <Icon name="heroicons:chevron-right-20-solid" />
      </button>
    </div>

    <div class="banner-content">
      <h3 class="banner-title" :class="{ 'banner-title--hero': heroTitle }">{{ title }}</h3>
      <p class="banner-subtitle">{{ subtitle }}</p>
      <p v-if="meta" class="banner-meta">{{ meta }}</p>

      <div v-if="$slots.default" class="banner-extra"><slot /></div>

      <dl v-if="stats?.length" class="banner-stats">
        <div v-for="stat in stats" :key="stat.label">
          <dt>{{ stat.value }}</dt>
          <dd>{{ stat.label }}</dd>
        </div>
      </dl>

      <p v-if="links?.length" class="banner-links">
        <NuxtLink
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          :target="isExternal(link.url) ? '_blank' : undefined"
          :rel="isExternal(link.url) ? 'noopener' : undefined"
          class="banner-link"
        >
          {{ link.label }}
          <Icon
            :name="isExternal(link.url) ? 'heroicons:arrow-up-right-20-solid' : 'heroicons:arrow-right-20-solid'"
            class="banner-link-icon"
          />
        </NuxtLink>
      </p>
    </div>
  </article>
</template>

<style scoped>
.banner {
  position: relative;
  min-height: 360px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 24px;
  background: #0e0e0e;
  scroll-margin-top: 5rem;
  /* Safari: keep the rounded clip while the photo scales */
  isolation: isolate;
}

/* Faint edge so dark photos don't dissolve into the page */
.banner::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.banner--right {
  justify-content: flex-end;
  text-align: right;
}

.banner-image,
.banner-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-image {
  object-position: var(--image-position, center);
  transition: transform 2s cubic-bezier(0.1, 0, 0.2, 1);
}

.banner:hover .banner-image {
  transform: scale(1.035);
}

.banner--right .banner-overlay {
  transform: scaleX(-1);
}

/* Only needed on phones, where the side gradient can't cover the text */
.banner-shade {
  display: none;
}

/* ---------- Photo pager: the corner away from the text ---------- */

.pager {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.7);
}

.banner--right .pager {
  right: auto;
  left: 1rem;
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
.banner-link:focus-visible {
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

/* ---------- Text ---------- */

.banner-content {
  position: relative;
  z-index: 1;
  padding: 2.5rem 3rem;
}

.banner-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-transform: none;
  color: #fff;
  margin: 0;
}

.banner-title--hero {
  font-weight: 300;
  font-size: clamp(3rem, 6vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 0.4rem;
}

.banner-subtitle {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #e0e0e0;
  max-width: 34rem;
  margin: 0.25rem 0 0;
}

.banner--right .banner-subtitle {
  margin-left: auto;
}

.banner-meta {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #ccc;
  margin: 0.35rem 0 0;
}

.banner-extra {
  display: flex;
  margin-top: 1rem;
}

.banner--right .banner-extra {
  justify-content: flex-end;
}

.banner-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  margin: 1.25rem 0 0;
}

.banner--right .banner-stats,
.banner--right .banner-links {
  justify-content: flex-end;
}

.banner-stats dt {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1;
  color: #fff;
  margin-bottom: 0.3rem;
}

.banner-stats dd {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  color: #ccc;
  margin: 0;
}

.banner-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin: 1.5rem 0 0;
}

.banner-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  text-underline-offset: 0.3em;
  transition: text-decoration-color 0.2s ease;
}

.banner-link:hover {
  color: #fff;
  text-decoration-color: #fff;
}

.banner-link-icon {
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

/* ---------- Phones: text over the lower part of the photo, darkened from
   the bottom so the photo stays visible above it; stats share one row ---------- */

@media (max-width: 768px) {
  .banner,
  .banner--right {
    min-height: 340px;
    align-items: flex-end;
    justify-content: flex-start;
    text-align: left;
    border-radius: 18px;
  }

  .banner-image {
    object-position: center 45%;
  }

  .banner-overlay {
    display: none;
  }

  .banner-shade {
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.1) 100%);
  }

  .pager,
  .banner--right .pager {
    top: 0.75rem;
    right: 0.75rem;
    bottom: auto;
    left: auto;
  }

  .pager-button {
    width: 28px;
    height: 28px;
  }

  .banner-content {
    padding: 5rem 1.5rem 1.75rem;
  }

  .banner-title {
    font-size: 1.75rem;
  }

  .banner-title--hero {
    font-size: 2.5rem;
    letter-spacing: -1px;
  }

  .banner-subtitle {
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .banner--right .banner-subtitle {
    margin-left: 0;
  }

  .banner-meta {
    font-size: 0.8rem;
  }

  .banner--right .banner-extra {
    justify-content: flex-start;
  }

  /* Stats share one row in equal columns */
  .banner-stats {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    gap: 1rem;
    margin-top: 1.1rem;
  }

  .banner-stats dt {
    font-size: 1.15rem;
    margin-bottom: 0.25rem;
  }

  .banner-stats dd {
    font-size: 0.7rem;
    line-height: 1.3;
  }

  .banner-links,
  .banner--right .banner-links {
    justify-content: flex-start;
    gap: 0.5rem 1.25rem;
    margin-top: 1.25rem;
  }

  .banner-link {
    font-size: 0.875rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .banner-image,
  .banner-link,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
