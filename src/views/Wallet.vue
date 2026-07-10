<template>
  <div class="wallet-page">
    <div class="container">
      <div class="page-header">
        <h1>💰 {{ t('wallet') }}</h1>
        <div class="brand-small">injiza</div>
      </div>

      <div class="wallet-grid">
        <div class="balance-section">
          <div class="balance-card" :class="{ 'balance-update': isBalanceUpdating }">
            <div class="coins-container" v-if="isBalanceUpdating">
              <span v-for="n in 8" :key="n" class="floating-coin" :style="{ '--i': n }">🪙</span>
            </div>
            <div class="balance-header">
              <span class="balance-label">{{ t('yourBalance') }}</span>
              <span class="balance-icon">💰</span>
            </div>
            <div class="balance-amount" :class="{ 'amount-bounce': isBalanceUpdating }">
              <span class="amount-prefix" v-if="balanceDiff > 0">+{{ balanceDiff.toLocaleString() }}</span>
              {{ displayBalance.toLocaleString() }}
            </div>
            <div class="balance-currency">RWF</div>
            <div class="balance-highlight">Available to withdraw anytime</div>
            <div class="balance-level" v-if="currentUser?.level">
              <span class="level-badge">🏆 Level {{ currentUser.level }}</span>
              <span class="next-level">{{ currentUser.points || 0 }} / {{ currentUser.level * 500 }} XP</span>
            </div>
          </div>
          
          <div class="balance-actions">
            <button @click="claimBonus" class="btn btn-secondary" :disabled="!canClaimBonus">
              🎁 {{ locale === 'rw' ? 'Bonus' : 'Daily Bonus' }}
            </button>
            <button @click="startWithdraw" class="btn btn-primary btn-lg withdraw-btn">
              💸 {{ t('withdraw') }}
            </button>
          </div>
          
          <!-- Compact mini-stats to fill vertical gap and surface quick info -->
          <div class="mini-info">
            <div class="mini-chip">
              <div class="mini-value">{{ currentUser?.referral_earnings ? currentUser.referral_earnings.toLocaleString() + ' RWF' : '0 RWF' }}</div>
              <div class="mini-label">Referrals</div>
            </div>
            <div class="mini-chip">
              <div class="mini-value">{{ transactions.filter(tx => tx.status === 'pending').length }}</div>
              <div class="mini-label">Pending</div>
            </div>
            <div class="mini-chip">
              <div class="mini-value">{{ currentUser?.level ? 'Level ' + currentUser.level : '-' }}</div>
              <div class="mini-label">Level</div>
            </div>
          </div>
          
          <!-- Extra compact tiles to occupy space and show quick stats -->
          <div class="balance-bottom">
            <div class="stat-tile">
              <div class="tile-title">Next payout</div>
              <div class="tile-value">{{ currentUser?.next_payout ? new Date(currentUser.next_payout).toLocaleDateString() : '—' }}</div>
            </div>
            <div class="stat-tile">
              <div class="tile-title">Min withdraw</div>
              <div class="tile-value">43,900 RWF</div>
            </div>
            <div class="stat-tile">
              <div class="tile-title">Today earned</div>
              <div class="tile-value">{{ todaysEarnings }} RWF</div>
            </div>
          </div>

          <!-- Recent referrals list to fill space -->
          <div class="referrals-block">
            <div class="referrals-header">Recent referrals</div>
            <ul class="referral-list">
              <li v-for="r in recentReferrals" :key="r.id" class="ref-item">
                <div class="ref-desc">{{ r.description || r.meta?.note || 'Referral' }}</div>
                <div class="ref-amount">+{{ (r.amount || 0).toLocaleString() }} RWF</div>
              </li>
              <li v-if="recentReferrals.length === 0" class="ref-empty">No recent referrals</li>
            </ul>
          </div>
        </div>

        <div class="quick-actions">
          <h3>{{ locale === 'rw' ? 'Ibyifashisho' : 'Quick Actions' }}</h3>
          <div class="action-cards">
            <div class="action-card referral-card">
                <span class="action-icon">🔗</span>
                <div class="action-info">
                  <span class="action-label">Share & earn</span>
                  <span class="action-value">Invite friends, earn RWF</span>
                  <span class="referral-earnings" v-if="currentUser?.referral_earnings">
                    Earned: <strong>{{ currentUser.referral_earnings.toLocaleString() }} RWF</strong>
                  </span>
                </div>
                <div class="referral-actions">
                  <div class="ref-code-container" v-if="currentUser?.referral_code">
                    <div class="ref-code-label">Your referral code:</div>
                    <div class="ref-code">{{ currentUser.referral_code }}</div>
                    <div class="ref-code-hint">Share this code with friends to earn 1,450 RWF per signup</div>
                  </div>
                  <div class="referral-buttons" v-if="currentUser?.referral_code">
                    <button class="btn btn-ghost btn-sm" @click="copyReferral">📋 Copy</button>
                    <button class="btn btn-primary btn-sm" @click="shareReferral">📤 Share</button>
                  </div>
                </div>
              </div>
            <div class="action-card promo-card">
              <span class="action-icon">🎁</span>
              <div class="action-info">
                <span class="action-label">Daily bonus</span>
                <span class="action-value">+500 RWF</span>
              </div>
            </div>
            <div class="action-card promo-card">
              <span class="action-icon">👥</span>
              <div class="action-info">
                <span class="action-label">Refer a friend</span>
                <span class="action-value">+500 RWF each</span>
              </div>
            </div>
            <div class="action-card promo-card promo-featured">
              <span class="action-icon">🎟️</span>
              <div class="action-info">
                <span class="action-label">Promo code bonus</span>
                <span class="action-value">—</span>
              </div>
            </div>
            <div class="action-card promo-card">
              <span class="action-icon">💎</span>
              <div class="action-info">
                <span class="action-label">Weekend reward</span>
                <span class="action-value">12,000 RWF</span>
              </div>
            </div>
            <div class="action-card promo-card">
              <span class="action-icon">✨</span>
              <div class="action-info">
                <span class="action-label">Starter boost</span>
                <span class="action-value">2,400 RWF</span>
              </div>
            </div>
          </div>
          <div class="promo-area">
            <div class="promo-input">
              <div class="promo-icon">🎟️</div>
              <input v-model="promo" placeholder="Enter promo code" class="promo-field" />
              <button @click="applyPromo" class="btn btn-primary promo-apply">Apply</button>
            </div>
            <p class="promo-message">{{ promoMessage }}</p>
          </div>
        </div>
      </div>

      <div class="wallet-insights-grid">
        <div class="insight-card">
          <div class="insight-title">💸 Earnings summary</div>
          <div class="insight-list">
            <div class="insight-row"><span>Watching videos</span><strong>+4,200 RWF</strong></div>
            <div class="insight-row"><span>Completing tasks</span><strong>+2,100 RWF</strong></div>
            <div class="insight-row"><span>Daily check-ins</span><strong>+1,000 RWF</strong></div>
            <div class="insight-row"><span>Referral bonuses</span><strong>+3,500 RWF</strong></div>
            <div class="insight-row"><span>Promotions</span><strong>+2,400 RWF</strong></div>
          </div>
        </div>

        <div class="insight-card">
          <div class="insight-title">⏳ Pending rewards</div>
          <p class="insight-note">Some rewards stay pending for 24–72 hours while task completion and account verification are finalized.</p>
          <div class="pending-pill">Pending: 12,000 RWF</div>
          <div class="pending-pill alt">Verification required: 2 rewards</div>
        </div>

        <div class="insight-card">
          <div class="insight-title">📈 Reward progress</div>
          <p class="insight-note">Current balance: 14,900 RWF</p>
          <p class="insight-note">Minimum withdrawal: 43,900 RWF</p>
        </div>

        <div class="insight-card">
          <div class="insight-title">🎯 Bonus opportunities</div>
          <ul class="support-list">
            <li>Watch today’s bonus videos</li>
            <li>Complete featured tasks</li>
            <li>Invite friends and earn more</li>
            <li>Keep your daily streak alive</li>
          </ul>
        </div>
      </div>

      <div class="wallet-stats-grid">
        <div class="stats-card">
          <span class="stats-label">Total videos watched</span>
          <strong>84</strong>
        </div>
        <div class="stats-card">
          <span class="stats-label">Total tasks completed</span>
          <strong>31</strong>
        </div>
        <div class="stats-card">
          <span class="stats-label">Total referrals</span>
          <strong>12</strong>
        </div>
        <div class="stats-card">
          <span class="stats-label">Average earnings / day</span>
          <strong>3,400 RWF</strong>
        </div>
        <div class="stats-card">
          <span class="stats-label">Consecutive active days</span>
          <strong>9</strong>
        </div>
      </div>

      <div class="transactions-section">
        <h2>📊 {{ t('history') }}</h2>
        <div class="transactions-list">
          <div v-if="transactions.length === 0" class="no-transactions">
            {{ t('noData') }}
          </div>
          <div v-for="tx in transactions" :key="tx.id" class="transaction-item">
            <div class="tx-icon" :class="tx.type">
              {{ getTxIcon(tx.type) }}
            </div>
            <div class="tx-details">
              <span class="tx-desc">{{ tx.description }}</span>
              <span class="tx-time">{{ formatDate(tx.created_at) }}</span>
            </div>
            <div class="tx-status" :class="tx.status">
              {{ getStatusLabel(tx.status) }}
            </div>
            <div class="tx-amount" :class="tx.type === 'withdrawal' ? 'negative' : 'positive'">
              {{ tx.type === 'withdrawal' ? '-' : '+' }}{{ tx.amount.toLocaleString() }} RWF
            </div>
          </div>
        </div>
      </div>

      <div class="support-section">
        <div class="support-card">
          <div class="insight-title">🔔 Wallet notifications</div>
          <ul class="support-list">
            <li>Withdrawal approved</li>
            <li>Reward credited</li>
            <li>Payment sent</li>
            <li>Verification required</li>
          </ul>
        </div>
        <div class="support-card">
          <div class="insight-title">🛟 Help & support</div>
          <ul class="support-list">
            <li>Payment FAQs</li>
            <li>Withdrawal policies</li>
            <li>Contact support</li>
            <li>Report a missing reward</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="withdraw-modal" v-if="showWithdrawModal">
      <div class="modal-overlay" @click="closeWithdraw">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeWithdraw">✕</button>
          
          <div class="withdraw-flow">
            <div class="step-indicator">
              <div class="step" :class="{ active: step >= 1, completed: step > 1 }">
                <span class="step-num">1</span>
                <span class="step-label">{{ locale === 'rw' ? 'Igiciro' : 'Amount' }}</span>
              </div>
              <div class="step-line" :class="{ active: step > 1 }"></div>
              <div class="step" :class="{ active: step >= 2, completed: step > 2 }">
                <span class="step-num">2</span>
                <span class="step-label">{{ locale === 'rw' ? 'Telefoni' : 'Phone' }}</span>
              </div>
              <div class="step-line" :class="{ active: step > 2 }"></div>
              <div class="step" :class="{ active: step >= 3 }">
                <span class="step-num">3</span>
                <span class="step-label">{{ locale === 'rw' ? 'Emeza' : 'Confirm' }}</span>
              </div>
            </div>

            <div class="step-content">
              <div v-if="step === 1" class="amount-step">
                <div class="phone-animation">
                  <div class="phone-icon">📱</div>
                  <div class="phone-ring"></div>
                </div>
                
                <h2>{{ t('withdraw') }}</h2>
                <p class="balance-info">{{ locale === 'rw' ? 'Ayo usigaranye:' : 'Your balance:' }} <strong>{{ currentUser?.balance?.toLocaleString() }} RWF</strong></p>
                
                <div class="amount-input-group">
                  <label>{{ t('amount') }} (RWF)</label>
                  <div class="amount-input">
                    <span class="currency-symbol">RWF</span>
                    <input 
                      type="number" 
                      v-model.number="withdrawAmount" 
                      class="input-field"
                      placeholder="43900"
                      min="43900"
                      :max="currentUser?.balance"
                    >
                  </div>
                  <div class="quick-amounts">
                    <button type="button" @click="withdrawAmount = 43900" :class="{ active: withdrawAmount === 43900 }">43.9K</button>
                    <button type="button" @click="withdrawAmount = 50000" :class="{ active: withdrawAmount === 50000 }">50K</button>
                    <button type="button" @click="withdrawAmount = 100000" :class="{ active: withdrawAmount === 100000 }">100K</button>
                    <button type="button" @click="withdrawAmount = currentUser?.balance || 0" :class="{ active: withdrawAmount === currentUser?.balance }">All</button>
                  </div>
                  <small v-if="withdrawAmount < 43900" class="error-text">
                    {{ locale === 'rw' ? 'Igiciro kinini ni 43,900 RWF' : 'Minimum is 43,900 RWF' }}
                  </small>
                </div>
                
                <button type="button" @click="goToStep2" class="btn btn-primary btn-lg" :disabled="withdrawAmount < 43900 || withdrawAmount > (currentUser?.balance || 0)">
                  Next →
                </button>
              </div>

              <div v-if="step === 2" class="phone-step">
                <div class="phone-animation">
                  <div class="phone-icon">📱</div>
                  <div class="phone-ring"></div>
                </div>
                
                <h2>{{ locale === 'rw' ? 'Shyiramo telefone' : 'Enter Phone Number' }}</h2>
                <p class="balance-info">{{ locale === 'rw' ? 'ibi bazajye bimena:' : 'Money will be sent to:' }}</p>
                
                <div class="payment-methods">
                  <button 
                    class="method-btn" 
                    :class="{ active: selectedMethod === 'mtn' }"
                    @click="selectedMethod = 'mtn'"
                  >
                    <span class="method-logo">🟡</span> MTN MoMo
                  </button>
                  <button 
                    class="method-btn" 
                    :class="{ active: selectedMethod === 'airtel' }"
                    @click="selectedMethod = 'airtel'"
                  >
                    <span class="method-logo">🔴</span> Airtel Money
                  </button>
                </div>
                
                <div class="form-group">
                  <label>{{ t('phone') }}</label>
                  <input 
                    type="tel" 
                    v-model="withdrawPhone" 
                    class="input-field"
                    placeholder="+250 788 000 000"
                  >
                </div>
                
                <div class="step-actions">
                  <button type="button" @click="step = 1" class="btn btn-ghost">← Back</button>
                  <button type="button" @click="goToStep3" class="btn btn-primary" :disabled="!withdrawPhone || !selectedMethod">
                    Next →
                  </button>
                </div>
              </div>

              <div v-if="step === 3" class="confirm-step">
                <div class="phone-animation success">
                  <div class="phone-icon">✅</div>
                </div>
                
                <h2>{{ locale === 'rw' ? 'EMEZA UTOBANDE' : 'CONFIRM WITHDRAWAL' }}</h2>
                
                <div class="confirm-details">
                  <div class="confirm-item">
                    <span class="confirm-label">{{ t('amount') }}</span>
                    <span class="confirm-value">{{ withdrawAmount.toLocaleString() }} RWF</span>
                  </div>
                  <div class="confirm-item">
                    <span class="confirm-label">{{ t('phone') }}</span>
                    <span class="confirm-value">{{ withdrawPhone }}</span>
                  </div>
                  <div class="confirm-item">
                    <span class="confirm-label">Method</span>
                    <span class="confirm-value">{{ selectedMethod === 'mtn' ? 'MTN MoMo' : 'Airtel Money' }}</span>
                  </div>
                </div>
                
                <div class="step-actions">
                  <button @click="step = 2" class="btn btn-ghost">← Back</button>
                  <button @click="submitWithdrawal" class="btn btn-accent btn-lg" :disabled="withdrawLoading">
                    {{ withdrawLoading ? '...' : '✅ ' + (locale === 'rw' ? 'Emeza & Fata' : 'Confirm & Send') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useI18nStore } from '../stores/i18n'

const authStore = useAuthStore()
const i18nStore = useI18nStore()

const currentUser = computed(() => authStore.currentUser)
const transactions = computed(() => authStore.getUserTransactions().slice(0, 20))

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const showWithdrawModal = ref(false)
const step = ref(1)
const withdrawAmount = ref(43900)
const withdrawPhone = ref('')
const withdrawLoading = ref(false)
const withdrawError = ref('')
const selectedMethod = ref('')

const isBalanceUpdating = ref(false)
const balanceDiff = ref(0)
const displayBalance = ref(0)
const previousBalance = ref(0)
let balanceInterval = null
let balanceTimer = null

watch(() => currentUser.value?.balance, (newVal, oldVal) => {
  if (balanceInterval) {
    clearInterval(balanceInterval)
    balanceInterval = null
  }
  if (balanceTimer) {
    clearTimeout(balanceTimer)
    balanceTimer = null
  }

  if (typeof newVal !== 'number') {
    displayBalance.value = 0
    return
  }

  if (typeof oldVal === 'number' && newVal > oldVal) {
    balanceDiff.value = newVal - oldVal
    previousBalance.value = oldVal
    isBalanceUpdating.value = true
    displayBalance.value = oldVal

    const stepCount = 36
    const stepMs = 70
    const increment = (newVal - oldVal) / stepCount
    let current = oldVal

    balanceInterval = setInterval(() => {
      current += increment
      displayBalance.value = Math.round(current)
      if (current >= newVal) {
        displayBalance.value = newVal
        clearInterval(balanceInterval)
        balanceInterval = null
        balanceTimer = setTimeout(() => {
          isBalanceUpdating.value = false
          balanceDiff.value = 0
        }, 1400)
      }
    }, stepMs)
  } else {
    displayBalance.value = newVal
  }
}, { immediate: true })

const canClaimBonus = computed(() => {
  if (!currentUser.value) return false
  const bonus = authStore.checkDailyBonus()
  return bonus.canClaim
})

const todaysEarnings = computed(() => {
  try {
    const today = new Date().toDateString()
    return transactions.value.reduce((sum, tx) => {
      if (!tx || !tx.created_at) return sum
      const d = new Date(tx.created_at)
      if (d.toDateString() === today && Number(tx.amount) > 0) return sum + Number(tx.amount)
      return sum
    }, 0)
  } catch (e) {
    return 0
  }
})

const recentReferrals = computed(() => {
  try {
    return transactions.value.filter(tx => tx.type === 'referral').slice(0, 4)
  } catch (e) {
    return []
  }
})

// Promo code state
const promo = ref('')
const promoMessage = ref('')

const copyReferral = async () => {
  if (!currentUser.value || !currentUser.value.referral_code) return
  try {
    await navigator.clipboard.writeText(currentUser.value.referral_code)
    promoMessage.value = 'Referral code copied to clipboard.'
  } catch (e) {
    promoMessage.value = 'Copy failed — select and copy manually.'
  }
}

const shareReferral = async () => {
  if (!currentUser.value || !currentUser.value.referral_code) return
  const shareUrl = `${window.location.origin}/?ref=${currentUser.value.referral_code}`
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Join Injiza', text: 'Use my code to get a bonus', url: shareUrl })
    } catch (e) {
      // ignore
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareUrl)
      promoMessage.value = 'Share link copied to clipboard.'
    } catch (e) {
      promoMessage.value = 'Copy failed — share link: ' + shareUrl
    }
  }
}

