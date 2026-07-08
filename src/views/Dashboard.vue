<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="dashboard-header">
        <div class="welcome-section">
          <div class="welcome-badge">
            <span class="badge-dot"></span>
            <span>{{ locale === 'rw' ? 'Murakaze' : 'Welcome back' }}</span>
          </div>
          <h1>{{ currentUser?.username }}! 👋</h1>
          <p>{{ locale === 'rw' ? 'Tangira gukura none!' : 'Start earning now!' }}</p>
        </div>
        <div class="daily-bonus" v-if="dailyBonus.canClaim && !dailyBonus.claimed">
          <div class="bonus-glow"></div>
          <div class="bonus-icon">🎁</div>
          <div class="bonus-info">
            <span class="bonus-label">{{ t('dailyBonus') }}</span>
            <span class="bonus-amount">+{{ dailyBonus.bonus }} RWF</span>
          </div>
          <button @click="claimBonus" class="btn btn-accent btn-sm">
            {{ t('getBonus') }}
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card main-balance">
          <div class="stat-left">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <span class="stat-label">{{ t('yourBalance') }}</span>
              <div class="balance-row">
                <span class="stat-value">{{ currentUser?.balance?.toLocaleString() || 0 }}</span>
                <span class="stat-currency">RWF</span>
              </div>
              <span class="stat-sub">{{ locale === 'rw' ? 'Ayo usigaranye' : 'Available to withdraw' }}</span>
            </div>
          </div>

          <router-link to="/wallet" class="withdraw-pill">
            {{ locale === 'rw' ? 'Kubikuza' : t('withdraw') }}
          </router-link>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper primary">
            <span class="stat-icon">📺</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">{{ t('completedVideo') }}</span>
            <span class="stat-value">{{ videoCount }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper secondary">
            <span class="stat-icon">✅</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">{{ t('completedTask') }}</span>
            <span class="stat-value">{{ taskCount }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper accent">
            <span class="stat-icon">⭐</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">{{ t('level') }}</span>
            <span class="stat-value">{{ currentUser?.level || 1 }}</span>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <div class="section-header">
          <h2>{{ locale === 'rw' ? 'Ibikorwa byoroshye' : 'Quick Actions' }}</h2>
        </div>
        <div class="actions-grid">
          <router-link to="/videos" class="action-card">
            <div class="action-card-bg"></div>
            <div class="action-icon">📺</div>
            <span class="action-title">{{ t('videos') }}</span>
            <span class="action-reward">+50-100 RWF</span>
          </router-link>
          <router-link to="/tasks" class="action-card">
            <div class="action-card-bg"></div>
            <div class="action-icon">📋</div>
            <span class="action-title">{{ t('tasks') }}</span>
            <span class="action-reward">+20-150 RWF</span>
          </router-link>
          <router-link to="/wallet" class="action-card">
            <div class="action-card-bg"></div>
            <div class="action-icon">💳</div>
            <span class="action-title">{{ t('wallet') }}</span>
            <span class="action-reward">{{ t('history') }}</span>
          </router-link>
          <div class="action-card" @click="showReferral">
            <div class="action-card-bg"></div>
            <div class="action-icon">👥</div>
            <span class="action-title">{{ t('referFriends') }}</span>
            <span class="action-reward">+500 RWF</span>
          </div>
        </div>
      </div>

      <div class="recent-activity">
        <div class="section-header">
          <h2>{{ t('history') }}</h2>
          <router-link to="/wallet" class="view-all">{{ locale === 'rw' ? 'Reba byose' : 'View all' }} →</router-link>
        </div>
        <div class="activity-list">
          <div v-if="transactions.length === 0" class="no-activity">
            <div class="empty-icon">📭</div>
            <p>{{ t('noData') }}</p>
          </div>
          <div v-for="tx in transactions.slice(0, 5)" :key="tx.id" class="activity-item">
            <div class="activity-icon" :class="tx.type">
              {{ tx.type === 'video' ? '📺' : tx.type === 'task' ? '📋' : tx.type === 'bonus' ? '🎁' : tx.type === 'referral' ? '👥' : tx.type === 'withdrawal' ? '💸' : '💰' }}
            </div>
            <div class="activity-details">
              <span class="activity-desc">{{ tx.description }}</span>
              <span class="activity-time">{{ formatDate(tx.createdAt) }}</span>
            </div>
            <div class="activity-amount" :class="tx.type === 'withdrawal' ? 'negative' : 'positive'">
              {{ tx.type === 'withdrawal' ? '-' : '+' }}{{ tx.amount.toLocaleString() }} RWF
            </div>
          </div>
        </div>
      </div>

      <div class="referral-modal" v-if="showReferralModal">
        <div class="modal-overlay" @click="showReferralModal = false">
          <div class="modal-content" @click.stop>
            <div class="modal-icon">🎁</div>
            <h3>{{ t('referFriends') }}</h3>
            <p>{{ locale === 'rw' ? 'Sobanura inshuti yawe' : 'Share your referral code' }}</p>
            <div class="referral-code">
              {{ currentUser?.referralCode }}
            </div>
            <button @click="copyReferral" class="btn btn-primary">
              {{ locale === 'rw' ? 'Kopisha' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useI18nStore } from '../stores/i18n'

const authStore = useAuthStore()
const i18nStore = useI18nStore()

const currentUser = computed(() => authStore.currentUser)
const transactions = computed(() => authStore.getUserTransactions())

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const videoCount = ref(0)
const taskCount = ref(0)
const dailyBonus = ref({ canClaim: false, claimed: true, bonus: 0 })
const showReferralModal = ref(false)

onMounted(() => {
  if (currentUser.value) {
    const completedVideos = JSON.parse(localStorage.getItem(`completedVideos_${currentUser.value.id}`) || '[]')
    const completedTasks = JSON.parse(localStorage.getItem(`completedTasks_${currentUser.value.id}`) || '[]')
    videoCount.value = completedVideos.length
    taskCount.value = completedTasks.length
    dailyBonus.value = authStore.checkDailyBonus()
  }
})

const claimBonus = () => {
  const result = authStore.claimDailyBonus()
  if (result.success) {
    dailyBonus.value.claimed = true
  }
}

const showReferral = () => {
  showReferralModal.value = true
}

const copyReferral = () => {
  navigator.clipboard.writeText(currentUser.value?.referralCode || '')
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'rw' ? 'rw-RW' : 'en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.dashboard-page {
  padding: 2rem 0;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.welcome-section h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.welcome-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--success);
  margin-bottom: 1rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--success);
  border-radius: 50%;
}

.welcome-section p {
  color: var(--text-secondary);
}

.daily-bonus {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(245, 166, 35, 0.15), rgba(245, 158, 11, 0.05));
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.bonus-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(245, 166, 35, 0.2), transparent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.bonus-icon {
  font-size: 2rem;
  position: relative;
}

.bonus-info {
  display: flex;
  flex-direction: column;
  position: relative;
}

.bonus-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.bonus-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--glass-border-hover);
}

