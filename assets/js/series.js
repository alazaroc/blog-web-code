// Series Management System
class SeriesManager {
  constructor() {
    this.seriesData = null;
    this.isReset = false; // Track if progress bars were manually reset
    this.init();
  }

  init() {
    this.loadSeriesData();
    this.setupSeriesBanners();
    this.setupSeriesInPostList();
    this.setupCollapsibleSections();
    this.markReadStatusInSidebar();

    // Check if we're on the series page
    const isSeriesPage = window.location.pathname.includes("/series/");

    // Check if progress bars were manually reset
    this.isReset = sessionStorage.getItem("seriesProgressReset") === "true";

    // If not on series page, clear reset state
    if (!isSeriesPage) {
      sessionStorage.removeItem("seriesProgressReset");
      this.isReset = false;
    }

    if (!this.isReset) {
      this.fixProgressBars();
    }
  }

  loadSeriesData() {
    // Get current language using utility
    const currentLang =
      window.PlayingAWS?.Utils?.Localization?.getCurrentLanguage() || "en";

    // Try to get series data from locale
    try {
      // This will be populated by Jekyll with the current locale's series data
      if (window.localeSeriesData && window.localeSeriesData[currentLang]) {
        this.seriesData = window.localeSeriesData[currentLang];
      }
    } catch (error) {
      this.seriesData = null;
    }
  }

  setupSeriesBanners() {
    // Find series banner if it exists
    const seriesBanner = document.querySelector(".series-banner");
    if (!seriesBanner) {
      return;
    }

    // Calculate progress for series banner
    this.calculateSeriesBannerProgress(seriesBanner);

    // Add data attributes for tooltips
    const navItems = seriesBanner.querySelectorAll(".series-nav-item");
    navItems.forEach((item) => {
      const title = item.querySelector(".series-nav-title");
      if (title && title.textContent.length > 20) {
        item.setAttribute("data-full-title", title.textContent.trim());
      }
    });

    // Marcar artículos leídos/no leídos en el banner
    this.markReadStatusInBanner();
  }

  markReadStatusInBanner() {
    const banner = document.querySelector(".series-banner");
    if (!banner) return;
    const links = banner.querySelectorAll(".series-article-link");
    const gamification = window.gamification;
    const postsRead =
      gamification && gamification.userStats
        ? gamification.userStats.postsRead
        : [];
    links.forEach((link) => {
      const href = link.getAttribute("href");
      const icon = link.querySelector(".series-read-icon");
      if (!icon) return;
      if (postsRead.includes(href)) {
        link.classList.remove("unread");
        icon.textContent = "🟢";
        icon.title = "Read";
        icon.classList.remove("unread");
        icon.classList.add("read");
      } else {
        link.classList.add("unread");
        icon.textContent = "🔴";
        icon.title = "Not read yet";
        icon.classList.remove("read");
        icon.classList.add("unread");
      }
    });
  }

  // Nuevo: marcar en el menú lateral de series
  markReadStatusInSidebar() {
    const links = document.querySelectorAll(
      ".article-link, .series-article-link"
    );
    const gamification = window.gamification;
    const postsRead =
      gamification && gamification.userStats
        ? gamification.userStats.postsRead
        : [];
    links.forEach((link) => {
      const href = link.getAttribute("href");
      let icon = link.querySelector(".series-read-icon");
      if (!icon) {
        icon = document.createElement("span");
        icon.className = "series-read-icon";
        link.appendChild(icon);
      }
      if (postsRead.includes(href)) {
        link.classList.remove("unread");
        icon.textContent = "🟢";
        icon.title = "Read";
        icon.classList.remove("unread");
        icon.classList.add("read");
      } else {
        link.classList.add("unread");
        icon.textContent = "🔴";
        icon.title = "Not read yet";
        icon.classList.remove("read");
        icon.classList.add("unread");
      }
    });
  }

