<template>
  <div class="games-page">
    <div class="games-hero">
      <div class="hero-content">
        <h1>🎮 Play Games & Earn</h1>
        <p>Play exciting games and earn real RWF rewards!</p>
      </div>
    </div>

    <div class="container">
      <div class="games-grid">
        <div class="game-card" v-for="game in games" :key="game.id">
          <div class="game-thumbnail">
            <img :src="game.thumbnail" :alt="game.title" />
            <div class="game-overlay">
              <button @click="playGame(game)" class="play-btn">
                ▶ {{ locale === 'rw' ? 'Fyura' : 'Play Now' }}
              </button>
            </div>
          </div>
          <div class="game-info">
            <h3>{{ game.title }}</h3>
            <p>{{ game.description }}</p>
            <div class="game-reward">
              <span class="reward-badge">💰 {{ game.reward }} RWF</span>
              <span class="game-duration">⏱ {{ game.duration }}s</span>
            </div>
          </div>
        </div>
      </div>

      <div class="games-info">
        <div class="info-card">
          <h3>📋 {{ locale === 'rw' ? 'Amabwiriza' : 'How to Play' }}</h3>
          <ol>
            <li>{{ locale === 'rw' ? 'Hitamo igikoni' : 'Choose a game' }}</li>
            <li>{{ locale === 'rw' ? 'Fungura icyitegererezo' : 'Play the game' }}</li>
            <li>{{ locale === 'rw' ? 'Fata ibihembo' : 'Complete the game' }}</li>
            <li>{{ locale === 'rw' ? 'Fungura amafaranga' : 'Earn rewards' }}</li>
          </ol>
        </div>
      </div>

      <div class="ad-section">
        <ins class="adsbygoogle"
          data-ad-client="ca-pub-2947665984633906"
          data-ad-slot="1234567893"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    </div>

    <div v-if="showGameModal" class="game-modal">
      <div class="modal-content">
        <button @click="closeGame" class="close-btn">✕</button>
        <h2>{{ currentGame?.title }}</h2>
        
        <div v-if="currentGame?.type === 'memory'" class="memory-game">
          <div class="memory-grid">
            <div 
              v-for="(card, index) in memoryCards" 
              :key="index"
              class="memory-card"
              :class="{ flipped: card.flipped, matched: card.matched }"
              @click="flipCard(index)"
            >
              <div class="card-front">❓</div>
              <div class="card-back">{{ card.value }}</div>
            </div>
          </div>
          <p class="game-message">{{ memoryMessage }}</p>
        </div>

        <div v-else-if="currentGame?.type === 'click'" class="click-game">
          <div class="click-target" @click="clickTarget" :style="{ top: targetY + 'px', left: targetX + 'px' }">
            🎯
          </div>
          <p class="click-score">{{ locale === 'rw' ? 'Points:' : 'Score:' }} {{ clickScore }}/{{ clicksNeeded }}</p>
        </div>

        <div v-else-if="currentGame?.type === 'quiz'" class="quiz-game">
          <div class="quiz-question">{{ currentQuestion?.question }}</div>
          <div class="quiz-options">
            <button 
              v-for="(option, index) in currentQuestion?.options" 
              :key="index"
              class="quiz-option"
              :class="{ correct: selectedAnswer === index && currentQuestion.correct === index, wrong: selectedAnswer === index && currentQuestion.correct !== index }"
              @click="answerQuestion(index)"
              :disabled="selectedAnswer !== null"
            >
              {{ option }}
            </button>
          </div>
          <p v-if="quizComplete" class="game-message">{{ locale === 'rw' ? 'Byakunze!' : 'Correct!' }}</p>
        </div>

        <div v-else-if="currentGame?.type === 'embed'" class="game-area">
          <iframe 
            :src="currentGame.embedUrl" 
            frameborder="0" 
            allowfullscreen
            allow="autoplay; fullscreen"
          ></iframe>
        </div>

        <div v-else-if="currentGame?.type === 'image-game'" class="image-game">
          <div class="image-game-preview">
            <img :src="currentGame.thumbnail" :alt="currentGame.title" />
          </div>
          <p class="game-desc">{{ currentGame.description }}</p>
        </div>

        <div v-else class="game-placeholder">
          <p>Game type not supported</p>
        </div>

        <div class="game-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: gameProgress + '%' }"></div>
          </div>
          <span>{{ gameProgress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18nStore } from '../stores/i18n'
import { supabase } from '../lib/supabase'

const router = useRouter()
const authStore = useAuthStore()
const i18nStore = useI18nStore()

const games = ref([])

const showGameModal = ref(false)
const currentGame = ref(null)
const gameProgress = ref(0)

const locale = computed(() => i18nStore.locale)

onMounted(() => {
  // generate 20 image-based mini-games using AI-style images
  games.value = Array.from({ length: 20 }).map((_, i) => ({
    id: `game-img-${i+1}`,
    title: `AI Mini Game ${i+1}`,
    description: locale.value === 'rw' ? 'Fungura iyi foto ubone ibihembo' : 'Open this image to earn rewards',
    thumbnail: `https://picsum.photos/seed/game-ai-${i+1}/600/400`,
    reward: 1000 + ((i % 6) * 200),
    duration: 8 + (i % 5),
    type: 'image-game'
  }))
})

const memoryCards = ref([])
const memoryFlipped = ref([])
const memoryMatched = ref(0)
const memoryMessage = ref('')

const clickScore = ref(0)
const clicksNeeded = ref(10)
const targetX = ref(100)
const targetY = ref(100)

const quizQuestions = [
  { question: 'What is 5 + 7?', options: ['10', '11', '12', '13'], correct: 2 },
  { question: 'What is 8 x 3?', options: ['21', '24', '27', '30'], correct: 1 },
  { question: 'What is 100 - 45?', options: ['45', '55', '65', '75'], correct: 1 },
  { question: 'What is 144 ÷ 12?', options: ['10', '11', '12', '13'], correct: 2 },
  { question: 'What is 15 + 28?', options: ['42', '43', '44', '45'], correct: 1 }
]
const currentQuestion = ref(null)
const selectedAnswer = ref(null)
const quizComplete = ref(false)
const quizIndex = ref(0)

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const initMemoryGame = () => {
  const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍒', '🥭']
  const cards = [...symbols, ...symbols]
  const shuffled = shuffleArray(cards)
  memoryCards.value = shuffled.map((symbol, index) => ({
    value: symbol,
    flipped: false,
    matched: false
  }))
  memoryFlipped.value = []
  memoryMatched.value = 0
  memoryMessage.value = ''
}

const flipCard = (index) => {
  if (memoryCards.value[index].flipped || memoryCards.value[index].matched || memoryFlipped.value.length >= 2) return
  
  memoryCards.value[index].flipped = true
  memoryFlipped.value.push(index)

  if (memoryFlipped.value.length === 2) {
    const [first, second] = memoryFlipped.value
    if (memoryCards.value[first].value === memoryCards.value[second].value) {
      memoryCards.value[first].matched = true
      memoryCards.value[second].matched = true
      memoryMatched.value++
      memoryFlipped.value = []
      
      if (memoryMatched.value === 8) {
        memoryMessage.value = locale.value === 'rw' ? 'Byakunze! 🎉' : 'You Won! 🎉'
        completeGame()
      }
    } else {
      setTimeout(() => {
        memoryCards.value[first].flipped = false
        memoryCards.value[second].flipped = false
        memoryFlipped.value = []
      }, 1000)
    }
  }
}

const moveTarget = () => {
  targetX.value = Math.random() * 250 + 20
  targetY.value = Math.random() * 250 + 20
}

const clickTarget = () => {
  clickScore.value++
  if (clickScore.value >= clicksNeeded.value) {
    completeGame()
  } else {
    moveTarget()
  }
}

const answerQuestion = (index) => {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = index
  
  if (index === currentQuestion.value.correct) {
    setTimeout(() => {
      if (quizIndex.value < quizQuestions.length - 1) {
        quizIndex.value++
        currentQuestion.value = quizQuestions[quizIndex.value]
        selectedAnswer.value = null
      } else {
        quizComplete.value = true
        completeGame()
      }
    }, 1000)
  } else {
    setTimeout(() => {
      selectedAnswer.value = null
    }, 1000)
  }
}

const playGame = (game) => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  
  currentGame.value = game
  showGameModal.value = true
  gameProgress.value = 0

  if (game.type === 'memory') {
    initMemoryGame()
    const interval = setInterval(() => {
      gameProgress.value += 3.33
      if (gameProgress.value >= 100 || memoryMatched.value === 8) {
        clearInterval(interval)
      }
    }, 1000)
  } else if (game.type === 'click') {
    clickScore.value = 0
    moveTarget()
    const interval = setInterval(() => {
      gameProgress.value += 5
      if (gameProgress.value >= 100 || clickScore.value >= clicksNeeded.value) {
        clearInterval(interval)
      }
    }, 1000)
  } else if (game.type === 'quiz') {
    quizIndex.value = 0
    currentQuestion.value = quizQuestions[0]
    selectedAnswer.value = null
    quizComplete.value = false
    const interval = setInterval(() => {
      gameProgress.value += 2.22
      if (gameProgress.value >= 100 || quizComplete.value) {
        clearInterval(interval)
      }
    }, 1000)
  } else {
    const interval = setInterval(() => {
      gameProgress.value += 10
      if (gameProgress.value >= 100) {
        clearInterval(interval)
        completeGame()
      }
    }, game.duration * 100)
  }
}

