<template>
  <div class="activation-page">
    <!-- BG -->
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>
    <div class="bg-glow glow-3"></div>

    <!-- Floating money rain -->
    <div class="money-rain">
      <span v-for="n in 20" :key="n" class="money-drop" :style="moneyStyle(n)">
        {{ ['💵','💴','💰','🤑','💎','🏆'][n % 6] }}
      </span>
    </div>

    <div class="page-inner">
      <!-- TOP BADGE -->
      <div class="top-badge">
        <span class="pulse-dot"></span>
        🔥 150,000+ people taking actions now — join the earning community!
      </div>

      <!-- HERO HEADLINE -->
      <div class="hero-section">
        <div class="crown-icon">👑</div>
        <h1 class="hero-headline">
          You're One Step Away From<br/>
          <span class="highlight-gold">Financial Freedom!</span>
        </h1>
        <p class="hero-sub">
          Your account is ready — but it needs to be <strong>activated</strong> before you can start earning.<br/>
          Don't miss this once-in-a-lifetime opportunity.
        </p>
      </div>

      <!-- COUNTDOWN TIMER -->
      <div class="countdown-wrap">
        <p class="countdown-label">⏳ This offer expires in:</p>
        <div class="countdown-boxes">
          <div class="cbox"><span class="cnum">{{ timer.h }}</span><span class="clabel">Hours</span></div>
          <div class="csep">:</div>
          <div class="cbox"><span class="cnum">{{ timer.m }}</span><span class="clabel">Mins</span></div>
          <div class="csep">:</div>
          <div class="cbox"><span class="cnum">{{ timer.s }}</span><span class="clabel">Secs</span></div>
        </div>
      </div>

      <!-- BENEFITS CARDS -->
      <div class="benefits-grid">
        <div class="benefit-card gold-card">
          <div class="benefit-icon">💰</div>
          <div class="benefit-amount">450,000 RWF</div>
          <div class="benefit-label">Every Single Month</div>
          <div class="benefit-note">Guaranteed income, paid directly to your mobile money</div>
        </div>
        <div class="benefit-card purple-card">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-amount">Instant</div>
          <div class="benefit-label">Withdrawals Anytime</div>
          <div class="benefit-note">MTN MoMo & Airtel Money — withdraw whenever you want</div>
        </div>
        <div class="benefit-card blue-card">
          <div class="benefit-icon">📈</div>
          <div class="benefit-amount">Unlimited</div>
          <div class="benefit-label">Earning Potential</div>
          <div class="benefit-note">Watch videos, complete tasks, refer friends & multiply income</div>
        </div>
        <div class="benefit-card green-card">
          <div class="benefit-icon">🎁</div>
          <div class="benefit-amount">5,000 RWF</div>
          <div class="benefit-label">Welcome Bonus</div>
          <div class="benefit-note">Instantly credited to your account upon activation</div>
        </div>
      </div>

      <!-- TESTIMONIALS -->
      <div class="testimonials-section">
        <h3 class="section-title">💬 What Our Members Are Saying</h3>
        <div class="testimonials-row">
          <div class="testimonial-card" v-for="t in testimonials" :key="t.name">
            <div class="t-avatar">{{ t.avatar }}</div>
            <div class="t-content">
              <div class="t-name">{{ t.name }} <span class="t-badge">✅ Verified</span></div>
              <div class="t-location">📍 {{ t.location }}</div>
              <div class="t-text">"{{ t.text }}"</div>
              <div class="t-earned">💰 Earned: <strong>{{ t.earned }} RWF</strong> this month</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTIVATION CARD -->
      <div class="activation-card">
        <div class="activation-glow"></div>

        <div class="activation-header">
          <div class="lock-icon">🔓</div>
          <h2>Activate Your Account Now</h2>
          <p>Pay once. Earn forever. No hidden fees. No monthly charges.</p>
        </div>

        <div class="price-comparison">
          <div class="old-price">
            <span class="old-label">Normal Price</span>
            <span class="old-amount"><s>2,000 RWF</s></span>
          </div>
          <div class="arrow-right">→</div>
          <div class="new-price">
            <span class="discount-badge">🔥 82% OFF Today Only!</span>
            <span class="new-amount">350 <small>RWF</small></span>
            <span class="new-note">One-time activation fee</span>
          </div>
        </div>

        <div class="what-you-get">
          <h4>✅ What You Unlock:</h4>
          <ul>
            <li>🏆 Full access to all earning features</li>
            <li>💵 450,000 RWF monthly earning potential</li>
            <li>⚡ Instant withdrawal to mobile money</li>
            <li>🎁 5,000 RWF welcome bonus instantly</li>
            <li>👥 Referral program — earn 500 RWF per friend</li>
            <li>🎮 Premium games & bonus tasks</li>
            <li>📞 24/7 VIP support</li>
          </ul>
        </div>

        <div class="payment-instructions">
          <h4>📱 How to Pay:</h4>
          <ol>
            <li>Dial <strong class="code-highlight">*182*8*1*1921803#</strong> on your phone</li>
            <li>Enter the amount: <strong class="code-highlight">350 RWF</strong></li>
            <li>Enter your PIN to confirm payment</li>
            <li>Take a <strong>screenshot</strong> of the success SMS message</li>
            <li>Upload the screenshot to our AI Scanner</li>
          </ol>
        </div>

        <div class="upload-section">
          <label class="upload-btn" @click="openScanner">
            <span>📸 Open AI Scanner</span>
          </label>
          <p class="upload-hint">Upload and scan your receipt for instant approval.</p>
        </div>

        <div class="guarantee-row">
          <span>🔒 Secure Payment</span>
          <span>✅ 100% Legitimate</span>
          <span>💯 Money-Back Guarantee</span>
        </div>
      </div>

      <!-- SKIP LINK -->
      <div class="skip-area">
        <button class="skip-btn" @click="skipActivation" id="skip-activation">
          I'll activate later (limited features)
        </button>
      </div>
    </div>

    <!-- SCANNER ASIDE PANEL -->
    <div class="scanner-overlay" v-if="showScanner" @click="closeScanner"></div>
    <aside class="scanner-sidebar" :class="{ 'is-open': showScanner }">
      <div class="sidebar-header">
        <h3>🛡️ Receipt Review Panel</h3>
        <button class="close-btn" @click="closeScanner">✕</button>
      </div>

      <div class="sidebar-content">
        <div class="scanner-steps">
          <h4>⚠️ Strict Verification Required</h4>
          <p>Your receipt MUST match EXACTLY the format shown below. Any other format will be REJECTED.</p>
          <h5 style="color: #10b981; margin-top: 1rem;">Exact Required Format:</h5>
          <pre style="background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 8px; font-size: 0.8rem; overflow: auto;">TxId:[VALUE]*S*Your payment of 350 RWF to Jireh Faith 1921803 was completed at [DATE] [TIME]. Balance: [AMOUNT] RWF. Fee [AMOUNT] RWF.*EN#</pre>
          <ul style="margin-top: 1rem;">
            <li>✅ Receipt MUST start with TxId:</li>
            <li>✅ MUST contain "Your payment of 350 RWF to Jireh Faith 1921803"</li>
            <li>✅ MUST show "was completed at" with date and time</li>
            <li>✅ MUST show Balance and Fee amounts</li>
            <li>✅ MUST end with *EN#</li>
            <li>❌ Any other format will be REJECTED</li>
          </ul>
        </div>

        <div class="upload-box" v-if="!previewUrl">
          <label class="upload-card">
            <input class="file-input-hidden" type="file" accept="image/*" @change="handleFileInput" />
            <div class="upload-card-icon">⬆️</div>
            <div class="upload-card-content">
              <div class="upload-card-title">Upload screenshot</div>
              <div class="upload-card-subtitle">PNG, JPG, or WEBP • filename should start with <strong>"screenshot"</strong></div>
            </div>
            <div class="upload-card-action">Choose file</div>
          </label>
          <div class="error-box" v-if="uploadError">{{ uploadError }}</div>
        </div>

        <div class="ai-scanner-active" v-else>
          <div v-if="previewUrl && previewUrl !== 'text-input'" class="ocr-image-wrap">
            <img :src="previewUrl" alt="uploaded screenshot" class="ocr-image-preview" />
          </div>
          <div class="scanner-ui">
            <div class="text-display">
              <p style="font-size: 0.9rem; color: #a7f3d0; word-break: break-all;">{{ ocrText }}</p>
            </div>
          </div>
          
          <h3 class="scan-status" :class="scanStatusColor">{{ scanStatusText }}</h3>
          <p class="scan-filename">Status: {{ scanFilename || 'Waiting for input' }}</p>
          <p class="scan-sub">{{ scanSubText }}</p>

          <div class="ocr-preview">
            <h4>Receipt Review Summary</h4>
            <pre>{{ ocrText || 'The uploaded proof will be checked against the required criteria automatically.' }}</pre>
          </div>

          <div class="receipt-review-note">
            <p style="color: #ef4444; font-weight: bold;">⚠️ STRICT VALIDATION - Only exact format accepted:</p>
            <ul>
              <li>✓ Starts with <strong>TxId:</strong></li>
              <li>✓ Contains <strong>Your payment of 350 RWF to Jireh Faith 1921803</strong></li>
              <li>✓ Shows <strong>was completed at YYYY-MM-DD HH:MM:SS</strong></li>
              <li>✓ Shows <strong>Balance: [AMOUNT] RWF</strong></li>
              <li>✓ Shows <strong>Fee [AMOUNT] RWF</strong></li>
              <li>✓ Ends with <strong>*EN#</strong></li>
            </ul>
            <p style="color: #f8d7da; margin-top: 1rem;">Any other format = REJECTED</p>
          </div>

          <div class="outcome-list">
            <div v-for="category in scanCategories" :key="category.title" class="outcome-category">
              <div class="category-title">{{ category.title }}</div>
              <div class="category-check" v-for="(check, idx) in category.checks" :key="idx">
                <span :class="['check-badge', check.passed ? 'passed' : 'failed']">{{ check.passed ? '✓' : '✕' }}</span>
                <span class="check-text">{{ check.text }}</span>
              </div>
            </div>
          </div>

          <div class="action-row">
            <button v-if="scanFailed" class="btn-retry" @click="resetScan">Try Another Image</button>
          </div>
        </div>
      </div>
    </aside>

  <div v-if="activationSuccess" class="success-modal-overlay">
    <div class="success-modal" :class="{ flashing: activationSuccess }">
      <div class="success-header">
        <span class="success-icon">✅</span>
        <h2>Payment Verified!</h2>
      </div>
      <p class="success-text">Your account has been activated successfully.</p>
      <div class="progress-section">
        <p class="wait-message">⏳ Wait {{ countdownSeconds }} seconds to access your dashboard...</p>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>
      <p class="redirecting-text">Redirecting to dashboard...</p>
    </div>
  </div>

  <div v-if="fraudWarningVisible" class="fraud-modal-overlay">
    <div class="fraud-modal">
      <div class="fraud-header">
        <span class="fraud-icon">⚠️</span>
        <h2>Warning: Registration Proof Invalid</h2>
      </div>
      <p class="fraud-text">{{ fraudWarningMessage }}</p>
      <p class="fraud-note">If you stay, you will be redirected back to activation to retry the payment proof. If you logout, your session will end and this account will still be reviewed by admin.</p>
      <div class="fraud-actions">
        <button class="btn btn-outline" @click="stayOnAccount">Stay and Retry</button>
        <button class="btn btn-danger" @click="logoutAfterWarning">Logout</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const activeMembersCount = ref(2847)

