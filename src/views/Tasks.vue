<template>
  <div class="tasks-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ t('tasksTitle') }}</h1>
        <p>{{ locale === 'rw' ? 'Kora imikorere ugure amafaranga' : 'Complete tasks to earn money' }}</p>
      </div>

      <div class="task-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="activeTab = tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ t(tab.key) }}</span>
        </button>
      </div>

      <div class="tasks-grid">
        <div v-for="task in filteredTasks" :key="task.id" class="task-card">
          <div class="task-header">
            <span class="task-type" :class="task.type">{{ getTypeLabel(task.type) }}</span>
            <span class="task-reward">+{{ task.reward }} RWF</span>
          </div>
          
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          
          <div class="task-meta">
            <span class="meta-item">
              <span class="meta-icon">⏱</span>
              {{ task.time_required }}s
            </span>
          </div>
          
          <div class="task-actions">
            <button 
              v-if="!isCompleted(task.id)"
              @click="openTask(task)"
              class="btn btn-primary"
            >
              {{ t('action') }}
            </button>
            <span v-else class="completed-badge">
              ✅ {{ t('completed') }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="filteredTasks.length === 0" class="no-tasks">
        <p>{{ t('noData') }}</p>
      </div>

      <div class="ad-section">
        <ins class="adsbygoogle"
          data-ad-client="ca-pub-2947665984633906"
          data-ad-slot="1234567892"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      <div class="task-modal" v-if="currentTask">
        <div class="modal-overlay" @click="closeTask">
          <div class="modal-content" @click.stop>
            <button class="close-btn" @click="closeTask">✕</button>
            
            <div class="modal-header">
              <span class="task-type" :class="currentTask.type">{{ getTypeLabel(currentTask.type) }}</span>
              <h2>{{ currentTask.title }}</h2>
            </div>
            
            <p class="task-description">{{ currentTask.description }}</p>
            
            <div class="task-details">
              <div class="detail-item">
                <span class="detail-label">{{ t('reward') }}</span>
                <span class="detail-value">+{{ currentTask.reward }} RWF</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">{{ t('duration') }}</span>
                <span class="detail-value">{{ currentTask.time_required }}s</span>
              </div>
            </div>

            <div class="task-timer" v-if="!showSuccess">
              <div class="timer-display" :class="{ ready: canComplete }">
                <span class="timer-icon">{{ canComplete ? '✅' : '⏱️' }}</span>
                <span class="timer-text">
                  {{ canComplete 
                    ? (locale === 'rw' ? 'Wakwije! Fata ibihembo' : 'Time\'s up! Claim reward') 
                    : (locale === 'rw' ? `Tegereza: ${taskTimer}s` : `Wait: ${taskTimer}s`) 
                  }}
                </span>
              </div>
              <div class="timer-progress">
                <div class="timer-bar" :style="{ width: ((currentTask.time_required - taskTimer) / currentTask.time_required * 100) + '%' }"></div>
              </div>
            </div>

            <a :href="currentTask.url" target="_blank" class="btn btn-primary btn-lg">
              {{ getActionLabel(currentTask.type) }}
            </a>

            <div class="complete-section">
              <p class="complete-hint">
                {{ locale === 'rw' 
                  ? 'Tegereza ubimin nbiganiro bugenze 15s nyuma ushobora kuganisha' 
                  : 'Wait for 15 seconds before you can confirm' }}
              </p>
              <button @click="completeTask" class="btn btn-accent" :disabled="!canComplete || taskCompleting">
                {{ taskCompleting ? t('loading') : (canComplete ? t('confirm') : '⏱ ' + taskTimer + 's') }}
              </button>
            </div>

            <div v-if="showSuccess" class="success-notification">
              <div class="success-icon">✅</div>
              <h3>{{ t('taskComplete') }}</h3>
              <p>{{ t('successMessage') }} +{{ earnedAmount }} RWF!</p>
              <button @click="closeTask" class="btn btn-primary">
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
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useI18nStore } from '../stores/i18n'

const authStore = useAuthStore()
const i18nStore = useI18nStore()

const tasks = computed(() => authStore.getTasks().filter(t => t.is_active))
const currentUser = computed(() => authStore.currentUser)

const t = (key) => i18nStore.t(key)
const locale = computed(() => i18nStore.locale)

