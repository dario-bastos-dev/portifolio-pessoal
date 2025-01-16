// Toggle mobile menu
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Select type project
const buttons = document.querySelectorAll("button.filter");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.add("inactive");
    });

    btn.classList.remove("inactive");
    btn.classList.add("active");
  });
});

// Scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("animate-loading-bar");
    else entry.target.classList.remove("animate-loading-bar");
  });
});

const bars = document.querySelectorAll("div.loading-bar");

bars.forEach((bar) => observer.observe(bar));

// Carousel
class ProjectCarousel {
  constructor() {
    this.carousel = document.querySelector(".projects-carousel");
    this.projects = Array.from(this.carousel.children);
    this.prevBtn = document.querySelector(".carousel-nav.prev");
    this.nextBtn = document.querySelector(".carousel-nav.next");
    this.currentIndex = 0;
    this.projectsPerView = 1;
    this.totalProjects = this.projects.length;

    this.init();
  }

  init() {
    this.cloneNodes();
    this.updateProjectsPerView();
    this.setupEventListeners();
    this.updateCarousel();
  }

  cloneNodes() {
    // Clone os primeiros e últimos projetos para criar o efeito infinito
    const firstClones = this.projects
      .slice(0, 3)
      .map((node) => node.cloneNode(true));
    const lastClones = this.projects
      .slice(-3)
      .map((node) => node.cloneNode(true));

    firstClones.forEach((clone) => {
      clone.setAttribute("aria-hidden", "true");
      this.carousel.appendChild(clone);
    });

    lastClones.reverse().forEach((clone) => {
      clone.setAttribute("aria-hidden", "true");
      this.carousel.insertBefore(clone, this.carousel.firstChild);
    });

    this.projects = Array.from(this.carousel.children);
    this.currentIndex = 3; // Começar após os clones
    this.updateCarousel(false);
  }

  updateProjectsPerView() {
    if (window.innerWidth >= 1024) {
      this.projectsPerView = 3;
    } else if (window.innerWidth >= 640) {
      this.projectsPerView = 2;
    } else {
      this.projectsPerView = 1;
    }
  }

  setupEventListeners() {
    this.prevBtn.addEventListener("click", () => this.navigate("prev"));
    this.nextBtn.addEventListener("click", () => this.navigate("next"));
    window.addEventListener("resize", () => {
      this.updateProjectsPerView();
      this.updateCarousel();
    });

    this.carousel.addEventListener("transitionend", () =>
      this.handleTransitionEnd()
    );
  }

  navigate(direction) {
    if (direction === "next") {
      this.currentIndex++;
    } else {
      this.currentIndex--;
    }
    this.updateCarousel();
  }

  updateCarousel(smooth = true) {
    const offset = (this.currentIndex * -108) / this.projectsPerView;
    this.carousel.style.transition = smooth
      ? "transform 0.5s ease-in-out"
      : "none";
    this.carousel.style.transform = `translateX(${offset}%)`;
  }

  handleTransitionEnd() {
    // Verifique se chegamos aos clones e reposicione sem animação
    if (this.currentIndex <= 2) {
      this.currentIndex = this.totalProjects + 2;
      this.updateCarousel(false);
    } else if (this.currentIndex >= this.totalProjects + 3) {
      this.currentIndex = 3;
      this.updateCarousel(false);
    }
  }

  filterProjects(category) {
    this.projects.forEach((project) => {
      if (category === "all" || project.dataset.category === category) {
        project.style.display = "";
      } else {
        project.style.display = "none";
      }
    });

    this.currentIndex = 3; // Reset para o início dos projetos reais
    this.updateCarousel();
  }
}

// Inicialize o carrossel quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const carousel = new ProjectCarousel();

  // Adicione funcionalidade aos botões de filtro
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      carousel.filterProjects(e.target.dataset.filter);
    });
  });
});
