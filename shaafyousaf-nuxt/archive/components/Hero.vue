<script setup lang="ts">
import { Motion } from 'motion-v'

const backgroundImage = '/optimized/images/_DSC4379.webp'
const overlayImage = '/optimized/resources/blackSideOverlayGradient.webp'
</script>

<template>
    <div class="hero-section">
        <!-- Background Image with Overlay -->
        <div class="hero-background">
            <img :src="backgroundImage" alt="Background" class="background-image" />
            <img :src="overlayImage" alt="Overlay" class="gradient-overlay" />
        </div>

        <!-- Hero Content -->
        <div class="hero-content">
            <div class="hero-text-container">
                <Motion tag="h1" class="hero-title" :initial="{ opacity: 0, filter: 'blur(10px)' }"
                    :while-in-view="{ opacity: 1, filter: 'blur(0px)' }"
                    :transition="{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }">
                    <span class="title-line">Building reliable</span>
                    <span class="title-line">software and systems.</span>
                    <!-- <span class="title-line">By</span>
          <span class="title-line">Curiosity.</span> -->
                </Motion>
                <Motion tag="p" class="hero-description" :initial="{ opacity: 0, filter: 'blur(8px)' }"
                    :while-in-view="{ opacity: 1, filter: 'blur(0px)' }"
                    :transition="{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }">
                    I'm Shaaf Yousaf — third-year Software Engineering student at UofT Scarborough. I build softwares,
                    tinker with hardware, and occasionally photograph satellites and stars. </Motion>
                <Motion class="hero-tags" :initial="{ opacity: 0, filter: 'blur(8px)' }"
                    :while-in-view="{ opacity: 1, filter: 'blur(0px)' }"
                    :transition="{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }">

                    <div class="tag">.NET Developer @ Ontario Government</div>

                    <div class="tag">Junior SWE @ UTS · 2025–2026</div>

                    <div class="tag">2x Hackathon Winner</div>

                    <div class="tag">Homelabber</div>
                </Motion>
                <Motion class="hero-buttons" :initial="{ opacity: 0, filter: 'blur(6px)' }"
                    :while-in-view="{ opacity: 1, filter: 'blur(0px)' }"
                    :transition="{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }">

                    <NuxtLink to="/contact" class="btn btn-white cv">
                        Contact Me
                        <Icon name="heroicons:arrow-right" class="btn-icon" />
                    </NuxtLink>
                    <!-- <a href="https://drive.google.com/file/d/1_H4GS3Ufw6UOnEJhch0OapYTXMUZFIor/view" target="_blank" rel="noopener" class="btn btn-white cv">
                        
                        View Resume
                        <Icon name="heroicons:arrow-up-right" class="btn-icon" />
                    </a>
                    <!-- <a href="https://drive.google.com/file/d/1k6myJd4Gz-WPVKs8sykdEvoOffLwWt8G/view?usp=sharing" target="_blank" rel="noopener" class="btn btn-white cv">
                        
                        View Hardware CV
                        <Icon name="heroicons:arrow-up-right" class="btn-icon" />
                    </a> -->
                    <!-- <a href="https://github.com/shaafplayz" target="_blank" rel="noopener" class="btn btn-white">
                        <Icon name="mdi:github" class="btn-icon" />
                        GitHub
                    </a>
                   <!-- <a href="https://www.linkedin.com/in/shaafyousaf/" target="_blank" rel="noopener" class="btn btn-white">
                        <Icon name="mdi:linkedin" class="btn-icon" />
                        LinkedIn
                    </a>    
                    <a href="mailto:shaaf.yousaf@mail.utoronto.ca" class="btn btn-white">
                        <Icon name="heroicons:envelope" class="btn-icon" />
                        Email Me
                    </a> -->
                </Motion>
            </div>

            <!-- Scroll Down Arrow -->
            <Motion class="scroll-indicator" :initial="{ opacity: 0, y: -20 }" :while-in-view="{
                opacity: [0, 1, 1, 0],
                y: [0, 10, 10, 20]
            }" :transition="{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                ease: 'easeInOut'
            }">
                <Icon name="heroicons:chevron-down" class="arrow-icon" />
            </Motion>

            <!-- Bottom Tags -->

        </div>
    </div>
