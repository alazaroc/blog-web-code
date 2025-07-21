// Enhanced Touch Navigation
class TouchNavigation {
  constructor() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
    this.init();
  }

  init() {
    this.setupSwipeNavigation();
    // this.setupTouchTargets();
    this.setupHapticFeedback();
  }

  setupSwipeNavigation() {
    document.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isSignificantSwipe =
      Math.abs(deltaX) > this.minSwipeDistance ||
      Math.abs(deltaY) > this.minSwipeDistance;

    if (isSignificantSwipe) {
      if (isHorizontalSwipe) {
        if (deltaX > 0) {
          this.handleSwipeRight();
        } else {
          this.handleSwipeLeft();
        }
      } else {
        if (deltaY > 0) {
          this.handleSwipeDown();
        } else {
          this.handleSwipeUp();
        }
      }
    }
  }

  handleSwipeLeft() {
    // Navigate to next post
    const nextButton = document.querySelector(".btn-next");
    if (nextButton && !nextButton.disabled) {
      this.triggerHapticFeedback();
      nextButton.click();
    }
  }

  handleSwipeRight() {
    // Navigate to previous post
    const prevButton = document.querySelector(".btn-previous");
    if (prevButton && !prevButton.disabled) {
      this.triggerHapticFeedback();
      prevButton.click();
    }
  }

  handleSwipeUp() {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.triggerHapticFeedback();
  }

  handleSwipeDown() {
    // Toggle sidebar on mobile
    const sidebarTrigger = document.getElementById("sidebar-trigger");
    if (sidebarTrigger && window.innerWidth <= 991) {
      this.triggerHapticFeedback();
      sidebarTrigger.click();
    }
  }

  // setupTouchTargets() {
  //   // Ensure all interactive elements meet minimum touch target size
  //   const touchTargets = document.querySelectorAll(
  //     "a, button, input, select, textarea"
  //   );

  //   touchTargets.forEach((target) => {
  //     const rect = target.getBoundingClientRect();
  //     const minSize = 44; // iOS recommended minimum

  //     if (rect.width < minSize || rect.height < minSize) {
  //       target.style.minWidth = `${minSize}px`;
  //       target.style.minHeight = `${minSize}px`;
  //       target.style.padding = "12px";
  //     }
  // //   });
  // }

  setupHapticFeedback() {
    // Add haptic feedback to important interactions
    const hapticTargets = document.querySelectorAll(
      ".btn-primary, .nav-link, .card"
    );

    hapticTargets.forEach((target) => {
      target.addEventListener("touchstart", () => {
        this.triggerHapticFeedback();
      });
    });
  }

  triggerHapticFeedback() {
    // Trigger haptic feedback on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  // Pull to refresh functionality
  setupPullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    const pullThreshold = 80;
    let isPulling = false;

    document.addEventListener("touchstart", (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    });

    document.addEventListener("touchmove", (e) => {
      if (isPulling) {
        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;

        if (pullDistance > 0) {
          e.preventDefault();
          this.showPullIndicator(pullDistance);
        }
      }
    });

    document.addEventListener("touchend", () => {
      if (isPulling && pullDistance > pullThreshold) {
        this.refreshContent();
      }
      this.hidePullIndicator();
      isPulling = false;
      pullDistance = 0;
    });
  }

  showPullIndicator(distance) {
    let indicator = document.getElementById("pull-indicator");
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.id = "pull-indicator";
      indicator.innerHTML = `
        <div class="pull-indicator-content">
          <i class="fas fa-arrow-down"></i>
          <span>Pull to refresh</span>
        </div>
      `;
      document.body.appendChild(indicator);
    }

    indicator.style.transform = `translateY(${Math.min(distance, 100)}px)`;
    indicator.style.opacity = Math.min(distance / 100, 1);
  }

  hidePullIndicator() {
    const indicator = document.getElementById("pull-indicator");
    if (indicator) {
      indicator.style.transform = "translateY(-100px)";
      indicator.style.opacity = 0;
    }
  }

  refreshContent() {
    this.triggerHapticFeedback();
    window.location.reload();
  }
}

// Initialize touch navigation
document.addEventListener("DOMContentLoaded", () => {
  new TouchNavigation();
});
