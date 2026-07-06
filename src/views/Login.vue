<template>
  <div class="login-page">
    <div class="bg-orbs">
      <div class="orb o1"></div>
      <div class="orb o2"></div>
      <div class="orb o3"></div>
    </div>

    <div class="login-container">
      <!-- Left: Info Panel -->
      <div class="info-panel">
        <div class="info-inner">
          <router-link to="/" class="brand">
            <span>💹</span>
            <span class="brand-name">INJIZA</span>
          </router-link>

          <div class="info-hero">
            <div class="info-badge">👋 Welcome Back!</div>
            <h1>Sign in and<br/><span class="gold">Keep Earning</span></h1>
            <p>Your earnings are waiting. Log in to continue your journey to financial freedom.</p>
          </div>

          <div class="earnings-preview">
            <div class="ep-header">
              <span class="ep-icon">💰</span>
              <span>Your potential this month</span>
            </div>
            <div class="ep-amount">450,000 <small>RWF</small></div>
            <div class="ep-bar">
              <div class="ep-fill" style="width: 72%"></div>
            </div>
            <div class="ep-note">72% of monthly target reachable today</div>
          </div>

          <div class="quick-stats">
            <div class="qs-item">
              <strong>50K+</strong>
              <span>Active Earners</span>
            </div>
            <div class="qs-div"></div>
            <div class="qs-item">
              <strong>⚡ Instant</strong>
              <span>Withdrawals</span>
            </div>
            <div class="qs-div"></div>
            <div class="qs-item">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="form-panel">
        <div class="form-card">
          <div class="form-header">
            <div class="avatar-circle">💹</div>
            <h2>Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <!-- Social Login -->
          <div class="social-btns">
            <button class="soc-btn google" @click="loginGoogle" id="login-google">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button class="soc-btn facebook" @click="loginFacebook" id="login-facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <div class="divider"><span>or sign in with email</span></div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="field">
              <label>Email, Phone or Username</label>
              <div class="field-box">
                <span class="ficon">👤</span>
                <input id="login-email" type="text" v-model="email" placeholder="Enter email, phone or username" required />
              </div>
            </div>

            <div class="field">
              <div class="field-label-row">
                <label>Password</label>
                <a href="#" class="forgot-link">Forgot password?</a>
              </div>
              <div class="field-box">
                <span class="ficon">🔒</span>
                <input id="login-password" :type="showPwd ? 'text' : 'password'" v-model="password" placeholder="Your password" required />
                <button type="button" class="eye" @click="showPwd = !showPwd">{{ showPwd ? '🙈' : '👁️' }}</button>
              </div>
            </div>

            <div class="remember-row">
              <label class="rem-label">
                <input type="checkbox" v-model="rememberMe" id="remember-me" />
                <span class="rem-check"></span>
                Keep me signed in
              </label>
            </div>

            <div class="error-box" v-if="error">⚠️ {{ error }}</div>

            <button type="submit" class="login-btn" :disabled="loading" id="login-submit">
              <span v-if="loading" class="spin"></span>
              <span v-else>🚀 Sign In to My Account</span>
            </button>
          </form>

          <p class="signup-prompt">New here? <router-link to="/register">Create a free account</router-link> — it takes 30 seconds!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPwd = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

onMounted(() => {
  const saved = localStorage.getItem('rememberMe') === 'true'
  if (saved) {
    rememberMe.value = true
    email.value = localStorage.getItem('savedEmail') || ''
  }
})

const loginGoogle = () => alert('Google login coming soon! Please use email login for now.')
const loginFacebook = () => alert('Facebook login coming soon! Please use email login for now.')

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const result = await authStore.login(email.value, password.value, rememberMe.value)
    loading.value = false
    if (result.success) {
      router.push(result.user.is_admin ? '/admin' : '/dashboard')
    } else {
      error.value = result.message === 'wrongCredentials'
        ? 'Incorrect email/phone or password. Please try again.'
        : result.message
    }
  } catch (e) {
    loading.value = false
    error.value = e.message || 'Login failed. Please try again.'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; }

.login-page {
  min-height: 100vh;
  background: #060612;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  color: white;
}

