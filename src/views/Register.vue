<template>
  <div class="register-page">
    <!-- Animated background -->
    <div class="bg-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <span v-for="i in 18" :key="i" class="particle" :style="particleStyle(i)">💰</span>
    </div>

    <div class="register-container">
      <!-- Left Panel -->
      <div class="left-panel">
        <div class="left-inner">
          <router-link to="/" class="brand-logo">
            <span class="brand-icon">💹</span>
            <span class="brand-name">INJIZA</span>
          </router-link>

          <div class="left-hero">
            <div class="hero-badge">🏆 #1 Earning Platform in Rwanda</div>
            <h1 class="hero-title">
              Start Earning<br/>
              <span class="gradient-word">Real Money</span><br/>
              Today!
            </h1>
            <p class="hero-sub">Join over 50,000+ Rwandans already earning from home</p>
          </div>

          <div class="benefits-list">
            <div class="benefit-item">
              <div class="benefit-icon-wrap green">💵</div>
              <div>
                <strong>450,000 RWF / Month</strong>
                <span>Guaranteed monthly earnings</span>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon-wrap blue">⚡</div>
              <div>
                <strong>Instant Withdrawals</strong>
                <span>MTN & Airtel Money supported</span>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon-wrap gold">🎯</div>
              <div>
                <strong>Simple Tasks</strong>
                <span>Videos, surveys, referrals</span>
              </div>
            </div>
          </div>

          <div class="trust-bar">
            <div class="trust-item">
              <strong>50K+</strong>
              <span>Active Users</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <strong>100M+</strong>
              <span>RWF Paid Out</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <strong>4.9★</strong>
              <span>User Rating</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="right-panel">
        <div class="form-card">
          <div class="form-card-header">
            <h2>Create Your Account</h2>
            <p>Choose how you'd like to sign up</p>
          </div>

          <!-- Social Signup -->
          <div class="social-signup">
            <button class="social-btn google-btn" @click="signupWithGoogle" id="signup-google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button class="social-btn facebook-btn" @click="signupWithFacebook" id="signup-facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div class="divider">
            <span>or sign up manually</span>
          </div>

          <!-- Manual Signup Form -->
          <form @submit.prevent="handleRegister" class="signup-form" v-if="!showManualForm">
            <button type="button" class="manual-toggle-btn" @click="showManualForm = true" id="show-manual-form">
              ✏️ Sign up with Email & Password
            </button>
          </form>

          <form @submit.prevent="handleRegister" class="signup-form" v-else>
            <!-- Profile Photo Circle - TOP OF FORM -->
            <div class="photo-upload-section">
              <input type="file" id="reg-photo" @change="onPhotoChange" accept="image/*" hidden />
              <label for="reg-photo" class="photo-circle-label">
                <div v-if="!photoPreview" class="photo-circle-placeholder">
                  <span class="camera-icon">📸</span>
                  <span class="camera-text">Add Photo</span>
                </div>
                <img v-else :src="photoPreview" class="photo-circle-img" />
              </label>
              <button v-if="photoPreview" type="button" class="remove-photo" @click="removePhoto">Remove</button>
            </div>

            <div class="form-group">
              <label>Full Name / Username</label>
              <div class="input-box">
                <span class="iicon">👤</span>
                <input id="reg-username" type="text" v-model="username" placeholder="Your username" required />
              </div>
            </div>

            <div class="form-group">
              <label>Email Address</label>
              <div class="input-box">
                <span class="iicon">✉️</span>
                <input id="reg-email" type="email" v-model="email" placeholder="your@email.com" required />
              </div>
            </div>

            <div class="form-group">
              <label>Phone Number</label>
              <div class="input-box">
                <span class="iicon">📱</span>
                <input id="reg-phone" type="tel" v-model="phone" placeholder="+250 7XX XXX XXX" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Password</label>
                <div class="input-box">
                  <span class="iicon">🔒</span>
                  <input id="reg-password" :type="showPwd ? 'text' : 'password'" v-model="password" placeholder="Min. 6 characters" required />
                  <button type="button" class="eye-btn" @click="showPwd = !showPwd">{{ showPwd ? '🙈' : '👁️' }}</button>
                </div>
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <div class="input-box">
                  <span class="iicon">🔐</span>
                  <input id="reg-confirm-password" :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword" placeholder="Repeat password" required />
                  <button type="button" class="eye-btn" @click="showConfirm = !showConfirm">{{ showConfirm ? '🙈' : '👁️' }}</button>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Referral Code <span class="opt">(optional)</span></label>
              <div class="input-box">
                <span class="iicon">🎁</span>
                <input id="reg-referral" type="text" v-model="referralCode" placeholder="Enter referral code" />
              </div>
            </div>

            <label class="terms-row">
              <input type="checkbox" v-model="acceptTerms" id="reg-terms" />
              <span class="custom-check"></span>
              <span>I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></span>
            </label>

            <div class="error-box" v-if="error">⚠️ {{ error }}</div>
            <div class="success-box" v-if="success">🎉 Account created! Redirecting...</div>

            <button type="submit" class="submit-btn" :disabled="loading || !acceptTerms" id="register-submit">
              <span v-if="loading" class="spin"></span>
              <span v-else>🚀 Create My Account</span>
            </button>
          </form>

          <p class="login-link">Already have an account? <router-link to="/login">Sign in here</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const referralCode = ref('')
