<template>
  <div class="admin-dashboard">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>🇷🇼 Injiza</h2>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item">
          <span>📊</span> {{ t('dashboard') }}
        </router-link>
        <router-link to="/admin/users" class="nav-item">
          <span>👥</span> {{ t('totalUsers') }}
        </router-link>
        <router-link to="/admin/videos" class="nav-item">
          <span>📺</span> {{ t('videos') }}
        </router-link>
        <router-link to="/admin/tasks" class="nav-item">
          <span>📋</span> {{ t('tasks') }}
        </router-link>
        <router-link to="/admin/withdrawals" class="nav-item">
          <span>💰</span> {{ t('withdraw') }}
        </router-link>
        <router-link to="/" class="nav-item">
          <span>🏠</span> {{ locale === 'rw' ? 'Garuka' : 'Back to Site' }}
        </router-link>
      </nav>
    </aside>

    <main class="admin-main">
      <header class="admin-header">
        <h1>{{ t('videos') }}</h1>
        <button @click="showAddModal = true" class="btn btn-primary">
          {{ t('add') }} {{ t('video') }}
        </button>
      </header>

      <div class="videos-table card">
        <table>
          <thead>
            <tr>
              <th>{{ t('title') }}</th>
              <th>{{ t('reward') }}</th>
              <th>{{ t('duration') }}</th>
              <th>Views</th>
              <th>{{ t('status') }}</th>
              <th>{{ t('action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="video in videos" :key="video.id">
              <td>{{ video.title }}</td>
              <td>{{ video.reward }} RWF</td>
              <td>{{ video.duration }}s</td>
              <td>{{ video.views }}</td>
              <td>
                <span class="badge" :class="video.isActive ? 'badge-success' : 'badge-error'">
                  {{ video.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button @click="toggleVideoStatus(video.id)" class="btn btn-sm btn-outline">
                  {{ video.isActive ? 'Deactivate' : 'Activate' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="add-modal" v-if="showAddModal">
        <div class="modal-overlay" @click="showAddModal = false">
          <div class="modal-content" @click.stop>
            <h2>{{ t('add') }} {{ t('video') }}</h2>
            <form @submit.prevent="addVideo">
              <div class="form-group">
                <label>{{ t('title') }}</label>
                <input type="text" v-model="newVideo.title" class="input-field" required>
              </div>
              <div class="form-group">
                <label>Description</label>
                <input type="text" v-model="newVideo.description" class="input-field" required>
              </div>
              <div class="form-group">
                <label>Thumbnail URL</label>
                <input type="url" v-model="newVideo.thumbnail" class="input-field" required>
              </div>
              <div class="form-group">
                <label>Video URL</label>
                <input type="url" v-model="newVideo.videoUrl" class="input-field" required>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('duration') }} (s)</label>
                  <input type="number" v-model="newVideo.duration" class="input-field" required>
                </div>
                <div class="form-group">
                  <label>{{ t('reward') }} (RWF)</label>
                  <input type="number" v-model="newVideo.reward" class="input-field" required>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" @click="showAddModal = false" class="btn btn-outline">{{ t('cancel') }}</button>
                <button type="submit" class="btn btn-primary">{{ t('save') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useI18nStore } from '../../stores/i18n'

const authStore = useAuthStore()
const i18nStore = useI18nStore()

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const videos = computed(() => authStore.getVideos())
const showAddModal = ref(false)

const newVideo = ref({
  title: '',
  description: '',
  thumbnail: '',
  videoUrl: '',
  duration: 30,
  reward: 50
})

const toggleVideoStatus = (videoId) => {
  const videos = authStore.getVideos()
  const index = videos.findIndex(v => v.id === videoId)
  if (index !== -1) {
    videos[index].isActive = !videos[index].isActive
    authStore.saveVideos(videos)
  }
}

const addVideo = () => {
  const videos = authStore.getVideos()
  videos.push({
    id: 'vid-' + Date.now(),
    ...newVideo.value,
    isActive: true,
    views: 0,
    createdAt: new Date().toISOString()
  })
  authStore.saveVideos(videos)
  showAddModal.value = false
  newVideo.value = { title: '', description: '', thumbnail: '', videoUrl: '', duration: 30, reward: 50 }
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 250px;
  background: var(--bg-surface);
  border-right: 1px solid var(--glass-border);
  padding: 1.5rem;
  position: fixed;
  height: 100vh;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--primary);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.nav-item:hover, .nav-item.router-link-active {
  background: rgba(0, 166, 81, 0.1);
  color: var(--primary);
}

.admin-main {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-header h1 {
  font-size: 1.75rem;
}

.card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.5rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--glass-border);
}

th {
  background: rgba(0, 166, 81, 0.1);
  color: var(--primary);
  font-weight: 600;
}

.add-modal .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.add-modal .modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>