const timer = ref({ h: '02', m: '47', s: '33' })
let timerInterval = null

const testimonials = [
  {
    name: 'Marie K.',
    avatar: '👩🏾',
    location: 'Kigali, Rwanda',
    text: 'I was skeptical at first, but after paying 350 RWF I started earning immediately. Best decision ever!',
    earned: '432,000'
  },
  {
    name: 'Jean P.',
    avatar: '👨🏿',
    location: 'Huye, Rwanda',
    text: 'I withdraw every week directly to my MTN. My family is now living a better life thanks to INJIZA!',
    earned: '518,000'
  },
  {
    name: 'Alice N.',
    avatar: '👩🏽',
    location: 'Musanze, Rwanda',
    text: 'I joined 3 months ago. Now I earn more from INJIZA than my full-time job. Incredible!',
    earned: '1,290,000'
  }
]

const moneyStyle = (n) => ({
  left: `${(n * 5.3) % 100}%`,
  animationDuration: `${4 + (n % 5)}s`,
  animationDelay: `${(n * 0.7) % 6}s`,
  fontSize: `${1.2 + (n % 3) * 0.5}rem`
})

const startTimer = () => {
  let totalSeconds = 2 * 3600 + 47 * 60 + 33
  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) { clearInterval(timerInterval); return }
    totalSeconds--
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    timer.value = {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0')
    }
  }, 1000)
}