const photoFile = ref(null)
const photoPreview = ref(null)
const showPwd = ref(false)
const showConfirm = ref(false)
const acceptTerms = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)
const showManualForm = ref(false)

onMounted(() => {
  const pendingReferral = localStorage.getItem('pendingReferral')?.trim()
  if (pendingReferral && !referralCode.value) {
    referralCode.value = pendingReferral.toUpperCase()
  }
})

const onPhotoChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  photoFile.value = file
  const reader = new FileReader()
  reader.onload = (event) => {
    photoPreview.value = event.target.result
  }
  reader.readAsDataURL(file)
}

const removePhoto = () => {
  photoFile.value = null
  photoPreview.value = null
  const input = document.getElementById('reg-photo')
  if (input) input.value = ''
}

const particleStyle = (i) => {
  const angle = (i / 18) * 360
  const radius = 40 + Math.random() * 40
  return {
    left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
    top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
    animationDelay: `${(i * 0.3) % 5}s`,
    animationDuration: `${3 + (i % 4)}s`,
    fontSize: `${0.6 + (i % 3) * 0.3}rem`,
    opacity: 0.15 + (i % 5) * 0.05
  }
}

const signupWithGoogle = () => {
  alert('Google signup integration coming soon! Please use manual signup for now.')
}

const signupWithFacebook = () => {
  alert('Facebook signup integration coming soon! Please use manual signup for now.')
}

const handleRegister = async () => {
  error.value = ''
  success.value = false

  if (!acceptTerms.value) { error.value = 'Please accept the terms and conditions'; return }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) { error.value = 'Please enter a valid email'; return }
  if (password.value !== confirmPassword.value) { error.value = 'Passwords do not match'; return }
  if (password.value.length < 6) { error.value = 'Password must be at least 6 characters'; return }

  const referralValue = (referralCode.value || localStorage.getItem('pendingReferral') || '').trim().toUpperCase()
  referralCode.value = referralValue

  loading.value = true
  try {
    const result = await authStore.register({
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      referralCode: referralValue,
      avatar_url: photoPreview.value
    })
    loading.value = false
    if (result.success) {
      localStorage.removeItem('pendingReferral')
      success.value = true
      setTimeout(() => { router.push('/activate') }, 1200)
    } else {
      error.value = result.message
    }
  } catch (e) {
    loading.value = false
    error.value = e.message || 'Registration failed'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; }

.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #060612;
  position: relative;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
  padding: 0.6rem;
}

