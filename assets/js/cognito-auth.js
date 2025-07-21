// Cognito Authentication for Jekyll Blog
class CognitoAuth {
  constructor() {
    // Configuration from Jekyll
    this.config = {
      region: "{{ site.cognito.region }}",
      userPoolId: "{{ site.cognito.userPoolId }}",
      clientId: "{{ site.cognito.clientId }}",
    };

    this.isAuthenticated = false;
    this.user = null;
    this.tokens = null;

    this.init();
  }

  init() {
    // Check if user is already authenticated
    this.checkAuthStatus();

    // Initialize login form
    this.initLoginForm();

    // Initialize auth UI
    this.updateAuthUI();

    // Check if we need to redirect after login
    this.checkReturnUrl();
  }

  checkAuthStatus() {
    const token = this.getStoredToken();
    if (token) {
      try {
        // For demo tokens, just check if they exist
        if (token.startsWith("demo-token-")) {
          this.isAuthenticated = true;
          this.tokens = { idToken: token };
          // Get user info from localStorage
          const storedUser = localStorage.getItem("cognito_user");
          if (storedUser) {
            this.user = JSON.parse(storedUser);
          } else {
            // If no user stored, clear the token (invalid state)
            this.clearStoredToken();
            return;
          }
        } else {
          // For real tokens, verify expiration
          const payload = this.parseJwt(token);
          const now = Math.floor(Date.now() / 1000);

          if (payload.exp > now) {
            this.isAuthenticated = true;
            this.tokens = { idToken: token };
            this.user = {
              email: payload.email,
              name: payload.name || payload.email,
            };
          } else {
            this.clearStoredToken();
          }
        }
      } catch (error) {
        this.clearStoredToken();
      }
    }
  }