  calculateSeriesBannerProgress(seriesBanner) {
    const progressFill = seriesBanner.querySelector(".progress-fill");
    if (!progressFill) {
      return;
    }

    const seriesName = progressFill.getAttribute("data-series");
    const currentOrder = parseInt(
      progressFill.getAttribute("data-current-order")
    );
    const total = parseInt(progressFill.getAttribute("data-total"));

    // Get user's reading progress from gamification system
    const gamification = window.gamification;
    const userStats = gamification ? gamification.userStats : null;
    const postsRead = userStats ? userStats.postsRead : [];

    // Find the series in our data
    let series = null;
    if (this.seriesData) {
      for (const [seriesId, seriesData] of Object.entries(this.seriesData)) {
        if (seriesData.name === seriesName) {
          series = seriesData;
          break;
        }
      }
    }

    if (!series) {
      // Fallback: use the simple calculation method
      const progress = total > 0 ? (currentOrder / total) * 100 : 0;
      progressFill.style.width = `${progress}%`;
      return;
    }

    // Calculate how many posts the user has read in this series
    let readCount = 0;
    series.posts.forEach((post) => {
      if (postsRead.includes(post.url)) {
        readCount++;
      }
    });

    // Calculate progress percentage based on actual read posts
    const progress = total > 0 ? (readCount / total) * 100 : 0;
    progressFill.style.width = `${progress}%`;

    // Mostrar el porcentaje a la derecha de la barra
    const progressValueSpan = seriesBanner.querySelector(
      ".series-progress-value"
    );
    if (progressValueSpan) {
      progressValueSpan.textContent = `${Math.round(progress)}%`;
    }

    // Update progress color based on completion
    if (progress === 100) {
      progressFill.style.background =
        "linear-gradient(90deg, var(--aws-orange), var(--aws-accent))";
    } else {
      progressFill.style.background =
        "linear-gradient(90deg, var(--aws-orange), #ff6b35)";
    }
  }

  setupSeriesInPostList() {
    // Add series badges to post list items
    const postEntries = document.querySelectorAll(".post-entry");
    postEntries.forEach((entry) => {
      const seriesData = this.getSeriesData(entry);
      if (seriesData) {
        this.addSeriesBadge(entry, seriesData);
      }
    });
  }

  setupCollapsibleSections() {
    // Make series sections collapsible
    const sectionHeaders = document.querySelectorAll(".section-header");
    sectionHeaders.forEach((header) => {
      header.style.cursor = "pointer";
      // Sincroniza el icono con el estado inicial
      const sectionContent = header.nextElementSibling;
      const toggleIcon = header.querySelector(".toggle-icon");
      if (sectionContent && toggleIcon) {
        if (sectionContent.classList.contains("collapsed")) {
          toggleIcon.className = "fas fa-chevron-right toggle-icon";
        } else {
          toggleIcon.className = "fas fa-chevron-down toggle-icon";
        }
      }
      header.addEventListener("click", (e) => {
        // Remove the onclick attribute to prevent double execution
        header.removeAttribute("onclick");
        // Find the section content div
        const sectionContent = header.nextElementSibling;
        if (
          sectionContent &&
          sectionContent.classList.contains("section-content")
        ) {
          const sectionId = sectionContent.id;
          this.toggleSection(sectionId);
        }
      });
    });
  }

  toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const toggleIcon = document.getElementById(
      sectionId.replace("-section", "-toggle")
    );

