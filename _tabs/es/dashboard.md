---
title: Panel de Control
icon: fas fa-tachometer-alt
order: 6
lang: es
hide: true
private: true
---

<div class="dashboard-container">
  <!-- HERRAMIENTAS ADMIN (solo visible para admin/logueado) -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card border-info">
        <div class="card-header bg-info text-white">
          <i class="fas fa-tools"></i> Herramientas Admin (Solo Pruebas)
        </div>
        <div class="card-body">
          <h6>Resetear Local Storage</h6>
          <button onclick="confirmAndResetAll()" class="btn btn-sm btn-danger">Resetear Todos los Datos</button>
          <hr>
          <h6>Test del Popup de Suscripción</h6>
          <button onclick="resetSubscriptionPopup()" class="btn btn-sm btn-primary">Resetear Popup Suscripción</button>
          <hr>
          <h6>Test de Tema</h6>
          <button onclick="document.getElementById('mode-toggle')?.click()" class="btn btn-sm btn-dark me-2">Alternar Modo Oscuro/Claro (real)</button>
          <small class="text-muted d-block mt-2">Estas herramientas solo afectan a tu sesión y son para pruebas visuales.</small>
        </div>
      </div>
    </div>
  </div>
  <!-- FIN HERRAMIENTAS ADMIN -->

  <div class="row">
    <div class="col-12">
      <h2><i class="fas fa-tachometer-alt"></i> Panel de Control Privado</h2>
      <p class="text-muted">¡Bienvenido a tu área privada!</p>
    </div>
  </div>

  <div class="row mt-4">
    <!-- Quick Stats -->
    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-file-alt text-primary"></i> Archivos
          </h5>
          <p class="card-text">Accede a tus archivos y recursos privados</p>
          <a href="/files/" class="btn btn-primary btn-sm">
            <i class="fas fa-folder-open"></i> Explorar Archivos
          </a>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-calendar-alt text-success"></i> Eventos
          </h5>
          <p class="card-text">Visualiza tus eventos de presentación</p>
          <a href="/events/" class="btn btn-success btn-sm">
            <i class="fas fa-calendar"></i> Ver Eventos
          </a>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-cog text-warning"></i> Configuración
          </h5>
          <p class="card-text">Gestiona tu cuenta y preferencias</p>
          <a href="/settings/" class="btn btn-warning btn-sm">
            <i class="fas fa-cog"></i> Configuración
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
            <i class="fas fa-history"></i> Actividad Reciente
          </h5>
        </div>
        <div class="card-body">
          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-file-pdf text-danger"></i>
                <span class="ms-2">Presentación AWS Well-Architected</span>
              </div>
              <small class="text-muted">hace 2 días</small>
            </div>
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-calendar-check text-success"></i>
                <span class="ms-2">AWS Community Day Madrid</span>
              </div>
              <small class="text-muted">hace 1 semana</small>
            </div>
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-code text-primary"></i>
                <span class="ms-2">Código de Infraestructura CDK</span>
              </div>
              <small class="text-muted">hace 2 semanas</small>
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