const applyPromo = async () => {
  if (!currentUser.value) return
  const uid = currentUser.value.id
  const key = `promoClaimed_${uid}_${promo.value}`
  if (localStorage.getItem(key)) {
    promoMessage.value = 'Promo already used.'
    return
  }

  // Known codes are handled server-side; keep codes secret in UI.
  if (!promo.value) {
    promoMessage.value = 'Enter a promo code.'
    return
  }

  // apply known backend effects (mirror of profile logic)
  if (promo.value === 'MHHBGT') {
    await authStore.addBalance(7500)
    localStorage.setItem(key, '1')
    promoMessage.value = 'Applied successfully.'
    return
  }

  if (promo.value === 'BGT') {
    await authStore.addBalance(2100)
    localStorage.setItem(key, '1')
    promoMessage.value = 'Applied successfully.'
    return
  }

  promoMessage.value = 'Promo code not recognized.'
}

const claimBonus = async () => {
  const result = await authStore.claimDailyBonus()
  if (result.success) {
    alert(`+${result.amount} RWF ${locale.value === 'rw' ? 'byakiriwe!' : 'credited!'}`)
  }
}

const startWithdraw = () => {
  step.value = 1
  withdrawAmount.value = 43900
  withdrawPhone.value = ''
  selectedMethod.value = ''
  showWithdrawModal.value = true
}