// Scanning State
const showScanner = ref(false)
const previewUrl = ref(null)
const scanStatusText = ref('Receipt Scanner Initializing...')
const scanSubText = ref('Waiting for receipt details...')
const scanFilename = ref('')
const scanProgress = ref(0)
const scanDuration = ref(0)
const scanFailed = ref(false)
const scanSuccess = ref(false)
const scanStatusColor = ref('')
const uploadError = ref('')
const scanLogs = ref([])
const scanOutcomes = ref([])
const ocrText = ref('')
const scanCategories = ref([])
const scanMusicPlaying = ref(false)
let audioContext = null
let scanMusicOscillator = null
let scanMusicGain = null
const fraudWarningVisible = ref(false)
const fraudWarningMessage = ref('')

// Success/Activation Progress State
const activationSuccess = ref(false)
const countdownSeconds = ref(30)
const progressPercent = ref(0)
let countdownInterval = null

import Tesseract from 'tesseract.js'

const validateReceiptFormat = (text) => {
  if (!text || text.trim().length === 0) {
    return { valid: false, reason: 'Receipt text is empty - image must contain valid receipt data' }
  }
  
  const lowercased = text.toLowerCase().trim()
  
  // Check all required elements are present
  const hasTxId = /^txid[:\s]*[0-9*a-z]+/.test(lowercased)
  const hasYourPayment = /your\s+payment\s+of\s+350\s+rwf\s+to\s+jireh\s+faith\s+1921803/.test(lowercased)
  const hasCompleted = /was\s+completed\s+at\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/.test(lowercased)
  const hasBalance = /balance[:\s]*([0-9,]+)\s+rwf/.test(lowercased)
  const hasFee = /fee\s+([0-9]+)\s+rwf/.test(lowercased)
  const hasEnding = /\*en#$/.test(lowercased)
  
  // All elements MUST be present
  if (!hasTxId) return { valid: false, reason: 'Missing or invalid TxId' }
  if (!hasYourPayment) return { valid: false, reason: 'Missing or invalid payment details' }
  if (!hasCompleted) return { valid: false, reason: 'Missing or invalid completion date/time' }
  if (!hasBalance) return { valid: false, reason: 'Missing or invalid balance' }
  if (!hasFee) return { valid: false, reason: 'Missing or invalid fee' }
  if (!hasEnding) return { valid: false, reason: 'Missing *EN# ending' }
  
  // Verify strict order
  const txidIndex = lowercased.indexOf('txid')
  const paymentIndex = lowercased.indexOf('your payment')
  const completedIndex = lowercased.indexOf('was completed')
  const balanceIndex = lowercased.indexOf('balance')
  const feeIndex = lowercased.indexOf('fee')
  const endingIndex = lowercased.indexOf('*en#')
  
  if (!(txidIndex < paymentIndex && paymentIndex < completedIndex && completedIndex < balanceIndex && balanceIndex < feeIndex && feeIndex < endingIndex)) {
    return { valid: false, reason: 'Elements are in wrong order' }
  }
  
  return { valid: true, reason: 'Valid receipt' }
}

const validateMinimal = (text, filename) => {
  const lower = (text || '').toLowerCase()
  const filenameOk = !!(filename && /^screenshot/i.test(filename))
  const hasAmount = /\b350\s*rwf\b/i.test(lower)
  const hasReceiver = /\bjireh\s+faith\b/i.test(lower)
  const hasCode = /1921803/.test(lower)

  if (!filenameOk) return { valid: false, reason: 'Filename must start with "screenshot"' }
  if (!hasAmount) return { valid: false, reason: 'Amount 350 RWF not found' }
  if (!hasReceiver) return { valid: false, reason: 'Receiver Jireh Faith not found' }
  if (!hasCode) return { valid: false, reason: 'Code 1921803 not found' }

  return { valid: true, reason: 'Minimal receipt checks passed' }
}

