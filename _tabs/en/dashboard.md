---
title: Dashboard
icon: fas fa-tachometer-alt
order: 6
lang: en
hide: true
private: true
---

<div class="dashboard-container">
  <!-- ADMIN TOOLS (visible solo para admin/logueado) -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card border-info">
        <div class="card-header bg-info text-white">
          <i class="fas fa-tools"></i> Admin Tools (Testing Only)
        </div>
        <div class="card-body">
          <h6>Reset Local Storage</h6>
          <button onclick="confirmAndResetAll()" class="btn btn-sm btn-danger">Reset All Data</button>
          <hr>
          <h6>Subscription Popup Testing</h6>
          <button onclick="resetSubscriptionPopup()" class="btn btn-sm btn-primary">Reset Subscription Popup</button>
          <hr>
          <h6>Theme Testing</h6>
          <button onclick="document.getElementById('mode-toggle')?.click()" class="btn btn-sm btn-dark me-2">Toggle Dark/Light Mode (real)</button>
          <small class="text-muted d-block mt-2">Estas herramientas solo afectan a tu sesión y son para pruebas visuales.</small>
        </div>
      </div>
    </div>
  </div>
  <!-- END ADMIN TOOLS -->

  <div class="row">
    <div class="col-12">
      <h2><i class="fas fa-tachometer-alt"></i> Private Dashboard</h2>
      <p class="text-muted">Welcome to your private area!</p>
    </div>
  </div>

  <div class="row mt-4">
    <!-- Quick Stats -->
    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-file-alt text-primary"></i> Files
          </h5>
          <p class="card-text">Access your private files and resources</p>
          <a href="/files/" class="btn btn-primary btn-sm">
            <i class="fas fa-folder-open"></i> Browse Files
          </a>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-calendar-alt text-success"></i> Events
          </h5>
          <p class="card-text">View your speaking events and presentations</p>
          <a href="/events/" class="btn btn-success btn-sm">
            <i class="fas fa-calendar"></i> View Events
          </a>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-cog text-warning"></i> Settings
          </h5>
          <p class="card-text">Manage your account and preferences</p>
          <a href="/settings/" class="btn btn-warning btn-sm">
            <i class="fas fa-cog"></i> Settings
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Activity -->
  <div class="row mt-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">
            <i class="fas fa-history"></i> Recent Activity
          </h5>
        </div>
        <div class="card-body">
          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-file-pdf text-danger"></i>
                <span class="ms-2">AWS Well-Architected Presentation</span>
              </div>
              <small class="text-muted">2 days ago</small>
            </div>
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-calendar-check text-success"></i>
                <span class="ms-2">AWS Community Day Madrid</span>
              </div>
              <small class="text-muted">1 week ago</small>
            </div>
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-code text-primary"></i>
                <span class="ms-2">CDK Infrastructure Code</span>
              </div>
              <small class="text-muted">2 weeks ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.dashboard-container {
  padding: 20px 0;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
  transition: box-shadow 0.15s ease-in-out;
}

.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-title {
  color: var(--heading-color);
  font-weight: 600;
}

.list-group-item {
  border-left: none;
  border-right: none;
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}
</style> 