.stat-card.main-balance {
  background: var(--gradient-primary);
  border: none;
  position: relative;
  overflow: hidden;
}

.stat-card.main-balance::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrapper.primary {
  background: rgba(99, 102, 241, 0.15);
}

.stat-icon-wrapper.secondary {
  background: rgba(236, 72, 153, 0.15);
}

.stat-icon-wrapper.accent {
  background: rgba(245, 158, 11, 0.15);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  flex: 1;
}

.stat-content .stat-label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.stat-left { display:flex; gap:1rem; align-items:center; }
.stat-content .stat-value {
  font-size: 2.4rem;
  font-weight: 900;
  line-height: 1;
}

.balance-row { display: flex; align-items: baseline; gap: 0.6rem; }
.stat-currency {
  font-size: 1rem;
  color: rgba(255,255,255,0.95);
}

.stat-sub {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.76rem;
  color: rgba(255,255,255,0.85);
  opacity: 0.9;
}

.withdraw-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #f59e0b, #10b981);
  color: #050816;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 10px 28px rgba(16,185,129,0.14);
}

.withdraw-pill:hover { transform: translateY(-2px); }

.main-balance .stat-content .stat-label {
  color: rgba(255, 255, 255, 0.8);
}

.main-balance .stat-content .stat-value,
.main-balance .stat-content .stat-currency {
  color: white;
}

.quick-actions {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.25rem;
}

.view-all {
  font-size: 0.9rem;
  color: var(--primary-light);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.action-card {
  position: relative;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}

.action-card-bg {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
}

.action-card:hover .action-card-bg {
  opacity: 0.1;
}

.action-icon {
  font-size: 2rem;
  position: relative;
  z-index: 1;
}

.action-title {
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.action-reward {
  font-size: 0.85rem;
  color: var(--primary-light);
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.recent-activity .section-header {
  margin-bottom: 1rem;
}

.activity-list {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.no-activity {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--glass-border);
  transition: background var(--transition-fast);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.activity-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  background: rgba(99, 102, 241, 0.15);
}

.activity-icon.video {
  background: rgba(99, 102, 241, 0.15);
}

.activity-icon.task {
  background: rgba(236, 72, 153, 0.15);
}

.activity-icon.bonus,
.activity-icon.referral {
  background: rgba(245, 158, 11, 0.15);
}

.activity-icon.withdrawal {
  background: rgba(239, 68, 68, 0.15);
}

.activity-details {
  flex: 1;
}

.activity-desc {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.activity-amount {
  font-weight: 700;
  font-size: 0.95rem;
}

.activity-amount.positive {
  color: var(--success);
}

.activity-amount.negative {
  color: var(--error);
}

.referral-modal .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.referral-modal .modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  animation: scale-in 0.3s ease;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-content h3 {
  margin-bottom: 0.5rem;
}

.modal-content p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.referral-code {
  background: var(--bg-dark);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-light);
  margin-bottom: 1.5rem;
  letter-spacing: 4px;
  border: 1px solid var(--glass-border);
}

@media (max-width: 1024px) {
  .stats-grid,
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
  }

  .welcome-section h1 {
    font-size: 1.5rem;
  }
}
</style>
