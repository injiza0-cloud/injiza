<template>
  <div class="verify-page">
    <div class="bg-glow g1"></div>
    <div class="bg-glow g2"></div>

    <div class="verify-card">
      <!-- Header -->
      <div class="verify-header">
        <div class="verify-icon-wrap">
          <span class="verify-icon">📱</span>
          <div class="icon-ring"></div>
        </div>
        <h1>Verify Your Phone Number</h1>
        <p>We'll send your payment confirmation and earnings to this number</p>
      </div>

      <!-- Steps indicator -->
      <div class="steps-bar">
        <div class="step done">
          <div class="step-circle">✓</div>
          <span>Sign Up</span>
        </div>
        <div class="step-line done"></div>
        <div class="step active">
          <div class="step-circle">2</div>
          <span>Verify</span>
        </div>
        <div class="step-line"></div>
        <div class="step">
          <div class="step-circle">3</div>
          <span>Activate</span>
        </div>
        <div class="step-line"></div>
        <div class="step">
          <div class="step-circle">4</div>
          <span>Earn 💰</span>
        </div>
      </div>

      <!-- Phone Input -->
      <div class="phone-section" v-if="!codeSent">
        <div class="input-label-row">
          <label>Your MTN / Airtel Phone Number</label>
          <span class="required-tag">Required</span>
        </div>
        <div class="phone-input-box">
          <div class="country-code">
            <span class="flag">🇷🇼</span>
            <span>+250</span>
          </div>
          <input
            id="verify-phone"
            type="tel"
            v-model="phoneNumber"
            placeholder="7XX XXX XXX"
            maxlength="9"
            @input="onPhoneInput"
            autofocus
          />
        </div>
        <p class="phone-hint">
          💡 Use your MTN MoMo or Airtel Money number for instant withdrawals
        </p>

        <div class="error-box" v-if="phoneError">⚠️ {{ phoneError }}</div>

        <button
          class="send-code-btn"
          :disabled="!isValidPhone || sending"
          @click="sendCode"
          id="send-code-btn"
        >
          <span v-if="sending" class="spin"></span>
          <span v-else>📤 Send Verification Code</span>
        </button>
      </div>

      <!-- OTP Input -->
      <div class="otp-section" v-else>
        <div class="otp-sent-info">
          <span class="sent-icon">✅</span>
          <p>Code sent to <strong>+250 {{ phoneNumber }}</strong></p>
          <button class="change-phone-btn" @click="codeSent = false" id="change-phone">Change number</button>
        </div>

        <label class="otp-label">Enter 6-Digit Verification Code</label>
        <div class="otp-inputs">
          <input
            v-for="(_, i) in 6"
            :key="i"
            :id="`otp-${i}`"
            type="text"
            maxlength="1"
            class="otp-box"
            :class="{ filled: otpDigits[i] }"
            v-model="otpDigits[i]"
            @input="onOtpInput(i, $event)"
            @keydown="onOtpKeydown(i, $event)"
          />
        </div>

        <p class="resend-row">
          Didn't receive it?
          <button class="resend-btn" :disabled="resendCooldown > 0" @click="resendCode" id="resend-code-btn">
            {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
          </button>
        </p>

        <div class="error-box" v-if="otpError">⚠️ {{ otpError }}</div>
        <div class="success-box" v-if="otpSuccess">🎉 {{ otpSuccess }}</div>

        <button
          class="verify-btn"
          :disabled="!isOtpComplete || verifying"
          @click="verifyCode"
          id="verify-btn"
        >
          <span v-if="verifying" class="spin"></span>
          <span v-else>🔐 Verify & Continue</span>
        </button>
      </div>

      <!-- Info boxes -->
      <div class="info-boxes">
        <div class="info-box">
          <span class="info-icon">💵</span>
          <div>
            <strong>MTN MoMo Ready</strong>
            <span>Withdraw directly to your phone</span>
          </div>
        </div>
        <div class="info-box">
          <span class="info-icon">🔒</span>
          <div>
            <strong>100% Private</strong>
            <span>Your number is never shared</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const phoneNumber = ref('')
const codeSent = ref(false)
const sending = ref(false)
const phoneError = ref('')

const otpDigits = ref(['', '', '', '', '', ''])
const verifying = ref(false)
const otpError = ref('')
const otpSuccess = ref('')
const resendCooldown = ref(0)
let cooldownTimer = null

const isValidPhone = computed(() => /^[0-9]{9}$/.test(phoneNumber.value.replace(/\s/g, '')))
const isOtpComplete = computed(() => otpDigits.value.every(d => d.trim().length === 1))

const onPhoneInput = () => {
  phoneError.value = ''
  phoneNumber.value = phoneNumber.value.replace(/[^0-9\s]/g, '')
}

const startResendCooldown = () => {
  resendCooldown.value = 60
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(cooldownTimer)
  }, 1000)
}

