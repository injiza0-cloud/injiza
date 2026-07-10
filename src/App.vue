<template>
  <div class="app-wrapper">
    <header v-if="showNav" class="main-header glass">
      <div class="container header-content">
        <router-link :to="isLoggedIn ? '/dashboard' : '/'" class="logo">
          <span class="logo-icon"><img src="/favicon.svg" alt="INJIZA logo" /></span>
          <span class="logo-text">{{ t('appName') }}</span>
        </router-link>

        <nav class="main-nav" :class="{ active: mobileMenuOpen }">
          <router-link v-if="!isLoggedIn" to="/" class="nav-link" @click="mobileMenuOpen = false">🏠 {{ t('home') }}</router-link>
          <router-link v-if="isLoggedIn" to="/dashboard" class="nav-link" @click="mobileMenuOpen = false">📊 Dashboard</router-link>
          <router-link to="/videos" v-if="isLoggedIn" class="nav-link" @click="mobileMenuOpen = false">🎬 {{ t('videos') }}</router-link>
          <router-link to="/tasks" v-if="isLoggedIn" class="nav-link" @click="mobileMenuOpen = false">✅ {{ t('tasks') }}</router-link>
          <router-link to="/games" v-if="isLoggedIn && !isAdmin" class="nav-link" @click="mobileMenuOpen = false">🎮 {{ locale === 'rw' ? 'Play' : 'Games' }}</router-link>
          <router-link to="/wallet" v-if="isLoggedIn" class="nav-link" @click="mobileMenuOpen = false">💳 {{ t('wallet') }}</router-link>
          <router-link to="/about" class="nav-link" @click="mobileMenuOpen = false">ℹ️ {{ t('about') }}</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link" @click="mobileMenuOpen = false">🔐 {{ t('login') }}</router-link>
          <router-link v-if="!isLoggedIn" to="/register" class="nav-link" @click="mobileMenuOpen = false">✨ {{ t('register') }}</router-link>
        </nav>

        <!-- search removed for compact header on small screens -->

        <div class="header-actions">
          <div class="lang-switch">
            <button @click="toggleLang" class="lang-btn">
              {{ locale === 'rw' ? 'EN' : 'RW' }}
            </button>
          </div>

          <template v-if="isLoggedIn">
            <router-link to="/dashboard" class="user-balance">
              <span class="balance-label">{{ t('balance') }}</span>
              <span class="balance-value">{{ currentUser?.balance?.toLocaleString() || 0 }} RWF</span>
              <span class="balance-usd">${{ ((currentUser?.balance||0)/exchangeRate).toFixed(2) }} USD</span>
            </router-link>
            <div class="header-diamond">
              <span class="diamond-icon">💎</span>
              <span class="diamond-value">{{ currentUser?.points || 0 }}</span>
            </div>
            <div class="user-menu">
              <button class="user-avatar" @click="userMenuOpen = !userMenuOpen">
                <img v-if="currentUser?.avatar_url" :src="currentUser.avatar_url" class="avatar-photo" />
                <span v-else class="avatar-initials">{{ currentUser?.username?.charAt(0).toUpperCase() }}</span>
              </button>
              <div class="user-dropdown" v-if="userMenuOpen">
                <router-link to="/profile" @click="userMenuOpen = false">{{ t('profile') }}</router-link>
                <router-link to="/wallet" @click="userMenuOpen = false">{{ t('wallet') }}</router-link>
                <router-link to="/admin" v-if="isAdmin" @click="userMenuOpen = false">{{ t('admin') }}</router-link>
                <button @click="handleLogout">{{ t('logout') }}</button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-ghost btn-sm">{{ t('login') }}</router-link>
            <router-link to="/register" class="btn btn-primary btn-sm">{{ t('register') }}</router-link>
          </template>

          <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <!-- Fake Live Activity Ticker -->
      <div class="live-activity-bar" v-if="currentActivity">
        <span class="activity-dot"></span>
        <span class="activity-text" v-html="currentActivity"></span>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      
      <div class="ad-banner-bottom">
        <ins class="adsbygoogle"
          data-ad-client="ca-pub-2947665984633906"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    </main>

    <button 
      v-if="showScrollTop" 
      @click="scrollToTop" 
      class="scroll-top-btn"
    >
      ↑
    </button>

    <div v-if="showLogoutModal" class="modal-overlay" @click="showLogoutModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-icon">📤</div>
        <h3>{{ locale === 'rw' ? 'Sohoka?' : 'Logout?' }}</h3>
        <p>{{ locale === 'rw' ? 'Uri shyaka gutaha?' : 'Are you sure you want to logout?' }}</p>
        <div class="modal-actions">
          <button @click="showLogoutModal = false" class="btn btn-ghost">
            {{ locale === 'rw' ? 'Reka' : 'Cancel' }}
          </button>
          <button @click="confirmLogout" class="btn btn-danger">
            {{ locale === 'rw' ? 'Sohoka' : 'Logout' }}
          </button>
        </div>
      </div>
    </div>

    <InterstitialAd ref="interstitialAd" :auto-show="false" />

    <CoinAnimation :show="showCoinAnim" :amount="coinAmount" />

    <!-- Floating Instagram Chat Icon -->
    <a 
      href="https://www.instagram.com/injizarwf/" 
      target="_blank" 
      rel="noopener noreferrer"
      class="floating-instagram-icon" 
      title="Talk to us on Instagram"
    >
      <svg class="instagram-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
      </svg>
      Talk to us
    </a>

    <footer v-if="showNav" class="main-footer">
      <div class="footer-glow footer-glow-one"></div>
      <div class="footer-glow footer-glow-two"></div>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-icon"><img src="/favicon.svg" alt="INJIZA logo" /></span>
              <h3>{{ t('appName') }}</h3>
            </div>
            <p>Earn money in Rwanda with short videos, simple tasks and flexible wallet payouts. Everything is designed to feel fast, secure and rewarding.</p>
            <div class="footer-stats">
              <div class="stat-pill">⚡ Fast payouts</div>
              <div class="stat-pill">🔒 Secure account</div>
              <div class="stat-pill">💸 Daily rewards</div>
            </div>
            <div class="footer-social">
              <a href="https://instagram.com/henry_muhirwa" target="_blank" rel="noopener noreferrer" class="social-link">📸</a>
              <a href="https://www.tiktok.com/@injizarwf" target="_blank" rel="noopener noreferrer" class="social-link tiktok-link">🎵</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link">📘</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link">📺</a>
            </div>
          </div>

          <div class="footer-links">
            <h4>Explore</h4>
            <router-link to="/about">About us</router-link>
            <router-link to="/privacy">Privacy</router-link>
            <router-link to="/terms">Terms</router-link>
            <router-link to="/wallet">Wallet</router-link>
          </div>

          <div class="footer-links">
            <h4>Quick access</h4>
            <router-link to="/videos">Videos</router-link>
            <router-link to="/tasks">Tasks</router-link>
            <router-link to="/games">Games</router-link>
            <router-link to="/dashboard">Dashboard</router-link>
          </div>

          <div class="footer-contact">
            <h4>Stay connected</h4>
            <p>📧 support@injiza.online</p>
            <p>📍 Kigali, Rwanda</p>
            <p>🤝 Trusted by thousands of members</p>
            <router-link to="/register" class="btn btn-sm btn-outline footer-cta">Join now</router-link>
          </div>
        </div>

        <div class="footer-partners">
          <h4>Our Partners</h4>
          <div class="partners-list">
            <a href="#" class="partner-item">
              <img src="/pub%20(1).png" alt="INJIZA Studio" />
              <div>
                <strong>INJIZA Studio</strong>
                <div class="partner-caption">Supports platform design and brand storytelling.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(2).png" alt="INJIZA Media" />
              <div>
                <strong>INJIZA Media</strong>
                <div class="partner-caption">Drives our content and marketing outreach.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(3).png" alt="INJIZA Growth" />
              <div>
                <strong>INJIZA Growth</strong>
                <div class="partner-caption">Grows our user base with targeted campaigns.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(4).png" alt="INJIZA Network" />
              <div>
                <strong>INJIZA Network</strong>
                <div class="partner-caption">Connects us with trusted local partners.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(5).png" alt="INJIZA Labs" />
              <div>
                <strong>INJIZA Labs</strong>
                <div class="partner-caption">Builds new features and product improvements.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(6).png" alt="INJIZA Ventures" />
              <div>
                <strong>INJIZA Ventures</strong>
                <div class="partner-caption">Supports innovation and strategic growth.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(7).png" alt="INJIZA Digital" />
              <div>
                <strong>INJIZA Digital</strong>
                <div class="partner-caption">Powering our digital user experience.</div>
              </div>
            </a>
            <a href="#" class="partner-item">
              <img src="/pub%20(8).png" alt="INJIZA Partners" />
              <div>
                <strong>INJIZA Partners</strong>
                <div class="partner-caption">Backing the best of INJIZA Group Ltd.</div>
              </div>
            </a>
          </div>
        </div>

        <div class="footer-features">
          <div class="feature-badge"><span>🔒</span><span>Secure & safe</span></div>
          <div class="feature-badge"><span>⚡</span><span>Fast payouts</span></div>
          <div class="feature-badge"><span>💯</span><span>100% legit</span></div>
          <div class="feature-badge"><span>🛟</span><span>24/7 support</span></div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 {{ t('appName') }}. All rights reserved.</p>
          <p class="footer-madewith">Made with ❤️ in Rwanda</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useI18nStore } from './stores/i18n'