  initLoginForm() {
    const form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }
  }

  async handleLogin() {
    const form = document.getElementById("login-form");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Show loading
    this.showLoading(true);
    this.hideMessages();

    try {
      // For now, we'll use a simple approach
      // In production, you'd use AWS Amplify or the Cognito SDK
      const response = await this.authenticateUser(username, password);

      if (response.success) {
        this.isAuthenticated = true;
        this.tokens = response.tokens;
        this.user = response.user;

        // Store token and user info
        this.storeToken(response.tokens.idToken);
        this.storeUser(response.user);

        // Show success and redirect
        this.showSuccess();

        // Close modal and redirect to dashboard
        setTimeout(() => {
          const modal = document.getElementById("login-modal");
          if (modal) {
            modal.remove();
          }
          this.updateAuthUI();
          // Redirect to dashboard immediately
          window.location.href = "/dashboard/";
        }, 500);
      } else {
        this.showError(response.error);
      }
    } catch (error) {
      this.showError("An error occurred during login. Please try again.");
    } finally {
      this.showLoading(false);
    }
  }

  async authenticateUser(username, password) {
    // This is a placeholder for the actual Cognito authentication
    // In a real implementation, you would use AWS Amplify or the Cognito SDK

    // For demo purposes, we'll simulate authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate authentication check
        if (username && password) {
          resolve({
            success: true,
            tokens: {
              idToken: "demo-token-" + Date.now(),
              accessToken: "demo-access-token",
              refreshToken: "demo-refresh-token",
            },
            user: {
              email: username,
              name: username.split("@")[0],
            },
          });
        } else {
          resolve({
            success: false,
            error: "Invalid credentials",
          });
        }
      }, 1000);
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.tokens = null;
    this.clearStoredToken();
    this.updateAuthUI();

    // Redirect to home page
    window.location.href = "/";
  }

  updateAuthUI() {
    const authButton = document.getElementById("auth-button");
    const userInfo = document.getElementById("user-info");

    if (this.isAuthenticated && this.user) {
      // Show user info and logout button
      if (authButton) {
        authButton.innerHTML = `
          <i class="fas fa-user"></i>
          <span class="d-none d-lg-inline">${this.user.name}</span>
        `;
        authButton.onclick = () => this.logout();
        authButton.classList.remove("btn-primary");
        authButton.classList.add("btn-outline-primary");
        authButton.title = "Click to logout";
      }

      if (userInfo) {
        userInfo.innerHTML = `
          <small class="text-muted">
            <i class="fas fa-user-circle"></i> ${this.user.email}
          </small>
          <br>
          <small class="text-success">
            <i class="fas fa-check-circle"></i> Logged in
          </small>
          <br>
          <a href="/dashboard/" class="btn btn-sm btn-outline-success mt-2">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </a>
        `;
        userInfo.classList.remove("d-none");
      }
    } else {
      // Show login button
      if (authButton) {
        authButton.innerHTML = `
          <i class="fas fa-sign-in-alt"></i>
          <span class="d-none d-lg-inline">Login</span>
        `;
        authButton.onclick = () => this.showLoginModal();
        authButton.classList.remove("btn-outline-primary");
        authButton.classList.add("btn-primary");
      }

      if (userInfo) {
        userInfo.classList.add("d-none");
      }
    }
  }

  showLoginModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById("login-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "login-modal";
    modal.className = "login-modal-overlay";

    const modalContent = `
      <div class="login-modal-content">
        <div class="login-modal-header">
          <h3 class="login-modal-title">
            <i class="fas fa-user-circle"></i> Login
          </h3>
          <button class="login-modal-close" onclick="this.closest('.login-modal-overlay').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="login-modal-body">
          <!-- Login Form -->
          <form id="login-form" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="username" class="form-label">Email</label>
              <input type="email" class="form-control" id="username" required>
              <div class="invalid-feedback">
                Please enter a valid email address.
              </div>
            </div>
            
            <div class="mb-4">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" required>
              <div class="invalid-feedback">
                Please enter your password.
              </div>
            </div>
            
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i> Sign In
              </button>
            </div>
          </form>
          
          <!-- Loading Spinner -->
          <div id="loading" class="text-center d-none">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Signing in...</p>
          </div>
          
          <!-- Error Message -->
          <div id="error-message" class="alert alert-danger mt-3 d-none" role="alert">
            <i class="fas fa-exclamation-triangle"></i>
            <span id="error-text"></span>
          </div>
          
          <!-- Success Message -->
          <div id="success-message" class="alert alert-success mt-3 d-none" role="alert">
            <i class="fas fa-check-circle"></i>
            Login successful! Welcome back!
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

    // Initialize the form in the modal
    this.initLoginForm();
  }

  // Utility methods
  showLoading(show) {
    const loading = document.getElementById("loading");
    const form = document.getElementById("login-form");

    if (loading && form) {
      if (show) {
        loading.classList.remove("d-none");
        form.classList.add("d-none");
      } else {
        loading.classList.add("d-none");
        form.classList.remove("d-none");
      }
    }
  }

  showError(message) {
    const errorDiv = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");

    if (errorDiv && errorText) {
      errorText.textContent = message;
      errorDiv.classList.remove("d-none");
    }
  }

  showSuccess() {
    const successDiv = document.getElementById("success-message");
    if (successDiv) {
      successDiv.classList.remove("d-none");
    }
  }

  hideMessages() {
    const errorDiv = document.getElementById("error-message");
    const successDiv = document.getElementById("success-message");

    if (errorDiv) errorDiv.classList.add("d-none");
    if (successDiv) successDiv.classList.add("d-none");
  }

  getReturnUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("returnUrl") || window.location.pathname;
  }

  storeToken(token) {
    localStorage.setItem("cognito_id_token", token);
  }

  storeUser(user) {
    localStorage.setItem("cognito_user", JSON.stringify(user));
  }

  getStoredToken() {
    return localStorage.getItem("cognito_id_token");
  }

  clearStoredToken() {
    localStorage.removeItem("cognito_id_token");
    localStorage.removeItem("cognito_user");
  }

  parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  // Check if current page requires authentication
  requiresAuth() {
    const privatePaths = ["/dashboard/", "/private/", "/files/"];
    const currentPath = window.location.pathname;

    return privatePaths.some((path) => currentPath.startsWith(path));
  }

  // Check if user can access dashboard
  canAccessDashboard() {
    return this.isAuthenticated && this.user;
  }

  // Redirect to login if not authenticated
  checkAuthAndRedirect() {
    if (this.requiresAuth() && !this.isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/?returnUrl=${returnUrl}`;
    }
  }

  // Check if we need to redirect after login
  checkReturnUrl() {
    if (this.isAuthenticated) {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get("returnUrl");

      if (returnUrl) {
        // Clear the URL parameter and redirect
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("returnUrl");
        window.history.replaceState({}, document.title, newUrl.pathname);

        // Redirect to the intended page
        window.location.href = returnUrl;
      }
    }
  }
}

// Initialize authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.cognitoAuth = new CognitoAuth();

  // Check if current page requires authentication
  if (window.cognitoAuth.requiresAuth()) {
    window.cognitoAuth.checkAuthAndRedirect();
  }
});