const sendCode = async () => {
  if (!isValidPhone.value) { phoneError.value = 'Please enter a valid 9-digit phone number'; return }
  sending.value = true
  // Simulate API call
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  codeSent.value = true
  
  // Show mock SMS for testing
  alert(`📲 MOCK SMS: Your INJIZA verification code is 123456. (Note: Real SMS requires a gateway like Twilio or Africa's Talking)`)
  
  startResendCooldown()
  // Focus first OTP box
  setTimeout(() => { document.getElementById('otp-0')?.focus() }, 100)
}

const resendCode = async () => {
  if (resendCooldown.value > 0) return
  otpDigits.value = ['', '', '', '', '', '']
  await sendCode()
  startResendCooldown()
}

const onOtpInput = (index, event) => {
  const val = event.target.value.replace(/[^0-9]/g, '')
  otpDigits.value[index] = val
  otpError.value = ''
  if (val && index < 5) {
    setTimeout(() => document.getElementById(`otp-${index + 1}`)?.focus(), 0)
  }
}

const onOtpKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    document.getElementById(`otp-${index - 1}`)?.focus()
  }
}

const verifyCode = async () => {
  const code = otpDigits.value.join('')
  if (code.length < 6) { otpError.value = 'Please enter all 6 digits'; return }

  verifying.value = true
  await new Promise(r => setTimeout(r, 1500))
  verifying.value = false

  // For demo: any code works
  otpSuccess.value = '✅ Phone verified! Redirecting to activation...'
  localStorage.setItem('phoneVerified', 'true')
  localStorage.setItem('verifiedPhone', '+250' + phoneNumber.value)
  setTimeout(() => { router.push('/activate') }, 1500)
}

onUnmounted(() => { if (cooldownTimer) clearInterval(cooldownTimer) })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; }

.verify-page {
  min-height: 100vh;
  background: #060612;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
  color: white;
}

.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}
.g1 { width: 500px; height: 500px; background: radial-gradient(circle, #7c3aed33, transparent); top: -150px; left: -100px; }
.g2 { width: 400px; height: 400px; background: radial-gradient(circle, #06b6d422, transparent); bottom: -100px; right: -100px; }

.verify-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 520px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 28px;
  padding: 2.5rem 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
}

/* Header */
.verify-header { text-align: center; margin-bottom: 2rem; }
.verify-icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.verify-icon { font-size: 3.5rem; position: relative; z-index: 1; }
.icon-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid rgba(124,58,237,0.4);
  animation: spin-ring 4s linear infinite;
}
@keyframes spin-ring { to { transform: rotate(360deg); } }

.verify-header h1 { font-size: 1.7rem; font-weight: 800; margin-bottom: 0.5rem; }
.verify-header p { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.6; }

/* Steps */
.steps-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 2rem;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.step { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; flex-shrink: 0; }
.step-circle {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255,255,255,0.3);
  transition: all 0.3s;
}
.step.done .step-circle {
  background: #34d399;
  border-color: #34d399;
  color: #000;
}
.step.active .step-circle {
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  border-color: transparent;
  color: white;
  box-shadow: 0 0 16px rgba(124,58,237,0.5);
}
.step span { font-size: 0.72rem; color: rgba(255,255,255,0.4); }
.step.done span, .step.active span { color: rgba(255,255,255,0.8); }
.step-line {
  width: 36px; height: 2px;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
  margin-bottom: 1rem;
}
.step-line.done { background: #34d399; }

/* Phone section */
.phone-section { margin-bottom: 1.5rem; }
.input-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}
.input-label-row label { font-size: 0.88rem; font-weight: 600; }
.required-tag {
  font-size: 0.7rem;
  background: rgba(239,68,68,0.15);
  color: #f87171;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.phone-input-box {
  display: flex;
  align-items: stretch;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s;
  margin-bottom: 0.75rem;
}
.phone-input-box:focus-within {
  border-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124,58,237,0.12);
}
.country-code {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.9rem 1rem;
  background: rgba(255,255,255,0.05);
  border-right: 1px solid rgba(255,255,255,0.08);
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
}
.flag { font-size: 1.2rem; }
.phone-input-box input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.9rem 1rem;
  color: white;
  font-size: 1.1rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
}
.phone-input-box input::placeholder { color: rgba(255,255,255,0.25); font-weight: 400; letter-spacing: normal; }

