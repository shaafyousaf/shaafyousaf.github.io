<script setup lang="ts">
import { Motion } from 'motion-v'

const languages = ['C#', 'C', 'Python', 'TypeScript/JavaScript', 'SQL', 'Shell']

const frameworksAndTools = [
  '.NET',
  'Blazor',
  'GraphQL',
  'Nginx',
  'SSMS',
  'Ubuntu Server',
  'MudBlazor',
  'Motion.Dev',
  'Entity Framework Core',
  'Vue',
  'Nuxt: Vue Framework',
  'Flask',
  'Azure DevOps',
  'Wireshark',
  'Cloudflare',
  'Docker',
  'SQL Server',
  'MongoDB'
]
</script>

<template>
  <div class="skills-section">
    <!-- Grid Background -->
    <div class="grid-background"></div>
    <div class="gradient-overlay"></div>

    <Motion
      :initial="{ opacity: 0, filter: 'blur(10px)', y: 30 }"
      :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
      :transition="{ duration: 0.1, delay: 0 }"
      class="skills-container"
    >
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)' }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)' }"
        :transition="{ duration: 0.2, delay: 0.1}"
      >
        <h2 class="section-title">What I work with day to day.</h2>
      </Motion>

      <!-- Languages Section - Full Width -->
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 20 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.2, delay: 0.05 }"
        class="languages-section"
      >
        <h3 class="subsection-title">Languages</h3>
        <div class="tags-container">
          <Motion
            v-for="(language, index) in languages"
            :key="language"
            :initial="{ opacity: 0, scale: 0.95 }"
            :while-in-view="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.2, delay: 0.05 + index * 0.05 }"
            class="skill-tag"
          >
            {{ language }}
          </Motion>
        </div>
      </Motion>

      <!-- Frameworks & Tools Section - Full Width -->
      <Motion
        :initial="{ opacity: 0, filter: 'blur(6px)', y: 20 }"
        :while-in-view="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
        :transition="{ duration: 0.3, delay: 0.1 }"
        class="tools-section"
      >
        <h3 class="subsection-title">Frameworks & Tools</h3>
        <div class="tools-list">
          <Motion
            v-for="(tool, index) in frameworksAndTools"
            :key="tool"
            :initial="{ opacity: 0, x: -10 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.2, delay: 0.1 + index * 0.03 }"
            class="tool-item"
          >
            {{ tool }}
          </Motion>
        </div>
      </Motion>
    </Motion>
  </div>
</template>

<style scoped>
.skills-section {
  position: relative;
  width: 100%;
  background: var(--color-black);
  padding: 5rem 0;
  overflow: hidden;
}

/* Grid Background */
.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 
    100px 100px,
    100px 100px;
  z-index: 0;
  opacity: 0.5;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
}

.skills-container {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
}

.section-title {
     text-transform: unset;
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: var(--color-white);
  margin-bottom: 4rem;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Languages Section */
.languages-section {
  margin-bottom: 4rem;
}

.subsection-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
  text-align: left;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: transparent;
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: default;
}

.skill-tag:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: var(--color-white);
}

/* Tools Section */
.tools-section {
  margin-bottom: 2rem;
}

.tools-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem 2rem;
}

.tool-item {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.75);
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  cursor: default;
}

.tool-item:hover {
  color: var(--color-white);
}

/* Responsive Design */
@media (max-width: 968px) {
  .skills-section {
    padding: 4rem 0;
  }

  .skills-container {
    padding: 0 2rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  .languages-section {
    margin-bottom: 3rem;
  }

  .tools-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .skills-section {
    padding: 3rem 0;
  }

  .skills-container {
    padding: 0 1.5rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2.5rem;
  }

  .subsection-title {
    font-size: 0.85rem;
    margin-bottom: 1.25rem;
  }

  .languages-section {
    margin-bottom: 2.5rem;
  }

  .tags-container {
    gap: 0.6rem;
  }

  .skill-tag {
    padding: 0.4rem 0.85rem;
    font-size: 0.9rem;
  }

  .tools-list {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.4rem 1rem;
  }

  .tool-item {
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }

  .grid-background {
    background-size: 
      50px 50px,
      50px 50px;
  }
}
</style>