const closeWithdraw = () => {
  showWithdrawModal.value = false
  step.value = 1
}

const nextStep = () => {
  step.value++
}

const goToStep2 = () => {
  if (withdrawAmount.value >= 43900 && withdrawAmount.value <= (currentUser.value?.balance || 0)) {
    step.value = 2
  }
}

const goToStep3 = () => {
  if (withdrawPhone.value && selectedMethod.value) {
    step.value = 3
  }
}

const getTxIcon = (type) => {
  const icons = {
    video: '📺',
    task: '📋',
    game: '🎮',
    bonus: '🎁',
    referral: '👥',
    withdrawal: '💸'
  }
  return icons[type] || '💰'
}

const getStatusLabel = (status) => {
  const labels = {
    completed: locale.value === 'rw' ? 'Byagenze neza' : 'Completed',
    pending: locale.value === 'rw' ? 'Urtegereje' : 'Pending',
    rejected: locale.value === 'rw' ? 'Byagaruwe' : 'Rejected'
  }
  return labels[status] || status
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'rw' ? 'rw-RW' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const submitWithdrawal = async () => {
  withdrawError.value = ''
  
  if (withdrawAmount.value < 43900) {
    withdrawError.value = 'minAmount'
    return
  }
  
  if (!withdrawPhone.value) {
    withdrawError.value = 'Phone required'
    return
  }

  withdrawLoading.value = true

  const result = await authStore.requestWithdrawal(withdrawAmount.value, withdrawPhone.value)
  
  withdrawLoading.value = false
  
  if (result.success) {
    alert(locale.value === 'rw' ? 'Ibisabe byoherejwe! Uzajya wibutse kugira nibyemezo.' : 'Request submitted! You will receive a confirmation.')
    closeWithdraw()
  } else {
    withdrawError.value = result.message
  }
}
</script>

<style scoped>
.wallet-page {
  padding: 1.2rem 0; /* reduced overall vertical space */
}

.page-header {
  margin-bottom: 1rem; /* tighten header spacing */
}

.page-header h1 {
  font-size: 1.7rem;
  margin: 0;
}

.wallet-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem; /* reduced gap */
  margin-bottom: 1rem;
}

