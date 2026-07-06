<template>
  <div class="videos-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ t('videosTitle') }}</h1>
        <p>{{ locale === 'rw' ? 'Reba video kugira ngo ugure' : 'Watch videos to earn' }}</p>
      </div>

      <div class="videos-grid">
        <div v-for="video in videos" :key="video.id" class="video-card">
          <div class="video-thumbnail" @click="openVideo(video)">
            <img :src="video.thumbnail" :alt="video.title">
            <div class="play-overlay">
              <span class="play-icon">▶</span>
            </div>
            <span class="duration-badge">{{ video.duration }}s</span>
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
            <div class="video-footer">
              <span class="reward-badge">+{{ video.reward }} RWF</span>
              <button 
                @click="openVideo(video)" 
                class="btn btn-primary btn-sm"
                :disabled="isCompleted(video.id)"
              >
                {{ isCompleted(video.id) ? t('completed') : t('watchEarn') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ad-section">
        <ins class="adsbygoogle"
          data-ad-client="ca-pub-2947665984633906"
          data-ad-slot="1234567891"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      <div v-if="videos.length === 0" class="no-videos">
        <p>{{ t('noData') }}</p>
      </div>

      <div class="coin-animation" v-if="showCoinAnim">
        <div class="coin">🪙</div>
        <div class="coin" style="animation-delay: 0.2s">🪙</div>
        <div class="coin" style="animation-delay: 0.4s">🪙</div>
        <div class="coin" style="animation-delay: 0.6s">🪙</div>
        <div class="coin" style="animation-delay: 0.8s">🪙</div>
        <div class="coin" style="animation-delay: 1s">🪙</div>
        <div class="coin" style="animation-delay: 1.2s">🪙</div>
        <div class="coin" style="animation-delay: 1.4s">🪙</div>
      </div>

      <div class="video-modal" v-if="currentVideo">
        <div class="modal-overlay" @click="closeVideo">
          <div class="video-modal-content" @click.stop>
            <button class="close-btn" @click="closeVideo">✕</button>
            <h2>{{ currentVideo.title }}</h2>
            <div class="video-player">
              <template v-if="currentVideo.type === 'image'">
                <div class="image-player">
                  <img :src="currentVideo.thumbnail" alt="currentVideo.title" />
                </div>

                <div class="image-timer">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: imageProgress + '%' }"></div>
                  </div>
                  <div class="time-display">
                    {{ locale === 'rw' ? 'Tegereza' : 'Wait' }}: {{ Math.max(0, imageRequired - imageTimer) }}s
                  </div>
                  <button
                    class="btn btn-primary"
                    :disabled="imageTimer < imageRequired"
                    @click="onVideoComplete"
                  >
                    {{ imageTimer >= imageRequired ? (locale === 'rw' ? 'Fata ibihembo' : 'Claim Reward') : (locale === 'rw' ? 'Tegereza' : 'Wait') }}
                  </button>
                </div>
              </template>

              <template v-else>
                <video 
                  ref="videoPlayer"
                  :src="currentVideo.videoUrl"
                  @timeupdate="onTimeUpdate"
                  @ended="onVideoComplete"
                  @loadedmetadata="onLoaded"
                  playsinline
                ></video>
                
                <div class="video-controls" v-if="!videoCompleted">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                  </div>
                  <div class="time-display">
                    {{ formatTime(currentTime) }} / {{ formatTime(currentVideo.duration) }}
                  </div>
                  <button 
                    v-if="!isPlaying" 
                    @click="playVideo" 
                    class="btn btn-primary"
                  >
                    {{ locale === 'rw' ? 'Tangira' : 'Play' }}
                  </button>
                </div>

                <div class="watch-notice" v-if="isPlaying">
                  <div class="timer-warning" v-if="!canSkip">
                    <span class="timer-icon">⏱️</span>
                    <span>{{ locale === 'rw' ? 'Tegereza:' : 'Wait:' }} {{ timeRemaining }}s</span>
                  </div>
                  <div class="timer-success" v-else>
                    <span>✅ {{ locale === 'rw' ? 'Ushobora gutangira' : 'You can skip now' }}</span>
                  </div>
                </div>
              </template>
            </div>
            
            <div v-if="showSuccess" class="success-notification">
              <div class="success-icon">✅</div>
              <h3>{{ t('videoComplete') }}</h3>
              <p>{{ t('successMessage') }} +{{ earnedAmount }} RWF!</p>
              <button @click="closeVideo" class="btn btn-primary">
                {{ locale === 'rw' ? 'Murakoze' : 'Thank you' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18nStore } from '../stores/i18n'

const router = useRouter()
const authStore = useAuthStore()
const i18nStore = useI18nStore()

const videos = computed(() => {
  // generate 20 image-based placeholders (AI images) for watch-and-earn
  return Array.from({ length: 20 }).map((_, i) => {
    const id = `ai-image-${i+1}`
    return {
      id,
      title: `AI Image #${i+1}`,
      description: locale.value === 'rw' ? 'Reba ifoto kugirango ubone ibihembo' : 'View this image to earn rewards',
      duration: 10,
      reward: 1500,
      thumbnail: `https://picsum.photos/seed/ai-${i+1}/800/450`,
      video_url: null,
      type: 'image'
    }
  })
})
const currentUser = computed(() => authStore.currentUser)

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const currentVideo = ref(null)
const videoPlayer = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const progress = ref(0)
const canSkip = ref(false)
const videoCompleted = ref(false)
const showSuccess = ref(false)
const earnedAmount = ref(0)
const showCoinAnim = ref(false)

// image-based timer
const imageTimer = ref(0)
const imageProgress = ref(0)
const imageRequired = ref(5)
let imageInterval = null

const timeRemaining = computed(() => {
  if (!currentVideo.value || currentTime.value >= 5) return 0
  return Math.max(0, Math.ceil(5 - currentTime.value))
})

const isCompleted = (videoId) => {
  if (!currentUser.value) return false
  const completed = JSON.parse(localStorage.getItem(`completedVideos_${currentUser.value.id}`) || '[]')
  return completed.includes(videoId)
}

const openVideo = (video) => {
  if (isCompleted(video.id)) return
  currentVideo.value = {
    ...video,
    videoUrl: video.video_url
  }
  videoCompleted.value = false
  showSuccess.value = false
  isPlaying.value = false
  currentTime.value = 0
  progress.value = 0
  canSkip.value = false

  // if image-based, start simulated watch timer
  if (video.type === 'image') {
    imageTimer.value = 0
    imageProgress.value = 0
    imageRequired.value = Math.min(video.duration || 5, 15)
    if (imageInterval) clearInterval(imageInterval)
    imageInterval = setInterval(() => {
      imageTimer.value += 1
      imageProgress.value = Math.min(100, (imageTimer.value / imageRequired.value) * 100)
      if (imageTimer.value >= imageRequired.value) {
        clearInterval(imageInterval)
      }
    }, 1000)
  }
}

const closeVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause()
  }
  currentVideo.value = null
  videoCompleted.value = false
  showSuccess.value = false
  if (imageInterval) { clearInterval(imageInterval); imageInterval = null }
}

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.play()
    isPlaying.value = true
  }
}