import InterstitialAd from './components/InterstitialAd.vue'
import CoinAnimation from './components/CoinAnimation.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const i18nStore = useI18nStore()
const exchangeRate = computed(() => authStore.getExchangeRate ? authStore.getExchangeRate() : 1450)

const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const showLogoutModal = ref(false)
const interstitialAd = ref(null)

const showCoinAnim = ref(false)
const coinAmount = ref(0)

// Fake Live Activity
const fakeActivities = [
  '<strong>kalisa</strong> has earned <span class="text-green">400 RWF</span>',
  '<strong>mutoni76</strong> has earned <span class="text-green">270,000 RWF</span>',
  '<strong>jean_paul</strong> just activated their account',
  '<strong>claire_uw</strong> withdrew <span class="text-green">15,000 RWF</span> via MTN MoMo',
  '<strong>eric_99</strong> has earned <span class="text-green">1,500 RWF</span>',
  '<strong>grace_m</strong> withdrew <span class="text-green">45,000 RWF</span> via Airtel Money',
  '<strong>kevin_rw</strong> just activated their account',
  '<strong>aline_baby</strong> has earned <span class="text-green">12,000 RWF</span> from referrals',
]
const currentActivity = ref(fakeActivities[0])

const triggerCoinAnimation = (amount) => {
  coinAmount.value = amount
  showCoinAnim.value = true
  setTimeout(() => {
    showCoinAnim.value = false
  }, 3200)
}

