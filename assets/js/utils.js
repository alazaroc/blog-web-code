/**
 * Utility functions for Playing AWS Blog
 * Centralized functions to avoid code duplication
 */

// Localization utility
class Localization {
  static getText(key, fallback = null) {
    const lang = (
      document.documentElement.lang ||
      window.LANG ||
      "es"
    ).substring(0, 2);

    // Try to get from GAMIFICATION_LOCALE first
    if (window.GAMIFICATION_LOCALE && window.GAMIFICATION_LOCALE[lang]) {
      const keys = key.split(".");
      let value = window.GAMIFICATION_LOCALE[lang];

      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }

      if (value) return value;
    }

    // Fallback to BADGES_LOCALE
    if (window.BADGES_LOCALE && window.BADGES_LOCALE[lang]) {
      const keys = key.split(".");
      let value = window.BADGES_LOCALE[lang];

      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }

      if (value) return value;
    }

    return fallback || key;
  }

  static getCurrentLanguage() {
    return (document.documentElement.lang || window.LANG || "es").substring(
      0,
      2
    );
  }
}

// DOM utility functions
class DOMUtils {
  static createElement(tag, className, innerHTML = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }

  static removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) element.remove();
  }

  static addClass(element, className) {
    if (element) element.classList.add(className);
  }

  static removeClass(element, className) {
    if (element) element.classList.remove(className);
  }

  static toggleClass(element, className) {
    if (element) element.classList.toggle(className);
  }
}

// Storage utility functions
class StorageUtils {
  static get(key, defaultValue = null) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Animation utility functions
class AnimationUtils {
  static fadeIn(element, duration = 300) {
    if (!element) return;

    element.style.opacity = "0";
    element.style.display = "block";

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);

      element.style.opacity = opacity;

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  static fadeOut(element, duration = 300) {
    if (!element) return;

    let start = null;
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.max(initialOpacity - progress / duration, 0);

      element.style.opacity = opacity;

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = "none";
      }
    };

    requestAnimationFrame(animate);
  }

  static slideDown(element, duration = 300) {
    if (!element) return;

    element.style.height = "0";
    element.style.overflow = "hidden";
    element.style.display = "block";

    const targetHeight = element.scrollHeight;
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const height = Math.min(
        (progress / duration) * targetHeight,
        targetHeight
      );

      element.style.height = height + "px";

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.height = "auto";
        element.style.overflow = "visible";
      }
    };

    requestAnimationFrame(animate);
  }

  static slideUp(element, duration = 300) {
    if (!element) return;

    const targetHeight = element.scrollHeight;
    element.style.height = targetHeight + "px";
    element.style.overflow = "hidden";

    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const height = Math.max(
        targetHeight - (progress / duration) * targetHeight,
        0
      );

      element.style.height = height + "px";

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = "none";
        element.style.height = "auto";
        element.style.overflow = "visible";
      }
    };

    requestAnimationFrame(animate);
  }
}

// Event utility functions
class EventUtils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }
}

// // Añade este script después de que se cargue el tema
// function forceDataMode() {
//   const html = document.documentElement;

//   // Si no hay data-mode, detectar el modo actual y establecerlo
//   if (!html.hasAttribute("data-mode")) {
//     const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     html.setAttribute("data-mode", isDark ? "dark" : "light");
//   }

//   // Observar cambios en el atributo data-mode
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (
//         mutation.type === "attributes" &&
//         mutation.attributeName === "data-mode"
//       ) {
//         // Si se elimina el atributo, restaurarlo basado en las preferencias del sistema
//         if (!html.hasAttribute("data-mode")) {
//           const isDark = window.matchMedia(
//             "(prefers-color-scheme: dark)"
//           ).matches;
//           html.setAttribute("data-mode", isDark ? "dark" : "light");
//         }
//       }
//     });
//   });

//   observer.observe(html, { attributes: true, attributeFilter: ["data-mode"] });
// }

// // Ejecutar cuando el DOM esté listo
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", forceDataMode);
// } else {
//   forceDataMode();
// }

// Export utilities for use in other modules
window.PlayingAWS = window.PlayingAWS || {};
window.PlayingAWS.Utils = {
  Localization,
  DOMUtils,
  StorageUtils,
  AnimationUtils,
  EventUtils,
};