const completeGame = async () => {
  if (!authStore.user || authStore.user.is_admin) {
    closeGame()
    return
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', authStore.user.id)
    .single()

  if (userData && currentGame.value) {
    const newBalance = userData.balance + currentGame.value.reward
    const newPoints = userData.points + currentGame.value.reward
    
    await supabase
      .from('users')
      .update({ balance: newBalance, points: newPoints })
      .eq('id', userData.id)

    await supabase.from('transactions').insert({
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      user_id: userData.id,
      amount: currentGame.value.reward,
      type: 'game',
      description: `Game: ${currentGame.value.title}`,
      status: 'completed'
    })

    await authStore.loadAllData()
  }

  setTimeout(() => {
    closeGame()
  }, 1500)
}

const closeGame = () => {
  showGameModal.value = false
  currentGame.value = null
  gameProgress.value = 0
  memoryCards.value = []
  clickScore.value = 0
  selectedAnswer.value = null
  quizComplete.value = false
}
</script>

<style scoped>
.games-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding-bottom: 4rem;
}

.games-hero {
  background: linear-gradient(135deg, #00A651 0%, #00C853 100%);
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.games-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)"/></svg>');
  background-size: 200px;
  animation: float 20s linear infinite;
}

@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.games-hero h1 {
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.games-hero p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: -2rem;
}