.balance-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.balance-card {
  background: linear-gradient(135deg, #00A651 0%, #00C853 100%);
  border-radius: 20px;
  padding: 2rem 1.6rem; /* tighter padding to reduce empty space */
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.22s ease;
  box-shadow: 0 16px 40px rgba(0, 200, 83, 0.28), inset 0 1px 0 rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.12);
}

.balance-card.balance-update {
  transform: scale(1.05);
  box-shadow: 0 0 40px rgba(0, 200, 83, 0.6), inset 0 1px 0 rgba(255,255,255,0.2);
}

.coins-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-coin {
  position: absolute;
  font-size: 1.5rem;
  animation: coinFloat 1.5s ease-out forwards;
  left: calc(50% + (var(--i) - 5) * 15%);
  top: 60%;
}

@keyframes coinFloat {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.balance-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%);
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.balance-label {
  font-size: 1.1rem;
  opacity: 0.95;
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.balance-icon {
  font-size: 2.4rem;
}

.balance-amount {
  font-size: 3.6rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0.6rem 0 0.4rem 0;
  position: relative;
  text-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  letter-spacing: -0.02em;
  line-height: 1;
}

.balance-amount.amount-bounce {
  animation: amountPop 0.5s ease;
}

@keyframes amountPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

.amount-prefix {
  position: absolute;
  left: 100%;
  top: 0;
  font-size: 1.2rem;
  color: #FFD700;
  animation: fadeUp 1.5s ease forwards;
}

@keyframes fadeUp {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-30px); }
}

