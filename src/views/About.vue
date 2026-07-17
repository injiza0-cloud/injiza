<template>
  <div class="static-page about-page">
    <div class="container">
      <header class="about-hero">
        <div class="hero-left">
          <h1 class="hero-title">{{ locale === 'rw' ? 'Turi INJIZA' : 'About INJIZA' }}</h1>
          <p class="hero-sub">{{ locale === 'rw'
            ? 'Dufasha Abanyarwanda kubona amafaranga ukoresheje videwo na mirimo ibyoroheje. Gukora kuri telefone, kwinjiza no gukura amafaranga byoroshye.'
            : 'We help Rwandans earn real RWF by watching short videos and completing simple tasks — all from a mobile phone.'
          }}</p>
          <div class="hero-cta">
            <router-link to="/register" class="btn btn-primary">{{ locale === 'rw' ? 'Iyandikishe' : 'Get Started' }}</router-link>
            <router-link to="/videos" class="btn btn-ghost">{{ locale === 'rw' ? 'Reba Video' : 'Browse Videos' }}</router-link>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-stats">
            <div>
              <div class="stat-number">50k+</div>
              <div class="stat-label">{{ locale === 'rw' ? 'Abakoresha' : 'Users' }}</div>
            </div>
            <div>
              <div class="stat-number">RWF 100M+</div>
              <div class="stat-label">{{ locale === 'rw' ? 'Byishyuriwe' : 'Paid out' }}</div>
            </div>
            <div>
              <div class="stat-number">500+</div>
              <div class="stat-label">{{ locale === 'rw' ? 'Video' : 'Videos' }}</div>
            </div>
          </div>
        </div>
      </header>

      <div class="content-card glass about-content">
        <div class="grid two-col">
          <section class="card">
            <h2>{{ locale === 'rw' ? 'Icyo dukora' : 'What we do' }}</h2>
            <p class="lead">{{ locale === 'rw'
              ? 'Turema amahirwe yo gukura amafaranga mu buryo bworoshye kandi buziguye. Abakoresha basabwa kureba content, gukora imirimo yoroheje no kwitabira porogaramu zacu za referal.'
              : 'We create simple, reliable earning opportunities. Members watch short content, complete light tasks, and invite friends to increase earnings.'
            }}</p>
            <ul class="benefits">
              <li>{{ locale === 'rw' ? 'Kwinjiza ukoresheje telefone' : 'Earn using your phone' }}</li>
              <li>{{ locale === 'rw' ? 'Kwishyurwa kuri Mobile Money' : 'Withdraw to Mobile Money' }}</li>
              <li>{{ locale === 'rw' ? 'Nta banki ikenewe' : 'No bank account required' }}</li>
            </ul>
          </section>

          <section class="card">
            <h2>{{ locale === 'rw' ? 'Impamvu dukora neza' : 'Why INJIZA works' }}</h2>
            <p>
              {{ locale === 'rw'
                ? 'Duhuza abafite ibikorwa n\'abakoresha bakora ibikorwa byoroshye ku mbuga zacu. Umukoresha abona amanota, amafaranga, kandi ashobora gukuramo byoroshye.'
                : 'We match simple paid tasks with users, track rewards transparently, and allow straightforward withdrawals once thresholds are met.'
              }}
            </p>
            <ol class="how">
              <li>{{ locale === 'rw' ? 'Iyandikishe' : 'Sign up' }}</li>
              <li>{{ locale === 'rw' ? 'Reba videwo / Ukoreshe imirimo' : 'Watch videos / Do tasks' }}</li>
              <li>{{ locale === 'rw' ? 'Hita ubikuza' : 'Withdraw earnings' }}</li>
            </ol>
          </section>
        </div>

        <section class="testimonials">
          <h3>{{ locale === 'rw' ? 'Ibyo abakoresha bavuga' : 'Trusted by users' }}</h3>
          <div class="testimonial-grid">
            <div class="testimonial-card">
              <strong>Marie</strong>
              <p>“{{ locale === 'rw' ? 'Byari byiza — nabonye amafaranga vuba.' : 'Easy to use — I earned quickly.' }}”</p>
            </div>
            <div class="testimonial-card">
              <strong>Eric</strong>
              <p>“{{ locale === 'rw' ? 'Wallet iroroshye, kandi imikoreshereze ni nziza.' : 'Clear wallet and straightforward rewards.' }}”</p>
            </div>
            <div class="testimonial-card">
              <strong>Amina</strong>
              <p>“{{ locale === 'rw' ? 'Nashoboye gukuramo kuri Mobile Money mu minsi.' : 'I cashed out to Mobile Money within days.' }}”</p>
            </div>
          </div>
        </section>

        <section class="partners">
          <h3>{{ locale === 'rw' ? 'Abafatanyabikorwa' : 'Partners' }}</h3>
          <div class="partners-grid">
            <div class="partner-card">
              <img src="/pub%20(1).png" alt="INJIZA Studio" />
              <div>
                <h4>INJIZA Studio</h4>
                <p>Supports platform design and brand storytelling.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(2).png" alt="INJIZA Media" />
              <div>
                <h4>INJIZA Media</h4>
                <p>Drives our social and video content strategy.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(3).png" alt="INJIZA Growth" />
              <div>
                <h4>INJIZA Growth</h4>
                <p>Expands our reach with growth-focused campaigns.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(4).png" alt="INJIZA Network" />
              <div>
                <h4>INJIZA Network</h4>
                <p>Connects us to key local and regional partners.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(5).png" alt="INJIZA Labs" />
              <div>
                <h4>INJIZA Labs</h4>
                <p>Builds new product features and experiments.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(6).png" alt="INJIZA Ventures" />
              <div>
                <h4>INJIZA Ventures</h4>
                <p>Supports innovation and strategic investments.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(7).png" alt="INJIZA Digital" />
              <div>
                <h4>INJIZA Digital</h4>
                <p>Powering the smooth digital user experience.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/pub%20(8).png" alt="INJIZA Partners" />
              <div>
                <h4>INJIZA Partners</h4>
                <p>Backing the best of INJIZA Group Ltd.</p>
              </div>
            </div>
            <div class="partner-card">
              <img src="/partners/mizero.svg" alt="Mizero Paterne" />
              <div>
                <h4>Mizero Paterne</h4>
                <p>Official partner — Mizero Paterne</p>
              </div>
            </div>
          </div>
        </section>

        <section class="contact-card">
          <h3>{{ locale === 'rw' ? 'Twandikire' : 'Contact' }}</h3>
          <p><strong>INJIZA - RWF Earning platform</strong></p>
          <p>Email: <a href="mailto:injiza0@gmail.com">injiza0@gmail.com</a></p>
          <div class="contact-quick">
            <a class="btn btn-outline" href="https://www.tiktok.com/@injizarwf" target="_blank">TikTok</a>
            <a class="btn btn-outline" href="https://www.instagram.com/injizarwf/" target="_blank">Instagram</a>
          </div>
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

