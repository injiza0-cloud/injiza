<template>
  <div class="static-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ t('terms') }}</h1>
      </div>
      
      <div class="content-card glass">
        <section>
          <h2>1. {{ locale === 'rw' ? 'Ibyinjira' : 'Introduction' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Mu kwishora kuri platform, ubonye ko uvyemwo hamwe na BYA. Niba utagabanze na BYA, ntugire icyo ukora kuri platform.' 
              : 'By using this platform, you agree to these Terms. If you do not agree, please do not use the platform.' }}
          </p>
        </section>

        <section>
          <h2>2. {{ locale === 'rw' ? 'Ibyo ukoresha akamaro' : 'Your responsibilities' }}</h2>
          <ul>
            <li>{{ locale === 'rw' ? 'Ukingire koni yawe' : 'Keep your account secure' }}</li>
            <li>{{ locale === 'rw' ? 'Ntukoreshe ibinyoma' : 'Do not provide false information' }}</li>
            <li>{{ locale === 'rw' ? 'Ntukoreshe bot' : 'Do not use bots or automation' }}</li>
            <li>{{ locale === 'rw' ? 'Ubyenze neza' : 'Complete tasks honestly' }}</li>
          </ul>
        </section>

        <section>
          <h2>3. {{ locale === 'rw' ? 'Imikurikiire' : 'Rewards' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Uhabwa amafaranga ukoresheje video n\'imikorere. Byishyuriwe kuri Mobile Money. Kujijuta: 43,900 RWF nibura.' 
              : 'You earn rewards by watching videos and completing tasks. Paid via Mobile Money. Minimum withdrawal: 43,900 RWF.' }}
          </p>
        </section>

        <section>
          <h2>4. {{ locale === 'rw' ? 'Ibibuzwa' : 'Prohibited actions' }}</h2>
          <ul>
            <li>{{ locale === 'rw' ? 'Kugira ibikubo bibiri' : 'Multiple accounts' }}</li>
            <li>{{ locale === 'rw' ? 'Kwikorera video inzuro' : 'Watching same video multiple times' }}</li>
            <li>{{ locale === 'rw' ? 'Kwigana amafaranga' : 'Trying to cheat the system' }}</li>
            <li>{{ locale === 'rw' ? 'Kureka amakuru ya bots' : 'Using bots or automation' }}</li>
          </ul>
        </section>

        <section>
          <h2>5. {{ locale === 'rw' ? 'Ibyagaragaye' : 'Disciplinary actions' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Niba wakoze ibyaha, koni yawe ishobora gufunga rwose. Amafaranga yose ashibwa.' 
              : 'If you violate rules, your account may be permanently banned. All earnings will be lost.' }}
          </p>
        </section>

        <section>
          <h2>6. {{ locale === 'rw' ? 'Ihinduka ry\'amategeko' : 'Changes to terms' }}</h2>
          <p>
            {{ locale === 'rw' 
              ? 'Tushobora guhindura amategeko. Ihinduka rishobora kubaho igihe uri ku platform.' 
              : 'We may change these terms at any time. Continued use means you accept the changes.' }}
          </p>
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