<template>
  <div class="static-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ t('contact') }}</h1>
      </div>
      
      <div class="content-card glass">
        <p class="intro-text">
          {{ locale === 'rw' 
            ? 'Mubashije gutubera! Hamagara, email cyangwa fak ifayili munsi.' 
            : 'We are here to help! Call, email or fill out the form below.' }}
        </p>
        
        <div class="contact-methods">
          <div class="contact-method">
            <img src="/phone-call.png" alt="Call" class="method-icon">
            <h3>{{ locale === 'rw' ? 'Hamagara' : 'Call' }}</h3>
            <p>+250 732 297 560</p>
          </div>
          <div class="contact-method">
            <img src="/gmail.png" alt="Email" class="method-icon">
            <h3>Email</h3>
            <p>injiza0@gmail.com</p>
          </div>
          <div class="contact-method">
            <img src="/whatsapp.png" alt="WhatsApp" class="method-icon">
            <h3>WhatsApp</h3>
            <p>+250 732 297 560</p>
          </div>
        </div>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label>{{ t('username') }}</label>
            <input type="text" v-model="form.name" class="input-field" required>
          </div>
          <div class="form-group">
            <label>{{ t('email') }}</label>
            <input type="email" v-model="form.email" class="input-field" required>
          </div>
          <div class="form-group">
            <label>{{ locale === 'rw' ? 'Ubutumwa' : 'Message' }}</label>
            <textarea v-model="form.message" class="input-field" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">{{ t('submit') }}</button>
        </form>

        <div class="social-links">
          <h3>{{ t('followUs') }}</h3>
          <div class="social-icons">
            <a href="https://wa.me/250732297560" target="_blank" class="social-icon">
              <img src="/whatsapp.png" alt="WhatsApp" class="social-img">
            </a>
            <a href="https://tiktok.com/@www.rwaflix.store/" target="_blank" class="social-icon">
              <img src="/tik-tok.png" alt="TikTok" class="social-img">
            </a>
            <a href="tel:+250732297560" class="social-icon">
              <img src="/phone-call.png" alt="Call" class="social-img">
            </a>
            <a href="mailto:injiza0@gmail.com" class="social-icon">
              <img src="/gmail.png" alt="Email" class="social-img">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18nStore } from '../stores/i18n'

const i18nStore = useI18nStore()

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  alert(locale.value === 'rw' ? 'Ubutumwa bwoherejwe!' : 'Message sent!')
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.static-page {
  padding: 3rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
}

.content-card {
  padding: 2rem;
  border-radius: 20px;
}

.intro-text {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-method {
  background: var(--bg-dark);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.method-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.contact-method h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.contact-method p {
  color: var(--text-secondary);
}

.contact-form {
  max-width: 500px;
  margin: 0 auto 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.contact-form .btn {
  width: 100%;
}

.social-links {
  text-align: center;
}

.social-links h3 {
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  width: 50px;
  height: 50px;
  background: var(--bg-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s;
}

.social-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.social-icon:hover {
  background: var(--primary);
  transform: translateY(-3px);
}

@media (max-width: 640px) {
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style>