.balance-level {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 0.8rem;
}

.level-badge {
  background: rgba(255, 215, 0, 0.2);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #FFD700;
}

.next-level {
  font-size: 0.72rem;
  opacity: 0.8;
}

.balance-currency {
  font-size: 1rem;
  opacity: 0.95;
  color: #fef3c7;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.balance-highlight {
  margin-top: 0.5rem;
  display: inline-block;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff7d6;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.withdraw-btn {
  padding: 0.9rem;
  font-size: 1rem;
  border-radius: 12px;
}

.balance-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.balance-actions .btn {
  flex: 1;
  padding: 0.85rem;
  border-radius: 12px;
}

.balance-actions .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-actions h3 {
  font-size: 1.15rem;
  margin-bottom: 0.8rem;
}

/* Compact mini-info chips under balance */
.mini-info {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.9rem;
  justify-content: center;
}
.mini-chip {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.04);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  text-align: center;
  min-width: 84px;
}
.mini-value {
  font-weight: 800;
  color: var(--text-primary);
}
.mini-label {
  font-size: 0.72rem;
  color: var(--text-secondary);
}

/* balance-bottom tiles to fill space */
.balance-bottom {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.9rem;
  justify-content: center;
  align-items: stretch;
}
.stat-tile {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.03);
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  width: 140px;
  text-align: center;
}
.tile-title {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
.tile-value {
  font-weight: 800;
  margin-top: 0.35rem;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .balance-bottom { flex-direction: row; gap: 0.5rem; }
  .stat-tile { width: 100%; }
}

/* Referrals list styles */
.referrals-block {
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.referrals-header {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.45rem;
}
.referral-list {
  width: 100%;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.ref-item {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.03);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  min-width: 120px;
  text-align: center;
}
.ref-desc { font-size: 0.85rem; color: var(--text-primary); }
.ref-amount { font-weight: 800; color: var(--primary-light); margin-top: 0.25rem; }
.ref-empty { color: var(--text-secondary); padding: 0.5rem 0.6rem; }

.mini-info {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.9rem;
  justify-content: center;
}

.mini-chip {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.04);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  text-align: center;
  min-width: 90px;
}

.mini-value {
  font-weight: 800;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.mini-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.action-cards {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.action-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.22s;
}

.promo-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.16), rgba(236, 72, 153, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.promo-featured {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 10px 24px rgba(99, 102, 241, 0.2);
}

.action-card:hover {
  transform: translateY(-2px);
}

.brand-small {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: lowercase;
  letter-spacing: 0.04em;
}

.promo-area {
  margin-top: 0.8rem;
}

.promo-input {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 0.4rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.04);
  max-width: 520px;
}

.promo-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  color: white;
}