/* ── Animated orbs ── */
.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: drift 12s ease-in-out infinite alternate;
}
.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #7c3aed55, transparent); top: -200px; left: -150px; animation-duration: 14s; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #06b6d455, transparent); bottom: -100px; right: -100px; animation-duration: 10s; animation-delay: -3s; }
.orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, #f59e0b44, transparent); top: 50%; left: 30%; animation-duration: 16s; animation-delay: -6s; }
.orb-4 { width: 250px; height: 250px; background: radial-gradient(circle, #ec489944, transparent); top: 20%; right: 20%; animation-duration: 11s; animation-delay: -2s; }

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.1); }
}

/* ── Particles ── */
.particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.particle {
  position: absolute;
  animation: floatParticle linear infinite;
}
@keyframes floatParticle {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0.15; }
  50%  { opacity: 0.35; }
  100% { transform: translateY(-60px) rotate(360deg); opacity: 0.1; }
}

/* ── Layout ── */
.register-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 980px;
  width: 100%;
  min-height: 620px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04);
}

/* ── Left Panel ── */
.left-panel {
  background: linear-gradient(145deg, #1a0533 0%, #0d1b4b 50%, #071830 100%);
  padding: 3rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.left-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.left-inner { position: relative; z-index: 1; width: 100%; }

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  margin-bottom: 2.5rem;
}
.brand-icon { font-size: 2rem; }
.brand-name {
  font-size: 1.6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
}

.hero-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(167,139,250,0.2), rgba(56,189,248,0.2));
  border: 1px solid rgba(167,139,250,0.4);
  color: #a78bfa;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 2.6rem;
  font-weight: 900;
  color: white;
  line-height: 1.15;
  margin-bottom: 1rem;
}
.gradient-word {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-sub {
  color: rgba(255,255,255,0.55);
  font-size: 0.95rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1rem 1.2rem;
}
.benefit-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.benefit-icon-wrap.green { background: rgba(52,211,153,0.15); }
.benefit-icon-wrap.blue  { background: rgba(56,189,248,0.15); }
.benefit-icon-wrap.gold  { background: rgba(251,191,36,0.15); }
.benefit-item strong {
  display: block;
  color: white;
  font-size: 0.95rem;
  margin-bottom: 0.1rem;
}
.benefit-item span {
  color: rgba(255,255,255,0.45);
  font-size: 0.8rem;
}

.trust-bar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1rem 1.5rem;
}
.trust-item { text-align: center; }
.trust-item strong { display: block; color: #fbbf24; font-size: 1.1rem; font-weight: 800; }
.trust-item span { color: rgba(255,255,255,0.4); font-size: 0.72rem; }
.trust-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.1); }

/* ── Right Panel ── */
.right-panel {
  background: #0c0c1e;
  padding: 1.6rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: visible;
}

.form-card { width: 100%; max-width: 460px; }

.form-card-header {
  text-align: center;
  margin-bottom: 1.2rem;
}
.form-card-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.2rem;
}
.form-card-header p {
  color: rgba(255,255,255,0.45);
  font-size: 0.9rem;
}

/* ── Social Buttons ── */
.social-signup { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.9rem 1.5rem;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  font-family: 'Outfit', sans-serif;
}
.google-btn {
  background: white;
  color: #333;
}
.google-btn:hover { background: #f0f0f0; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
.facebook-btn {
  background: #1877F2;
  color: white;
}
.facebook-btn:hover { background: #1565d8; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(24,119,242,0.4); }

/* ── Divider ── */
.divider {
  position: relative;
  text-align: center;
  margin: 1rem 0;
  color: rgba(255,255,255,0.3);
  font-size: 0.85rem;
}
.divider::before, .divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: rgba(255,255,255,0.1);
}
.divider::before { left: 0; }
.divider::after { right: 0; }

/* ── Manual toggle ── */
.manual-toggle-btn {
  width: 100%;
  padding: 1rem 1.1rem;
  background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(14,165,233,0.18));
  border: 1px solid rgba(99,102,241,0.35);
  border-radius: 16px;
  color: #dbeafe;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  font-family: 'Outfit', sans-serif;
  box-shadow: 0 10px 25px rgba(56,189,248,0.12);
}
.manual-toggle-btn:hover {
  background: linear-gradient(135deg, rgba(99,102,241,0.28), rgba(14,165,233,0.28));
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(56,189,248,0.18);
}
/* ── Form ── */
.signup-form { display: flex; flex-direction: column; gap: 0.75rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.3rem; }
.form-group label { font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.6); }
.opt { color: rgba(255,255,255,0.3); font-weight: 400; }

