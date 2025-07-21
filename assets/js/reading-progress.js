// Reading Progress Bar
class ReadingProgress {
  constructor() {
    this.progressBar = null;
    this.isPostPage = document.querySelector(".post-layout") !== null;
    this.init();
  }

  init() {
    // Check if we're on a post page
    this.isPostPage =
      document.querySelector("article") !== null &&
      (window.location.pathname.includes("/posts/") ||
        document.querySelector(".post-tail-wrapper") !== null);

    if (this.isPostPage) {
      this.createProgressBar();
      this.bindEvents();
    }
  }

  createProgressBar() {
    const progressContainer = document.createElement("div");
    progressContainer.className = "reading-progress-container";
    progressContainer.innerHTML = '<div class="reading-progress-bar"></div>';

    document.body.appendChild(progressContainer);
    this.progressBar = progressContainer.querySelector(".reading-progress-bar");
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      this.updateProgress();
    });

    // Update on resize
    window.addEventListener("resize", () => {
      this.updateProgress();
    });
  }

  updateProgress() {
    if (!this.progressBar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight > 0) {
      const progress = (scrollTop / docHeight) * 100;
      this.progressBar.style.width = Math.min(progress, 100) + "%";
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ReadingProgress();
});