.phone-hint { font-size: 0.78rem; color: rgba(255,255,255,0.35); line-height: 1.5; margin-bottom: 1rem; }

/* Send code button */
.send-code-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Outfit', sans-serif;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.send-code-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(124,58,237,0.45); }
.send-code-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* OTP Section */
.otp-section { margin-bottom: 1.5rem; }
.otp-sent-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(52,211,153,0.08);
  border: 1px solid rgba(52,211,153,0.2);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.sent-icon { font-size: 1.2rem; }
.otp-sent-info p { font-size: 0.88rem; color: rgba(255,255,255,0.7); flex: 1; margin: 0; }
.otp-sent-info strong { color: white; }
.change-phone-btn {
  background: none; border: none;
  color: #a78bfa; font-size: 0.8rem;
  cursor: pointer; text-decoration: underline;
  font-family: 'Outfit', sans-serif;
}

.otp-label { display: block; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.75rem; color: rgba(255,255,255,0.7); }

.otp-inputs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}
.otp-box {
  width: 50px; height: 58px;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  outline: none;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
  caret-color: #7c3aed;
}
.otp-box:focus { border-color: #7c3aed; box-shadow: 0 0 0 4px rgba(124,58,237,0.15); background: rgba(124,58,237,0.08); }
.otp-box.filled { border-color: rgba(52,211,153,0.5); }

.resend-row { text-align: center; font-size: 0.82rem; color: rgba(255,255,255,0.35); margin-bottom: 1rem; }
.resend-btn {
  background: none; border: none;
  color: #a78bfa; cursor: pointer;
  font-size: 0.82rem; font-family: 'Outfit', sans-serif;
  text-decoration: underline;
}
.resend-btn:disabled { color: rgba(255,255,255,0.25); text-decoration: none; cursor: not-allowed; }

/* Verify button */
.verify-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 14px;
  color: #000;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Outfit', sans-serif;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verify-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(251,191,36,0.45); }
.verify-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Error / Success */
.error-box {
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);
  color: #f87171; border-radius: 10px; padding: 0.75rem 1rem;
  font-size: 0.85rem; margin-bottom: 1rem;
}
.success-box {
  background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3);
  color: #34d399; border-radius: 10px; padding: 0.75rem 1rem;
  font-size: 0.85rem; text-align: center; margin-bottom: 1rem;
}

/* Info boxes */
.info-boxes { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.5rem; }
.info-box {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 0.75rem;
}
.info-icon { font-size: 1.4rem; }
.info-box strong { display: block; font-size: 0.82rem; color: rgba(255,255,255,0.85); }
.info-box span { font-size: 0.72rem; color: rgba(255,255,255,0.35); }

/* Spinner */
.spin {
  width: 20px; height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin-anim 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin-anim { to { transform: rotate(360deg); } }

@media (max-width: 480px) {
  .verify-card { padding: 1.5rem 1rem; }
  .otp-box { width: 42px; height: 52px; font-size: 1.3rem; }
  .otp-inputs { gap: 0.3rem; }
  .info-boxes { grid-template-columns: 1fr; }
}
</style>