.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.orb { position: absolute; border-radius: 50%; filter: blur(90px); }
.o1 { width: 500px; height: 500px; background: radial-gradient(circle, #7c3aed44, transparent); top: -200px; left: -150px; animation: drift 14s ease-in-out infinite alternate; }
.o2 { width: 400px; height: 400px; background: radial-gradient(circle, #fbbf2433, transparent); bottom: -100px; right: -100px; animation: drift 10s ease-in-out infinite alternate; animation-delay: -3s; }
.o3 { width: 300px; height: 300px; background: radial-gradient(circle, #06b6d433, transparent); top: 40%; left: 40%; animation: drift 12s ease-in-out infinite alternate; animation-delay: -6s; }
@keyframes drift { from { transform: translate(0,0); } to { transform: translate(30px, 20px); } }

.login-container {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 960px;
  width: 100%;
  min-height: 620px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
}

/* Info panel */
.info-panel {
  background: linear-gradient(145deg, #1a0533, #0d1b4b, #071830);
  padding: 3rem 2.5rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.info-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.info-inner { position: relative; z-index: 1; width: 100%; }

.brand { display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; margin-bottom: 2.5rem; font-size: 1.1rem; }
.brand-name { font-size: 1.5rem; font-weight: 900; background: linear-gradient(135deg, #a78bfa, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 2px; }
.brand span:first-child { font-size: 1.8rem; }

.info-badge {
  display: inline-block;
  background: rgba(167,139,250,0.15);
  border: 1px solid rgba(167,139,250,0.3);
  color: #a78bfa;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}
.info-hero h1 {
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}
.gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.info-hero p { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.7; margin-bottom: 2rem; }

.earnings-preview {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(251,191,36,0.2);
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}
.ep-header { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.45); margin-bottom: 0.5rem; }
.ep-icon { font-size: 1.1rem; }
.ep-amount { font-size: 1.8rem; font-weight: 900; color: #fbbf24; line-height: 1; margin-bottom: 0.75rem; }
.ep-amount small { font-size: 0.9rem; color: rgba(255,255,255,0.4); }
.ep-bar { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-bottom: 0.4rem; overflow: hidden; }
.ep-fill { height: 100%; background: linear-gradient(90deg, #fbbf24, #f59e0b); border-radius: 3px; }
.ep-note { font-size: 0.72rem; color: rgba(255,255,255,0.35); }

.quick-stats { display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1rem 1.2rem; }
.qs-item { text-align: center; }
.qs-item strong { display: block; color: #38bdf8; font-size: 0.95rem; }
.qs-item span { font-size: 0.7rem; color: rgba(255,255,255,0.35); }
.qs-div { width: 1px; height: 28px; background: rgba(255,255,255,0.08); }

/* Form panel */
.form-panel {
  background: #0c0c1e;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-card { width: 100%; max-width: 380px; }

.form-header { text-align: center; margin-bottom: 1.75rem; }
.avatar-circle { font-size: 2.5rem; margin-bottom: 0.75rem; }
.form-header h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.3rem; }
.form-header p { color: rgba(255,255,255,0.4); font-size: 0.88rem; }

/* Social buttons */
.social-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
.soc-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  padding: 0.8rem; border-radius: 12px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer;
  transition: all 0.25s; border: none; font-family: 'Outfit', sans-serif;
}
.google { background: white; color: #333; }
.google:hover { background: #f0f0f0; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
.facebook { background: #1877F2; color: white; }
.facebook:hover { background: #1565d8; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(24,119,242,0.4); }

/* Divider */
.divider { position: relative; text-align: center; margin: 1.25rem 0; color: rgba(255,255,255,0.3); font-size: 0.82rem; }
.divider::before, .divider::after { content: ''; position: absolute; top: 50%; width: 32%; height: 1px; background: rgba(255,255,255,0.08); }
.divider::before { left: 0; }
.divider::after { right: 0; }

/* Fields */
.login-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.6); }
.field-label-row { display: flex; align-items: center; justify-content: space-between; }
.forgot-link { font-size: 0.78rem; color: #a78bfa; text-decoration: none; }
.forgot-link:hover { text-decoration: underline; }

.field-box { position: relative; }
.ficon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); font-size: 0.9rem; pointer-events: none; }
.field-box input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 0.85rem 0.9rem 0.85rem 2.5rem;
  color: white;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  outline: none;
  transition: all 0.2s;
}
.field-box input:focus { border-color: #7c3aed; background: rgba(124,58,237,0.08); box-shadow: 0 0 0 4px rgba(124,58,237,0.12); }
.field-box input::placeholder { color: rgba(255,255,255,0.2); }
.eye { position: absolute; right: 0.8rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; opacity: 0.5; transition: opacity 0.2s; }
.eye:hover { opacity: 1; }

/* Remember me */
.remember-row { margin: 0.25rem 0; }
.rem-label { display: flex; align-items: center; gap: 0.6rem; font-size: 0.82rem; color: rgba(255,255,255,0.45); cursor: pointer; }
.rem-label input { display: none; }
.rem-check { width: 17px; height: 17px; border: 1.5px solid rgba(255,255,255,0.25); border-radius: 4px; transition: all 0.2s; position: relative; flex-shrink: 0; }
.rem-label input:checked ~ .rem-check { background: linear-gradient(135deg, #7c3aed, #2563eb); border-color: transparent; }
.rem-label input:checked ~ .rem-check::after { content: '✓'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; color: white; }

/* Error */
.error-box { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #f87171; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.85rem; }

/* Login button */
.login-btn {
  width: 100%; padding: 1rem;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  border: none; border-radius: 14px;
  color: white; font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s;
  font-family: 'Outfit', sans-serif;
  min-height: 52px; display: flex; align-items: center; justify-content: center;
}
.login-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(124,58,237,0.45); }
.login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.spin { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg); } }

.signup-prompt { text-align: center; margin-top: 1.25rem; color: rgba(255,255,255,0.35); font-size: 0.85rem; }
.signup-prompt a { color: #a78bfa; font-weight: 600; text-decoration: none; }
.signup-prompt a:hover { text-decoration: underline; }

/* Responsive */
@media (max-width: 800px) {
  .login-container { grid-template-columns: 1fr; max-width: 440px; min-height: auto; }
  .info-panel { display: none; }
  .form-panel { padding: 2rem 1.5rem; }
}
@media (max-width: 480px) {
  .form-panel { padding: 1.5rem 1rem; }
  .social-btns { grid-template-columns: 1fr; }
}
</style>
