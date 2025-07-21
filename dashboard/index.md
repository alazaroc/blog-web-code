---
layout: default
title: "Dashboard"
description: "Admin dashboard for Playing AWS blog"
permalink: /dashboard/
---

<div class="dashboard-container">
  <!-- Testing Tools Section (Admin Only) -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card border-info">
        <div class="card-header bg-info text-white">
          <i class="fas fa-tools"></i> Admin Tools (Testing Only)
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <h6><i class="fas fa-chart-line"></i> Reset Local Storage</h6>
              <button onclick="confirmAndResetAll()" class="btn btn-sm btn-danger">Reset All Data</button>
            </div>
            <div class="col-md-4">
              <h6><i class="fas fa-bell"></i> Subscription Popup Testing</h6>
              <button onclick="resetSubscriptionPopup()" class="btn btn-sm btn-primary">Reset Subscription Popup</button>
            </div>
            <div class="col-md-4">
              <h6><i class="fas fa-palette"></i> Theme & Storage Testing</h6>
              <button onclick="document.getElementById('mode-toggle')?.click()" class="btn btn-sm btn-dark me-2">Toggle Theme</button>
              <button onclick="confirmAndResetAll()" class="btn btn-sm btn-danger">Reset All Data</button>
            </div>
          </div>
          <hr>
          <small class="text-muted">
            <i class="fas fa-info-circle"></i> These tools only affect your session and are for visual testing. 
            "Reset All Data" will clear ALL localStorage/sessionStorage (badges, progress, login, etc.) and reload the page.
          </small>
        </div>
      </div>
    </div>
  </div>
  <!-- END Testing Tools -->

  <div class="dashboard-header">
    <h1><i class="fas fa-tachometer-alt"></i> Dashboard</h1>
    <p class="text-muted">Welcome to your admin panel</p>
  </div>

  <div class="row">
    <!-- User Info Card -->
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="fas fa-user-circle"></i> User Information
          </h5>
        </div>
        <div class="card-body">
          <div id="user-dashboard-info">
            <!-- Will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Card -->
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="fas fa-chart-bar"></i> Quick Stats
          </h5>
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-6">
              <div class="stat-item">
                <div class="stat-number" id="total-posts">0</div>
                <div class="stat-label">Posts</div>
              </div>
            </div>
            <div class="col-6">
              <div class="stat-item">
                <div class="stat-number" id="total-series">0</div>
                <div class="stat-label">Series</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gamification Stats Card -->
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="fas fa-trophy"></i> Your Progress
          </h5>
        </div>
        <div class="card-body">
          <div id="gamification-stats">
            <!-- Will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Admin Actions -->
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="fas fa-cogs"></i> Admin Actions
          </h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mb-3">
              <div class="admin-action-card">
                <div class="action-icon">
                  <i class="fas fa-edit"></i>
                </div>
                <h6>Edit Posts</h6>
                <p class="text-muted">Manage your blog posts</p>
                <button class="btn btn-outline-primary btn-sm" onclick="alert('Edit posts functionality coming soon!')">
                  Manage Posts
                </button>
              </div>
            </div>

            <div class="col-md-3 mb-3">
              <div class="admin-action-card">
                <div class="action-icon">
                  <i class="fas fa-tags"></i>
                </div>
                <h6>Manage Tags</h6>
                <p class="text-muted">Organize your content tags</p>
                <button class="btn btn-outline-primary btn-sm" onclick="alert('Tag management coming soon!')">
                  Manage Tags
                </button>
              </div>
            </div>
            
            <div class="col-md-3 mb-3">
              <div class="admin-action-card">
                <div class="action-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h6>Analytics</h6>
                <p class="text-muted">View blog statistics</p>
                <button class="btn btn-outline-primary btn-sm" onclick="alert('Analytics coming soon!')">
                  View Analytics
                </button>
              </div>
            </div>
            
            <div class="col-md-3 mb-3">
              <div class="admin-action-card">
                <div class="action-icon">
                  <i class="fas fa-users"></i>
                </div>
                <h6>User Management</h6>
                <p class="text-muted">Manage user access</p>
                <button class="btn btn-outline-primary btn-sm" onclick="alert('User management coming soon!')">
                  Manage Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Activity -->
  <div class="row mt-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="fas fa-history"></i> Recent Activity
          </h5>
        </div>
        <div class="card-body">
          <div id="recent-activity">
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-sign-in-alt text-success"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">Login successful</div>
                <div class="activity-time">Just now</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-trophy text-warning"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">Badge unlocked: First Reader</div>
                <div class="activity-time">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: var(--aws-orange);
  margin-bottom: 0.5rem;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--aws-orange);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.admin-action-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  height: 100%;
  transition: all 0.3s ease;
}

.admin-action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 2rem;
  color: var(--aws-orange);
  margin-bottom: 1rem;
}

.admin-action-card h6 {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--bs-border-color);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  font-size: 1.2rem;
  margin-right: 1rem;
  width: 30px;
  text-align: center;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.8rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .admin-action-card {
    margin-bottom: 1rem;
  }
}

/* Dark mode styles for dashboard */
[data-mode="dark"] .admin-action-card {
  background: transparent !important;
  border-color: #4a5568 !important;
  color: #e2e8f0 !important;
}

[data-mode="dark"] .admin-action-card:hover {
  background: rgba(255, 153, 0, 0.1) !important;
  border-color: var(--aws-orange) !important;
  box-shadow: 0 4px 12px rgba(255, 153, 0, 0.2) !important;
}

[data-mode="dark"] .admin-action-card h6 {
  color: #e2e8f0 !important;
}

[data-mode="dark"] .admin-action-card p {
  color: #a0aec0 !important;
}

[data-mode="dark"] .activity-item {
  border-color: #4a5568 !important;
  color: #e2e8f0 !important;
}

[data-mode="dark"] .activity-title {
  color: #e2e8f0 !important;
}

[data-mode="dark"] .activity-time {
  color: #a0aec0 !important;
}
</style> 