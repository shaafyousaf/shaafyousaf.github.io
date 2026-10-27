<script setup lang="ts">
import { ref, onMounted } from 'vue'

const backgroundImage = '/optimized/images/homeserveroldPic.webp'
const overlayImage = '/optimized/resources/blackSideOverlayGradient.webp'

// Tab state
const activeTab = ref<'overview' | 'statistics'>('overview')

// Server connection state
const serverConnected = ref(false) // Will be set to true when API responds successfully
const hostname = ref('the-great-library')
const uptime = ref('--')

// Countdown to next ping
const PING_INTERVAL_SECS = 30
const secondsUntilNextPing = ref(PING_INTERVAL_SECS)

// API Configuration - Update these with your actual endpoints
const API_CONFIG = {
  baseUrl: '', // e.g., 'http://your-server-ip:port' or 'https://api.yourdomain.com'
  endpoints: {
    status: '/api/status',     // GET: Returns server status, hostname, uptime
    stats: '/api/stats',       // GET: Returns CPU, RAM, disk, network metrics
    services: '/api/services'  // GET: Returns list of running services
  },
  pollingInterval: 30000,       // Poll every 30 seconds
  timeout: 3000                // Request timeout in ms
}

// LocalStorage keys for persisting last known state
const STORAGE_KEYS = {
  stats: 'homelab_last_stats',
  services: 'homelab_last_services',
  serverInfo: 'homelab_last_server_info',
  timestamp: 'homelab_last_update'
}

// Live stats (will be fetched from API later)
const stats = ref({
  cpu: { usage: 0, temp: 0, cores: 4 },
  ram: { used: 0, total: 16, percentage: 0 },
  disk: { used: 0, total: 240, percentage: 0 },
  network: { upload: 0, download: 0 }
})

// Historical data for chart (last 30 data points)
const historyLength = 30
const chartHistory = ref({
  cpu: Array(historyLength).fill(0),
  ram: Array(historyLength).fill(0),
  disk: Array(historyLength).fill(0),
  network: Array(historyLength).fill(0)
})

// Services status - Update this list based on your actual services
const services = ref([
  { name: 'SSH Server', status: 'stopped', port: 22 },
  { name: 'Web Server', status: 'stopped', port: 80 },
  { name: 'Node.js App', status: 'stopped', port: 3000 },
  { name: 'Database', status: 'stopped', port: 5432 },
  { name: 'Docker', status: 'stopped', port: 2375 },
  { name: 'Monitoring', status: 'stopped', port: 9090 }
])

// Hardware specs
const hardware = {
  cpu: 'Intel Core i7-8565U @ 1.80GHz',
  ram: '16GB DDR4 2667MHz (2x 8GB)',
  storage: '240GB Kingston SA400M8 SSD',
  gpu: 'NVIDIA GeForce MX130',
  motherboard: 'Dell Inspiron 5584',
  network: 'Realtek RTL810xE Ethernet'
}

// Function to fetch server status and live data
const loadLastKnownState = () => {
  try {
    const savedStats = localStorage.getItem(STORAGE_KEYS.stats)
    const savedServices = localStorage.getItem(STORAGE_KEYS.services)
    const savedServerInfo = localStorage.getItem(STORAGE_KEYS.serverInfo)
    const savedTimestamp = localStorage.getItem(STORAGE_KEYS.timestamp)

    if (savedStats) {
      const parsed = JSON.parse(savedStats)
      stats.value = parsed
      
      // Update chart history with saved data
      if (parsed.cpu) {
        chartHistory.value.cpu = Array(historyLength).fill(parsed.cpu.usage)
        chartHistory.value.ram = Array(historyLength).fill(parsed.ram.percentage)
        chartHistory.value.disk = Array(historyLength).fill(parsed.disk.percentage)
        chartHistory.value.network = Array(historyLength).fill(Math.min(parsed.network.download, 100))
      }
    }

    if (savedServices) {
      services.value = JSON.parse(savedServices)
    }

    if (savedServerInfo) {
      const info = JSON.parse(savedServerInfo)
      hostname.value = info.hostname || hostname.value
      uptime.value = info.uptime || uptime.value
    }

    // Log when data was last updated
    if (savedTimestamp) {
      console.log('Last server data from:', new Date(parseInt(savedTimestamp)).toLocaleString())
    }
  } catch (error) {
    console.error('Failed to load last known state:', error)
  }
}

// Save current state to localStorage
const saveCurrentState = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats.value))
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(services.value))
    localStorage.setItem(STORAGE_KEYS.serverInfo, JSON.stringify({
      hostname: hostname.value,
      uptime: uptime.value
    }))
    localStorage.setItem(STORAGE_KEYS.timestamp, Date.now().toString())
  } catch (error) {
    console.error('Failed to save state:', error)
  }
}

