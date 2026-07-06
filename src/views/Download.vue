<template>
  <div class="app-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ t('downloadApp') }}</h1>
        <p>{{ locale === 'rw' ? 'Download Injiza app kugira ugukure nibirimo' : 'Download the Injiza app to earn anywhere' }}</p>
      </div>

      <div class="app-info">
        <div class="app-logo">
          <img src="/favicon.svg" alt="Injiza" class="logo-img">
        </div>
        <h2>Injiza App</h2>

        <div class="features">
          <div class="feature">
            <span class="feature-icon">📱</span>
            <div class="feature-text">
              <h3>{{ locale === 'rw' ? 'Muri telefone' : 'On your phone' }}</h3>
              <p>{{ locale === 'rw' ? 'Kora ibikorere nibirimo igihe cose' : 'Complete tasks anywhere, anytime' }}</p>
            </div>
          </div>
          <div class="feature">
            <span class="feature-icon">⚡</span>
            <div class="feature-text">
              <h3>{{ locale === 'rw' ? 'Byihuse' : 'Fast notifications' }}</h3>
              <p>{{ locale === 'rw' ? 'Fata amakuru vuba' : 'Get updates instantly' }}</p>
            </div>
          </div>
          <div class="feature">
            <span class="feature-icon">🔔</span>
            <div class="feature-text">
              <h3>{{ locale === 'rw' ? 'Amakuru ajyanye' : 'Real-time alerts' }}</h3>
              <p>{{ locale === 'rw' ? 'Usib告知 new tasks' : 'Never miss new tasks' }}</p>
            </div>
          </div>
        </div>

        <div class="download-buttons">
          <a href="/Injiza.apk" download class="btn btn-primary btn-lg">
            <span>📲</span> {{ locale === 'rw' ? 'Download Injiza App' : 'Download Injiza App' }}
          </a>
        </div>

        <div class="install-guide">
          <h3>{{ locale === 'rw' ? 'Iburyo bwo gatsby' : 'How to install' }}</h3>
          <ol>
            <li>{{ locale === 'rw' ? 'Kanda button iri.hejwe' : 'Click the download button above' }}</li>
            <li>{{ locale === 'rw' ? 'Gukomeza installation' : 'Allow installation from unknown sources' }}</li>
            <li>{{ locale === 'rw' ? 'Ongera app' : 'Open the app after installing' }}</li>
            <li>{{ locale === 'rw' ? 'Injira cyangwa fg nshya' : 'Login or register' }}</li>
          </ol>
        </div>

        <div class="pc-guide">
          <h3>{{ locale === 'rw' ? 'Kuri PC' : 'For PC' }}</h3>
          <p>{{ locale === 'rw' ? 'Kuri PC , guka Google Chrome , kanda > More tools > Add to Home screen' : 'On PC, open Google Chrome, click Menu > More tools > Add to Home screen' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nStore } from '../stores/i18n'

const i18nStore = useI18nStore()

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)
</script>

<style scoped>
.app-page {
  padding: 3rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.app-info {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
}

.app-logo {
  margin-bottom: 1rem;
}

.logo-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.app-info h2 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.features {
  text-align: left;
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-dark);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.feature-icon {
  font-size: 2rem;
}

.feature-text h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.feature-text p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.download-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.download-buttons .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.install-guide {
  text-align: left;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-dark);
  border-radius: 12px;
}

.install-guide h3 {
  margin-bottom: 1rem;
}

.install-guide ol {
  padding-left: 1.5rem;
}

.install-guide li {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.pc-guide {
  text-align: left;
  padding: 1.5rem;
  background: var(--bg-dark);
  border-radius: 12px;
}

.pc-guide h3 {
  margin-bottom: 0.5rem;
}

.pc-guide p {
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .app-info {
    padding: 1.5rem;
  }
}
</style>