const showNav = computed(() => !route.path.startsWith('/admin'))

watch(route, () => {
  mobileMenuOpen.value = false
  userMenuOpen.value = false
})

const isLoggedIn = computed(() => authStore.isLoggedIn)
const isAdmin = computed(() => authStore.isAdmin)
const currentUser = computed(() => authStore.currentUser)

const locale = computed(() => i18nStore.locale)

const t = (key) => i18nStore.t(key)

const showScrollTop = ref(false)

const updateScrollPosition = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleLang = () => {
  i18nStore.setLocale(i18nStore.locale === 'rw' ? 'en' : 'rw')
}

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  authStore.logout()
  showLogoutModal.value = false
  userMenuOpen.value = false
  router.push('/')
}

onMounted(() => {
  const stored = localStorage.getItem('currentUser')
  if (stored) {
    authStore.user = JSON.parse(stored)
  }
  authStore.setCoinAnimationCallback(triggerCoinAnimation)
  window.addEventListener('scroll', updateScrollPosition)
  
  // Rotate fake activities
  setInterval(() => {
    const randomIdx = Math.floor(Math.random() * fakeActivities.length)
    currentActivity.value = fakeActivities[randomIdx]
  }, 4000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollPosition)
})
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 68px;
  background: linear-gradient(135deg, #061025, #0b1630); /* stronger, fully opaque */
  border-bottom: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 30px rgba(2,6,23,0.75);
  backdrop-filter: blur(8px);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
}

