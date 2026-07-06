import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import { supabase } from './lib/supabase'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Capture referral code from URL and persist for registration
try {
  const urlParams = new URLSearchParams(window.location.search)
  const ref = urlParams.get('ref') || urlParams.get('referral') || urlParams.get('r')
  if (ref) {
    localStorage.setItem('pendingReferral', ref.toUpperCase())
  }
} catch (e) {
  console.warn('Referral capture error', e)
}

router.afterEach(async (to) => {
  try {
    const pageView = {
      page: to.path,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      session_id: sessionStorage.getItem('session_id') || Math.random().toString(36).substring(7)
    }
    sessionStorage.setItem('session_id', pageView.session_id)
    await supabase.from('page_views').insert(pageView)
  } catch (e) {
    console.log('Analytics tracking error:', e)
  }
})

app.mount('#app')