// Function to fetch server status and live data
const fetchServerStatus = async () => {
  secondsUntilNextPing.value = PING_INTERVAL_SECS
  // If no API base URL is configured, stay offline and show last known state
  // if (!API_CONFIG.baseUrl) {
  //   console.warn('API base URL not configured. Showing last known state.')
  //   serverConnected.value = false
  //   return
  // }

  try {
    // Create abort controller for timeout
    // const controller = new AbortController()
    // const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

    // ============= API CALL: Server Status =============
    // Expected Response Format:
    // {
    //   "online": true,
    //   "hostname": "the-great-library",
    //   "uptime": "2 Weeks, 5 Days, 5 Hours"  // or seconds: 1234567
    // }

    // ping test
    async function pingURL() {

      // The custom URL entered by user
      var URL = "https://the-great-server.shaafyousaf.com/Observer";
      const response = await fetch(URL);
      return response;
    }

    const statusResponse = await pingURL();
    ////// Uncommeted the following 
    // const statusResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status}`, {
    //   signal: controller.signal,
    //   headers: { 'Accept': 'application/json' }
    // })
    
    // clearTimeout(timeoutId)

    if (!statusResponse.ok) {
      serverConnected.value = false
      throw new Error(`Status API returned ${statusResponse.status}`)
    }

    const body = await statusResponse.text();
  
  
    let isLive = body.includes("All Systems Nominal.");
    console.log(`isLive: ${isLive}`);

    serverConnected.value = isLive;
    uptime.value = "Connected to Server-Observer-Utility";
    console.log(`Fetched Response from  https://the-great-server.shaafyousaf.com/Observer - isOnline: ${statusResponse.ok}`)
    console.log(`Sending another request in 30 seconds.`)
    // hostname.value = statusData.hostname || hostname.value
    
    // Handle uptime - can be string or seconds
    // if (typeof statusData.uptime === 'number') {
    //   uptime.value = formatUptime(statusData.uptime)
    // } else {
    //   uptime.value = statusData.uptime || uptime.value
    // }

    // ============= API CALL: System Stats =============
    // Expected Response Format:
    // {
    //   "cpu": {
    //     "usage": 45.2,      // percentage (0-100)
    //     "temp": 62,         // celsius
    //     "cores": 4
    //   },
    //   "ram": {
    //     "used": 8.5,        // GB
    //     "total": 16,        // GB
    //     "percentage": 53    // calculated or provided
    //   },
    //   "disk": {
    //     "used": 125,        // GB
    //     "total": 240,       // GB
    //     "percentage": 52    // calculated or provided
    //   },
    //   "network": {
    //     "upload": 12.5,     // MB/s
    //     "download": 45.8    // MB/s
    //   }
    // }
    // const statsResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.stats}`, {
    //   headers: { 'Accept': 'application/json' }
    // })

    // if (statsResponse.ok) {
    //   const statsData = await statsResponse.json()
      
    //   // Calculate percentages if not provided
    //   if (!statsData.ram.percentage && statsData.ram.used && statsData.ram.total) {
    //     statsData.ram.percentage = Math.round((statsData.ram.used / statsData.ram.total) * 100)
    //   }
      
    //   if (!statsData.disk.percentage && statsData.disk.used && statsData.disk.total) {
    //     statsData.disk.percentage = Math.round((statsData.disk.used / statsData.disk.total) * 100)
    //   }

    //   // Round values for display
    //   statsData.cpu.usage = Math.round(statsData.cpu.usage)
    //   statsData.cpu.temp = Math.round(statsData.cpu.temp)
    //   statsData.network.upload = Math.round(statsData.network.upload * 10) / 10
    //   statsData.network.download = Math.round(statsData.network.download * 10) / 10

    //   stats.value = statsData

    //   // Update chart history
    //   chartHistory.value.cpu.shift()
    //   chartHistory.value.cpu.push(statsData.cpu.usage)
      
    //   chartHistory.value.ram.shift()
    //   chartHistory.value.ram.push(statsData.ram.percentage)
      
    //   chartHistory.value.disk.shift()
    //   chartHistory.value.disk.push(statsData.disk.percentage)
      
    //   chartHistory.value.network.shift()
    //   chartHistory.value.network.push(Math.min(statsData.network.download, 100))
    // }

    // ============= API CALL: Services Status =============
    // Expected Response Format:
    // {
    //   "services": [
    //     {
    //       "name": "SSH Server",
    //       "status": "running" | "stopped",
    //       "port": 22
    //     },
    //     ...
    //   ]
    // }
    // const servicesResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.services}`, {
    //   headers: { 'Accept': 'application/json' }
    // })

    // if (servicesResponse.ok) {
    //   const servicesData = await servicesResponse.json()
    //   services.value = servicesData.services || services.value
    // }

    // Save successful state to localStorage
    saveCurrentState()

  } catch (error) {
    console.error('Failed to fetch server status:', error)
    serverConnected.value = false
    // Keep displaying last known state from localStorage
  }
}