const startCountdown = () => {
  countdownSeconds.value = 6
  progressPercent.value = 0
  activationSuccess.value = true
  
  countdownInterval = setInterval(() => {
    countdownSeconds.value--
    progressPercent.value = ((6 - countdownSeconds.value) / 6) * 100
    
    if (countdownSeconds.value <= 0) {
      clearInterval(countdownInterval)
      finishActivation()
    }
  }, 1000)
}

const playTone = (frequency, duration = 0.25, type = 'sine', volume = 0.08) => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return

  const toneContext = new AudioCtx()
  const oscillator = toneContext.createOscillator()
  const gain = toneContext.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, toneContext.currentTime)
  gain.gain.setValueAtTime(volume, toneContext.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, toneContext.currentTime + duration)
  oscillator.connect(gain).connect(toneContext.destination)
  oscillator.start()
  oscillator.stop(toneContext.currentTime + duration)
  oscillator.onended = () => toneContext.close().catch(() => {})
}

const startScanMusic = () => {
  if (scanMusicPlaying.value) return
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return

  audioContext = new AudioCtx()
  scanMusicOscillator = audioContext.createOscillator()
  scanMusicGain = audioContext.createGain()
  scanMusicOscillator.type = 'sine'
  scanMusicOscillator.frequency.setValueAtTime(180, audioContext.currentTime)
  scanMusicGain.gain.setValueAtTime(0.008, audioContext.currentTime)
  scanMusicOscillator.connect(scanMusicGain).connect(audioContext.destination)
  scanMusicOscillator.start()
  scanMusicOscillator.frequency.linearRampToValueAtTime(260, audioContext.currentTime + 3)
  scanMusicPlaying.value = true
}

const stopScanMusic = () => {
  if (!scanMusicPlaying.value || !audioContext) return
  if (scanMusicGain) {
    scanMusicGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2)
  }
  if (scanMusicOscillator) {
    scanMusicOscillator.stop(audioContext.currentTime + 0.25)
  }
  setTimeout(() => {
    if (audioContext) audioContext.close().catch(() => {})
    audioContext = null
    scanMusicOscillator = null
    scanMusicGain = null
    scanMusicPlaying.value = false
  }, 300)
}

const playSuccessTone = () => {
  playTone(440, 0.2, 'triangle', 0.08)
  setTimeout(() => playTone(660, 0.18, 'triangle', 0.06), 220)
}

const playFailureTone = () => {
  playTone(180, 0.2, 'sine', 0.08)
  setTimeout(() => playTone(140, 0.25, 'sine', 0.06), 220)
}

const openScanner = () => {
  showScanner.value = true
  resetScan()
}

const closeScanner = () => {
  showScanner.value = false
  stopScanMusic()
}

const handleTextInput = (e) => {
  const text = e.target.value || e.clipboardData?.getData('text') || ''
  if (!text || text.trim().length === 0) {
    uploadError.value = ''
    previewUrl.value = null
    return
  }
  
  uploadError.value = ''
  scanFilename.value = 'Receipt Text Input'
  previewUrl.value = 'text-input'
  startSimulation(text)
}

const addLog = (icon, text) => {
  scanLogs.value.push({ icon, text })
}

const addOutcome = (text, passed) => {
  scanOutcomes.value.push({ text, status: passed ? 'passed' : 'failed' })
}

const simulateExtractedText = (fileNameLower) => {
  // Return empty - validation will reject unless user provides exact receipt text
  return ''
}

const handleFileInput = async (e) => {
  const file = e.target.files && e.target.files[0]
  if (!file) return

  // Basic filename check and preview
  scanFilename.value = file.name || ''
  previewUrl.value = URL.createObjectURL(file)
  scanStatusText.value = 'Image uploaded. Running OCR...'
  scanSubText.value = 'This may take a few seconds.'
  uploadError.value = ''
  scanProgress.value = 0
  scanFailed.value = false
  scanSuccess.value = false

  startScanMusic()
  await runProgress(2)

  try {
    const { data } = await Tesseract.recognize(file, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text' && m.progress) {
          scanProgress.value = Math.round(m.progress * 100)
        }
      }
    })

    ocrText.value = data?.text || ''
    scanStatusText.value = 'OCR complete — analyzing text...'
    stopScanMusic()
    await new Promise(r => setTimeout(r, 400))
    runAutomaticReview()
  } catch (err) {
    stopScanMusic()
    scanFailed.value = true
    scanStatusText.value = 'OCR failed — please try a clearer screenshot.'
    scanSubText.value = String(err?.message || err)
    uploadError.value = 'OCR failed. Try a different screenshot or ensure image is clear.'
  }
}

const runProgress = async (durationSeconds) => {
  const steps = 6
  const stepTime = Math.round((durationSeconds * 1000) / steps)

  for (let i = 1; i <= steps; i++) {
    await new Promise(r => setTimeout(r, stepTime))
    scanProgress.value = Math.round((i / steps) * 100)
  }
}

