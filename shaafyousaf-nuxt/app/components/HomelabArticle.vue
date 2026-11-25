<script setup lang="ts">
import { Motion } from 'motion-v'
</script>

<template>
  <Motion class="article-container" :initial="{ opacity: 0, y: 30 }" :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, delay: 0.2 }">
    <article class="homelab-article">
      <!-- Introduction -->
      <section class="article-section">
        <h2 class="section-title">Introduction</h2>
        <p class="article-text">
         Welcome to my HomeLab Page. I built this lab to learn how to manage servers, 
         so that I could eventually build a better lab to manage the servers I bought to learn how to manage servers.

        </p>
        <p class="article-text">
          Like all things in life, one does not magically rise to the top of a skill ladder without first stepping on the 
          first rung. There is a whole world of software that is only useful on machines that run 24 hours a day, 7 days a week, 52 weeks a year.
          Therefore, the only way to learn those softwares is to have my own machine that runs 24/7.

          </p>
        <p class="article-text">
          This server is my production playground. Here I deploy services, automate workflows, experiment with new technologies, 
          and manage real infrastructure. It’s where I learn how systems behave in the real world — the same principles used in enterprise environments.
        </p>

        <p class="article-text">
          Below is a collection of the services I run, monitor, and maintain on this system.
        </p>
      </section>

      <!-- Hardware & Network Infrastructure -->
      <section class="article-section">
        <h2 class="section-title">Hardware & Network Infrastructure</h2>
       <p class="article-text">
          The server runs on a repurposed Dell Inspiron 5584 with an Intel i7-8565U, 16GB RAM, and a 240GB SSD. 
          I chose to reuse existing hardware to build a cost-efficient, always-on system with enough capacity 
          to run multiple services and infrastructure workloads.
        </p>

        <p class="article-text">
          While this isn’t enterprise hardware, it provides more than enough headroom to simulate real production 
          environments at a small scale — allowing me to deploy, monitor, and manage services under realistic constraints.
        </p>

         <p class="article-text">
          For network reliability, the system is connected through two Ethernet links — a primary
          gigabit connection and a secondary 300Mbps backup — so services stay available if the main connection goes
          down.
        </p>
         <!-- <figure class="image-figure">
          <img src="/optimized/homelab/motherboardimage.webp" alt="Preparing motherboard for a new 3D Printed Case (NEW)" class="article-image" />
          <figcaption>Preparing motherboard for a new 3D Printed Case (NEW)</figcaption>
        </figure>
         <figure class="image-figure">
          <img src="/optimized/homelab/setupimage.webp" alt="Ethernet Connections Image (NEW)" class="article-image" />
          <figcaption>Ethernet Connections Image (NEW)</figcaption>
        </figure> -->
        <figure class="image-figure">
          <img src="/optimized/homelab/setupimage2.webp" alt="Hardware Setup Image" class="article-image" />
          <figcaption>Hardware Setup (Old Image without backup Ethernet)</figcaption>
        </figure>
        <p class="article-text">
          My network is built around a Nighthawk multi-gig router, giving the homelab enough capacity to
          handle remote access, web traffic, media streaming, and internal services without hickups.
        </p>

        <figure class="image-figure">
          <img src="/optimized/homelab/networkTopology.webp" alt="Network Topology Diagram" class="article-image" />
          <figcaption>My Home Network Topology</figcaption>
        </figure>
      </section>

      <!-- Core Services -->
      <section class="article-section">
        <h2 class="section-title">Core Services & Infrastructure</h2>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:server-20-solid" />
            Ubuntu Server
          </h3>
          <p class="article-text">
            I run Ubuntu Server instead of a desktop operating system to minimize resource usage and power consumption. A lightweight, headless Linux environment reduces system overhead, allowing more services to run efficiently while keeping electricity usage low during idle periods.
          </p>

          <p class="article-text">
            The server is managed entirely over SSH from other machines, eliminating the need for a graphical interface and keeping the setup simple, stable, and optimized for long-term, 24/7 operation.
          </p>


        </div>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:cube-20-solid" />
            Docker & Containerization
          </h3>
          <p class="article-text">
            Docker serves as my containerization platform, allowing me to run isolated services with ease.
            I store Docker Compose files on the Samba network drive (see later in this article) for version control and easy management.
          </p>
        </div>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:shield-check-20-solid" />
            WireGuard VPN with DuckDNS
          </h3>
          <p class="article-text">
            A machine with an uptime of months is bound to break down every now and then. So I set up a WireGuard VPN with DuckDNS 
            so I can securely connect to my server from anywhere. This lets me
            manage the server, access my files, and use internal services as if I were on the local network.           
          </p>
          <p class="article-text">
            Access is restricted through firewall rules and VPN authentication, ensuring that internal services 
            remain private and are never exposed directly to the public internet. This setup provides fast, 
            reliable, and secure remote control while maintaining a strong security posture.
          </p>

          <figure class="image-figure">
            <img src="/optimized/homelab/vpnconnectionFlowChat.webp" alt="VPN Connection Flow Diagram" class="article-image" />
            <figcaption>My VPN Connection Flow</figcaption>
          </figure>
        </div>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:folder-open-20-solid" />
            Samba Network Drive
          </h3>
          <p class="article-text">
            I use Samba to create a shared storage system that my personal Windows machines can access like a network drive.
            It acts as a central place for my media, Docker configurations, website builds, project files, and other
            important data. Having everything in one location makes it easy to work across devices and keeps my
            environment organized.
          </p>

        </div>
      </section>

      <!-- Web Hosting & Security -->
      <section class="article-section">
        <h2 class="section-title">Web Hosting & Security Architecture</h2>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:cloud-20-solid" />
            Cloudflare Zero Trust Tunnel & Nginx
          </h3>
          <p class="article-text">
            For web hosting, I use a Cloudflared Tunnel together with an Nginx reverse proxy to publish services without
            opening ports on my router. This lets me run websites from home while keeping the network private and
            reducing the attack surface.
          </p>
          <ul class="article-list">
            <li>The server’s real IP stays hidden behind Cloudflare</li>
            <li>Traffic is filtered and protected by Cloudflare’s network</li>
            <li>No direct inbound ports exposed on the home network</li>
            <li>SSL/TLS is handled automatically</li>
            <li>Requests are routed internally through Nginx to the right services</li>
            <li>Taking advantage of Cloudflare cache, which limits the requests incoming to my server. This helps save on hardware resources.</li>
          </ul>
          <p class="article-text">
            This setup lets me host multiple applications securely while keeping control of the infrastructure. It’s the
            same architecture many enterprises use at a production level. I have learned how to minimize exposure, layer security, and keep
            services isolated behind a controlled entry point using this configuration.
          </p>

          <figure class="image-figure">
            <img src="/optimized/homelab/cloudflaredflowchart.webp" alt="Cloudflare Tunnel & Nginx Architecture Flowchart"
              class="article-image" />
            <figcaption>Cloudflare Tunnel & Nginx Architecture Flowchart</figcaption>
          </figure>
        </div>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:puzzle-piece-20-solid" />
            Minecraft Server
          </h3>
          <p class="article-text">
            "The only thing faster than the speed of light is how quickly a 'Testing Environment' becomes a 'Survival Minecraft' server."<br>
            <span style="font-size: 0.8em; color: gray;">— <b>u/KernelPanicAtTheDisco</b> (1.2k upvotes)</span>
          </p>

          <p class="article-text">            
            I run a Minecraft server in a Docker container with a port opened so friends can connect directly without
            needing a VPN. This is one of the only service with a port intentionally exposed, and I’ve limited access to only
            the required port using UFW firewall rules. It’s a deliberate trade-off between security and usability, with
            the rest of the system kept isolated and protected.
          </p>

        </div>
      </section>

      <!-- Firewall & Security -->
      <section class="article-section">
        <h2 class="section-title">Firewall & Security Measures</h2>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:shield-exclamation-20-solid" />
            Uncomplicated Firewall (UFW)
          </h3>
          <p class="article-text">
            I use UFW to control which ports and services are allowed to communicate with the server. By default,
            everything is blocked and only the ports that are absolutely necessary are opened. This keeps the exposed
            surface minimal and helps prevent unwanted access to the system.
          </p>
          <p class="article-text">
            The goal is to contain risk — even if one service has an issue, it can’t easily reach other parts of my
            network or access anything it shouldn’t. I try to treat the setup with the same security mindset I would use
            in a production environment.
          </p>

        </div>
      </section>

      <!-- Media & Monitoring -->
      <section class="article-section">
        <h2 class="section-title">Media & Monitoring Services</h2>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:film-20-solid" />
            Plex Media Server
          </h3>
          <p class="article-text">
            I run Plex as a self-hosted media service to manage and stream content stored on my network share. It
            handles indexing, metadata management, and efficient streaming to devices both locally and remotely.
          </p>

        </div>

        <div class="service-subsection">
          <h3 class="service-title">
            <Icon name="heroicons:chart-bar-20-solid" />
            Glances Monitoring
          </h3>
          <p class="article-text">
            I use Glances for real-time system monitoring through a web interface on the local network. It tracks key
            metrics like CPU, memory, disk activity, network usage, running processes, and even docker containers. It comes with an integrated REST API
            which I fetch with my own ASP.NET Core backend to collect live system statistics displayed on shaafyousaf.com/homelab.
          </p>

          <figure class="image-figure">
            <img src="/optimized/homelab/glancesScreenShot.webp" alt="Monitoring Dashboard Screenshot" class="article-image" />
            <figcaption>Local Glances Dashboard Screenshot</figcaption>
          </figure>
        </div>
      </section>

      <!-- Additional Services -->
      <section class="article-section">
        <h2 class="section-title">Additional Local Services</h2>
        <p class="article-text">
          In addition to the core services, I host several internal websites and tools for development, testing, and
          personal projects. These environments let me experiment safely, test deployments, and run applications before
          exposing anything publicly. Having dedicated internal services also helps streamline my workflow and keeps my
          development and infrastructure work organized.
        </p>

      </section>

      <!-- Future Plans -->
      <!-- <section class="article-section">
        <h2 class="section-title">Future Expansion Plans</h2>
        <p class="article-text">
          There's still much to explore and implement in this homelab environment:
        </p>
        <ul class="article-list">
          <li>
            <strong>Kubernetes Deployment:</strong> Setting up a Kubernetes cluster for container orchestration 
            and learning production-grade deployment practices
          </li>
          <li>
            <strong>SQL Database Server:</strong> Running a dedicated database server for various applications 
            and projects
          </li>
          <li>
            <strong>Second Server Integration:</strong> I have a second server (not yet operational as of 
            February 13, 2026) that I plan to bring online for redundancy and expansion
          </li>
          <li>
            <strong>Database Backup System:</strong> Implementing automated backups from the primary server 
            to the secondary server for data safety
          </li>
          <li>
            <strong>Load Balancing:</strong> Setting up proper load balancing across both servers to distribute 
            traffic and improve reliability
          </li>
          <li>
            <strong>Multi-Server Kubernetes:</strong> Eventually running a Kubernetes cluster spanning both 
            home servers for high availability and learning distributed systems
          </li>
        </ul>
        <p class="article-text">
          These plans involve technical hurdles that need solving, particularly around networking, data 
          synchronization, and ensuring high availability. However, these challenges are exactly what makes 
          homelab projects exciting—they provide hands-on experience with enterprise-level infrastructure.
        </p>
        <div class="image-placeholder">
          <Icon name="heroicons:rocket-launch-20-solid" />
          <span>Future Architecture Diagram</span>
        </div>
      </section> -->

      <!-- Conclusion -->
      <section class="article-section">
        <h2 class="section-title">Conclusion</h2>
       <p class="article-text">
          This setup reflects how I like to learn: by building, testing, and improving continuously. 
          It’s an ongoing project that grows with my skills and curiosity.
      </p>
      <p class="article-text">
    Reach out to me for more information/collaboration. I'd love to talk.