const activeTab = ref('all')
const currentTask = ref(null)
const taskCompleting = ref(false)
const showSuccess = ref(false)
const earnedAmount = ref(0)
const taskStarted = ref(false)
const taskTimer = ref(0)
const canComplete = ref(false)
let timerInterval = null

const tabs = [
  { key: 'all', icon: '📋' },
  { key: 'visit', icon: '🌐' },
  { key: 'social', icon: '📱' },
  { key: 'app', icon: '📲' },
  { key: 'survey', icon: '📝' }
]

const filteredTasks = computed(() => {
  if (activeTab.value === 'all') return tasks.value
  return tasks.value.filter(t => t.type === activeTab.value)
})

const isCompleted = (taskId) => {
  if (!currentUser.value) return false
  const completed = JSON.parse(localStorage.getItem(`completedTasks_${currentUser.value.id}`) || '[]')
  return completed.includes(taskId)
}

const getTypeLabel = (type) => {
  const labels = {
    visit: locale.value === 'rw' ? 'Visit website' : 'Visit',
    social: locale.value === 'rw' ? 'Social media' : 'Social',
    app: locale.value === 'rw' ? 'App download' : 'App',
    survey: locale.value === 'rw' ? 'Ibibuto' : 'Survey'
  }
  return labels[type] || type
}

const getActionLabel = (type) => {
  const labels = {
    visit: locale.value === 'rw' ? 'Visit Website' : 'Visit Website',
    social: locale.value === 'rw' ? 'Follow/Facebook' : 'Follow/Like',
    app: locale.value === 'rw' ? 'Download App' : 'Download App',
    survey: locale.value === 'rw' ? 'Fungura Survey' : 'Take Survey'
  }
  return labels[type] || t('action')
}

const openTask = (task) => {
  currentTask.value = task
  showSuccess.value = false
  taskCompleting.value = false
  taskStarted.value = false
  canComplete.value = false
  taskTimer.value = task.time_required || 15
  
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    if (taskTimer.value > 0) {
      taskTimer.value--
    } else {
      canComplete.value = true
      clearInterval(timerInterval)
    }
  }, 1000)
}

const closeTask = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  currentTask.value = null
  showSuccess.value = false
}

const completeTask = async () => {
  if (!currentTask.value) return
  
  if (!canComplete.value) {
    alert(locale.value === 'rw' 
      ? `Tegereza nanone ${taskTimer.value}s ngo ugane ibihembo` 
      : `Please wait ${taskTimer.value}s more to complete the task`)
    return
  }
  
  taskCompleting.value = true
  
  const result = authStore.addTaskReward(currentTask.value.id)
  taskCompleting.value = false
  
  if (result.success) {
    earnedAmount.value = result.amount
    showSuccess.value = true
  }
}
</script>

<style scoped>
.tasks-page {
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

.task-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  border-color: var(--primary);
}

.tab-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.tab-icon {
  font-size: 1.1rem;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.task-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.task-type {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.task-type.visit {
  background: rgba(0, 181, 236, 0.2);
  color: var(--secondary);
}

.task-type.social {
  background: rgba(156, 39, 176, 0.2);
  color: #ce93d8;
}

.task-type.app {
  background: rgba(245, 166, 35, 0.2);
  color: var(--accent);
}

.task-type.survey {
  background: rgba(0, 166, 81, 0.2);
  color: var(--primary);
}

.task-reward {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.task-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.task-card p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.task-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
}

.completed-badge {
  background: rgba(0, 200, 83, 0.2);
  color: var(--success);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
}

.no-tasks {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.ad-section {
  margin: 2rem 0;
  text-align: center;
  min-height: 90px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 10px;
}

.task-modal .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.task-modal .modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-header {
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

.task-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.task-details {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-dark);
  border-radius: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
}

.task-timer {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-dark);
  border-radius: 12px;
}

.timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.timer-display.ready {
  color: var(--success);
}

.timer-icon {
  font-size: 1.5rem;
}

.timer-text {
  font-size: 1.1rem;
  font-weight: 600;
}

.timer-progress {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.timer-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--success));
  transition: width 1s linear;
}

.task-modal .btn-lg {
  width: 100%;
  margin-bottom: 1.5rem;
}

.complete-section {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--glass-border);
}

.complete-hint {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  .tasks-grid {
    grid-template-columns: 1fr;
  }
}
</style>