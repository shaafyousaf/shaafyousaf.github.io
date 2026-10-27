<script setup lang="ts">
// Centred bar: logo and the four sections. The section in view is underlined.
const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'hackathons', label: 'Hackathon wins' },
  { id: 'contact', label: 'Contact' },
]

const logo = '/optimized/images/shaafonlylabsfontlogoshort_Small.webp'
const activeId = ref('')
const scrolled = ref(false)
const menuOpen = ref(false)

let observer: IntersectionObserver | null = null

function onScroll() {
  scrolled.value = window.scrollY > 40
  const first = document.getElementById(sections[0]!.id)
  if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) activeId.value = ''
}

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  for (const { id } of sections) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav class="nav" :class="{ 'nav--solid': scrolled || menuOpen }" aria-label="Sections">
    <div class="bar">
      <a href="#top" class="brand" aria-label="Back to top" @click="menuOpen = false">
        <img :src="logo" alt="Shaaf Yousaf" class="logo" />
      </a>

      <div class="links">
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          class="link"
          :class="{ active: activeId === s.id }"
          :aria-current="activeId === s.id ? 'true' : undefined"
        >
          {{ s.label }}
        </a>
      </div>

      <button class="toggle" aria-label="Sections menu" :aria-expanded="menuOpen" aria-controls="nav-menu" @click="menuOpen = !menuOpen">
        <Icon :name="menuOpen ? 'heroicons:x-mark-20-solid' : 'heroicons:bars-2-20-solid'" />
      </button>
    </div>

    <div v-show="menuOpen" id="nav-menu" class="menu">
      <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" class="menu-link" @click="menuOpen = false">
        {{ s.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
}

.nav--solid {
  background: rgba(0, 0, 0, 0.92);
}

.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1.4rem 2rem;
}

.logo {
  height: 26px;
  width: auto;
  display: block;
}

.links {
  display: flex;
  gap: 2.25rem;
}

.link {
  position: relative;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  padding: 0.35rem 0;
  transition: color 0.2s ease;
}

.link:hover,
.link.active {
  color: #fff;
}

.link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: #fff;
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.link.active::after {
  transform: scaleX(1);
}

.toggle {
  display: none;
  place-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
}

.menu {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 1rem;
}

.menu-link {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

@media (max-width: 720px) {
  .bar {
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }

  .links {
    display: none;
  }

  .toggle {
    display: grid;
  }
}

@media (min-width: 721px) {
  .menu {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav,
  .link,
  .link::after {
    transition: none;
  }
}
</style>
