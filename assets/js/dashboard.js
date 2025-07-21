// Dashboard functionality
class Dashboard {
  constructor() {
    this.init();
  }

  init() {
    this.populateUserInfo();
    this.populateStats();
    this.populateGamificationStats();
  }

  populateUserInfo() {
    const userInfoContainer = document.getElementById("user-dashboard-info");
    if (!userInfoContainer) return;

    // Get user info from Cognito Auth
    const user = window.cognitoAuth?.user;

    if (user) {
      userInfoContainer.innerHTML = `
        <div class="user-info-item">
          <strong>Name:</strong> ${user.name}
        </div>
        <div class="user-info-item">
          <strong>Email:</strong> ${user.email}
        </div>
        <div class="user-info-item">
          <strong>Status:</strong> 
          <span class="badge bg-success">
            <i class="fas fa-check-circle"></i> Active
          </span>
        </div>
        <div class="user-info-item">
          <strong>Login Time:</strong> ${new Date().toLocaleString()}
        </div>
      `;
    } else {
      userInfoContainer.innerHTML = `
        <div class="alert alert-warning">
          <i class="fas fa-exclamation-triangle"></i>
          User information not available
        </div>
      `;
    }
  }

  populateStats() {
    // Count total posts
    const totalPosts =
      document.querySelectorAll(".post").length ||
      document.querySelectorAll("[data-post-id]").length ||
      25; // Fallback number

    const totalPostsElement = document.getElementById("total-posts");
    if (totalPostsElement) {
      totalPostsElement.textContent = totalPosts;
    }

    // Count total series
    const totalSeries =
      document.querySelectorAll(".series-item").length ||
      Object.keys(window.SERIES_DATA || {}).length ||
      6; // Fallback number

    const totalSeriesElement = document.getElementById("total-series");
    if (totalSeriesElement) {
      totalSeriesElement.textContent = totalSeries;
    }
  }

  populateGamificationStats() {
    const gamificationContainer = document.getElementById("gamification-stats");
    if (!gamificationContainer) return;

    // Get gamification data
    const gamification = window.gamification;

    if (gamification && gamification.userStats) {
      const stats = gamification.userStats;
      const badges = stats.badges || [];
      const postsRead = stats.postsRead || [];
      const likes = Object.keys(stats.likes || {}).length;
      const comments = stats.comments || 0;

      gamificationContainer.innerHTML = `
        <div class="gamification-stats-grid">
          <div class="stat-item">
            <div class="stat-number">${postsRead.length}</div>
            <div class="stat-label">Posts Read</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${likes}</div>
            <div class="stat-label">Likes Given</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${comments}</div>
            <div class="stat-label">Comments</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${badges.length}</div>
            <div class="stat-label">Badges Earned</div>
          </div>
        </div>
        <div class="mt-3">
          <h6>Recent Badges:</h6>
          ${this.getRecentBadgesHTML(badges)}
        </div>
      `;
    } else {
      gamificationContainer.innerHTML = `
        <div class="alert alert-info">
          <i class="fas fa-info-circle"></i>
          Start reading posts to earn badges and track your progress!
        </div>
      `;
    }
  }

  getRecentBadgesHTML(badges) {
    if (badges.length === 0) {
      return '<p class="text-muted">No badges earned yet. Keep reading!</p>';
    }

    const recentBadges = badges.slice(-3); // Show last 3 badges
    return recentBadges
      .map((badgeId) => {
        const badge = this.getBadgeInfo(badgeId);
        return `
        <div class="badge-item-small">
          <span class="badge-icon">${badge.icon}</span>
          <span class="badge-name">${badge.title}</span>
        </div>
      `;
      })
      .join("");
  }

  getBadgeInfo(badgeId) {
    // Fallback badge info
    const badgeMap = {
      series_finisher: { icon: "🏅", title: "Series Finisher" },
      series_guru: { icon: "🤓", title: "Series Guru" },
      aws_hero: { icon: "🦸", title: "AWS Hero" },
      first_read: { icon: "📖", title: "First Read" },
      knowledge_seeker: { icon: "🔎", title: "Knowledge Seeker" },
      ultimate_reader: { icon: "🏆", title: "Ultimate Reader" },
    };

    return badgeMap[badgeId] || { icon: "🏆", title: badgeId };
  }
}

// Global function to confirm and reset all data
function confirmAndResetAll() {
  if (
    confirm(
      "⚠️ WARNING: This will clear ALL your data including:\n\n• Login session\n• Reading progress\n• Badges and achievements\n• Theme preferences\n• Series progress\n• All stored settings\n\nThis action cannot be undone. Continue?"
    )
  ) {
    // Clear all localStorage
    localStorage.clear();
    // Clear all sessionStorage
    sessionStorage.clear();
    // Reload the page
    window.location.reload();
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize if we're on the dashboard page
  if (window.location.pathname === "/dashboard/") {
    // Check if user is authenticated
    if (window.cognitoAuth && window.cognitoAuth.canAccessDashboard()) {
      new Dashboard();
    } else {
      // Redirect to login if not authenticated
      window.location.href = "/?returnUrl=" + encodeURIComponent("/dashboard/");
    }
  }
});
