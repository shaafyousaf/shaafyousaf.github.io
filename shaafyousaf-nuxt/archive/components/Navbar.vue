<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()

const isExperiencePage = computed(() => route.path === '/experience')

const logoSrc = computed(() => {
  // On experience page, always use black logo
  if (isExperiencePage.value) {
    return '/optimized/images/shaafonlylabsfontlogoshortblack_Small.webp'
  }
  // On other pages, always use white logo
  return '/optimized/images/shaafonlylabsfontlogoshort_Small.webp'
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  closeMobileMenu()
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<template>
  <Motion tag="nav" class="navbar" :class="{ 'scrolled': isScrolled, 'experience-page': isExperiencePage }"
    :initial="{ opacity: 1 }" :while-in-view="{ opacity: 1 }" :transition="{ duration: 0, ease: 'easeOut' }">
    <div class="navbar-container">
      <NuxtLink to="/" class="logo-link">
        <img :src="logoSrc" alt="Shaaf Logo" class="logo" />
      </NuxtLink>



      <!-- Desktop Nav Links -->
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">HOME</NuxtLink>
        <NuxtLink to="/experience" class="nav-link">EXPERIENCE</NuxtLink>
        <NuxtLink to="/homelab" class="nav-link">HOMELAB</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">CONTACT</NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Toggle menu">
        <Icon v-if="!isMobileMenuOpen" name="heroicons:bars-3" class="menu-icon" />
        <Icon v-else name="heroicons:x-mark" class="menu-icon" />
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-nav-links">
          <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">HOME</NuxtLink>
          <NuxtLink to="/experience" class="mobile-nav-link" @click="closeMobileMenu">EXPERIENCE</NuxtLink>
          <NuxtLink to="/homelab" class="mobile-nav-link" @click="closeMobileMenu">HOMELAB</NuxtLink>
          <NuxtLink to="/contact" class="mobile-nav-link" @click="closeMobileMenu">CONTACT</NuxtLink>
        </div>
      </div>
    </Transition>
  </Motion>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 4rem;
  z-index: 100;
  background: transparent;
  transition: padding 0.3s ease, background 0.3s ease;
}

.navbar.scrolled {
  padding: 1rem 4rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  height: 40px;
  width: auto;
}

/* Disable effects on logo when on experience page */
.navbar.experience-page .logo {
  mix-blend-mode: normal;
  filter: none;
  opacity: 1;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--color-white);
  text-decoration: none;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  opacity: 0.8;
  transition: opacity 0.2s ease, color 0.3s ease;
  text-transform: uppercase;
}

/* Black links on experience page when not scrolled */
.navbar.experience-page .nav-link {
  color: #000000;
}

/* White links when scrolled (on any page) for blurred background */
.navbar.scrolled .nav-link {
  color: var(--color-white);
}

/* Keep black links on experience page even when scrolled */
.navbar.experience-page.scrolled .nav-link {
  color: #000000;
}

.nav-link:hover,
.nav-link.router-link-active {
  opacity: 1;
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--color-white);
  transition: color 0.3s ease;
}

.navbar.experience-page .mobile-menu-button {
  color: #000000;
}

.navbar.scrolled .mobile-menu-button {
  color: var(--color-white);
}

/* Keep black mobile button on experience page when scrolled */
.navbar.experience-page.scrolled .mobile-menu-button {
  color: #000000;
}

.menu-icon {
  width: 28px;
  height: 28px;
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 0 0 0 16px;
  padding: 1rem;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar.experience-page .mobile-menu {
  background: rgba(255, 255, 255, 0.95);
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-nav-link {
  color: var(--color-white);
  text-decoration: none;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.2s ease, opacity 0.2s ease;
  text-transform: uppercase;
  opacity: 0.9;
}

.navbar.experience-page .mobile-nav-link {
  color: #000000;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.navbar.experience-page .mobile-nav-link:hover,
.navbar.experience-page .mobile-nav-link.router-link-active {
  background: rgba(0, 0, 0, 0.05);
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
}

.mobile-menu-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }

  .navbar.scrolled {
    padding: 0.75rem 1.5rem;
  }

  .logo {
    height: 32px;
  }

  .nav-links {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }
}
</style>