const startSimulation = async (text) => {
  scanFailed.value = false
  scanSuccess.value = false
  scanProgress.value = 0
  scanDuration.value = 0
  scanLogs.value = []
  scanOutcomes.value = []
  scanCategories.value = []
  scanStatusColor.value = ''
  scanStatusText.value = 'Receipt text received. Verifying...'
  scanSubText.value = 'Checking format against criteria...'

  startScanMusic()
  addLog('📝', 'Receipt text received; validating format.')
  await runProgress(2)
  scanProgress.value = 100
  ocrText.value = text
  scanStatusText.value = 'Validating receipt format...'
  scanSubText.value = 'Please wait...'
  stopScanMusic()
  
  // Auto-scan after input
  await new Promise(r => setTimeout(r, 500))
  runAutomaticReview()
}

const runAutomaticReview = async () => {
  const receiptText = ocrText.value || ''
  const isFileUpload = previewUrl.value && previewUrl.value !== 'text-input'

  if (isFileUpload) {
    const validation = validateMinimal(receiptText, scanFilename.value)
    scanCategories.value = [
      {
        title: 'Minimal Receipt Checks',
        checks: [
          { text: 'Filename starts with "screenshot"', passed: /^screenshot/i.test(scanFilename.value) },
          { text: 'Contains exact amount: 350 RWF', passed: /\b350\s*rwf\b/i.test(receiptText) },
          { text: 'Contains receiver: Jireh Faith', passed: /\bjireh\s+faith\b/i.test(receiptText) },
          { text: 'Contains code: 1921803', passed: /1921803/.test(receiptText) }
        ]
      }
    ]

    if (validation.valid) {
      scanStatusText.value = 'Receipt accepted ✅'
      scanStatusColor.value = 'text-green'
      scanSubText.value = 'Minimal verification passed. Starting activation...'
      scanSuccess.value = true
      scanFailed.value = false
      stopScanMusic()
      playSuccessTone()
      await new Promise(r => setTimeout(r, 800))
      closeScanner()
      startCountdown()
    } else {
      scanStatusText.value = 'Receipt rejected ❌'
      scanStatusColor.value = 'text-red'
      scanSubText.value = `Validation error: ${validation.reason}`
      scanSuccess.value = false
      scanFailed.value = true
      fraudWarningMessage.value = `Receipt rejected: ${validation.reason}`
      fraudWarningVisible.value = true
      stopScanMusic()
      playFailureTone()
      try { await authStore.recordFraudWarning(authStore.currentUser?.id, fraudWarningMessage.value) } catch(e) {}
    }
  } else {
    // Preserve original strict flow for pasted text
    const validation = validateReceiptFormat(receiptText)
    scanCategories.value = [
      {
        title: 'Receipt Format Validation',
        checks: [
          { text: 'Starts with TxId', passed: /^txid[:\s]*[0-9*a-z]+/i.test(receiptText) },
          { text: 'Contains payment details 350 RWF to Jireh Faith 1921803', passed: /your\s+payment\s+of\s+350\s+rwf\s+to\s+jireh\s+faith\s+1921803/i.test(receiptText) },
          { text: 'Contains completed at date/time', passed: /was\s+completed\s+at\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/.test(receiptText) },
          { text: 'Contains Balance and Fee', passed: /balance[:\s]*([0-9,]+)\s+rwf/i.test(receiptText) && /fee\s+([0-9]+)\s+rwf/i.test(receiptText) },
          { text: 'Ends with *EN#', passed: /\*en#$/.test(receiptText) }
        ]
      }
    ]

    if (validation.valid) {
      scanStatusText.value = 'Receipt accepted ✅'
      scanStatusColor.value = 'text-green'
      scanSubText.value = 'Format verified successfully. Starting activation...'
      scanSuccess.value = true
      scanFailed.value = false
      stopScanMusic()
      playSuccessTone()
      await new Promise(r => setTimeout(r, 1000))
      closeScanner()
      startCountdown()
    } else {
      scanStatusText.value = 'Receipt rejected ❌'
      scanStatusColor.value = 'text-red'
      scanSubText.value = `Format error: ${validation.reason}. Please ensure the format matches exactly.`
      scanSuccess.value = false
      scanFailed.value = true
      fraudWarningMessage.value = `Receipt rejected: ${validation.reason}`
      fraudWarningVisible.value = true
      stopScanMusic()
      playFailureTone()
      try { await authStore.recordFraudWarning(authStore.currentUser?.id, fraudWarningMessage.value) } catch(e) {}
    }
  }
}

const resetScan = () => {
  scanFailed.value = false
  scanSuccess.value = false
  scanProgress.value = 0
  scanDuration.value = 0
  scanStatusText.value = 'Receipt Scanner Initializing...'
  scanSubText.value = 'Waiting for receipt details...'
  scanStatusColor.value = ''
  previewUrl.value = null
  scanLogs.value = []
  scanOutcomes.value = []
  scanCategories.value = []
}

const stayOnAccount = () => {
  fraudWarningVisible.value = false
  router.push('/activate')
}

const logoutAfterWarning = () => {
  fraudWarningVisible.value = false
  authStore.logout()
  router.push('/login')
}

const finishActivation = async () => {
  await authStore.completeRegistrationRecord(authStore.currentUser.id)
  localStorage.setItem('isActivated', 'true')
  router.push('/dashboard')
}

const skipActivation = () => {
  alert('Activation is required before you can continue. Please complete verification first.')
}

onMounted(() => {
  startTimer()
  // Slowly increment active members count for social proof
  setInterval(() => {
    activeMembersCount.value += Math.floor(Math.random() * 3)
  }, 8000)
})
onUnmounted(() => { clearInterval(timerInterval) })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; }

.outcome-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.55rem;
}