/* ── Photo Upload Circular ── */
.photo-upload-section {
  display: flex;
  justify-content: center;
  margin-bottom: 0.8rem;
  margin-top: 0.4rem;
  align-items: center;
}

.photo-circle-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(167,139,250,0.22), rgba(56,189,248,0.22));
  border: 2px solid rgba(167,139,250,0.45);
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(167,139,250,0.18);
  position: relative;
}

.photo-circle-label:hover {
  border-color: rgba(167,139,250,0.8);
  background: linear-gradient(135deg, rgba(167,139,250,0.28), rgba(56,189,248,0.28));
  transform: scale(1.03);
}

.photo-circle-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  height: 100%;
}

.camera-icon {
  font-size: 1.2rem;
}

.camera-text {
  font-size: 0.72rem;
  font-weight: 600;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.photo-circle-img {
  width: 68px;
  height: 68px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.remove-photo {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.85);
  font-size: 0.78rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  margin-left: 0.6rem;
}

.input-box {
  position: relative;
}
.iicon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  pointer-events: none;
}
.input-box input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 0.8rem 0.9rem 0.8rem 2.5rem;
  color: white;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  transition: all 0.2s;
  outline: none;
}
.input-box input:focus {
  border-color: #7c3aed;
  background: rgba(124,58,237,0.08);
  box-shadow: 0 0 0 4px rgba(124,58,237,0.12);
}
.input-box input::placeholder { color: rgba(255,255,255,0.25); }
.eye-btn {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.eye-btn:hover { opacity: 1; }

/* ── Terms ── */
.terms-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: rgba(255,255,255,0.5);
  font-size: 0.82rem;
  cursor: pointer;
  line-height: 1.5;
}
.terms-row input { display: none; }
.custom-check {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 1.5px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  transition: all 0.2s;
  margin-top: 1px;
  position: relative;
}
.terms-row input:checked ~ .custom-check {
  background: linear-gradient(135deg, #7c3aed, #38bdf8);
  border-color: transparent;
}
.terms-row input:checked ~ .custom-check::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
}
.terms-row a { color: #a78bfa; text-decoration: none; }
.terms-row a:hover { text-decoration: underline; }

/* ── Feedback ── */
.error-box {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #f87171;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
}
.success-box {
  background: rgba(52,211,153,0.1);
  border: 1px solid rgba(52,211,153,0.3);
  color: #34d399;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  text-align: center;
}

/* ── Submit ── */
.submit-btn {
  width: 100%;
  padding: 1rem 1.2rem;
  background: linear-gradient(135deg, #7c3aed, #2563eb, #0ea5e9);
  border: 1px solid rgba(255,255,255,0.16);
  border-radius: 16px;
  color: white;
  font-size: 1.03rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  font-family: 'Outfit', sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 54px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.25);
  box-shadow: 0 14px 35px rgba(56,189,248,0.18);
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 18px 42px rgba(56,189,248,0.28), 0 8px 18px rgba(124,58,237,0.18);
}
.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.spin {
  width: 20px; height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.login-link {
  text-align: center;
  margin-top: 1rem;
  color: rgba(255,255,255,0.4);
  font-size: 0.88rem;
}
.login-link a { color: #a78bfa; font-weight: 600; text-decoration: none; }
.login-link a:hover { text-decoration: underline; }

/* ── Responsive ── */
@media (max-width: 860px) {
  .register-container { grid-template-columns: 1fr; max-width: 480px; min-height: auto; }
  .left-panel { display: none; }
  .right-panel { padding: 2rem 1.5rem; }
}
@media (max-width: 480px) {
  .form-row { grid-template-columns: 1fr; }
  .right-panel { padding: 1.5rem 1rem; }
}
</style>
