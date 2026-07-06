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
        <h1>{{ t('withdrawRequest') }}</h1>
      </header>

      <div class="withdrawals-table card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>{{ t('amount') }}</th>
              <th>{{ t('phone') }}</th>
              <th>{{ t('status') }}</th>
              <th>{{ t('action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="withdrawal in pendingWithdrawals" :key="withdrawal.id">
              <td>{{ getUserName(withdrawal.userId) }}</td>
              <td>{{ withdrawal.amount.toLocaleString() }} RWF</td>
              <td>{{ withdrawal.phone }}</td>
              <td>
                <span class="badge badge-warning">{{ t('pending') }}</span>
              </td>
              <td>
                <div class="action-buttons">
                  <button @click="approveWithdrawal(withdrawal.id)" class="btn btn-sm btn-primary">
                    {{ t('approve') }}
                  </button>
                  <button @click="rejectWithdrawal(withdrawal.id)" class="btn btn-sm btn-outline">
                    {{ t('reject') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="pendingWithdrawals.length === 0" class="no-data">
          {{ t('noData') }}
        </div>
      </div>

      <div class="history-section">
        <h2>{{ locale === 'rw' ? 'Ibyakozwe' : 'History' }}</h2>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>{{ t('amount') }}</th>
                <th>{{ t('phone') }}</th>
                <th>{{ t('status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="withdrawal in processedWithdrawals" :key="withdrawal.id">
                <td>{{ getUserName(withdrawal.userId) }}</td>
                <td>{{ withdrawal.amount.toLocaleString() }} RWF</td>
                <td>{{ withdrawal.phone }}</td>
                <td>
                  <span class="badge" :class="withdrawal.status === 'completed' ? 'badge-success' : 'badge-error'">
                    {{ withdrawal.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useI18nStore } from '../../stores/i18n'

const authStore = useAuthStore()
const i18nStore = useI18nStore()

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const users = computed(() => authStore.getUsers())
const allTransactions = computed(() => authStore.getAllTransactions())

const pendingWithdrawals = computed(() => 
  allTransactions.value.filter(t => t.type === 'withdrawal' && t.status === 'pending')
)

const processedWithdrawals = computed(() => 
  allTransactions.value.filter(t => t.type === 'withdrawal' && t.status !== 'pending').slice(0, 20)
)

const getUserName = (userId) => {
  const user = users.value.find(u => u.id === userId)
  return user ? user.username : 'Unknown'
}

const approveWithdrawal = (id) => {
  authStore.approveWithdrawal(id)
}

const rejectWithdrawal = (id) => {
  authStore.rejectWithdrawal(id)
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

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.no-data {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.history-section {
  margin-top: 2rem;
}

.history-section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}
</style>