// Helper function to format uptime from seconds
const formatUptime = (seconds: number): string => {
  const weeks = Math.floor(seconds / 604800)
  const days = Math.floor((seconds % 604800) / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  
  const parts = []
  if (weeks > 0) parts.push(`${weeks} Week${weeks !== 1 ? 's' : ''}`)
  if (days > 0) parts.push(`${days} Day${days !== 1 ? 's' : ''}`)
  if (hours > 0) parts.push(`${hours} Hour${hours !== 1 ? 's' : ''}`)
  
  return parts.length > 0 ? parts.join(', ') : 'Just started'
}

let pollingTimer: ReturnType<typeof setInterval> | null = null
let countdownTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {

  setTimeout(async () => {
    // Load last known state first (for instant display)
  loadLastKnownState()
  
  // Then attempt to fetch fresh data
  fetchServerStatus()
  
  // Set up polling at configured interval
  pollingTimer = setInterval(fetchServerStatus, API_CONFIG.pollingInterval)

  // Per-second countdown to next ping
  countdownTimer = setInterval(() => {
    if (secondsUntilNextPing.value > 0) secondsUntilNextPing.value--
  }, 1000)
  }, 400)
  
})

onUnmounted(() => {
  if (pollingTimer) clearInterval(pollingTimer)
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<template>
  <div class="homelab-page">
    <!-- No navbar on the single-page site; this is the only way back -->
    <NuxtLink to="/" class="back-link" aria-label="Back to shaafyousaf.com">
      <img src="/optimized/images/shaafonlylabsfontlogoshort_Small.webp" alt="Shaaf" />
      <span>← Back</span>
    </NuxtLink>

    <!-- Hero Section -->
    <HomelabHero 
      :background-image="backgroundImage"
      :overlay-image="overlayImage"
      :hostname="hostname"
      :server-connected="serverConnected"
      :uptime="uptime"
      :seconds-until-next-ping="secondsUntilNextPing"
      :ping-interval="PING_INTERVAL_SECS"
    />

    <!-- Tab Navigation -->
    <!-- <div class="tab-navigation-container">
      <div class="tab-navigation">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'overview' }"
          @click="activeTab = 'overview'"
        >
          <Icon name="heroicons:document-text-20-solid" class="tab-icon" />
          <span class="tab-label">Project Overview</span>
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'statistics' }"
          @click="activeTab = 'statistics'"
        >
          <Icon name="heroicons:chart-bar-square-20-solid" class="tab-icon" />
          <span class="tab-label">Live Statistics</span>
        </button>
      </div>
    </div> -->

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'" class="tab-panel">
        <HomelabArticle />
      </div>

      <!-- Statistics Tab -->
      <div v-show="activeTab === 'statistics'" class="tab-panel">
        <HomelabDashboard 
          :server-connected="false"
          :stats="stats"
          :chart-history="chartHistory"
          :services="services"
          :hardware="hardware"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.homelab-page {
  background: #000000;
  min-height: 100vh;
  position: relative;
}

.back-link {
  position: absolute;
  top: clamp(1.25rem, 4vw, 2.5rem);
  left: clamp(1.25rem, 4vw, 3rem);
  z-index: 120;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Nexa', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

.back-link img {
  height: 40px;
  width: auto;
}

.back-link:hover span {
  color: var(--color-gold);
}

/* Tab Navigation */
.tab-navigation-container {
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 110;
  backdrop-filter: blur(20px);
  padding: 0.5rem 0;
}

.tab-navigation {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 0;
}

.tab-button {
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  background: transparent;
  border: none;
  padding: 1.25rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  letter-spacing: 0.5px;
}

.tab-button .tab-icon,
.tab-button :deep(.tab-icon),
.tab-button :deep(.tab-icon svg) {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  fill: currentColor;
  flex-shrink: 0;
  display: block;
}

.tab-button:hover {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.03);
}

.tab-button.active {
  color: #ffffff;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Tab Content */
.tab-content {
  background: #000000;
  padding: 3rem 0;
}

.tab-panel {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .tab-navigation-container {
    padding: 0.75rem 0;
  }

  .tab-navigation {
    padding: 0 1.5rem;
  }

  .tab-button {
    padding: 1.25rem 1.5rem;
    font-size: 0.85rem;
  }

  .tab-button .tab-icon,
  .tab-button :deep(.tab-icon),
  .tab-button :deep(.tab-icon svg) {
    width: 20px;
    height: 20px;
  }

  .tab-content {
    padding: 2rem 0;
  }
}

@media (max-width: 480px) {
  .tab-navigation-container {
    padding: 1rem 0;
    min-height: 70px;
  }

  .tab-navigation {
    justify-content: center;
    gap: 0.5rem;
    height: 100%;
  }

  .tab-button {
    padding: 1.25rem 1rem;
    flex: 1;
    justify-content: center;
    min-width: 120px;
    height: 100%;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .tab-button.active {
    color: #ffffff;
  }
  
  .tab-button:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .tab-button .tab-icon {
    display: none;
  }
  
  .tab-button .tab-label {
    display: block;
    text-align: center;
    line-height: 1.2;
  }
}
</style>