.ocr-image-wrap { width: 100%; display:flex; justify-content:center; }
.ocr-image-preview { max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); box-shadow: 0 8px 30px rgba(0,0,0,0.6); margin-bottom: 0.75rem; }

.outcome-item {
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  color: #e5e7eb;
  font-size: 0.95rem;
}

.outcome-item.passed {
  border-left: 4px solid #10b981;
}

.outcome-item.failed {
  border-left: 4px solid #ef4444;
}

.scan-summary {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.95rem;
}

.activation-page {
  min-height: 100vh;
  background: #050510;
  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow-x: hidden;
  padding: 2rem 1rem 4rem;
  color: white;
}

/* ── BG Glows ── */
.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}
.glow-1 { width: 600px; height: 600px; background: radial-gradient(circle, #7c3aed33, transparent); top: -200px; left: -200px; }
.glow-2 { width: 500px; height: 500px; background: radial-gradient(circle, #f59e0b22, transparent); top: 40%; right: -150px; }
.glow-3 { width: 400px; height: 400px; background: radial-gradient(circle, #10b98122, transparent); bottom: 0; left: 20%; }

/* ── Money rain ── */
.money-rain { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.money-drop {
  position: absolute;
  top: -60px;
  animation: rain linear infinite;
  opacity: 0.12;
}
@keyframes rain {
  from { top: -60px; }
  to   { top: 110vh; }
}

/* ── Inner ── */
.page-inner {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Top badge ── */
.top-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.2);
  color: #fca5a5;
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 600;
  animation: pulse-badge 2s ease-in-out infinite;
  backdrop-filter: blur(10px);
}
.pulse-dot {
  width: 8px; height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: blink 1s ease-in-out infinite;
}
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
@keyframes pulse-badge {
  0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.3); }
  50%      { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
}

/* ── Hero ── */
.hero-section { text-align: center; }
.crown-icon { font-size: 3.5rem; margin-bottom: 1rem; animation: bounce 2s ease-in-out infinite; }
@keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
.hero-headline {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.highlight-gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #fcd34d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-sub {
  color: rgba(255,255,255,0.6);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
}
.hero-sub strong { color: #fbbf24; }

/* ── Countdown ── */
.countdown-wrap { text-align: center; }
.countdown-label { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-bottom: 0.75rem; }
.countdown-boxes { display: flex; align-items: center; gap: 0.75rem; justify-content: center; }
.cbox {
  background: linear-gradient(135deg, #1a0533, #0d1b4b);
  border: 1px solid rgba(167,139,250,0.3);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  text-align: center;
  min-width: 80px;
}
.cnum { display: block; font-size: 2.5rem; font-weight: 900; color: #fbbf24; line-height: 1; }
.clabel { font-size: 0.72rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; }
.csep { font-size: 2rem; font-weight: 900; color: #fbbf24; margin-bottom: 0.5rem; }

/* ── Benefits Grid ── */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
}
.benefit-card {
  border-radius: 20px;
  padding: 1.5rem 1rem;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.1);
  transition: transform 0.3s;
}
.benefit-card:hover { transform: translateY(-6px); }
.gold-card   { background: linear-gradient(135deg, #1a1200, #2d1f00); border-color: rgba(251,191,36,0.3); }
.purple-card { background: linear-gradient(135deg, #1a0533, #0f072b); border-color: rgba(167,139,250,0.3); }
.blue-card   { background: linear-gradient(135deg, #001a3b, #00123a); border-color: rgba(56,189,248,0.3); }
.green-card  { background: linear-gradient(135deg, #001a0f, #00130b); border-color: rgba(52,211,153,0.3); }

.benefit-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.benefit-amount { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.25rem; }
.gold-card   .benefit-amount { color: #fbbf24; }
.purple-card .benefit-amount { color: #a78bfa; }
.blue-card   .benefit-amount { color: #38bdf8; }
.green-card  .benefit-amount { color: #34d399; }
.benefit-label { font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.8); margin-bottom: 0.4rem; }
.benefit-note { font-size: 0.75rem; color: rgba(255,255,255,0.4); line-height: 1.5; }

/* ── Testimonials ── */
.testimonials-section { width: 100%; }
.section-title { text-align: center; font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; }
.testimonials-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.testimonial-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1.25rem;
  display: flex;
  gap: 0.75rem;
  transition: border-color 0.3s;
}
.testimonial-card:hover { border-color: rgba(251,191,36,0.3); }
.t-avatar { font-size: 2.5rem; flex-shrink: 0; }
.t-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.15rem; }
.t-badge { background: rgba(52,211,153,0.15); color: #34d399; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.3rem; }
.t-location { color: rgba(255,255,255,0.35); font-size: 0.75rem; margin-bottom: 0.5rem; }
.t-text { color: rgba(255,255,255,0.65); font-size: 0.82rem; line-height: 1.5; margin-bottom: 0.5rem; font-style: italic; }
.t-earned { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
.t-earned strong { color: #fbbf24; }

/* ── Activation Card ── */
.activation-card {
  width: 100%;
  max-width: 620px;
  background: linear-gradient(145deg, #0f0a2e, #1a0533, #0a1628);
  border: 1px solid rgba(251,191,36,0.3);
  border-radius: 28px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 60px rgba(251,191,36,0.1), 0 30px 80px rgba(0,0,0,0.6);
}
.activation-glow {
  position: absolute;
  top: -100px; left: 50%;
  transform: translateX(-50%);
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(251,191,36,0.12), transparent 70%);
  pointer-events: none;
}
.activation-header { text-align: center; margin-bottom: 2rem; }
.lock-icon { font-size: 3rem; margin-bottom: 0.75rem; }
.activation-header h2 { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; }
.activation-header p { color: rgba(255,255,255,0.5); font-size: 0.9rem; }

/* Price comparison */
.price-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}
.old-price { text-align: center; }
.old-label { display: block; font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-bottom: 0.3rem; }
.old-amount { font-size: 1.3rem; color: rgba(255,255,255,0.4); }
.arrow-right { font-size: 1.5rem; color: #fbbf24; }
.new-price { text-align: center; }
.discount-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
.new-amount {
  display: block;
  font-size: 3rem;
  font-weight: 900;
  color: #fbbf24;
  line-height: 1;
}
.new-amount small { font-size: 1.1rem; color: rgba(255,255,255,0.5); }
.new-note { display: block; font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.3rem; }

/* What you get */
.what-you-get {
  background: rgba(52,211,153,0.05);
  border: 1px solid rgba(52,211,153,0.15);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
}
.what-you-get h4 { font-size: 0.95rem; font-weight: 700; color: #34d399; margin-bottom: 0.75rem; }
.what-you-get ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.what-you-get li { font-size: 0.88rem; color: rgba(255,255,255,0.75); line-height: 1.5; }

/* Payment Instructions */
.payment-instructions {
  background: rgba(255,255,255,0.03);
  border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
}
.payment-instructions h4 {
  color: #fbbf24;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}
.payment-instructions ol {
  padding-left: 1.2rem;
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
  line-height: 1.6;
}
.payment-instructions strong {
  color: #fff;
  background: rgba(255,255,255,0.1);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

/* Upload Section */
.upload-section {
  text-align: center;
  margin-bottom: 1.5rem;
}
.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: min(100%, 340px);
  padding: 1rem 1.3rem;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 45%, #10b981 100%);
  border-radius: 999px;
  color: #050816;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  margin-bottom: 0.6rem;
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 16px 35px rgba(16, 185, 129, 0.18);
}
.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(16, 185, 129, 0.25);
  opacity: 0.98;
}
.upload-hint {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
}
.upload-box {
  margin-top: 0.25rem;
}
.upload-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.14);
  background: linear-gradient(135deg, rgba(124,58,237,0.16), rgba(16,185,129,0.12));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.upload-card:hover {
  transform: translateY(-2px);
  border-color: rgba(52,211,153,0.5);
  box-shadow: 0 14px 30px rgba(16,185,129,0.18);
}
.upload-card-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c3aed, #10b981);
  color: white;
  font-size: 1.45rem;
}
.upload-card-content {
  text-align: center;
}
.upload-card-title {
  font-size: 1rem;
  font-weight: 800;
  color: #f8fafc;
}
.upload-card-subtitle {
  margin-top: 0.2rem;
  font-size: 0.84rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.45;
}
.upload-card-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.95rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.1);
  color: #f8fafc;
  font-size: 0.9rem;
  font-weight: 700;
}
.file-input-hidden {
  display: none;
}

/* ── SCANNER SIDEBAR ── */
.scanner-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 99;
}
.scanner-sidebar {
  position: fixed;
  top: 0; right: -400px; bottom: 0;
  width: 100%;
  max-width: 400px;
  background: #0a0a16;
  border-left: 1px solid rgba(124,58,237,0.3);
  z-index: 100;
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 50px rgba(0,0,0,0.5);
}
.scanner-sidebar.is-open {
  right: 0;
}
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  background: rgba(124,58,237,0.1);
}
.sidebar-header h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
}
.close-btn {
  background: none; border: none;
  color: #fff; font-size: 1.2rem;
  cursor: pointer; opacity: 0.6;
}
.close-btn:hover { opacity: 1; }

.sidebar-content {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.payment-instructions strong.code-highlight,
.scanner-steps strong.code-highlight {
  color: #fbbf24;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 2px dashed rgba(124,58,237,0.5);
  border-radius: 16px;
  background: rgba(124,58,237,0.05);
  cursor: pointer;
  transition: all 0.2s;
}
.file-label:hover {
  background: rgba(124,58,237,0.1);
  border-color: #7c3aed;
}
.upload-icon { font-size: 3rem; margin-bottom: 1rem; }
.file-label p { color: #a78bfa; font-weight: 600; }

.text-input-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
.input-icon { font-size: 2.5rem; }
.text-input-label p { color: #a78bfa; font-weight: 600; margin: 0; }
.receipt-text-input {
  width: 100%;
  height: 180px;
  padding: 1rem;
  background: rgba(0,0,0,0.3);
  border: 2px solid #7c3aed;
  border-radius: 12px;
  color: #a7f3d0;
  font-family: monospace;
  font-size: 0.9rem;
  resize: vertical;
  outline: none;
}
.receipt-text-input:focus {
  border-color: #34d399;
  box-shadow: 0 0 15px rgba(52,211,153,0.3);
}
.receipt-text-input::placeholder {
  color: rgba(167,243,208,0.5);
}

.text-display {
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  background: rgba(0,0,0,0.3);
  border: 2px solid #34d399;
  border-radius: 12px;
  text-align: left;
  max-height: 250px;
  overflow-y: auto;
}

/* AI Scanner Active */
.ai-scanner-active {
  text-align: center;
}
.scanner-ui {
  position: relative;
  width: 100%;
  min-height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 12px;
  overflow: auto;
  border: 2px solid #34d399;
  background: #000;
  padding: 1rem;
}
.scan-preview {
  width: 100%;
  object-fit: cover;
  opacity: 0.7;
}
.scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: #34d399;
  box-shadow: 0 0 15px #34d399;
  animation: scan-vertical 2s linear infinite alternate;
}
@keyframes scan-vertical {
  from { top: 0; }
  to { top: 100%; }
}
.scan-status {
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.25rem;
}
.scan-status.text-green { color: #34d399; }
.scan-status.text-red { color: #f87171; }
.scan-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.2rem;
}
.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #34d399);
  transition: width 0.2s linear;
}

/* OCR Logs */
.ocr-logs {
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ocr-preview {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 1rem;
  text-align: left;
  margin-bottom: 1rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}
.ocr-preview h4 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  color: #f8fafc;
}
.ocr-preview pre {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #d1d5db;
  white-space: pre-wrap;
  word-break: break-word;
}
.receipt-review-note {
  background: rgba(124,58,237,0.08);
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  margin-bottom: 1rem;
  text-align: left;
}
.receipt-review-note p {
  margin: 0 0 0.55rem;
  color: #f1f5f9;
  font-size: 0.9rem;
}
.receipt-review-note ul {
  margin: 0;
  padding-left: 1.1rem;
  color: #cbd5e1;
  font-size: 0.85rem;
  line-height: 1.6;
}
.log-item {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  animation: fadeIn 0.3s ease;
}
.log-icon { flex-shrink: 0; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.btn-retry, .btn-success, .btn-approve, .btn-deny {
  padding: 0.95rem 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 48%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.action-row {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1.2rem;
}
.btn-retry, .btn-deny {
  background: rgba(239,68,68,0.16);
  color: #fca5a5;
  border: 1px solid rgba(239,68,68,0.35);
}
.btn-approve {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  box-shadow: 0 10px 25px rgba(34,197,94,0.2);
}
.btn-success {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #000;
}
.btn-approve:hover, .btn-deny:hover, .btn-retry:hover, .btn-success:hover {
  transform: translateY(-1px);
}
.error-box {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #fca5a5;
  padding: 0.75rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-size: 0.9rem;
}



/* Guarantee */
.guarantee-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.4);
}

/* Skip */
.skip-area { text-align: center; }
.skip-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.25);
  font-size: 0.82rem;
  cursor: pointer;
  text-decoration: underline;
  font-family: 'Outfit', sans-serif;
  transition: color 0.2s;
}
.skip-btn:hover { color: rgba(255,255,255,0.5); }

/* ── Responsive ── */
@media (max-width: 860px) {
  .benefits-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-row { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .benefits-grid { grid-template-columns: 1fr; }
  .activation-card { padding: 1.5rem 1rem; }
  .hero-headline { font-size: 1.7rem; }
  .countdown-boxes { gap: 0.4rem; }
  .cbox { min-width: 60px; padding: 0.75rem 1rem; }
  .cnum { font-size: 1.8rem; }
  .price-comparison { flex-direction: column; gap: 0.75rem; }
}
.fraud-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 1rem;
}

.fraud-modal {
  max-width: 520px;
  width: 100%;
  background: #150a0d;
  border: 1px solid #8b0000;
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 0 60px rgba(255, 0, 0, 0.22);
  text-align: center;
}

.fraud-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.fraud-icon {
  font-size: 2.5rem;
}

.fraud-modal h2 {
  font-size: 1.5rem;
  color: #fff;
}

.fraud-text {
  margin: 1rem 0;
  color: #f8d7da;
  font-size: 1rem;
  line-height: 1.65;
  font-weight: 600;
}

.fraud-note {
  color: #f1c0c0;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.fraud-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.fraud-actions .btn {
  min-width: 150px;
}

.fraud-actions .btn-danger {
  background: #e11d48;
  border-color: #e11d48;
  color: white;
}

.fraud-actions .btn-outline {
  background: transparent;
  border-color: #f8d7da;
  color: #f8d7da;
}

/* ── Success Modal ── */
.success-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  padding: 1rem;
}

.success-modal {
  max-width: 520px;
  width: 100%;
  background: #0a1f12;
  border: 2px solid #10b981;
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: 0 0 80px rgba(16, 185, 129, 0.35);
  text-align: center;
  animation: successFlash 0.6s ease-out;
}

@keyframes successFlash {
  0% {
    transform: scale(0.8);
    opacity: 0;
    box-shadow: 0 0 0px rgba(16, 185, 129, 0);
  }
  50% {
    box-shadow: 0 0 100px rgba(16, 185, 129, 0.8);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 80px rgba(16, 185, 129, 0.35);
  }
}

@keyframes intenseFlash {
  0%, 100% {
    background: #0a1f12;
    box-shadow: 0 0 80px rgba(16, 185, 129, 0.35);
  }
  50% {
    background: rgba(16, 185, 129, 0.2);
    box-shadow: 0 0 120px rgba(16, 185, 129, 0.8);
  }
}

.success-modal.flashing {
  animation: intenseFlash 0.4s ease-in-out 3;
}

.success-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.success-icon {
  font-size: 3.5rem;
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-modal h2 {
  font-size: 1.8rem;
  color: #10b981;
  font-weight: 700;
}

.success-text {
  margin: 1rem 0;
  color: #a7f3d0;
  font-size: 1.1rem;
  line-height: 1.65;
  font-weight: 600;
}

.progress-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(16, 185, 129, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.wait-message {
  color: #6ee7b7;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.progress-bar-container {
  width: 100%;
  height: 12px;
  background: rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 10px;
  transition: width 0.3s ease-out;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

.redirecting-text {
  color: #a7f3d0;
  font-size: 0.95rem;
  margin-top: 1rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

</style>