const onLoaded = () => {
  if (videoPlayer.value) {
    videoPlayer.value.currentTime = 0
  }
}

const onTimeUpdate = () => {
  if (videoPlayer.value && currentVideo.value) {
    currentTime.value = videoPlayer.value.currentTime
    progress.value = (currentTime.value / currentVideo.value.duration) * 100
    
    const minWatchTime = Math.min(currentVideo.value.duration, 15)
    if (currentTime.value >= minWatchTime) {
      canSkip.value = true
    }
  }
}

const onVideoComplete = () => {
  if (!currentVideo.value || videoCompleted.value) return
  
  videoCompleted.value = true
  isPlaying.value = false
  
  const minWatchTime = Math.min(currentVideo.value.duration, 15)
  if (currentTime.value < minWatchTime) {
    alert(locale.value === 'rw' ? 'Ugirango ufate ibihembo, tegereza ubimin niburyo bweza' : 'You must watch for at least 15 seconds to earn rewards')
    return
  }
  
  // for image-based placeholders, credit via addBalance and mark completed locally
  if (currentVideo.value.type === 'image') {
    const amount = currentVideo.value.reward || 1500
    authStore.addBalance(amount).then((res) => {
      if (res.success) {
        earnedAmount.value = amount
        showSuccess.value = true
        showCoinAnim.value = true
        // mark as completed in localStorage to prevent re-earning
        if (currentUser.value) {
          const key = `completedVideos_${currentUser.value.id}`
          const completed = JSON.parse(localStorage.getItem(key) || '[]')
          if (!completed.includes(currentVideo.value.id)) {
            completed.push(currentVideo.value.id)
            localStorage.setItem(key, JSON.stringify(completed))
          }
        }
        setTimeout(() => { showCoinAnim.value = false }, 2000)
      }
    })
    return
  }

  const result = authStore.addVideoReward(currentVideo.value.id)
  
  if (result.success) {
    earnedAmount.value = result.amount
    showSuccess.value = true
    showCoinAnim.value = true
    setTimeout(() => {
      showCoinAnim.value = false
    }, 2000)
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.videos-page {
  padding: 2rem 0;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.ad-section {
  margin: 2rem 0;
  text-align: center;
  min-height: 90px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 10px;
}

.video-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  cursor: pointer;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.video-card:hover .video-thumbnail img {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  width: 60px;
  height: 60px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding-left: 4px;
}

.duration-badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.video-info {
  padding: 1rem;
}

.video-info h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.video-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reward-badge {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.no-videos {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.video-modal .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.video-modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  position: relative;
}

.image-player img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.image-timer { display: flex; flex-direction: column; gap: 0.6rem; align-items: center; }
.image-timer .time-display { font-weight: 700; color: var(--text-secondary); }
.image-timer .btn { min-width: 160px; }

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
}

.video-modal-content h2 {
  margin-bottom: 1rem;
}

.video-player {
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-player video {
  width: 100%;
  aspect-ratio: 16/9;
  display: block;
}

.video-controls {
  padding: 1rem;
  background: var(--bg-dark);
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 3px;
  transition: width 0.1s;
}

.time-display {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.watch-notice {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 179, 0, 0.9);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.video-page .coin-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.video-page .coin {
  position: absolute;
  font-size: 2rem;
  animation: coinFly 2s ease-out forwards;
}

@keyframes coinFly {
  0% {
    top: 50%;
    left: 20%;
    opacity: 1;
  }
  25% {
    top: 30%;
    left: 40%;
    opacity: 1;
  }
  50% {
    top: 20%;
    left: 60%;
    opacity: 1;
  }
  75% {
    top: 10%;
    left: 80%;
    opacity: 1;
  }
  100% {
    top: -50px;
    left: 90%;
    opacity: 0;
  }
}

.success-notification {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-notification h3 {
  color: var(--success);
  margin-bottom: 0.5rem;
}

.success-notification p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1024px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>