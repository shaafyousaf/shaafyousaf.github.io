<script setup lang="ts">
// Live status for the home server: hostname, ONLINE / LINK-DOWN, and a bar
// that fills until the next ping. Shared by HomelabHero and the homepage banner.
interface Props {
  hostname?: string
  serverConnected?: boolean
  uptime?: string
  secondsUntilNextPing?: number
  pingInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  hostname: 'the-great-library',
  serverConnected: false,
  uptime: '--',
  secondsUntilNextPing: 60,
  pingInterval: 60,
})

// 0% = just pinged (empty bar), 100% = next ping imminent (full bar)
const progressPercent = computed(() => {
  const elapsed = props.pingInterval - props.secondsUntilNextPing
  return Math.max(0, Math.min(100, (elapsed / props.pingInterval) * 100))
})
</script>

<template>
  <!-- Pill handles online/offline dimming via CSS -->
  <div :class="['server-status-bar', { 'status-bar-offline': !serverConnected }]">
    <div class="status-bar-row">
      <div class="status-bar-name-status">
        <div class="status-bar-item">
          <Icon name="heroicons:server-stack" class="tab-icon" />
          <span class="status-bar-value">{{ hostname }}</span>
        </div>
        <div class="status-bar-item">
          <span :class="['status-indicator', serverConnected ? 'online' : 'offline']">
            {{ serverConnected ? 'ONLINE' : 'LINK-DOWN' }}
          </span>
        </div>
      </div>

      <div class="status-bar-divider"></div>
      <div class="status-bar-item">
        <span class="status-bar-value">
          {{ serverConnected ? uptime : `Next ping in ${secondsUntilNextPing}s` }}
        </span>
      </div>
    </div>

    <!-- Progress bar fills 0→100% over ping interval, only when online -->
    <div v-if="serverConnected" class="ping-progress-track">
      <div class="ping-progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.server-status-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  padding: 0.75rem 1.25rem;
  overflow: hidden;
  transition: opacity 0.5s ease;
}

.server-status-bar.status-bar-offline {
  opacity: 0.6;
}

.status-bar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-bar-name-status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.status-bar-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
}

.status-bar-value {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.status-indicator {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 1px;
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  transition: all 0.3s ease;
}

.status-indicator.online {
  color: #000000;
  background: #00f83a;
}

.status-indicator.offline {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
}

.status-bar-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
}

/* Progress bar — fills 0→100% as time elapses since last ping */
.ping-progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
}

.ping-progress-fill {
  height: 100%;
  background: rgba(0, 248, 58, 0.75);
  transition: width 1.05s linear;
}

@media (max-width: 768px) {
  .server-status-bar {
    padding: 0.6rem 1rem;
  }

  .status-bar-row {
    gap: 0.75rem;
  }

  .status-bar-value {
    font-size: 0.75rem;
  }

  .status-indicator {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .server-status-bar {
    padding: 1rem;
  }

  .status-bar-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .status-bar-divider {
    display: none;
  }
}
</style>
