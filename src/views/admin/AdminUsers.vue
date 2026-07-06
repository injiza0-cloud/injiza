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
        <h1>{{ t('totalUsers') }}</h1>
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            class="input-field" 
            :placeholder="t('search')"
          >
        </div>
      </header>

      <div class="users-table card">
        <table>
          <thead>
            <tr>
              <th>{{ t('username') }}</th>
              <th>Email</th>
              <th>{{ t('phone') }}</th>
              <th>{{ t('balance') }}</th>
              <th>{{ t('level') }}</th>
              <th>{{ t('status') }}</th>
              <th>{{ t('action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.balance.toLocaleString() }} RWF</td>
              <td>{{ user.level }}</td>
              <td>
                <span class="badge" :class="user.is_active ? 'badge-success' : 'badge-error'">
                  {{ user.is_active ? 'Active' : 'Banned' }}
                </span>
              </td>
              <td>
                <button 
                  @click="toggleUserStatus(user.id)" 
                  class="btn btn-sm"
                  :class="user.is_active ? 'btn-outline' : 'btn-primary'"
                >
                  {{ user.is_active ? t('ban') : t('unban') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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

const searchQuery = ref('')

const users = computed(() => authStore.getUsers())

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(u => 
    u.username.toLowerCase().includes(query) ||
    u.email.toLowerCase().includes(query) ||
    u.phone.includes(query)
  )
})

const toggleUserStatus = (userId) => {
  authStore.toggleUserStatus(userId)
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

.search-box {
  width: 300px;
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

tr:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>