.promo-field {
  flex: 1;
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
}

.promo-apply {
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  font-weight: 700;
}

.promo-message {
  margin-top: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.referral-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.12));
  border: 2px solid rgba(99, 102, 241, 0.3);
  padding: 1.2rem;
  border-radius: 16px;
}

.referral-card .action-icon {
  font-size: 2.5rem;
}

.ref-code-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.ref-code-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.ref-code {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.15));
  padding: 0.8rem;
  border-radius: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 1.2rem;
  color: var(--primary-light);
  border: 1px solid rgba(99, 102, 241, 0.3);
  font-family: 'Courier New', monospace;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ref-code:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.25));
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
}

.ref-code-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.referral-buttons {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
}

.referral-buttons .btn {
  flex: 1;
  font-size: 0.8rem;
  padding: 0.6rem 0.8rem;
}

.referral-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.action-icon {
  font-size: 2rem;
}

.action-info {
  display: flex;
  flex-direction: column;
}

.action-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.action-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.referral-earnings {
  font-size: 0.85rem;
  color: var(--primary-light);
  font-weight: 600;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(99, 102, 241, 0.2);
}

.wallet-insights-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.insight-card,
.stats-card,
.support-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 18px;
  padding: 1.25rem;
  backdrop-filter: blur(16px);
}

