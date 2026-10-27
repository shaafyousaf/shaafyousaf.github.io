<script setup lang="ts">
import { Motion } from 'motion-v'

const backgroundImage = '/images/_DSC4365 (Large).JPG'
//  {
//     label: 'Email Me',
//     link: 'mailto:shaaf.yousaf@mail.utoronto.ca',
//     icon: 'heroicons:envelope',
//     primary: false,
//     external: false
//   },
const contactButtons = [
  {
    label: 'Download Resume',
    link: 'https://drive.google.com/file/d/1_H4GS3Ufw6UOnEJhch0OapYTXMUZFIor/view',
    icon: 'heroicons:arrow-down-on-square',
    primary: true,
    external: true
  },

  {
    label: 'GitHub',
    link: 'https://github.com/shaafyousaf',
    icon: 'mdi:github',
    primary: false,
    external: true
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/shaafyousaf',
    icon: 'mdi:linkedin',
    primary: false,
    external: true
  }
]
</script>

<template>
  <div class="contact-page">
    <!-- Full-bleed background portrait -->
    <div class="contact-background">
      <img :src="backgroundImage" alt="Shaaf Yousaf" class="background-image" />
    </div>

    <!-- Blur rising from the bottom, under the content -->
    <div class="frost-strip"></div>

    <!-- Centered content in the lower third, clear of the portrait -->
    <div class="contact-content">
      <Motion
        :initial="{ opacity: 0, filter: 'blur(8px)', y: 20 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <p class="status-line">Toronto, ON &middot; Open to opportunities</p>
        <h1 class="page-title">Let’s Work Together</h1>
        <p class="page-description">
          If you’re working on something interesting, hiring, or just want to talk tech — I’d love to hear from you.
        </p>
      </Motion>

      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 20 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }"
        class="contact-buttons"
      >
        <a
          v-for="item in contactButtons"
          :key="item.label"
          :href="item.link"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          :class="['btn', item.primary ? 'btn-primary' : 'btn-glass']"
        >
          <Icon :name="item.icon" class="btn-icon" />
          {{ item.label }}
        </a>
      </Motion>

      <Motion
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.7 }"
      >
        <p class="email-line">
          or reach me directly at
          <a href="mailto:shaaf.yousaf@mail.utoronto.ca" class="email-link">shaaf.yousaf@mail.utoronto.ca</a>
        </p>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: var(--color-black);
  overflow: hidden;
}

/* ============ Background ============ */
.contact-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
}

/* ============ Frost ============ */
.frost-strip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52%;
  z-index: 1;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%, #000000 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%, #000000 100%);
  background: rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

/* ============ Content ============ */
.contact-content {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  padding: 0 4rem 9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.status-line {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
  cursor: default;
}

.page-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--color-white);
  margin-bottom: 0.85rem;
  letter-spacing: -1.5px;
  line-height: 1.1;
  cursor: default;
}

.page-description {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.55;
  max-width: 560px;
  margin: 0 auto 2rem;
  cursor: default;
}

/* ============ Buttons — homepage hero pills ============ */
.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  white-space: nowrap;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.btn-glass {
  background-color: #00000063;
  color: white;
}

.btn-glass:hover {
  background-color: #ffffff4a;
}

.btn-primary {
  background-color: white;
  color: black;
}

.btn-primary:hover {
  background-color: #e6e6e6;
}

/* ============ Email line ============ */
.email-line {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  cursor: default;
}

.email-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 1px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.email-link:hover {
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.8);
}

/* ============ Responsive ============ */
@media (max-width: 968px) {
  .background-image {
    object-position: center 15%;
  }

  .contact-content {
    padding: 0 2rem 8vh;
  }

  .frost-strip {
    height: 58%;
  }
}

@media (max-width: 640px) {
  .contact-page {
    height: 100dvh;
  }

  .background-image {
    object-position: 49% 17%;
  }

  .contact-content {
    padding: 0 1.5rem 6vh;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .contact-buttons {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.6rem 1.25rem;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  .email-line {
    font-size: 0.85rem;
  }
}
</style>
