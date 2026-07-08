<template>
  <div class="home-page">

    <!-- ══════════ HERO ══════════ -->
    <section class="hero">
      <div class="hero-bg">
        <div class="h-orb h-orb1"></div>
        <div class="h-orb h-orb2"></div>
        <div class="h-orb h-orb3"></div>
        <div class="grid-overlay"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-left">
          <div class="hero-badge">
            <span class="bdot"></span>
            🇷🇼 Rwanda's #1 Earning Platform
          </div>

          <h1 class="hero-title">
            Turn Your Phone<br/>
            Into a<br/>
            <span class="gradient-text">Money Machine</span>
          </h1>

          <p class="hero-desc">
            Watch videos, complete tasks & refer friends — earn up to
            <strong class="gold-text">450,000 RWF every month</strong>,
            paid directly to your MTN or Airtel Money.
          </p>

          <div class="hero-ctas">
            <router-link to="/register" class="cta-main" id="home-get-started">
              <span class="cta-shine"></span>
              🚀 Start Earning Now — FREE
            </router-link>
            <router-link to="/about" class="cta-ghost">
              Learn More →
            </router-link>
          </div>

          <div class="hero-stats">
            <div class="hs-item">
              <span class="hs-num">50K+</span>
              <span class="hs-label">Active Earners</span>
            </div>
            <div class="hs-sep"></div>
            <div class="hs-item">
              <span class="hs-num">100M+</span>
              <span class="hs-label">RWF Paid Out</span>
            </div>
            <div class="hs-sep"></div>
            <div class="hs-item">
              <span class="hs-num">4.9 ★</span>
              <span class="hs-label">User Rating</span>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div class="phone-scene">
            <div class="phone-glow"></div>
            <div class="phone-frame">
              <div class="phone-notch"></div>
              <div class="phone-screen">
                <div class="ps-header">
                  <span>💹</span>
                  <span class="ps-title">INJIZA</span>
                  <div class="ps-dot"></div>
                </div>
                <div class="ps-balance">
                  <div class="ps-label">This Month's Earnings</div>
                  <div class="ps-amount">
                    <span class="ps-num">{{ animatedBalance.toLocaleString() }}</span>
                    <span class="ps-cur">RWF</span>
                  </div>
                  <div class="ps-bar">
                    <div class="ps-fill"></div>
                  </div>
                  <div class="ps-target">Target: 450,000 RWF</div>
                </div>
                <div class="ps-actions">
                  <div class="psa-item active"><span>📺</span><span>Videos</span></div>
                  <div class="psa-item"><span>📋</span><span>Tasks</span></div>
                  <div class="psa-item"><span>💰</span><span>Wallet</span></div>
                </div>
                <div class="ps-recent">
                  <div class="psr-item" v-for="t in recentTx" :key="t.id">
                    <span class="psr-icon">{{ t.icon }}</span>
                    <span class="psr-desc">{{ t.desc }}</span>
                    <span class="psr-amt">+{{ t.amt }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating pills -->
            <div class="pill pill1">
              <span>💰</span> +500 RWF earned!
            </div>
            <div class="pill pill2">
              <span>✅</span> Task completed!
            </div>
            <div class="pill pill3">
              <span>⚡</span> Withdrawal sent!
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ WELCOME + TUTORIAL VIDEO ══════════ -->
    <section class="welcome-video-section">
      <div class="container">
        <div class="section-head">
          <div class="sec-tag green">Welcome Video</div>
          <h2 class="sec-title">Watch the App in Action</h2>
          <p class="sec-sub">See the exact earning flow, activation process, and rewards experience from inside the app.</p>
        </div>

        <div class="welcome-video-grid">
          <div class="welcome-video-preview">
            <div class="welcome-video-placeholder">
              <img src="/logo-horizontal.svg" alt="INJIZA welcome preview" />
              <div class="welcome-video-badge">INJIZA preview</div>
            </div>
          </div>

          <div class="welcome-video-copy">
            <h3>Real app branding preview for activated earning flow.</h3>
            <p>See the INJIZA interface background and video preview image instead of an active player.</p>
            <ul>
              <li>Watch actual app usage footage</li>
              <li>Learn how rewards are credited instantly</li>
              <li>See a step-by-step walkthrough of the activation flow</li>
            </ul>
            <div class="welcome-actions">
              <router-link to="/register" class="cta-main">Start earning now</router-link>
              <router-link to="/videos" class="cta-ghost">Explore videos</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ HOW IT WORKS ══════════ -->
    <section class="how-section">
      <div class="container">
        <div class="section-head">
          <div class="sec-tag">Simple Process</div>
          <h2 class="sec-title">Start Earning in <span class="underline-gold">4 Easy Steps</span></h2>
          <p class="sec-sub">No experience needed. Anyone with a phone can do this.</p>
        </div>

        <div class="steps-grid">
          <div class="step-card" v-for="(s, i) in steps" :key="i">
            <div class="step-num">0{{ i + 1 }}</div>
            <div class="step-icon">{{ s.icon }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <div class="step-arrow" v-if="i < steps.length - 1">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ EARNING WAYS ══════════ -->
    <section class="earn-section">
      <div class="container">
        <div class="section-head">
          <div class="sec-tag purple">Multiple Income Streams</div>
          <h2 class="sec-title">Ways to <span class="purple-text">Earn Money</span></h2>
        </div>

        <div class="earn-grid">
          <div class="earn-card" v-for="e in earningWays" :key="e.title">
            <div class="earn-icon-wrap" :class="e.color">{{ e.icon }}</div>
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
            <div class="earn-rate">
              <span class="rate-label">Earn up to</span>
              <span class="rate-val">{{ e.rate }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ FEATURED VIDEOS ══════════ -->
    <section class="videos-section" v-if="sampleVideos.length > 0">
      <div class="container">
        <div class="section-head">
          <div class="sec-tag green">Earn Instantly</div>
          <h2 class="sec-title">Watch & <span class="green-text">Earn Now</span></h2>
        </div>
        <div class="videos-grid">
          <div class="v-card" v-for="video in sampleVideos" :key="video.id">
            <div class="v-thumb">
              <img :src="video.thumbnail" :alt="video.title" />
              <div class="v-play"><span>▶</span></div>
              <span class="v-dur">{{ video.duration }}s</span>
              <span class="v-badge">New</span>
            </div>
            <div class="v-info">
              <h4>{{ video.title }}</h4>
              <div class="v-footer">
                <span class="v-reward">💎 +{{ video.reward }} RWF</span>
                <router-link to="/register" class="v-btn">Watch →</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ TESTIMONIALS ══════════ -->
    <section class="testi-section">
      <div class="container">
        <div class="section-head">
          <div class="sec-tag gold">Real People, Real Money</div>
          <h2 class="sec-title">What Our <span class="gold-grad">Members Say</span></h2>
        </div>

        <div class="testi-grid">
          <div class="testi-card" v-for="t in testimonials" :key="t.name">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">"{{ t.text }}"</p>
            <div class="testi-author">
              <div class="testi-avatar">{{ t.avatar }}</div>
              <div>
                <div class="testi-name">{{ t.name }} <span class="verified">✅ Verified</span></div>
                <div class="testi-loc">📍 {{ t.location }} • Earned: <strong class="gold-text">{{ t.earned }} RWF</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ TRUST BAR ══════════ -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-row">
          <div class="trust-item" v-for="t in trustItems" :key="t.label">
            <div class="trust-icon">{{ t.icon }}</div>
            <div>
              <strong>{{ t.label }}</strong>
              <span>{{ t.sub }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ CTA BANNER ══════════ -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-glow1"></div>
          <div class="cta-glow2"></div>
          <div class="cta-emoji">🎉</div>
          <h2>Ready to Change Your Life?</h2>
          <p>Join 50,000+ Rwandans earning money from home. Start free today — no credit card required!</p>
          <div class="cta-btns">
            <router-link to="/register" class="cta-main" id="home-cta-register">
              <span class="cta-shine"></span>
              🚀 Create Free Account
            </router-link>
            <router-link to="/login" class="cta-secondary">Sign In →</router-link>
          </div>
          <div class="cta-trust">
            <span>🔒 Secure</span>
            <span>💯 Legit</span>
            <span>⚡ Instant Payouts</span>
            <span>🇷🇼 Rwanda-based</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18nStore } from '../stores/i18n'
import { useAuthStore } from '../stores/auth'

const i18nStore = useI18nStore()
const authStore = useAuthStore()
const locale = computed(() => i18nStore.locale)
const t = (key) => i18nStore.t(key)
const sampleVideos = ref([])
const liveCount = ref(2847)
const animatedBalance = ref(0)

const recentTx = [
  { id: 1, icon: '📺', desc: 'Video reward', amt: '100 RWF' },
  { id: 2, icon: '✅', desc: 'Task done', amt: '75 RWF' },
  { id: 3, icon: '👥', desc: 'Referral bonus', amt: '500 RWF' },
]

const steps = [
  { icon: '📱', title: 'Create Account', desc: 'Sign up free in 30 seconds. No complex setup.' },
  { icon: '🔓', title: 'Activate', desc: 'Pay 350 RWF once to unlock full earning potential.' },
  { icon: '📺', title: 'Watch & Earn', desc: 'Watch videos, complete tasks, invite friends.' },
  { icon: '💸', title: 'Withdraw', desc: 'Cash out instantly to MTN MoMo or Airtel Money.' },
]

const earningWays = [
  { icon: '📺', title: 'Watch Videos', desc: 'Watch short videos and get rewarded for every second viewed.', rate: '100 RWF/video', color: 'blue' },
  { icon: '📋', title: 'Complete Tasks', desc: 'Simple tasks like surveys, app installs, and more.', rate: '150 RWF/task', color: 'purple' },
  { icon: '👥', title: 'Refer Friends', desc: 'Earn 500 RWF for every friend you invite who joins.', rate: '500 RWF/referral', color: 'gold' },
  { icon: '🎮', title: 'Play Games', desc: 'Play mini-games and win daily bonus rewards.', rate: '200 RWF/game', color: 'green' },
  { icon: '🎁', title: 'Daily Bonus', desc: 'Log in every day to claim your streak bonus.', rate: '100–500 RWF/day', color: 'red' },
  { icon: '⭐', title: 'Level Up', desc: 'Reach higher levels to unlock bigger rewards automatically.', rate: '2x multiplier', color: 'cyan' },
]

const testimonials = [
  { name: 'Marie K.', avatar: '👩🏾', location: 'Kigali', text: 'I was skeptical but after 1 month I withdrew 380,000 RWF! My family is so happy.', earned: '380,000' },
  { name: 'Jean Paul', avatar: '👨🏿', location: 'Huye', text: 'Best platform in Rwanda. I withdraw every Friday. Totally legit and reliable!', earned: '512,000' },
  { name: 'Alice N.', avatar: '👩🏽', location: 'Musanze', text: 'I earn more from INJIZA than my old part-time job. Join immediately!', earned: '1,200,000' },
  { name: 'Patrick M.', avatar: '👨🏾', location: 'Rubavu', text: 'Started with videos, now I refer friends too. Income doubled in 2 months!', earned: '760,000' },
]

const trustItems = [
  { icon: '🔒', label: 'Fully Secure', sub: 'Bank-grade encryption' },
  { icon: '⚡', label: 'Instant Payouts', sub: 'MTN & Airtel supported' },
  { icon: '🇷🇼', label: 'Rwanda-Based', sub: 'Local support team' },
  { icon: '💯', label: '100% Legitimate', sub: 'Verified & trusted' },
  { icon: '🛟', label: '24/7 Support', sub: 'Always here for you' },
]

onMounted(() => {
  sampleVideos.value = [
    { id: 'website-1', title: 'INJIZA Dashboard', description: 'Screenshot of the INJIZA earning dashboard.', duration: 60, reward: 10, thumbnail: '/logo-horizontal.svg' },
    { id: 'website-2', title: 'INJIZA Activation', description: 'Preview of the activation and verification page.', duration: 120, reward: 15, thumbnail: '/brand-mockups/best-favicon.svg' },
    { id: 'website-3', title: 'INJIZA Reward Screen', description: 'Visual preview of rewards and payout flow.', duration: 60, reward: 12, thumbnail: '/brand-mockups/better-favicon.svg' },
    { id: 'website-4', title: 'INJIZA Home Screen', description: 'Branded preview of the website landing page.', duration: 75, reward: 14, thumbnail: '/brand-mockups/good-favicon.svg' },
    { id: 'website-5', title: 'INJIZA Dashboard', description: 'Screenshot of the INJIZA earning dashboard.', duration: 60, reward: 10, thumbnail: '/logo-horizontal.svg' },
    { id: 'website-6', title: 'INJIZA Activation', description: 'Preview of the activation and video earning panel.', duration: 120, reward: 15, thumbnail: '/brand-mockups/best-favicon.svg' },
    { id: 'website-7', title: 'INJIZA Reward Screen', description: 'Visual preview of rewards and payout flow.', duration: 60, reward: 12, thumbnail: '/brand-mockups/better-favicon.svg' },
    { id: 'website-8', title: 'INJIZA Home Screen', description: 'Branded preview of the website landing page.', duration: 75, reward: 14, thumbnail: '/brand-mockups/good-favicon.svg' },
    { id: 'website-9', title: 'INJIZA Dashboard', description: 'Screenshot of the INJIZA earning dashboard.', duration: 60, reward: 10, thumbnail: '/logo-horizontal.svg' }
  ]

  // Animate balance counter
  let target = 287500
  let current = 0
  const step = target / 80
  const interval = setInterval(() => {
    current += step
    if (current >= target) { current = target; clearInterval(interval) }
    animatedBalance.value = Math.floor(current)
  }, 20)

  // Live count flicker
  setInterval(() => { liveCount.value += Math.floor(Math.random() * 5 - 2) }, 5000)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; }

.home-page { font-family: 'Outfit', sans-serif; overflow-x: hidden; color: white; background: #060612; }

/* ── Container ── */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
}

.hero-bg { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
.h-orb { position: absolute; border-radius: 50%; filter: blur(100px); animation: drift 12s ease-in-out infinite alternate; }
.h-orb1 { width: 600px; height: 600px; background: radial-gradient(circle, #7c3aed44, transparent); top: -200px; left: -200px; }
.h-orb2 { width: 500px; height: 500px; background: radial-gradient(circle, #fbbf2433, transparent); bottom: -100px; right: -100px; animation-delay: -4s; }
.h-orb3 { width: 350px; height: 350px; background: radial-gradient(circle, #06b6d422, transparent); top: 30%; left: 40%; animation-delay: -8s; animation-duration: 16s; }
.grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
@keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,20px) scale(1.08); } }

/* Hero content */
.hero-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-top: 5rem;
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.35);
  color: #a78bfa; padding: 0.5rem 1.1rem; border-radius: 50px;
  font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem;
}
.bdot { width: 7px; height: 7px; background: #34d399; border-radius: 50%; animation: blink 1.5s ease-in-out infinite; }

.hero-title { font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 900; line-height: 1.15; margin-bottom: 1.25rem; }
.gradient-text {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #34d399);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-desc { font-size: 1.1rem; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 2rem; max-width: 500px; }
.gold-text { color: #fbbf24; }

/* CTA buttons */
.hero-ctas { display: flex; gap: 1rem; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; }
.cta-main {
  position: relative; overflow: hidden;
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #000; font-size: 1rem; font-weight: 800;
  border-radius: 50px; text-decoration: none;
  transition: all 0.3s; white-space: nowrap;
  font-family: 'Outfit', sans-serif;
}
.cta-main:hover { transform: translateY(-3px); box-shadow: 0 15px 45px rgba(251,191,36,0.45); }
.cta-shine {
  position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shine 2.5s infinite;
}
@keyframes shine { 0% { left: -100%; } 50%,100% { left: 150%; } }
.cta-ghost {
  color: rgba(255,255,255,0.6); font-size: 0.95rem; font-weight: 600;
  text-decoration: none; transition: color 0.2s; padding: 0.5rem;
}
.cta-ghost:hover { color: white; }

/* Hero stats */
.hero-stats { display: flex; align-items: center; gap: 2rem; }
.hs-item { display: flex; flex-direction: column; }
.hs-num { font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg, #a78bfa, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hs-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
.hs-sep { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }

/* Phone scene */
.hero-right { display: flex; justify-content: center; align-items: center; }
.phone-scene { position: relative; }
.phone-glow { position: absolute; inset: -30px; background: linear-gradient(135deg, #7c3aed55, #fbbf2433); filter: blur(50px); border-radius: 50%; }
.phone-frame {
  width: 280px; height: 560px;
  background: #1a1a2e;
  border-radius: 40px;
  padding: 8px;
  border: 3px solid rgba(255,255,255,0.1);
  box-shadow: 0 25px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
  position: relative; z-index: 1;
}
.phone-notch { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 90px; height: 24px; background: #060612; border-radius: 15px; z-index: 2; }
.phone-screen { width: 100%; height: 100%; background: linear-gradient(180deg, #0c0c1e, #1a1a2e); border-radius: 32px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; overflow: hidden; }

.ps-header { display: flex; align-items: center; gap: 0.4rem; padding-top: 1.2rem; font-weight: 700; font-size: 1rem; }
.ps-title { background: linear-gradient(135deg, #a78bfa, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.ps-dot { width: 7px; height: 7px; background: #34d399; border-radius: 50%; margin-left: auto; animation: blink 2s ease-in-out infinite; }

.ps-balance { background: linear-gradient(135deg, #7c3aed, #2563eb); border-radius: 16px; padding: 1rem; }
.ps-label { font-size: 0.68rem; opacity: 0.8; margin-bottom: 0.25rem; }
.ps-amount { display: flex; align-items: baseline; gap: 0.3rem; margin-bottom: 0.5rem; }
.ps-num { font-size: 1.6rem; font-weight: 900; }
.ps-cur { font-size: 0.75rem; opacity: 0.7; }
.ps-bar { height: 5px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden; margin-bottom: 0.3rem; }
.ps-fill { height: 100%; width: 64%; background: rgba(255,255,255,0.8); border-radius: 3px; }
.ps-target { font-size: 0.62rem; opacity: 0.6; }

.ps-actions { display: flex; gap: 0.4rem; }
.psa-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 0.6rem 0; font-size: 0.62rem; cursor: pointer; }
.psa-item span:first-child { font-size: 1.2rem; }
.psa-item.active { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.4); }

.ps-recent { display: flex; flex-direction: column; gap: 0.4rem; }
.psr-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; padding: 0.5rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 8px; }
.psr-icon { font-size: 1rem; }
.psr-desc { flex: 1; color: rgba(255,255,255,0.6); }
.psr-amt { color: #34d399; font-weight: 600; }

/* Floating pills */
.pill {
  position: absolute;
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50px;
  padding: 0.6rem 1rem;
  font-size: 0.82rem; font-weight: 600;
  white-space: nowrap;
  animation: float-pill 4s ease-in-out infinite;
}
.pill1 { top: 10%; right: -40px; animation-delay: 0s; color: #34d399; }
.pill2 { bottom: 25%; left: -50px; animation-delay: -1.5s; color: #a78bfa; }
.pill3 { bottom: 8%; right: -30px; animation-delay: -3s; color: #38bdf8; }
@keyframes float-pill { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

.welcome-video-section { padding: 5rem 0; }
.welcome-video-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: center;
}
.welcome-video-preview { border-radius: 28px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.3); }
.welcome-video-player {
  width: 100%;
  height: 100%;
  min-height: 360px;
  display: block;
  background: #000;
}
.welcome-video-copy h3 { font-size: clamp(1.7rem, 2.4vw, 2.3rem); margin-bottom: 1rem; }
.welcome-video-copy p { color: rgba(255,255,255,0.75); margin-bottom: 1.5rem; line-height: 1.8; }
.welcome-video-copy ul { list-style: none; padding: 0; margin: 0 0 1.75rem 0; display: grid; gap: 0.85rem; }
.welcome-video-copy li { position: relative; padding-left: 2rem; color: rgba(255,255,255,0.8); line-height: 1.7; }
.welcome-video-copy li::before {
  content: '✔';
  position: absolute;
  left: 0;
  top: 0.15rem;
  color: #34d399;
}
.welcome-video-placeholder {
  position: relative;
  width: 100%;
  min-height: 360px;
  background: #05060c;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-video-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.welcome-video-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.65);
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.01em;
}
.welcome-actions { display: flex; flex-wrap: wrap; gap: 1rem; }
.welcome-actions .cta-main,
.welcome-actions .cta-ghost { padding: 0.95rem 1.5rem; border-radius: 999px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; }
.welcome-actions .cta-main { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000; }
.welcome-actions .cta-ghost { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.14); }

/* ── HOW IT WORKS ── */
.how-section { padding: 6rem 0; background: rgba(255,255,255,0.015); border-top: 1px solid rgba(255,255,255,0.05); }

.section-head { text-align: center; margin-bottom: 3rem; }
.sec-tag {
  display: inline-block; padding: 0.4rem 1rem;
  background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3);
  color: #38bdf8; border-radius: 50px;
  font-size: 0.8rem; font-weight: 600; margin-bottom: 1rem;
}
.sec-tag.purple { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.3); color: #a78bfa; }
.sec-tag.green { background: rgba(52,211,153,0.1); border-color: rgba(52,211,153,0.3); color: #34d399; }
.sec-tag.gold { background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.3); color: #fbbf24; }

.sec-title { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; margin-bottom: 0.75rem; }
.underline-gold { background: linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.purple-text { background: linear-gradient(135deg, #a78bfa, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.green-text { background: linear-gradient(135deg, #34d399, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.gold-grad { background: linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.sec-sub { color: rgba(255,255,255,0.45); font-size: 1rem; }

.steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; position: relative; }
.step-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 2rem 1.5rem; text-align: center;
  position: relative; transition: all 0.3s;
}
.step-card:hover { transform: translateY(-8px); border-color: rgba(251,191,36,0.3); box-shadow: 0 20px 60px rgba(251,191,36,0.1); }
.step-num { font-size: 3rem; font-weight: 900; color: rgba(251,191,36,0.15); line-height: 1; margin-bottom: 0.5rem; }
.step-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.step-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: white; }
.step-card p { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.6; }
.step-arrow { position: absolute; right: -1rem; top: 45%; font-size: 1.25rem; color: rgba(255,255,255,0.2); z-index: 1; }

/* ── EARNING WAYS ── */
.earn-section { padding: 6rem 0; }
.earn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.earn-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 1.75rem; transition: all 0.3s;
}
.earn-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.15); }
.earn-icon-wrap { font-size: 2.2rem; width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
.earn-icon-wrap.blue { background: rgba(56,189,248,0.15); }
.earn-icon-wrap.purple { background: rgba(167,139,250,0.15); }
.earn-icon-wrap.gold { background: rgba(251,191,36,0.15); }
.earn-icon-wrap.green { background: rgba(52,211,153,0.15); }
.earn-icon-wrap.red { background: rgba(239,68,68,0.15); }
.earn-icon-wrap.cyan { background: rgba(34,211,238,0.15); }
.earn-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
.earn-card p { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.6; margin-bottom: 1rem; }
.earn-rate { display: flex; flex-direction: column; gap: 0.1rem; }
.rate-label { font-size: 0.7rem; color: rgba(255,255,255,0.35); }
.rate-val { font-size: 1rem; font-weight: 700; color: #fbbf24; }

/* ── VIDEOS ── */
.videos-section { padding: 6rem 0; background: rgba(255,255,255,0.015); }
.videos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
.v-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; transition: all 0.3s; }
.v-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
.v-thumb { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.v-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.v-card:hover .v-thumb img { transform: scale(1.08); }
.v-play { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
.v-card:hover .v-play { opacity: 1; }
.v-play span { width: 48px; height: 48px; background: linear-gradient(135deg, #7c3aed, #2563eb); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem; }
.v-dur { position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.8); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
.v-badge { position: absolute; top: 0.5rem; left: 0.5rem; background: #ef4444; color: white; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.68rem; font-weight: 700; }
.v-info { padding: 1rem; }
.v-info h4 { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; color: rgba(255,255,255,0.9); line-height: 1.4; }
.v-footer { display: flex; align-items: center; justify-content: space-between; }
.v-reward { font-size: 0.85rem; font-weight: 700; color: #fbbf24; }
.v-btn { font-size: 0.78rem; color: #a78bfa; text-decoration: none; font-weight: 600; }
.v-btn:hover { text-decoration: underline; }

/* ── TESTIMONIALS ── */
.testi-section { padding: 6rem 0; }
.testi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
.testi-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 1.5rem; transition: all 0.3s; }
.testi-card:hover { border-color: rgba(251,191,36,0.3); transform: translateY(-4px); }
.testi-stars { color: #fbbf24; font-size: 1rem; margin-bottom: 0.75rem; letter-spacing: 2px; }
.testi-text { color: rgba(255,255,255,0.65); font-size: 0.88rem; line-height: 1.6; font-style: italic; margin-bottom: 1.25rem; }
.testi-author { display: flex; align-items: center; gap: 0.75rem; }
.testi-avatar { font-size: 2rem; }
.testi-name { font-size: 0.9rem; font-weight: 700; }
.verified { font-size: 0.7rem; background: rgba(52,211,153,0.15); color: #34d399; padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.25rem; }
.testi-loc { font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 0.15rem; }

/* ── TRUST ── */
.trust-section { padding: 3rem 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
.trust-row { display: flex; justify-content: center; align-items: center; gap: 3rem; flex-wrap: wrap; }
.trust-item { display: flex; align-items: center; gap: 0.75rem; }
.trust-icon { font-size: 2rem; }
.trust-item strong { display: block; font-size: 0.95rem; color: white; }
.trust-item span { font-size: 0.75rem; color: rgba(255,255,255,0.35); }

/* ── CTA ── */
.cta-section { padding: 6rem 0; }
.cta-card {
  background: linear-gradient(145deg, #1a0533, #0d1b4b);
  border: 1px solid rgba(251,191,36,0.2);
  border-radius: 28px; padding: 4rem 2rem;
  text-align: center; position: relative; overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
}
.cta-glow1 { position: absolute; top: -150px; left: 50%; transform: translateX(-50%); width: 500px; height: 300px; background: radial-gradient(circle, rgba(251,191,36,0.15), transparent); pointer-events: none; }
.cta-glow2 { position: absolute; bottom: -100px; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(124,58,237,0.2), transparent); filter: blur(50px); pointer-events: none; }
.cta-emoji { font-size: 4rem; margin-bottom: 1.5rem; animation: bounce 2s ease-in-out infinite; }
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.cta-card h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; margin-bottom: 1rem; position: relative; }
.cta-card p { color: rgba(255,255,255,0.55); font-size: 1rem; max-width: 550px; margin: 0 auto 2rem; line-height: 1.7; position: relative; }
.cta-btns { display: flex; gap: 1rem; justify-content: center; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem; position: relative; }
.cta-secondary { color: rgba(255,255,255,0.5); font-size: 0.95rem; font-weight: 600; text-decoration: none; padding: 0.5rem 1rem; }
.cta-secondary:hover { color: white; }
.cta-trust { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; color: rgba(255,255,255,0.35); font-size: 0.82rem; position: relative; }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .testi-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .hero-content { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
  .hero-right { display: none; }
  .hero-ctas { justify-content: center; }
  .hero-stats { justify-content: center; }
  .steps-grid, .earn-grid { grid-template-columns: repeat(2, 1fr); }
  .videos-grid { grid-template-columns: repeat(2, 1fr); }
  .step-arrow { display: none; }
  .trust-row { gap: 1.5rem; }
}
@media (max-width: 640px) {
  .earn-grid, .steps-grid { grid-template-columns: 1fr; }
  .videos-grid, .testi-grid { grid-template-columns: 1fr; }
  .hero-stats { gap: 1rem; flex-wrap: wrap; }
  .cta-trust { gap: 0.75rem; }
}
</style>
