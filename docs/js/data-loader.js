/**
 * data-loader.js
 * Centralized data loading utilities for the portfolio
 */

const DataLoader = {
  basePath: 'data/',

  async loadJSON(filename) {
    try {
      const response = await fetch(`${this.basePath}${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`DataLoader: Could not load ${filename}, using fallback data.`, error.message);
      return this.getFallback(filename);
    }
  },

  getFallback(filename) {
    switch (filename) {
      case 'projects.json':
        return this.getFallbackProjects();
      case 'skills.json':
        return this.getFallbackSkills();
      case 'services.json':
        return this.getFallbackServices();
      default:
        console.warn(`DataLoader: No fallback data for ${filename}`);
        return [];
    }
  },

  getFallbackProjects() {
    return [
      {
        id: 1,
        title: "ORYZO",
        description: "React-based e-commerce and gaming shop web application with product catalog, cart functionality, and REST API integration.",
        image: "assets/images/projects/oryzo.svg",
        technologies: ["React", "JavaScript", "HTML", "CSS", "Bootstrap", "REST API"],
        github: "https://github.com/Aamon007/oryzo-dashboard",
        live: "https://oryzo-dashboard.vercel.app/",
        featured: true
      },
      {
        id: 2,
        title: "ASTRALIS",
        description: "Space travel themed interactive web application built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.",
        image: "assets/images/projects/astralis.svg",
        technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/Aamon007/UniverseVIP",
        live: "https://universe-vip.vercel.app/",
        featured: true
      },
      {
        id: 3,
        title: "My Portfolio",
        description: "Personal Portfolio Website",
        image: "assets/images/projects/shophub.svg",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "JSON"],
        github: "https://github.com/Aamon007/portfolio-website",
        live: "https://aamon007.github.io/portfolio-website/",
        featured: true
      },
      {
        id: 4,
        title: "PHP Login & Registration System",
        description: "Secure authentication system with user registration, login, password hashing, session management, and MySQL database integration.",
        image: "assets/images/projects/php-auth.svg",
        technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/Aamon007/php-project-",
        live: "http://shini-store.infinityfree.io/login.php",
        featured: true
      }
    ];
  },

  getFallbackSkills() {
    return [
      {
        category: "Frontend Development",
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "React",
          "JSX",
          "TypeScript / TSX",
          "Bootstrap",
          "REST API"
        ]
      },
      {
        category: "Backend & Database",
        skills: [
          "PHP",
          "MySQL",
          "Authentication Systems",
          "Database Integration"
        ]
      },
      {
        category: "Tools & Development",
        skills: [
          "Git",
          "GitHub",
          "VS Code",
          "Vite",
          "npm",
          "Vercel"
        ]
      },
      {
        category: "IT / Networking / Security",
        skills: [
          "Networking",
          "CCNA studies",
          "Linux",
          "Windows Server",
          "Cybersecurity",
          "Python"
        ]
      }
    ];
  },

  getFallbackServices() {
    return [
      {
        id: 1,
        number: "01",
        title: "Frontend Web Development",
        icon: "bi-layout-text-window",
        description: "Building responsive and interactive user interfaces using HTML, CSS, JavaScript, React, and Bootstrap.",
        tags: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
        link: "contact.html"
      },
      {
        id: 2,
        number: "02",
        title: "React UI Development",
        icon: "bi-code-square",
        description: "Creating component-based user interfaces with React and TypeScript. Experience with Vite, Tailwind CSS, and Framer Motion.",
        tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
        link: "contact.html"
      },
      {
        id: 3,
        number: "03",
        title: "PHP / MySQL Web Development",
        icon: "bi-server",
        description: "Developing server-side applications and authentication systems with PHP and MySQL.",
        tags: ["PHP", "MySQL", "Authentication", "Sessions", "REST API"],
        link: "contact.html"
      },
      {
        id: 4,
        number: "04",
        title: "API Integration",
        icon: "bi-diagram-3",
        description: "Connecting frontend applications with backend services and third-party APIs.",
        tags: ["REST API", "JavaScript", "PHP", "JSON"],
        link: "contact.html"
      },
      {
        id: 5,
        number: "05",
        title: "Responsive Website Development",
        icon: "bi-phone",
        description: "Building mobile-first, responsive websites using modern CSS and Bootstrap.",
        tags: ["Responsive Design", "CSS3", "Bootstrap", "Mobile-First"],
        link: "contact.html"
      },
      {
        id: 6,
        number: "06",
        title: "IT Support & Troubleshooting",
        icon: "bi-tools",
        description: "Providing basic IT support, system configuration, and network troubleshooting.",
        tags: ["Linux", "Windows Server", "Networking", "Python", "Support"],
        link: "contact.html"
      }
    ];
  },

  async loadAndCache(filename) {
    if (!this.cache) {
      this.cache = {};
    }

    if (this.cache[filename]) {
      return this.cache[filename];
    }

    const data = await this.loadJSON(filename);
    this.cache[filename] = data;
    return data;
  },

  clearCache() {
    this.cache = {};
  }
};