/* make header items wrap on small screens */
@media (max-width: 860px) {
  .header-content {
    gap: 0.6rem;
    padding: 0 0.8rem;
  }
  .main-nav { display: none; }
  .search-wrapper { display: none; }
  .header-actions { gap: 0.4rem; }
  .user-balance { display: none; }
}

@media (max-width: 480px) {
  .logo-text { display: none; }
  .logo-icon { font-size: 1.3rem; }
  .user-avatar { width: 40px; height: 40px; }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.15rem;
  font-weight: 900;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.6px;
}

.logo-icon {
  font-size: 1.6rem;
}

.logo-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  font-size: 1.05rem;
}
.logo-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.logo-subtext {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.75);
  font-weight: 600;
  margin-top: 0.05rem;
}
.logo-icon img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}
.logo-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.logo-subtext {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.75);
  font-weight: 600;
  margin-top: 0.05rem;
}
.logo-icon img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

/* Fake Live Activity Bar */
.live-activity-bar {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(124, 58, 237, 0.12);
  padding: 0.35rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  font-size: clamp(0.68rem, 0.9vw, 0.85rem);
  color: rgba(255, 255, 255, 0.92);
  animation: slideDown 0.28s ease-out;
  overflow: hidden;
}

.activity-dot {
  width: 6px;
  height: 6px;
  background: #34d399;
  border-radius: 50%;
  animation: blink 1.5s infinite;
}

.activity-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70ch; /* keep a single line */
}

:deep(.activity-text strong) { color: #fbbf24; }
:deep(.activity-text .text-green) { color: #34d399; font-weight: 600; }

@keyframes slideDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.main-nav {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.main-nav .nav-link {
  position: relative;
  padding: 0.45rem 0.85rem;
  color: rgba(255,255,255,0.92);
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.18s ease;
  border-radius: 8px;
  white-space: nowrap;
}

.main-nav .nav-link:hover,
.main-nav .nav-link.router-link-active {
  color: var(--text-primary);
  background: rgba(167, 139, 250, 0.12);
  transform: translateY(-2px);
}

.main-nav .nav-link.router-link-active {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.28), rgba(56, 189, 248, 0.18));
  color: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(167, 139, 250, 0.24);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.lang-switch .lang-btn {
  padding: 0.36rem 0.7rem;
  background: rgba(167, 139, 250, 0.06);
  border: 1px solid rgba(167, 139, 250, 0.18);
  border-radius: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.18s ease;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.lang-switch .lang-btn:hover {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  border-color: transparent;
  color: white;
}

.user-balance {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.5rem 0.85rem;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.85), rgba(16, 185, 129, 0.85));
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25);
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.3s ease;
}

.user-balance:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.35);
}

.balance-label {
  font-size: 0.6rem;
  opacity: 0.9;
  color: rgba(255,255,255,0.9);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.balance-value {
  font-size: 0.9rem;
  font-weight: 800;
  color: #fff8dc;
  line-height: 1;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 166, 81, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(0, 166, 81, 0); }
}

.user-menu {
  position: relative;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border: 2px solid rgba(167, 139, 250, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.avatar-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.avatar-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.user-avatar:hover {
  transform: scale(1.08);
  border-color: rgba(167, 139, 250, 0.75);
  box-shadow: 0 10px 28px rgba(124, 58, 237, 0.38);
}

/* search removed */

.header-diamond {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.6rem;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.2));
  border-radius: 8px;
  color: white;
  font-weight: 700;
  border: 1px solid rgba(167, 139, 250, 0.25);
  font-size: 0.85rem;
  white-space: nowrap;
}
.diamond-icon {
  font-size: 0.95rem;
}
.diamond-value {
  font-size: 0.85rem;
}
.balance-usd{display:block;font-size:0.75rem;color:rgba(255,255,255,0.9);opacity:0.95;margin-top:2px}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
  min-width: 180px;
  box-shadow: var(--shadow-xl);
  animation: dropdown-in 0.2s ease;
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-dropdown a,
.user-dropdown button {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  color: var(--text-secondary);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.user-dropdown a:hover,
.user-dropdown button:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s;
}