</p>

      </section>
    </article>
  </Motion>
</template>

<style scoped>
.article-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.homelab-article {
  color: #ffffff;
}

.article-section {
  margin-bottom: 3rem;
}

.section-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.5px;
}

.service-subsection {
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(255, 255, 255, 0.15);
}

.service-title {
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #ffffff;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-title svg {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.article-text {
  font-family: 'Nexa', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 1rem 0;
}

.article-list {
  font-family: 'Nexa', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin: 1rem 0 1rem 1.5rem;
  padding: 0;
}

.article-list li {
  margin-bottom: 0.75rem;
}

.article-list strong {
  color: #ffffff;
  font-weight: 600;
}

.image-placeholder {
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 3rem 2rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.image-placeholder:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.image-placeholder svg {
  width: 48px;
  height: 48px;
  color: rgba(255, 255, 255, 0.4);
}

.image-placeholder span {
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

/* Image figure styling (replaces placeholders when actual images are available) */
.image-figure {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  margin: 1.5rem 0;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.06);
  transition: all 0.25s ease;
}

.image-figure:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
}

.article-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.image-figure figcaption {
  padding: 0.75rem 1rem;
  font-family: 'Nexa', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  background: rgba(0, 0, 0, 0.04);
}

/* Responsive Design */
@media (max-width: 768px) {
  .article-container {
    padding: 0 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .service-title {
    font-size: 1.1rem;
  }

  .article-text,
  .article-list {
    font-size: 0.95rem;
  }

  .service-subsection {
    padding-left: 0.75rem;
  }

  .image-placeholder {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.25rem;
  }

  .service-title {
    font-size: 1rem;
  }

  .article-text,
  .article-list {
    font-size: 0.9rem;
  }
}
</style>