</template>

<style scoped>
.hero-section {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 10;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero-text-container {
    margin-top: auto;
    margin-bottom: auto;
    padding-top: 10vh;
    /* Visual balance */
}

.hero-title {
    font-family: 'Nexa', sans-serif;
    font-weight: 700;
    color: var(--color-white);
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    cursor: default;
}

.title-line {
    font-size: 4rem;
    display: block;
}

.hero-description {
    font-family: 'Nexa', sans-serif;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.2;
    color: var(--color-white);
    margin-bottom: 1rem;
    max-width: 800px;
    cursor: default;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
    white-space: nowrap;
    transform: none !important;
    border: none !important;
    box-shadow: none !important;
    overflow: visible !important;
    text-transform: unset;
}

.btn::before,
.btn::after {
    display: none !important;
    content: none !important;
}

.btn-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

.btn-white {
    background-color: #00000063;
    color: white;
    border: none !important;
    box-shadow: none !important;
}

.btn-white::before,
.btn-white::after {
    display: none !important;
    content: none !important;
}

.cv {
    background-color: white !important;

    color: black !important;
    transition: 0.5s;
}

.cv:hover {
    background-color: #ffd700 !important;
    transition: 0.5s;
}

.btn-white:hover {
    background-color: #ffffff4a;
    border: none !important;
    box-shadow: none !important;
    transform: none !important;
}

.btn-white:hover::before,
.btn-white:hover::after {
    display: none !important;
    content: none !important;
}

.hero-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    /* Push to bottom */
    margin-bottom: 1rem;
    flex-wrap: wrap;
    max-width: 700px;
}

/* .tag {
    background-color: #00000063;
    color: #ffffff;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-family: 'Nexa', sans-serif;
    font-weight: 300;
    font-size: 1rem;
    white-space: nowrap;
    height: 1.8rem;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
} */

.tag {
    cursor: default;
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-family: 'Nexa', sans-serif;
    font-weight: 400;
    font-size: 0.95rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
}


.scroll-indicator {
    position: absolute;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.arrow-icon {
    width: 32px;
    height: 32px;
    color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 1024px) {
    .hero-content {
        padding: 0 2rem;
    }

    .hero-title {
        gap: 1rem;
    }

    .title-line {
        font-size: clamp(3rem, 8vw, 4rem);
    }
}

@media (max-width: 768px) {
    .hero-section {
        height: 100vh;
        /* Use dynamic viewport height for mobile */
    }

    .background-image {
        object-position: 60% 0;
    }

    .gradient-overlay {
        transform: rotate(-90deg);
        width: 100vh;
        height: 100%;
        object-fit: cover;
    }

    .hero-content {
        justify-content: flex-end;
        padding-top: 5rem;
        padding-bottom: 7rem;
    }

    .hero-text-container {
        margin-top: 0;
        padding-top: 0;
        margin-bottom: 2rem;
    }

    .hero-title {
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 1rem;
        line-height: 0.95;
    }

    .title-line {
        font-size: clamp(2.5rem, 8vw, 3rem);
    }

    .hero-description {
        font-size: 1rem;
        line-height: 1.4;
        margin-bottom: 1.5rem;
    }

    .hero-buttons {
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .btn {
        font-size: 0.9rem;
        padding: 0.6rem 1.25rem;
    }

    .btn-icon {
        width: 16px;
        height: 16px;
    }

    .hero-tags {
        gap: 0.5rem;
        max-width: 100%;
    }

    .tag {
        font-size: 0.85rem;
        padding: 0.4rem 1rem;
        height: auto;
        min-height: 1.6rem;
    }

    .special-tag {
        width: 60% !important;
        border-radius: 20px;
    }

    .scroll-indicator {
        bottom: 4rem;
    }

    .arrow-icon {
        width: 28px;
        height: 28px;
    }
}
</style>