.about-page .about-hero {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0 1.5rem;
}
.about-hero .hero-left { flex: 1 }
.about-hero .hero-right { width: 320px }
.hero-title { font-size: 2.2rem; margin: 0 0 0.5rem }
.hero-sub { color: var(--text-secondary); margin-bottom: 1rem }
.hero-cta .btn { margin-right: 0.6rem }

.hero-stats { display:flex; gap:1rem; background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:1rem; border-radius:12px; justify-content:space-around }
.hero-stats .stat-number { font-size:1.25rem; font-weight:800; color:var(--primary) }
.hero-stats .stat-label { font-size:0.85rem; color:var(--text-secondary) }

.about-content { padding: 1.5rem }
.two-col { display:grid; grid-template-columns: 1fr 1fr; gap:1.25rem; align-items:start }
.card { background: var(--bg-surface); padding:1.25rem; border-radius:12px }
.card h2 { margin-top:0; color:var(--primary) }
.lead { color:var(--text-secondary); line-height:1.7 }
.benefits { list-style: none; padding:0; margin-top:0.75rem }
.benefits li { padding:0.45rem 0; position:relative; padding-left:1.6rem }
.benefits li::before { content:'▹'; position:absolute; left:0; color:var(--primary) }

.how { padding-left:1rem }
.how li { margin-bottom:0.5rem }

.testimonials { margin-top:1.5rem }
.testimonial-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:1rem }
.testimonial-card { background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:1rem; border-radius:10px }

.partners-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1rem; }
.partner-card { display:flex; align-items:center; gap:0.75rem; padding:0.9rem 1rem; border-radius:18px; background: rgba(255,255,255,0.05); color: var(--text-primary); border: 1px solid rgba(255,255,255,0.08); }
.partner-card img { width: 52px; height: 52px; object-fit: contain; border-radius: 14px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); }
.partner-card h4 { margin: 0 0 0.2rem; font-size: 1rem; }
.partner-card p { margin: 0; color: rgba(255,255,255,0.65); font-size: 0.84rem; line-height: 1.4; }

.contact-card { margin-top:1.5rem; background:var(--bg-surface); padding:1rem; border-radius:12px }
.contact-quick .btn { margin-right:0.6rem }

@media (max-width: 900px) {
  .about-hero { flex-direction:column; }
  .about-hero .hero-right { width:100% }
  .two-col { grid-template-columns: 1fr }
  .testimonial-grid { grid-template-columns: repeat(2,1fr) }
}

@media (max-width: 540px) {
  .testimonial-grid { grid-template-columns: 1fr }
  .hero-title { font-size: 1.6rem }
}
</style>