.main-content {
  flex: 1;
  padding-top: 70px;
  padding-bottom: 60px;
}

.ad-banner-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 5px;
  text-align: center;
  z-index: 100;
}

.ad-banner-bottom ins {
  display: inline-block;
  max-height: 50px;
}

.main-footer {
  background: linear-gradient(135deg, rgba(7, 10, 25, 0.98), rgba(18, 24, 48, 0.98));
  border-top: 1px solid var(--glass-border);
  padding: 4rem 0 1.5rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
}

.main-footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.08), transparent);
  pointer-events: none;
}

.footer-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.25;
  pointer-events: none;
}

.footer-glow-one {
  top: -60px;
  left: -40px;
  width: 220px;
  height: 220px;
  background: var(--primary);
}

.footer-glow-two {
  bottom: -70px;
  right: -30px;
  width: 260px;
  height: 260px;
  background: var(--secondary);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.footer-logo h3 {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-brand p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.footer-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.stat-pill {
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-full);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-secondary);
  font-size: 0.78rem;
}

.footer-social {
  display: flex;
  gap: 0.75rem;
}

.footer-partners {
  margin-top: 1rem;
}
.partners-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.7rem;
  margin-top: 0.5rem;
}
.partner-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.55rem 0.65rem;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.18s ease;
}
.partner-item:hover {
  background: rgba(255,255,255,0.08);
  transform: translateY(-1px);
}
.partner-item img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px;
  background: rgba(255,255,255,0.07);
}
.partner-caption {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.3;
  margin-top: 0.1rem;
  max-width: 120px;
}

.social-link {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 1.15rem;
  transition: all var(--transition-base);
  box-shadow: 0 10px 20px rgba(0,0,0,0.18);
}

.social-link:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 14px 28px rgba(99, 102, 241, 0.25);
}

.tiktok-link {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(99, 102, 241, 0.2));
}

.footer-links h4,
.footer-contact h4 {
  margin-bottom: 1.2rem;
  color: var(--text-primary);
  font-weight: 700;
}

.footer-links a {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  transition: all var(--transition-base);
}

.footer-links a:hover {
  color: var(--primary-light);
  transform: translateX(5px);
}

.footer-contact p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.footer-cta {
  margin-top: 0.75rem;
  width: 100%;
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid var(--glass-border);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.footer-features {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--primary-light);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}

.footer-madewith {
  margin-top: 0.4rem;
  color: var(--primary-light);
}

@media (max-width: 1024px) {
  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--bg-surface);
    flex-direction: column;
    padding: 1.5rem;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  .main-nav.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-toggle {
    display: flex;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .footer-features {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
}

  .footer-brand {
    grid-column: span 2;
  }

@media (max-width: 640px) {
  .user-balance {
    display: none;
  }

  .header-actions .btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .logo-text {
    display: none;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-brand {
    grid-column: span 1;
  }

  .footer-social {
    justify-content: center;
  }
}

.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-glow);
  transition: all var(--transition-base);
  z-index: 1000;
}

.scroll-top-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  max-width: 350px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-content h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.modal-content p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.modal-actions .btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
}

/* Floating Instagram Icon */
.floating-instagram-icon {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 1.1rem;
  background: linear-gradient(135deg, #fd5949 0%, #d6249f 50%, #285AEB 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0 15px 40px rgba(213, 36, 159, 0.5);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 50;
  border: 2px solid rgba(255,255,255,0.25);
  backdrop-filter: blur(12px);
  animation: float 3.5s ease-in-out infinite;
  cursor: pointer;
}

.instagram-svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.floating-instagram-icon:hover {
  transform: translateY(-10px) scale(1.15);
  box-shadow: 0 25px 55px rgba(213, 36, 159, 0.7);
  padding: 0.9rem 1.3rem;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@media (max-width: 768px) {
  .floating-instagram-icon {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }
  
  .instagram-svg {
    width: 18px;
    height: 18px;
  }
}
</style>
