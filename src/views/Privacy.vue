<template>
  <div class="static-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ t('privacy') }}</h1>
      </div>
      
      <div class="content-card glass">
        <section>
          <h2>1. {{ locale === 'rw' ? 'Ibyo tw集' : 'What we collect' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Tw集 amakuru yawe: izina, email, номер телефона, na données zikoreshwa mu budirishwa. Ntabwo tw集 amakuru ya BANKING.' 
              : 'We collect: name, email, phone number, and usage data. We do NOT collect banking information.' }}
          </p>
        </section>

        <section>
          <h2>2. {{ locale === 'rw' ? 'Iburyo twakoresha' : 'How we use' }}</h2>
          <ul>
            <li>{{ locale === 'rw' ? 'Gukoresha platform' : 'To provide platform services' }}</li>
            <li>{{ locale === 'rw' ? 'Kugira ngo tuboneze serivisi' : 'To improve our services' }}</li>
            <li>{{ locale === 'rw' ? 'Kugira ngo tugusomere amakuru' : 'To send you updates' }}</li>
          </ul>
        </section>

        <section>
          <h2>3. {{ locale === 'rw' ? 'Ibyo turinda' : 'Data protection' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Turinda koni yawe kandi ntitugira ibijyana na BANKING. Données zikoreshwa gusa mu buryo budakoresha ijambo.' 
              : 'We protect your data and do not share it. All data is encrypted and secure.' }}
          </p>
        </section>

        <section>
          <h2>4. {{ locale === 'rw' ? 'Amakuru' : 'Cookies' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Tubakoresha cookies kugira ngo platform ikoreshwe neza.' 
              : 'We use cookies to improve your experience on the platform.' }}
          </p>
        </section>

        <section>
          <h2>5. {{ locale === 'rw' ? 'Ibyo twemera' : 'Your rights' }}</h2>
          <ul>
            <li>{{ locale === 'rw' ? 'Kugira amakuru yawe' : 'Access your data' }}</li>
            <li>{{ locale === 'rw' ? 'Kuvugurura amakuru' : 'Update your data' }}</li>
            <li>{{ locale === 'rw' ? 'Gusiba koni yawe' : 'Delete your account' }}</li>
          </ul>
        </section>
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
</script>

<style scoped>
.static-page {
  padding: 3rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.content-card {
  padding: 2rem;
  border-radius: 20px;
}

section {
  margin-bottom: 2rem;
}

section h2 {
  color: var(--primary);
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

section p, section li {
  color: var(--text-secondary);
  line-height: 1.8;
}

section ul {
  list-style: none;
  padding-left: 1rem;
}

section li {
  padding: 0.25rem 0;
  padding-left: 1.5rem;
  position: relative;
}

section li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary);
}
</style>