    if (section && toggleIcon) {
      const isCollapsed =
        section.style.display === "none" ||
        section.classList.contains("collapsed");

      if (isCollapsed) {
        section.style.display = "block";
        section.classList.remove("collapsed");
        toggleIcon.className = "fas fa-chevron-down toggle-icon";
        toggleIcon.style.transform = "rotate(0deg)";
      } else {
        section.style.display = "none";
        section.classList.add("collapsed");
        toggleIcon.className = "fas fa-chevron-right toggle-icon";
        toggleIcon.style.transform = "rotate(0deg)";
      }
    }
  }

  // Function to reset progress bars for testing
  resetProgressBars() {
    // Reset gamification data
    const gamification = window.gamification;
    if (gamification) {
      gamification.userStats.postsRead = [];
      gamification.userStats.badges = [];
      gamification.userStats.seriesRead = {};
      gamification.userStats.likes = {};
      gamification.userStats.comments = 0;
      gamification.saveStats();
      gamification.updateBadges();
    }

    const progressBars = document.querySelectorAll(
      ".series-progress .progress-fill"
    );
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "0%";
      progressBar.style.background =
        "linear-gradient(90deg, var(--aws-orange), #ff6b35)";
      const seriesCard = progressBar.closest(".series-card");
      if (seriesCard) {
        const progressText = seriesCard.querySelector(".series-progress span");
        if (progressText) {
          progressText.textContent = "Not started";
        }
      }
    });

    // Mark that progress bars were manually reset
    this.isReset = true;
    sessionStorage.setItem("seriesProgressReset", "true");
  }

  fixProgressBars() {
    // Get user's reading progress from gamification system
    const gamification = window.gamification;
    const userStats = gamification ? gamification.userStats : null;
    const postsRead = userStats ? userStats.postsRead : [];

    const progressBars = document.querySelectorAll(
      ".series-progress .progress-fill"
    );
    progressBars.forEach((progressBar) => {
      const seriesCard = progressBar.closest(".series-card");
      if (seriesCard) {
        const articles = seriesCard.querySelectorAll(".article-link");
        const totalArticles = articles.length;
        let readArticles = 0;

        // Check which articles the user has actually read
        articles.forEach((article) => {
          const href = article.getAttribute("href");
          if (href && postsRead.includes(href)) {
            readArticles++;
          }
        });

        const progress =
          totalArticles > 0 ? (readArticles / totalArticles) * 100 : 0;
        progressBar.style.width = `${progress}%`;

        // Update the progress text
        const progressText = seriesCard.querySelector(".series-progress span");
        if (progressText) {
          if (progress === 100) {
            progressText.textContent = "Complete";
          } else if (progress === 0) {
            progressText.textContent = "Not started";
          } else {
            progressText.textContent = `${Math.round(progress)}% complete`;
          }
        }

        // Add visual indicator for incomplete series
        if (progress < 100) {
          progressBar.style.background =
            "linear-gradient(90deg, var(--aws-orange), #ff6b35)";
        } else {
          progressBar.style.background =
            "linear-gradient(90deg, var(--aws-orange), var(--aws-accent))";
        }
      }
    });
  }

  getSeriesData(postElement) {
    // Try to get series data from various sources
    const cardBody = postElement.querySelector(".card-body");
    if (!cardBody) return null;

    // Check if series info is already in the HTML
    const existingBadge = cardBody.querySelector(".series-badge");
    if (existingBadge) {
      const text = existingBadge.textContent.trim();
      const match = text.match(/(.+) - Part (\d+)\/(\d+)/);
      if (match) {
        return {
          name: match[1].trim(),
          order: parseInt(match[2]),
          total: parseInt(match[3]),
        };
      }
    }

    // Check for series data in post URL or other attributes
    const postLink = cardBody.querySelector('a[href*="/posts/"]');
    if (postLink && this.seriesData) {
      const url = postLink.getAttribute("href");
      return this.findSeriesByUrl(url);
    }

    return null;
  }

  findSeriesByUrl(url) {
    if (!this.seriesData) return null;

    for (const [seriesId, series] of Object.entries(this.seriesData)) {
      const post = series.posts.find((p) => p.url === url);
      if (post) {
        return {
          name: series.name,
          description: series.description,
          order: post.order,
          total: series.posts.length,
        };
      }
    }
    return null;
  }

  addSeriesBadge(postElement, seriesData) {
    const cardBody = postElement.querySelector(".card-body");
    if (!cardBody) return;

    // Remove existing series indicator if present
    const existingIndicator = cardBody.querySelector(".series-indicator");
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Create new series indicator
    const seriesIndicator = document.createElement("div");
    seriesIndicator.className = "series-indicator";

    let badgeHTML = `
      <span class="series-badge">
        <i class="fas fa-book-open"></i>
        ${seriesData.name} - Part ${seriesData.order}/${seriesData.total}
      </span>
    `;

    // Add description if available
    if (seriesData.description) {
      badgeHTML += `
        <div class="series-description">
          <small>${seriesData.description}</small>
        </div>
      `;
    }

    seriesIndicator.innerHTML = badgeHTML;

    // Insert at the beginning of card body
    cardBody.insertBefore(seriesIndicator, cardBody.firstChild);
  }

  // Method to create series banner for individual posts
  createSeriesBanner(seriesId, currentPostUrl) {
    if (!this.seriesData || !this.seriesData[seriesId]) return "";

    const series = this.seriesData[seriesId];
    const currentIndex = series.posts.findIndex(
      (post) => post.url === currentPostUrl
    );
    if (currentIndex === -1) return "";

    const progress = ((currentIndex + 1) / series.posts.length) * 100;

    const navigationHTML = series.posts
      .map((post, index) => {
        const isActive = post.url === currentPostUrl;
        const isCompleted = index < currentIndex;

        let statusClass = "";
        if (isActive) statusClass = "active";
        else if (isCompleted) statusClass = "completed";

        return `
        <a href="${post.url}" class="series-nav-item ${statusClass}" 
           data-full-title="${post.title}">
          <span class="series-nav-number">${index + 1}</span>
          <span class="series-nav-title">${post.title}</span>
        </a>
      `;
      })
      .join("");

    let bannerHTML = `
      <div class="series-banner">
        <div class="series-header">
          <h3 class="series-title">
            <i class="fas fa-book-open"></i>
            ${series.name}
          </h3>
          <div class="series-progress-bar">
            <div class="progress">
              <div class="progress-bar" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>
        <p class="series-progress">
          Part ${currentIndex + 1} of ${series.posts.length} • ${Math.round(
      progress
    )}% complete
        </p>
    `;

    // Add description if available
    if (series.description) {
      bannerHTML += `
        <div class="series-description-banner">
          <p>${series.description}</p>
        </div>
      `;
    }

    bannerHTML += `
        <div class="series-navigation">
          ${navigationHTML}
        </div>
        ${
          currentIndex < series.posts.length - 1
            ? `
          <div class="series-continue">
            <a href="${series.posts[currentIndex + 1].url}" class="btn">
              Continue to Part ${currentIndex + 2} →
            </a>
          </div>
        `
            : ""
        }
      </div>
    `;

    return bannerHTML;
  }
}

// Initialize series manager
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit to ensure gamification is loaded
  setTimeout(() => {
    window.seriesManager = new SeriesManager();
  }, 100);
});

// Clear reset state when leaving the page
window.addEventListener("beforeunload", () => {
  sessionStorage.removeItem("seriesProgressReset");
});

// Global function for onclick handlers
function toggleSection(sectionId) {
  const seriesManager = window.seriesManager || new SeriesManager();
  seriesManager.toggleSection(sectionId);
}

// Global function to reset progress bars for testing
function resetSeriesProgress() {
  const seriesManager = window.seriesManager || new SeriesManager();
  seriesManager.resetProgressBars();
}

// Global function to recalculate progress bars
function recalculateProgress() {
  const seriesManager = window.seriesManager || new SeriesManager();
  seriesManager.isReset = false;
  sessionStorage.removeItem("seriesProgressReset");
  seriesManager.fixProgressBars();
}

// Global function to clear reset state and show real progress
function clearResetState() {
  const seriesManager = window.seriesManager || new SeriesManager();
  seriesManager.isReset = false;
  sessionStorage.removeItem("seriesProgressReset");
  seriesManager.fixProgressBars();
}