.insight-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.insight-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.insight-row {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.insight-row strong {
  color: var(--text-primary);
}

.insight-note {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.7rem;
}

.pending-pill {
  display: inline-block;
  margin-top: 0.4rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.14);
  color: #fbbf24;
  font-size: 0.85rem;
  font-weight: 700;
}

.pending-pill.alt {
  background: rgba(59, 130, 246, 0.14);
  color: #60a5fa;
}

.progress-track {
  height: 10px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  border-radius: inherit;
}

.progress-label {
  margin-top: 0.45rem;
  color: var(--primary-light);
  font-weight: 700;
  font-size: 0.9rem;
}

.support-list {
  padding-left: 1rem;
  color: var(--text-secondary);
  display: grid;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.wallet-stats-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stats-card {
  text-align: left;
}

.stats-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.stats-card strong {
  font-size: 1.1rem;
  color: var(--text-primary);
}

.transactions-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.transactions-list {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
}

.no-transactions {
  padding: 1.2rem; /* reduced padding */
  text-align: center;
  color: var(--text-secondary);
}

.transaction-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.85rem 1rem; /* tightened spacing */
  border-bottom: 1px solid var(--glass-border);
}

.tx-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  background: rgba(0, 166, 81, 0.1);
}

.tx-details {
  display: flex;
  flex-direction: column;
}