.image-game-preview img { width: 100%; height: 320px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem; }
.game-desc { color: var(--text-secondary); margin-bottom: 1rem; }

.game-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.game-thumbnail {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.game-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
}

.game-card:hover .game-overlay {
  opacity: 1;
}

.play-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00A651, #00C853);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.play-btn:hover {
  transform: scale(1.1);
}

.game-info {
  padding: 1.25rem;
}

.game-info h3 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.game-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.game-reward {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reward-badge {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #1a1a2e;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
}

.game-duration {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.games-info {
  margin-top: 3rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.info-card h3 {
  color: white;
  margin-bottom: 1rem;
}

.info-card ol {
  color: rgba(255, 255, 255, 0.8);
  padding-left: 1.5rem;
}

.info-card li {
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.ad-section {
  margin: 2rem 0;
  text-align: center;
  min-height: 90px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 10px;
}

.game-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-content h2 {
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
}

.memory-game, .click-game, .quiz-game {
  margin-bottom: 1.5rem;
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 1rem;
}

.memory-card {
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.memory-card.flipped, .memory-card.matched {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 10px;
  backface-visibility: hidden;
}

.card-front {
  background: linear-gradient(135deg, #00A651, #00C853);
  color: white;
}

.card-back {
  background: white;
  transform: rotateY(180deg);
}

.game-message {
  text-align: center;
  color: #00A651;
  font-size: 1.2rem;
  font-weight: 700;
}

.click-game {
  position: relative;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.click-target {
  position: absolute;
  font-size: 3rem;
  cursor: pointer;
  transition: all 0.2s;
}

.click-target:hover {
  transform: scale(1.2);
}

.click-score {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
}

.quiz-question {
  color: white;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.quiz-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.quiz-option {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.quiz-option:hover:not(:disabled) {
  background: rgba(0, 166, 81, 0.3);
  border-color: #00A651;
}

.quiz-option.correct {
  background: #00A651;
  border-color: #00A651;
}

.quiz-option.wrong {
  background: #e74c3c;
  border-color: #e74c3c;
}

.game-area {
  background: #000;
  border-radius: 10px;
  height: 400px;
}

.game-area iframe {
  width: 100%;
  height: 100%;
}

.game-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00A651, #00C853);
  transition: width 0.3s;
}

.game-progress span {
  color: white;
  font-weight: 700;
}

@media (max-width: 768px) {
  .games-hero h1 {
    font-size: 1.75rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }

  .memory-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .quiz-options {
    grid-template-columns: 1fr;
  }
}
</style>
