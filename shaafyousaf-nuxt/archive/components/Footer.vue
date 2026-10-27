<script setup lang="ts">
const currentYear = new Date().getFullYear()
const lastUpdated = 'June 10th, 2026'
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="logo-container">
          <img 
            src="/optimized/images/shaafonlylabsfontlogoshort_Small.webp" 
            alt="Shaaf Logo" 
            class="footer-logo"
          />

          <p class="footer-tagline">Made with ❤️ by Shaaf</p>
        </div>

        

        <div class="footer-links">
          <a href="https://github.com/ShaafPlayz" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/shaafyousaf" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/shaafyousaf/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/@ShaafStudio" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://devpost.com/ShaafDev" target="_blank" rel="noopener noreferrer" aria-label="DevPost">
            <i class="fab fa-dev"></i>
          </a>

          <span class="footer-links-divider"></span>

          <!-- <a href="https://vault.shaafyousaf.com" target="_blank" rel="noopener noreferrer" class="text-link" title="Personal Knowledge Base">
            <i class="fas fa-book"></i><span>Vault</span>
          </a> -->
          <a href="https://files.shaafyousaf.com" target="_blank" rel="noopener noreferrer" class="text-link" title="File Server">
            <i class="fas fa-folder"></i><span>Files</span>
          </a>
        </div>

        <div class="footer-bottom">
          <a 
            href="https://github.com/ShaafPlayz/shaafplayz.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            class="source-link"
          >
            Source Code
          </a>
          <span class="footer-dot">·</span>
          <p class="update-info">Updated: {{ lastUpdated }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.logo-container {
  margin-bottom: 0.25rem;
     width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
}

.footer-logo {
  height: 90px;
  width: auto;
  filter: brightness(0) invert(1);
}

.footer-tagline {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  color: var(--color-white);
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.footer-links-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 0.5rem;
}

.text-link {
  gap: 0.4rem;
  border-radius: var(--border-radius-sm) !important;
  width: auto !important;
  padding: 0 1rem !important;
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
}

.text-link i {
  font-size: 0.85rem;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0rem;
  padding-top: 1.5rem;
  /* border-top: var(--border-thin); */
}

.source-link {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: var(--text-secondary);
}

.footer-dot {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.update-info {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 1.5rem 1.5rem;
  }

  .footer-links-divider {
    display: none;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.25rem;
  }

  .footer-dot {
    display: none;
  }
}
</style>