.tx-desc {
  font-size: 0.9rem;
}

.tx-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.tx-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tx-status.completed {
  background: rgba(0, 200, 83, 0.2);
  color: var(--success);
}

.tx-status.pending {
  background: rgba(255, 179, 0, 0.2);
  color: var(--warning);
}

.tx-amount {
  font-weight: 700;
  font-size: 1rem;
}

.tx-amount.positive {
  color: var(--success);
}

.tx-amount.negative {
  color: var(--error);
}

.support-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.withdraw-modal .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.withdraw-modal .modal-content {
  background: var(--bg-surface);
  border-radius: 24px;
  padding: 2rem;
  max-width: 450px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--text-secondary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.3s;
}

.step.active .step-num {
  background: #00A651;
  color: white;
}

.step.completed .step-num {
  background: #00C853;
  color: white;
}

.step-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.step-line {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 0.5rem;
  margin-bottom: 1.5rem;
}

.step-line.active {
  background: #00A651;
}

.phone-animation {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
}

.phone-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00A651, #00C853);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.phone-ring {
  position: absolute;
  inset: 0;
  border: 3px solid #00A651;
  border-radius: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}

.step-content h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.balance-info {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.balance-info strong {
  color: #00A651;
}

.amount-input-group {
  margin-bottom: 1.5rem;
}

.amount-input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.amount-input {
  display: flex;
  align-items: center;
  background: var(--bg-dark);
  border-radius: 12px;
  overflow: hidden;
}

.currency-symbol {
  padding: 0 1rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.amount-input .input-field {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem;
}

.quick-amounts {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.quick-amounts button {
  padding: 0.5rem 1rem;
  background: var(--bg-dark);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-amounts button.active,
.quick-amounts button:hover {
  background: #00A651;
  border-color: #00A651;
  color: white;
}

.payment-methods {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.method-btn {
  flex: 1;
  padding: 1rem;
  background: var(--bg-dark);
  border: 2px solid var(--glass-border);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.method-btn.active {
  border-color: #00A651;
  background: rgba(0, 166, 81, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.step-actions {
  display: flex;
  gap: 1rem;
}

.step-actions .btn {
  flex: 1;
}

.confirm-details {
  background: var(--bg-dark);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.confirm-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--glass-border);
}

.confirm-item:last-child {
  border-bottom: none;
}

.confirm-label {
  color: var(--text-secondary);
}

.confirm-value {
  font-weight: 600;
}

.error-text {
  color: var(--error);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .wallet-grid,
  .wallet-insights-grid,
  .wallet-stats-grid,
  .support-section {
    grid-template-columns: 1fr;
  }

  .transaction-item {
    grid-template-columns: auto 1fr auto;
  }
  
  .tx-status {
    display: none;
  }
}
</style>
