<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header glass">
            <div class="avatar-section">
              <div class="avatar">
                <img v-if="avatarPreview" :src="avatarPreview" alt="avatar" />
                <span v-else>{{ currentUser?.username?.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="user-info">
                <div class="editable-row">
                  <input v-model="name" class="name-input" />
                  <input type="file" @change="onFileChange" accept="image/*" />
                  <button class="btn btn-sm" @click="saveProfile">Save</button>
                </div>
                <p>{{ currentUser?.email }}</p>
                <span class="level-badge">{{ t('level') }} {{ currentUser?.level || 1 }}</span>
              </div>
            </div>
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-value">{{ currentUser?.balance?.toLocaleString() || 0 }}</span>
            <span class="stat-label">RWF</span>
            <span class="stat-sub">${{ dollarBalance }} USD</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ currentUser?.points || 0 }}</span>
            <span class="stat-label">{{ t('points') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ currentUser?.referralEarnings?.toLocaleString() || 0 }}</span>
            <span class="stat-label">{{ t('referFriends') }}</span>
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h2>{{ t('profile') }}</h2>
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">{{ t('username') }}</span>
              <span class="info-value">{{ currentUser?.username }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('email') }}</span>
              <span class="info-value">{{ currentUser?.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('phone') }}</span>
              <span class="info-value">{{ currentUser?.phone }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('referralCode') }}</span>
              <span class="info-value code">{{ currentUser?.referralCode }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2>{{ t('settings') }}</h2>
          <div class="settings-card">
            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-icon">🌐</span>
                <span>{{ t('language') }}</span>
              </div>
              <button @click="toggleLang" class="btn btn-outline btn-sm">
                {{ locale === 'rw' ? 'English' : 'Kinyarwanda' }}
              </button>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-icon">💱</span>
                <span>Display Currency</span>
              </div>
              <select v-model="selectedCurrency" @change="updateCurrency" class="btn btn-outline btn-sm currency-select">
                <option value="rwf">RWF (Rwandan Franc)</option>
                <option value="usd">USD (US Dollar)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Promo moved to Wallet: removed from profile for secrecy -->

        <div class="profile-section">
          <h2>{{ t('about') }}</h2>
          <div class="about-card">
            <p>
              {{ locale === 'rw' 
                ? 'Injiza ni platform yo gukura amafaranga ukoresheje video n\'imikorere. Fata amafaranga ukoresheje telefon yawe.' 
                : 'Injiza is a platform to earn money by watching videos and completing tasks. Earn money using your phone.' }}
            </p>
            <div class="app-info">
              <p>Version 1.0.0</p>
              <p>&copy; 2026 {{ t('appName') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useI18nStore } from '../stores/i18n'

const authStore = useAuthStore()
const i18nStore = useI18nStore()

const currentUser = computed(() => authStore.currentUser)

const name = ref(currentUser.value?.username || '')
const avatarFile = ref(null)
const avatarPreview = ref(currentUser.value?.avatar_url || null)
const selectedCurrency = ref(currentUser.value?.currency || 'rwf')

const dollarBalance = computed(() => {
  if (selectedCurrency.value === 'usd') {
    return authStore.convertToUSD(currentUser.value?.balance || 0)
  }
  return currentUser.value?.balance || 0
})

const onFileChange = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  avatarFile.value = f
  const reader = new FileReader()
  reader.onload = (ev) => { avatarPreview.value = ev.target.result }
  reader.readAsDataURL(f)
}

const updateCurrency = async () => {
  if (!currentUser.value) return
  const res = await authStore.updateProfile(currentUser.value.id, { currency: selectedCurrency.value })
  if (res.success) {
    alert('Currency preference updated')
  }
}

const saveProfile = async () => {
  if (!currentUser.value) return
  const updates = {}
  if (name.value) updates.username = name.value
  if (avatarFile.value) {
    updates.avatar_url = avatarPreview.value
  }
  const res = await authStore.updateProfile(currentUser.value.id, updates)
  if (res.success) {
    alert('Profile updated')
  } else {
    alert('Update failed: ' + (res.message || ''))
  }
}

// Promo moved to Wallet (kept secret)

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const toggleLang = () => {
  i18nStore.setLocale(i18nStore.locale === 'rw' ? 'en' : 'rw')
}
</script>

<style scoped>
.editable-row { display:flex; gap:0.5rem; align-items:center }
.name-input { padding:0.45rem 0.6rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06) }
.avatar img { width:80px; height:80px; border-radius:50%; object-fit:cover }
.stat-sub { display:block; font-size:0.8rem; color:var(--text-secondary); margin-top:6px }
</style>

<style scoped>
.profile-page {
  padding: 2rem 0;
}

.profile-header {
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.user-info h1 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.user-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.level-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent), #e69500);
  color: #1B2838;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.stats-row {
  display: flex;
  gap: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-item .stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-item .stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.profile-section {
  margin-bottom: 2rem;
}

.profile-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.info-card,
.settings-card,
.about-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--glass-border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--text-secondary);
}

.info-value {
  font-weight: 500;
}

.info-value.code {
  font-family: monospace;
  color: var(--primary);
  font-size: 1.1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.setting-icon {
  font-size: 1.25rem;
}

.about-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.app-info {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--glass-border);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.currency-select {
  padding: 0.5rem 0.75rem !important;
  font-size: 0.9rem;
  background: rgba(255,255,255,0.04) !important;
  color: white !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 8px;
  cursor: pointer;
}
.currency-select option { background: #1a1a2e; color: white; }

@media (max-width: 640px) {
  .stats-row {
    gap: 1.5rem;
  }
}
</style>