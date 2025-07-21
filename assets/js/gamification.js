// Enhanced Gamification System (No Registration Required)
class Gamification {
  constructor() {
    this.storageKey = "playingaws_gamification";
    this.userStats = this.loadStats();
    this.badgeDefinitions = this.getBadgeDefinitions();
    this.init();
  }

  init() {
    this.setupLikeSystem();
    this.setupReadingTracker();
    this.setupCommentTracker();
    this.updateBadges();
    this.initLanguageTooltips();
  }

  loadStats() {
    const stored = localStorage.getItem(this.storageKey);
    return stored
      ? JSON.parse(stored)
      : {
          likes: {},
          postsRead: [],
          comments: 0,
          badges: [],
          totalVisits: 0,
          seriesRead: {},
        };
  }

  saveStats() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.userStats));
  }

  // Centralized localization function
  getLocalizedText(key, fallback = null) {
    return (
      window.PlayingAWS?.Utils?.Localization?.getText(key, fallback) ||
      fallback ||
      key
    );
  }

  // Badge Definitions with proper order and categories
  getBadgeDefinitions() {
    return {
      // READING BADGES
      first_read: {
        id: "first_read",
        title: this.getLocalizedText("first_read.title"),
        description: this.getLocalizedText("first_read.description"),
        icon: "📖",
        category: "reading",
        requirement: 1,
        type: "posts_read",
      },
      knowledge_seeker: {
        id: "knowledge_seeker",
        title: this.getLocalizedText("knowledge_seeker.title"),
        description: this.getLocalizedText("knowledge_seeker.description"),
        icon: "🔎",
        category: "reading",
        requirement: 10,
        type: "posts_read",
      },
      ultimate_reader: {
        id: "ultimate_reader",
        title: this.getLocalizedText("ultimate_reader.title"),
        description: this.getLocalizedText("ultimate_reader.description"),
        icon: "🏆",
        category: "reading",
        requirement: 50,
        type: "posts_read",
      },
      // SERIES BADGES
      series_finisher: {
        id: "series_finisher",
        title: this.getLocalizedText("series_finisher.title"),
        description: this.getLocalizedText("series_finisher.description"),
        icon: "🤓",
        category: "series",
        requirement: 1,
        type: "series_complete",
      },
      series_guru: {
        id: "series_guru",
        title: this.getLocalizedText("series_guru.title", "Series Guru"),
        description: this.getLocalizedText("series_guru.description"),
        icon: "🏅",
        category: "series",
        requirement: 5,
        type: "series_complete",
      },
      // LIKE BADGES
      first_like: {
        id: "first_like",
        title: this.getLocalizedText("first_like.title", "First Like"),
        description: this.getLocalizedText("first_like.description"),
        icon: "❤️",
        category: "likes",
        requirement: 1,
        type: "likes",
      },
      like_enthusiast: {
        id: "like_enthusiast",
        title: this.getLocalizedText("like_enthusiast.title"),
        description: this.getLocalizedText("like_enthusiast.description"),
        icon: "🚀",
        category: "likes",
        requirement: 5,
        type: "likes",
      },
      // COMMENT BADGES
      first_comment: {
        id: "first_comment",
        title: this.getLocalizedText("first_comment.title"),
        description: this.getLocalizedText("first_comment.description"),
        icon: "💬",
        category: "comments",
        requirement: 1,
        type: "comments",
      },
      feedback_fan: {
        id: "feedback_fan",
        title: this.getLocalizedText("feedback_fan.title"),
        description: this.getLocalizedText("feedback_fan.description"),
        icon: "🗣️",
        category: "comments",
        requirement: 5,
        type: "comments",
      },
      // AWS HERO BADGE
      aws_hero: {
        id: "aws_hero",
        title: this.getLocalizedText("aws_hero.title"),
        description: this.getLocalizedText("aws_hero.description"),
        icon: "🦸",
        category: "special",
        requirement: 1,
        type: "meta",
      },
    };
  }

  // Like System
  setupLikeSystem() {
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
      const postId = post.dataset.postId || window.location.pathname;
      this.addLikeButton(post, postId);
    });
  }

  addLikeButton(container, postId) {
    const likeContainer = document.createElement("div");
    likeContainer.className = "post-like-container";

    const likeButton = document.createElement("button");
    likeButton.className = "btn btn-sm btn-outline-primary post-like-btn";
    likeButton.innerHTML = `
      <i class="fas fa-heart"></i>
      <span class="like-count">${this.getLikeCount(postId)}</span>
    `;

    if (this.userStats.likes[postId]) {
      likeButton.classList.add("liked");
    }

    likeButton.addEventListener("click", () => {
      this.toggleLike(postId, likeButton);
    });

    likeContainer.appendChild(likeButton);
    container.appendChild(likeContainer);
  }

  toggleLike(postId, button) {
    if (this.userStats.likes[postId]) {
      delete this.userStats.likes[postId];
      button.classList.remove("liked");
    } else {
      this.userStats.likes[postId] = true;
      button.classList.add("liked");
    }

    this.saveStats();
    this.checkLikeBadges();
    this.updateBadges();

    const likeCount = button.querySelector(".like-count");
    likeCount.textContent = this.getLikeCount(postId);
  }

  getLikeCount(postId) {
    return this.userStats.likes[postId] ? 1 : 0;
  }

  // Reading Tracker
  setupReadingTracker() {
    const currentPost = window.location.pathname;
    if (
      currentPost.includes("/posts/") &&
      !this.userStats.postsRead.includes(currentPost)
    ) {
      this.userStats.postsRead.push(currentPost);
      // --- INICIO CORRECCIÓN SERIES ---
      // Detectar la serie del post leído
      const seriesName = this.getSeriesFromPost(currentPost);
      if (seriesName) {
        // Inicializar si no existe
        if (!this.userStats.seriesRead[seriesName]) {
          this.userStats.seriesRead[seriesName] = false;
        }
        // Comprobar si ha leído todos los posts de la serie
        const allSeriesPosts = this.getAllPostUrlsForSeries(seriesName);
        const readCount = allSeriesPosts.filter((url) =>
          this.userStats.postsRead.includes(url)
        ).length;
        if (readCount === allSeriesPosts.length) {
          this.userStats.seriesRead[seriesName] = true;
        }
      }
      // --- FIN CORRECCIÓN SERIES ---
      this.saveStats();
      this.checkReadingBadges();
      this.checkSeriesBadges();
      this.updateBadges();
    }
  }

  // Añadir función auxiliar para obtener todos los posts de una serie
  getAllPostUrlsForSeries(seriesName) {
    // Esta función debe devolver un array con los URLs de todos los posts de la serie
    // Si tienes una estructura global window.localeSeriesData, úsala:
    if (window.localeSeriesData) {
      const lang = document.documentElement.lang?.substring(0, 2) || "en";
      const seriesData = window.localeSeriesData[lang];
      if (seriesData) {
        for (const [id, serie] of Object.entries(seriesData)) {
          if (serie.name === seriesName && Array.isArray(serie.posts)) {
            return serie.posts.map((p) => p.url);
          }
        }
      }
    }
    // Fallback: solo el post actual
    return [window.location.pathname];
  }

  // Mejorar getSeriesFromPost para buscar dinámicamente
  getSeriesFromPost(postPath) {
    if (window.localeSeriesData) {
      const lang = document.documentElement.lang?.substring(0, 2) || "en";
      const seriesData = window.localeSeriesData[lang];
      if (seriesData) {
        for (const [id, serie] of Object.entries(seriesData)) {
          if (serie.posts && serie.posts.some((p) => p.url === postPath)) {
            return serie.name;
          }
        }
      }
    }
    // Fallback: mapeo manual
    const seriesMap = {
      "/posts/why-the-aws-well-architected-framework-really-matters/": "waf",
      "/posts/how-to-apply-the-well-architected-framework-depending-on-your-cloud-role/":
        "waf",
      // Add more mappings as needed
    };
    return seriesMap[postPath];
  }

  // Comment Tracker
  setupCommentTracker() {
    this.setupGiscusTracking();
  }

  setupGiscusTracking() {
    // Wait for Giscus to load
    setTimeout(() => {
      const giscusFrame = document.querySelector('iframe[src*="giscus.app"]');
      if (giscusFrame) {
        this.initializeGiscusTracking(giscusFrame);
      }
    }, 2000);
  }

  initializeGiscusTracking(giscusFrame) {
    window.addEventListener("message", (event) => {
      this.handleGiscusMessage(event);
    });
  }

  handleGiscusMessage(event) {
    if (event.origin !== "https://giscus.app") return;

    const { data } = event;
    if (data.giscus && data.giscus.discussion) {
      const commentCount = data.giscus.discussion.totalCommentCount;
      if (commentCount > this.userStats.comments) {
        this.userStats.comments = commentCount;
        this.saveStats();
        this.checkCommentBadges();
        this.updateBadges();
      }
    }
  }

  handleCommentSubmitted() {
    this.userStats.comments++;
    this.saveStats();
    this.checkCommentBadges();
    this.updateBadges();
  }

  // Badge Checking
  checkReadingBadges() {
    const postsRead = this.userStats.postsRead.length;
    const badges = ["first_read", "knowledge_seeker", "ultimate_reader"];

    badges.forEach((badgeId) => {
      const badge = this.badgeDefinitions[badgeId];
      if (
        badge &&
        postsRead >= badge.requirement &&
        !this.userStats.badges.includes(badgeId)
      ) {
        this.awardBadge(badgeId);
      }
    });
  }

  checkLikeBadges() {
    const likesCount = Object.keys(this.userStats.likes).length;
    const badges = ["first_like", "like_enthusiast"];

    badges.forEach((badgeId) => {
      const badge = this.badgeDefinitions[badgeId];
      if (
        badge &&
        likesCount >= badge.requirement &&
        !this.userStats.badges.includes(badgeId)
      ) {
        this.awardBadge(badgeId);
      }
    });
  }

  checkCommentBadges() {
    const commentsCount = this.userStats.comments;
    const badges = ["first_comment", "feedback_fan"];

    badges.forEach((badgeId) => {
      const badge = this.badgeDefinitions[badgeId];
      if (
        badge &&
        commentsCount >= badge.requirement &&
        !this.userStats.badges.includes(badgeId)
      ) {
        this.awardBadge(badgeId);
      }
    });
  }

  checkSeriesBadges() {
    const seriesComplete = Object.values(this.userStats.seriesRead).filter(
      (v) => v === true
    ).length;
    if (
      seriesComplete >= 1 &&
      !this.userStats.badges.includes("series_finisher")
    ) {
      this.awardBadge("series_finisher");
    }
    if (seriesComplete >= 5 && !this.userStats.badges.includes("series_guru")) {
      this.awardBadge("series_guru");
    }
  }

  // Badge meta: AWS Hero
  checkMetaBadges() {
    const allBadgeIds = Object.keys(this.badgeDefinitions).filter(
      (id) => id !== "aws_hero"
    );
    const hasAll = allBadgeIds.every((id) =>
      this.userStats.badges.includes(id)
    );
    if (hasAll && !this.userStats.badges.includes("aws_hero")) {
      this.awardBadge("aws_hero");
    }
  }

  awardBadge(badgeId) {
    const badge = this.badgeDefinitions[badgeId];
    if (!badge) return;

    this.userStats.badges.push(badgeId);
    this.saveStats();
    this.showBadgeNotification(badge);
    this.updateBadges();
    this.checkMetaBadges();
  }

  showBadgeNotification(badge) {
    const notification = document.createElement("div");
    notification.className = "badge-unlock-popup";
    notification.innerHTML = `
      <div class="badge-unlock-content">
        <div class="badge-unlock-icon">${badge.icon}</div>
        <div class="badge-unlock-text">
          <h4>${this.getLocalizedText("celebration", "Congratulations!")}</h4>
          <p>${badge.title}</p>
          <small>${badge.description}</small>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Show animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  updateBadges() {
    // this.showBadgesInPanel();
    // this.showBadgesInSidebar();
    this.showBadgesInHeader();
  }

  // showBadgesInPanel() {
  //   const badgeContainer = document.getElementById("sidebar-badges");
  //   if (!badgeContainer) return;

  //   badgeContainer.innerHTML = this.getBadgesHTML();
  // }

  // showBadgesInSidebar() {
  //   // Update sidebar badges if they exist
  //   const sidebarBadges = document.querySelectorAll(".sidebar-badges");
  //   sidebarBadges.forEach((container) => {
  //     container.innerHTML = this.getBadgesHTML();
  //   });
  // }

  showBadgesInHeader() {
    const headerContainer = document.getElementById("header-badges");
    if (!headerContainer) {
      return;
    }

    const badgesHTML = this.getHeaderBadgesHTML();
    headerContainer.innerHTML = badgesHTML;

    // Add click event listeners to header badges
    const headerBadges = headerContainer.querySelectorAll(".header-badge");
    headerBadges.forEach((badge) => {
      badge.addEventListener("click", (e) => {
        e.preventDefault();
        this.showBadgeDetails(badge);
      });

      // Add JavaScript tooltips as fallback
      const tooltip = badge.getAttribute("data-tooltip");
      if (tooltip) {
        badge.addEventListener("mouseenter", (e) => {
          this.showJSTooltip(e.target, tooltip);
        });

        badge.addEventListener("mouseleave", () => {
          this.hideJSTooltip();
        });
      }
    });
  }

  showJSTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "js-tooltip";
    tooltip.textContent = text;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.bottom + 10 + "px";
  }

  hideJSTooltip() {
    const tooltip = document.querySelector(".js-tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Initialize tooltips for language switcher
  initLanguageTooltips() {
    document.addEventListener("DOMContentLoaded", () => {
      const langElements = document.querySelectorAll(
        ".lang-switcher-compact [data-tooltip], .lang-switcher .nav-link[data-tooltip], .lang-switcher-container [data-tooltip]"
      );
      langElements.forEach((element) => {
        element.addEventListener("mouseenter", (e) => {
          const tooltip = element.getAttribute("data-tooltip");
          if (tooltip) {
            this.showJSTooltip(element, tooltip);
          }
        });
        element.addEventListener("mouseleave", () => {
          this.hideJSTooltip();
        });
      });
    });
  }

  showBadgeDetails(badgeElement) {
    const badgeId = badgeElement.dataset.badgeId;
    const badge = this.badgeDefinitions[badgeId];
    if (!badge) {
      return;
    }

    const stats = this.getCategoryStats(badge.category);
    const isUnlocked = this.userStats.badges.includes(badgeId);
    const progress = Math.min((stats.current / badge.requirement) * 100, 100);
    const remaining = badge.requirement - stats.current;

    this.showBadgeModal(badge, stats, isUnlocked, progress, remaining);
  }

  showBadgeModal(badge, stats, isUnlocked, progress, remaining) {
    // Textos
    const lang = document.documentElement.lang?.substring(0, 2) || "en";
    const completed = window.locales[lang].badges.completed;
    const moreNeeded = window.locales[lang].badges.more_needed;
    const badgeUnlocked = window.locales[lang].badges.unlocked;

    // Remove existing modal if any
    const existingModal = document.getElementById("badge-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "badge-modal";
    modal.className = "badge-modal-overlay";

    const modalContent = `
      <div class="badge-modal-content">
        <div class="badge-modal-header">
          <div class="badge-modal-icon">${badge.icon}</div>
          <div class="badge-modal-title">${badge.title}</div>
          <button class="badge-modal-close" onclick="this.closest('.badge-modal-overlay').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="badge-modal-body">
          <p class="badge-modal-description">${badge.description}</p>
          <div class="badge-modal-progress">
            ${
              isUnlocked
                ? `<div class="badge-modal-unlocked">✅ ${badgeUnlocked}</div>`
                : `<div class="badge-modal-progress-bar">
                <div class="badge-modal-progress-fill" style="width: ${progress}%"></div>
              </div>
              <div class="badge-modal-progress-text">
                ${stats.current}/${badge.requirement} ${completed}
                ${remaining > 0 ? `(${remaining} ${moreNeeded})` : ""}
              </div>`
            }
          </div>
        </div>
      </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  getHeaderBadgesHTML() {
    // Mostrar primero los badges de lectura, luego los de series, luego los de likes, luego los de comentarios, y aws_hero el último
    const readingBadges = ["first_read", "knowledge_seeker", "ultimate_reader"];
    const seriesBadges = ["series_finisher", "series_guru"];
    const likeBadges = ["first_like", "like_enthusiast"];
    const commentBadges = ["first_comment", "feedback_fan"];
    let html = "";
    readingBadges.forEach((id) => {
      const badge = this.badgeDefinitions[id];
      if (badge) {
        html += this.getHeaderBadgeHTML(badge);
      }
    });
    seriesBadges.forEach((id) => {
      const badge = this.badgeDefinitions[id];
      if (badge) {
        html += this.getHeaderBadgeHTML(badge);
      }
    });
    likeBadges.forEach((id) => {
      const badge = this.badgeDefinitions[id];
      if (badge) {
        html += this.getHeaderBadgeHTML(badge);
      }
    });
    commentBadges.forEach((id) => {
      const badge = this.badgeDefinitions[id];
      if (badge) {
        html += this.getHeaderBadgeHTML(badge);
      }
    });
    // AWS Hero SIEMPRE el último
    const awsHero = this.badgeDefinitions["aws_hero"];
    if (awsHero) {
      html += this.getHeaderBadgeHTML(awsHero);
    }
    return html;
  }

  // Helper para header badge
  getHeaderBadgeHTML(badge) {
    const isUnlocked = this.userStats.badges.includes(badge.id);
    let stats;
    if (["series_finisher", "series_guru"].includes(badge.id)) {
      // Series completas: limitar al requirement del badge
      const seriesCompletas = Object.values(this.userStats.seriesRead).filter(
        (v) => v === true
      ).length;
      const current = Math.min(seriesCompletas, badge.requirement);
      stats = { current, requirement: badge.requirement };
    } else if (badge.type === "posts_read") {
      stats = {
        current: this.userStats.postsRead.length,
        requirement: badge.requirement,
      };
    } else {
      stats = { current: 0, requirement: badge.requirement };
    }
    let tooltip = badge.title;
    if (isUnlocked) {
      tooltip += ` ✅`;
    } else {
      tooltip += ` (${stats.current}/${stats.requirement})`;
    }
    return `
      <div class="header-badge ${isUnlocked ? "unlocked" : "locked"}" 
           data-badge-id="${badge.id}"
           data-tooltip="${tooltip}">
        ${badge.icon}
        ${
          !isUnlocked && stats.current > 0
            ? `<div class="header-badge-counter">${stats.current}</div>`
            : ""
        }
      </div>
    `;
  }

  // Devuelve el total de series existentes (únicas)
  getTotalSeriesCount() {
    if (window.localeSeriesData) {
      const lang = document.documentElement.lang?.substring(0, 2) || "en";
      const seriesData = window.localeSeriesData[lang];
      if (seriesData) {
        return Object.keys(seriesData).length;
      }
    }
    // Fallback: contar claves en userStats.seriesRead
    return Object.keys(this.userStats.seriesRead).length;
  }

  // getBadgesHTML() {
  //   const categories = ["reading", "likes", "comments", "series"];

  //   let html = `
  //     <div class="badge-intro">
  //       <small class="text-muted">
  //         <i class="fas fa-info-circle"></i>
  //         ${this.getLocalizedText(
  //           "intro_text",
  //           "Collect badges by reading, commenting and participating!"
  //         )}
  //         ${this.getLocalizedText(
  //           "hover_text",
  //           "Hover over each one to see how to earn it."
  //         )}
  //       </small>
  //     </div>
  //   `;

  //   categories.forEach((category) => {
  //     const categoryBadges = Object.values(this.badgeDefinitions).filter(
  //       (badge) => badge.category === category
  //     );

  //     if (categoryBadges.length > 0) {
  //       html += `<div class="badge-category">`;
  //       html += `<h6 class="badge-category-title">${this.getCategoryTitle(
  //         category
  //       )}</h6>`;

  //       // Add progress bar for main categories
  //       if (category !== "special") {
  //         html += this.getProgressBarHTML(category);
  //       }

  //       html += `<div class="badge-list">`;
  //       categoryBadges.forEach((badge) => {
  //         html += this.getBadgeHTML(badge);
  //       });
  //       html += `</div></div>`;
  //     }
  //   });

  //   return html;
  // }

  getCategoryTitle(category) {
    const titles = {
      reading: this.getLocalizedText("categories.reading", "📚 Reading"),
      likes: this.getLocalizedText("categories.likes", "❤️ Likes"),
      comments: this.getLocalizedText("categories.comments", "💬 Comments"),
      series: this.getLocalizedText("categories.series", "TODO💬 Series"),
    };

    return titles[category] || category;
  }

  getProgressBarHTML(category) {
    const stats = this.getCategoryStats(category);
    const nextBadge = this.getNextBadge(category);

    if (!nextBadge) return "";

    const progress = Math.min(
      (stats.current / nextBadge.requirement) * 100,
      100
    );
    const remaining = nextBadge.requirement - stats.current;

    return `
      <div class="progress-container">
        <div class="progress-info">
          <span class="progress-text">${stats.current}/${
      nextBadge.requirement
    } ${this.getLocalizedText("progress_text", "for")} ${nextBadge.title}</span>
          ${
            remaining > 0
              ? `<span class="progress-remaining">${this.getLocalizedText(
                  "remaining_text",
                  "(You need"
                )} ${remaining} ${this.getLocalizedText(
                  "more_text",
                  "more"
                )})</span>`
              : ""
          }
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;
  }

  // Corregir getCategoryStats para series
  getCategoryStats(category) {
    switch (category) {
      case "reading":
        return { current: this.userStats.postsRead.length };
      case "likes":
        return { current: Object.keys(this.userStats.likes).length };
      case "comments":
        return { current: this.userStats.comments };
      // case "series_read":
      //   // Series Explorer: número de series distintas leídas (al menos 1 post de cada)
      //   return { current: Object.keys(this.userStats.seriesRead).length };
      case "series":
        return {
          current: Object.values(this.userStats.seriesRead).filter(
            (v) => v === true
          ).length,
        };
      default:
        return { current: 0 };
    }
  }

  getNextBadge(category) {
    const categoryBadges = Object.values(this.badgeDefinitions)
      .filter((badge) => badge.category === category)
      .sort((a, b) => a.requirement - b.requirement);

    const stats = this.getCategoryStats(category);

    return categoryBadges.find(
      (badge) =>
        badge.requirement > stats.current &&
        !this.userStats.badges.includes(badge.id)
    );
  }

  // Corregir getBadgeHTML para mostrar el progreso real de cada badge
  getBadgeHTML(badge) {
    let isUnlocked = this.userStats.badges.includes(badge.id);
    let stats;
    if (["series_finisher", "series_guru"].includes(badge.id)) {
      // Series completas: limitar al requirement del badge
      const seriesCompletas = Object.values(this.userStats.seriesRead).filter(
        (v) => v === true
      ).length;
      const current = Math.min(seriesCompletas, badge.requirement);
      stats = { current, requirement: badge.requirement };
    } else if (badge.id === "aws_hero") {
      stats = { current: isUnlocked ? 1 : 0, requirement: badge.requirement };
    } else if (badge.type === "posts_read") {
      stats = {
        current: this.userStats.postsRead.length,
        requirement: badge.requirement,
      };
    } else if (badge.type === "likes") {
      stats = {
        current: Object.keys(this.userStats.likes).length,
        requirement: badge.requirement,
      };
    } else if (badge.type === "comments") {
      stats = {
        current: this.userStats.comments,
        requirement: badge.requirement,
      };
    } else {
      stats = { current: 0, requirement: badge.requirement };
    }
    const progress = Math.min((stats.current / badge.requirement) * 100, 100);
    return `
      <div class="badge-item ${isUnlocked ? "unlocked" : "locked"}" 
           title="${badge.title} - ${badge.description} - ${stats.current}/${
      badge.requirement
    }">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-info">
          <div class="badge-name">${badge.title}</div>
          <div class="badge-progress">
            <div class="badge-progress-bar">
              <div class="badge-progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="badge-progress-text">${stats.current}/${
      badge.requirement
    }</div>
          </div>
        </div>
        ${
          isUnlocked
            ? '<div class="badge-check"><i class="fas fa-check"></i></div>'
            : ""
        }
      </div>
    `;
  }

  getAllBadgesHTML() {
    return Object.values(this.badgeDefinitions)
      .map((badge) => this.getBadgeHTML(badge))
      .join("");
  }

  // Debug function to simulate comments (for testing)
  simulateComment() {
    this.userStats.comments++;
    this.saveStats();
    this.checkCommentBadges();
    this.updateBadges();
  }

  // Debug function to simulate likes (for testing)
  simulateLike() {
    const postId = window.location.pathname;
    this.userStats.likes[postId] = true;
    this.saveStats();
    this.checkLikeBadges();
    this.updateBadges();
  }

  // Debug function to check Giscus status
  debugGiscusStatus() {
    const giscusFrame = document.querySelector('iframe[src*="giscus.app"]');
    const giscusScript = document.querySelector('script[src*="giscus.app"]');

    if (giscusFrame) {
    }
  }
}

// Initialize gamification when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.gamification = new Gamification();
});
