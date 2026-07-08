import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { initializeAdminUser } from '../lib/supabase'

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36)
const generateReferralCode = () => Math.random().toString(36).substring(2, 8).toUpperCase()

// Exchange rate: 1 USD = 1450 RWF
const EXCHANGE_RATE = 1450

const fallbackVideos = [
  { id: 'video-1', title: 'Quick cash tips', description: 'Learn how to grow your balance faster with small daily habits.', duration: 45, reward: 1500, thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', is_active: true, views: 142 },
  { id: 'video-2', title: 'Smart task strategy', description: 'A fast guide to stacking easy tasks and keeping your streak alive.', duration: 50, reward: 1800, thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/movie.mp4', is_active: true, views: 118 },
  { id: 'video-3', title: 'Wallet growth basics', description: 'See how withdrawals, bonuses, and rewards all connect.', duration: 42, reward: 1600, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', is_active: true, views: 96 },
  { id: 'video-4', title: 'Daily streak habits', description: 'Simple habits that keep your earnings consistent every day.', duration: 38, reward: 1400, thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/movie.mp4', is_active: true, views: 87 },
  { id: 'video-5', title: 'Referral income guide', description: 'Learn how to invite friends and earn extra perks together.', duration: 47, reward: 1700, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', is_active: true, views: 111 },
  { id: 'video-6', title: 'Boost your task score', description: 'A short walkthrough of our featured task categories.', duration: 33, reward: 1300, thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/movie.mp4', is_active: true, views: 78 },
  { id: 'video-7', title: 'Verification essentials', description: 'Everything you need to know to keep your account fully active.', duration: 41, reward: 1550, thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', is_active: true, views: 64 },
  { id: 'video-8', title: 'How to earn faster', description: 'Watch this before you start the day to maximize your opportunities.', duration: 36, reward: 1450, thumbnail: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d0f?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/movie.mp4', is_active: true, views: 59 },
  { id: 'video-9', title: 'Weekly challenge overview', description: 'A quick look at the current bonus events and streak goals.', duration: 44, reward: 1650, thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', is_active: true, views: 93 },
  { id: 'video-10', title: 'Stay consistent', description: 'Consistency is the fastest way to grow your rewards over time.', duration: 39, reward: 1500, thumbnail: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/movie.mp4', is_active: true, views: 82 },
  { id: 'video-11', title: 'Secure your account', description: 'Best practices for keeping your account safe and ready for payouts.', duration: 35, reward: 1350, thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', is_active: true, views: 71 },
  { id: 'video-12', title: 'Weekend bonus plan', description: 'Use this guide to prepare for the next reward window.', duration: 48, reward: 1750, thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80', video_url: 'https://www.w3schools.com/html/movie.mp4', is_active: true, views: 102 }
]

const fallbackTasks = [
  { id: 'task-1', title: 'Visit the training hub', description: 'Open the latest learning guide and confirm your visit.', reward: 1200, time_required: 20, type: 'visit', url: 'https://example.com', is_active: true },
  { id: 'task-2', title: 'Follow INJIZA on Facebook', description: 'Follow the official page and stay updated on new rewards.', reward: 1800, time_required: 20, type: 'social', url: 'https://www.facebook.com', is_active: true },
  { id: 'task-3', title: 'Follow INJIZA on TikTok', description: 'Follow on TikTok and keep your feed active for upcoming bonus drops.', reward: 1800, time_required: 20, type: 'social', url: 'https://www.tiktok.com', is_active: true },
  { id: 'task-4', title: 'Download the app', description: 'Install the app and confirm the download to unlock the reward.', reward: 2200, time_required: 20, type: 'app', url: 'https://example.com/app', is_active: true },
  { id: 'task-5', title: 'Share your reward story', description: 'Post a short testimonial and return to claim your reward.', reward: 2000, time_required: 20, type: 'survey', url: 'https://example.com/review', is_active: true },
  { id: 'task-6', title: 'Rate the platform experience', description: 'Tell us how easy the experience feels and confirm the survey.', reward: 2500, time_required: 20, type: 'survey', url: 'https://example.com/survey', is_active: true }
]

const REFERRAL_BONUS_AMOUNT = EXCHANGE_RATE
const coinAnimationCallback = ref(null)

export function setCoinAnimationCallback(callback) {
  coinAnimationCallback.value = callback
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)
  const isAdmin = ref(false)
  const loading = ref(true)

  const users = ref([])
  const videos = ref([])
  const tasks = ref([])
  const transactions = ref([])

  const avatarUrlSupported = ref(true)
  const supportedUserColumns = ref({})

  const ensureUserColumn = async (columnName) => {
    if (supportedUserColumns.value[columnName] != null) {
      return supportedUserColumns.value[columnName]
    }

    try {
      const { error } = await supabase
        .from('users')
        .select(columnName)
        .limit(1)

      if (error && error.code === '42703') {
        supportedUserColumns.value[columnName] = false
      } else {
        supportedUserColumns.value[columnName] = true
      }
    } catch (e) {
      console.error(`Users table column check error (${columnName}):`, e)
      supportedUserColumns.value[columnName] = false
    }

    return supportedUserColumns.value[columnName]
  }

  const ensureTransactionColumn = async (columnName) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .select(columnName)
        .limit(1)

      if (error && error.code === '42703') {
        return false
      }
      return true
    } catch (e) {
      console.error(`Transactions table column check error (${columnName}):`, e)
      return false
    }
  }

  const ensureAvatarUrlColumn = async () => {
    if (avatarUrlSupported.value === false) return false
    const supported = await ensureUserColumn('avatar_url')
    avatarUrlSupported.value = supported
    return supported
  }

  const initializeDatabase = async () => {
    loading.value = true
    try {
      await initializeAdminUser()
      await loadAllData()
    } catch (error) {
      console.error('Database initialization error:', error)
    } finally {
      loading.value = false
    }
  }

  const loadAllData = async () => {
    const [usersData, videosData, tasksData, transactionsData] = await Promise.all([
      supabase.from('users').select('*').order('created_at', { ascending: false }),
      supabase.from('videos').select('*').order('created_at', { ascending: false }),
      supabase.from('tasks').select('*').order('created_at', { ascending: false }),
      supabase.from('transactions').select('*').order('created_at', { ascending: false })
    ])

    users.value = usersData.data || []
    videos.value = (videosData.data && videosData.data.length > 0) ? videosData.data : fallbackVideos
    tasks.value = (tasksData.data && tasksData.data.length > 0) ? tasksData.data : fallbackTasks
    transactions.value = transactionsData.data || []
  }

  const createRegistrationRecord = async (userId) => {
    await supabase.from('transactions').insert({
      id: generateId(),
      user_id: userId,
      amount: 350,
      type: 'registration',
      description: 'Registration fee pending verification',
      status: 'pending',
      created_at: new Date().toISOString()
    })
    await loadAllData()
  }

  const completeRegistrationRecord = async (userId, metadata = {}) => {
    const updateFields = {
      status: 'completed',
      description: 'Registration payment verified'
    }

    const transactionColumns = await Promise.all([
      ensureTransactionColumn('transaction_id'),
      ensureTransactionColumn('payment_status'),
      ensureTransactionColumn('screenshot_hash'),
      ensureTransactionColumn('receipt_text'),
      ensureTransactionColumn('payment_date'),
      ensureTransactionColumn('fee'),
      ensureTransactionColumn('balance')
    ])

    if (transactionColumns[0] && metadata.transaction_id) updateFields.transaction_id = metadata.transaction_id
    if (transactionColumns[1] && metadata.payment_status) updateFields.payment_status = metadata.payment_status
    if (transactionColumns[2] && metadata.screenshot_hash) updateFields.screenshot_hash = metadata.screenshot_hash
    if (transactionColumns[3] && metadata.receipt_text) updateFields.receipt_text = metadata.receipt_text
    if (transactionColumns[4] && metadata.payment_date) updateFields.payment_date = metadata.payment_date
    if (transactionColumns[5] != null && metadata.fee != null) updateFields.fee = metadata.fee
    if (transactionColumns[6] != null && metadata.balance != null) updateFields.balance = metadata.balance

    await supabase
      .from('transactions')
      .update(updateFields)
      .eq('user_id', userId)
      .eq('type', 'registration')
      .eq('status', 'pending')

    localStorage.setItem('isActivated', 'true')
    await loadAllData()
  }

  const isDuplicatePaymentProof = async (transactionId, screenshotHash) => {
    const transactionIdSupported = await ensureTransactionColumn('transaction_id')
    const screenshotHashSupported = await ensureTransactionColumn('screenshot_hash')
    const conditions = []

    if (transactionId && transactionIdSupported) {
      conditions.push(`transaction_id.eq.${transactionId}`)
    }
    if (screenshotHash && screenshotHashSupported) {
      conditions.push(`screenshot_hash.eq.${screenshotHash}`)
    }
    if (!conditions.length) {
      return false
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('id')
      .or(conditions.join(','))
      .limit(1)

    if (error) {
      console.error('Duplicate payment proof query error:', error)
      return false
    }

    return Array.isArray(data) && data.length > 0
  }

  const recordFraudWarning = async (userId, details, screenshotHash = null) => {
    const insertPayload = {
      id: generateId(),
      user_id: userId,
      amount: 350,
      type: 'fraud_warning',
      description: details,
      status: 'failed',
      created_at: new Date().toISOString()
    }

    if (screenshotHash && await ensureTransactionColumn('screenshot_hash')) {
      insertPayload.screenshot_hash = screenshotHash
    }

    await supabase.from('transactions').insert(insertPayload)
    await loadAllData()
  }

  const login = async (emailOrPhone, password, rememberMe = false) => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`email.eq.${emailOrPhone},phone.eq.${emailOrPhone},username.eq.${emailOrPhone}`)
        .eq('password', password)
        .single()

      if (error || !data) {
        return { success: false, message: 'wrongCredentials' }
      }

      if (!data.is_active) {
        return { success: false, message: 'Account is suspended' }
      }

      user.value = data
      isLoggedIn.value = true
      isAdmin.value = data.is_admin || false

      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('isAdmin', data.is_admin ? 'true' : 'false')
      localStorage.setItem('isActivated', 'true')
      localStorage.setItem('currentUser', JSON.stringify(data))

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('savedEmail', emailOrPhone)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('savedEmail')
      }

      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id)

      return { success: true, user: data }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'An error occurred' }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      const existingUser = await supabase
        .from('users')
        .select('id')
        .eq('username', userData.username)
        .maybeSingle()

      if (existingUser.data) {
        return { success: false, message: 'Username already taken. Please choose another.' }
      }

      const existingEmail = await supabase
        .from('users')
        .select('id')
        .eq('email', userData.email)
        .maybeSingle()

      if (existingEmail.data) {
        return { success: false, message: 'Email already registered. Try logging in instead.' }
      }

      let referrer = null
      if (userData.referralCode) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('referral_code', userData.referralCode)
          .maybeSingle()
        referrer = data
      }

      const avatarSupported = await ensureAvatarUrlColumn()
      const [currencySupported, languageSupported, isVerifiedSupported, isActiveSupported, isAdminSupported, referralCodeSupported, referredBySupported, balanceSupported, referralEarningsSupported, levelSupported, pointsSupported, createdAtSupported, lastLoginSupported] = await Promise.all([
        ensureUserColumn('currency'),
        ensureUserColumn('language'),
        ensureUserColumn('is_verified'),
        ensureUserColumn('is_active'),
        ensureUserColumn('is_admin'),
        ensureUserColumn('referral_code'),
        ensureUserColumn('referred_by'),
        ensureUserColumn('balance'),
        ensureUserColumn('referral_earnings'),
        ensureUserColumn('level'),
        ensureUserColumn('points'),
        ensureUserColumn('created_at'),
        ensureUserColumn('last_login')
      ])

      const newUser = {
        id: generateId(),
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        ...(referralCodeSupported ? { referral_code: generateReferralCode() } : {}),
        ...(referredBySupported ? { referred_by: referrer ? referrer.id : null } : {}),
        ...(balanceSupported ? { balance: 0 } : {}),
        ...(referralEarningsSupported ? { referral_earnings: 0 } : {}),
        ...(levelSupported ? { level: 1 } : {}),
        ...(pointsSupported ? { points: 0 } : {}),
        ...(isActiveSupported ? { is_active: true } : {}),
        ...(isAdminSupported ? { is_admin: false } : {}),
        ...(isVerifiedSupported ? { is_verified: false } : {}),
        ...(createdAtSupported ? { created_at: new Date().toISOString() } : {}),
        ...(lastLoginSupported ? { last_login: new Date().toISOString() } : {}),
        ...(languageSupported ? { language: userData.language || 'en' } : {}),
        ...(currencySupported ? { currency: userData.currency || 'rwf' } : {})
      }

      if (avatarSupported && userData.avatar_url) {
        newUser.avatar_url = userData.avatar_url
      }

      const { data, error } = await supabase
        .from('users')
        .insert(newUser)
        .select()
        .single()

      if (error) throw error

      user.value = data
      isLoggedIn.value = true
      isAdmin.value = false
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('isAdmin', 'false')
      localStorage.setItem('isActivated', 'false')
      localStorage.setItem('currentUser', JSON.stringify(data))

      await createRegistrationRecord(data.id)

      if (referrer) {
        await supabase
          .from('users')
          .update({
            referral_earnings: referrer.referral_earnings + REFERRAL_BONUS_AMOUNT,
            balance: referrer.balance + REFERRAL_BONUS_AMOUNT,
            last_login: new Date().toISOString()
          })
          .eq('id', referrer.id)

        await supabase.from('transactions').insert({
          id: generateId(),
          user_id: referrer.id,
          amount: REFERRAL_BONUS_AMOUNT,
          type: 'referral',
          description: 'Referral bonus (1 USD = 1450 FRW)',
          status: 'completed',
          created_at: new Date().toISOString()
        })

        await loadAllData()

        if (coinAnimationCallback.value) {
          coinAnimationCallback.value(REFERRAL_BONUS_AMOUNT)
        }
      }

      return { success: true, user: data }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, message: 'Registration failed: ' + (error.message || 'Unknown error') }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    isAdmin.value = false
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('isActivated')
    localStorage.removeItem('currentUser')
  }

  const addVideoReward = async (videoId) => {
    if (!user.value) return { success: false }
    if (user.value.is_admin) return { success: false, message: 'Admin cannot earn from tasks' }

    const video = videos.value.find(v => v.id === videoId)
    if (!video) return { success: false }

    const completedKey = `completedVideos_${user.value.id}`
    const completedVideos = JSON.parse(localStorage.getItem(completedKey) || '[]')
    if (completedVideos.includes(videoId)) {
      return { success: false, message: 'Already watched' }
    }

    const userIndex = users.value.findIndex(u => u.id === user.value.id)
    if (userIndex === -1) return { success: false }

    const newBalance = users.value[userIndex].balance + video.reward
    const newPoints = users.value[userIndex].points + video.reward
    const newLevel = Math.floor(newPoints / 500) + 1

    await supabase
      .from('users')
      .update({ balance: newBalance, points: newPoints, level: newLevel })
      .eq('id', user.value.id)

    completedVideos.push(videoId)
    localStorage.setItem(completedKey, JSON.stringify(completedVideos))

    await supabase.from('transactions').insert({
      id: generateId(),
      user_id: user.value.id,
      amount: video.reward,
      type: 'video',
      description: `Video: ${video.title}`,
      status: 'completed',
      created_at: new Date().toISOString()
    })

    await supabase
      .from('videos')
      .update({ views: video.views + 1 })
      .eq('id', videoId)

    await loadAllData()
    const updatedUser = users.value.find(u => u.id === user.value.id)
    user.value = updatedUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    if (coinAnimationCallback.value) {
      coinAnimationCallback.value(video.reward)
    }

    return { success: true, amount: video.reward }
  }

  const addTaskReward = async (taskId) => {
    if (!user.value) return { success: false }
    if (user.value.is_admin) return { success: false, message: 'Admin cannot earn from tasks' }

    const task = tasks.value.find(t => t.id === taskId)
    if (!task) return { success: false }

    const completedKey = `completedTasks_${user.value.id}`
    const completedTasks = JSON.parse(localStorage.getItem(completedKey) || '[]')
    if (completedTasks.includes(taskId)) {
      return { success: false, message: 'Already completed' }
    }

    const userIndex = users.value.findIndex(u => u.id === user.value.id)
    if (userIndex === -1) return { success: false }

    const newBalance = users.value[userIndex].balance + task.reward
    const newPoints = users.value[userIndex].points + task.reward
    const newLevel = Math.floor(newPoints / 500) + 1

    await supabase
      .from('users')
      .update({ balance: newBalance, points: newPoints, level: newLevel })
      .eq('id', user.value.id)

    completedTasks.push(taskId)
    localStorage.setItem(completedKey, JSON.stringify(completedTasks))

    await supabase.from('transactions').insert({
      id: generateId(),
      user_id: user.value.id,
      amount: task.reward,
      type: 'task',
      description: `Task: ${task.title}`,
      status: 'completed',
      created_at: new Date().toISOString()
    })

    await loadAllData()
    const updatedUser = users.value.find(u => u.id === user.value.id)
    user.value = updatedUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    if (coinAnimationCallback.value) {
      coinAnimationCallback.value(task.reward)
    }

    return { success: true, amount: task.reward }
  }

  const requestWithdrawal = async (amount, phone) => {
    if (!user.value) return { success: false, message: 'Not logged in' }
    if (amount < 43900) return { success: false, message: 'minAmount' }
    if (amount > user.value.balance) return { success: false, message: 'insufficient' }

    const userIndex = users.value.findIndex(u => u.id === user.value.id)
    if (userIndex === -1) return { success: false }

    const newBalance = users.value[userIndex].balance - amount

    await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', user.value.id)

    await supabase.from('transactions').insert({
      id: generateId(),
      user_id: user.value.id,
      amount,
      type: 'withdrawal',
      description: `Withdrawal to ${phone}`,
      phone,
      status: 'pending',
      created_at: new Date().toISOString()
    })

    await loadAllData()
    const updatedUser = users.value.find(u => u.id === user.value.id)
    user.value = updatedUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    return { success: true, message: 'withdrawSuccess' }
  }

  const approveWithdrawal = async (transactionId) => {
    try {
      await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', transactionId)
      await loadAllData()
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const rejectWithdrawal = async (transactionId) => {
    try {
      const tx = transactions.value.find(t => t.id === transactionId)
      if (!tx) return { success: false }

      const userIndex = users.value.findIndex(u => u.id === tx.user_id)
      if (userIndex !== -1) {
        await supabase
          .from('users')
          .update({ balance: users.value[userIndex].balance + tx.amount })
          .eq('id', tx.user_id)
      }

      await supabase
        .from('transactions')
        .update({ status: 'rejected' })
        .eq('id', transactionId)

      await loadAllData()
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const checkDailyBonus = () => {
    if (!user.value) return { canClaim: false }
    
    const lastBonus = localStorage.getItem(`dailyBonus_${user.value.id}`)
    const today = new Date().toDateString()
    
    if (lastBonus === today) {
      return { canClaim: false, claimed: true }
    }

    const consecutive = localStorage.getItem(`consecutiveDays_${user.value.id}`) || 0
    
    return { 
      canClaim: true, 
      claimed: false,
      consecutive: parseInt(consecutive),
      bonus: 100 + (parseInt(consecutive) * 50)
    }
  }

  const claimDailyBonus = async () => {
    if (!user.value) return { success: false }
    
    const bonusData = checkDailyBonus()
    if (!bonusData.canClaim) return { success: false }

    const userIndex = users.value.findIndex(u => u.id === user.value.id)
    if (userIndex === -1) return { success: false }

    const bonus = bonusData.bonus
    const newBalance = users.value[userIndex].balance + bonus
    const newPoints = users.value[userIndex].points + (bonus / 2)

    await supabase
      .from('users')
      .update({ balance: newBalance, points: newPoints })
      .eq('id', user.value.id)

    const consecutive = (parseInt(localStorage.getItem(`consecutiveDays_${user.value.id}`) || 0)) + 1
    localStorage.setItem(`consecutiveDays_${user.value.id}`, consecutive)
    localStorage.setItem(`dailyBonus_${user.value.id}`, new Date().toDateString())

    await supabase.from('transactions').insert({
      id: generateId(),
      user_id: user.value.id,
      amount: bonus,
      type: 'bonus',
      description: 'Daily login bonus',
      status: 'completed',
      created_at: new Date().toISOString()
    })

    await loadAllData()
    const updatedUser = users.value.find(u => u.id === user.value.id)
    user.value = updatedUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    if (coinAnimationCallback.value) {
      coinAnimationCallback.value(bonus)
    }

    return { success: true, amount: bonus, consecutive }
  }

  const getUserTransactions = () => {
    if (!user.value) return []
    return transactions.value.filter(t => t.user_id === user.value.id)
  }

  const getAllTransactions = () => transactions.value

  const getPendingWithdrawals = () => transactions.value.filter(t => t.type === 'withdrawal' && t.status === 'pending')

  const getAdminAlerts = () => {
    return transactions.value
      .filter(t => ['withdrawal', 'registration', 'fraud_warning'].includes(t.type))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
  }

  const hasFraudWarning = (userId) => {
    return transactions.value.some(t => t.user_id === userId && t.type === 'fraud_warning' && t.status === 'failed')
  }

  const getUserEarned = (userId) => {
    return transactions.value
      .filter(t => t.user_id === userId && ['video', 'task', 'bonus', 'referral', 'registration'].includes(t.type) && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const toggleUserStatus = async (userId) => {
    try {
      const targetUser = users.value.find(u => u.id === userId)
      if (!targetUser) return { success: false }

      await supabase
        .from('users')
        .update({ is_active: !targetUser.is_active })
        .eq('id', userId)

      await loadAllData()
      return { success: true, isActive: !targetUser.is_active }
    } catch (error) {
      return { success: false }
    }
  }

  const addBalance = async (amount) => {
    if (!user.value) return { success: false }
    const userIndex = users.value.findIndex(u => u.id === user.value.id)
    if (userIndex === -1) return { success: false }
    
    const newBalance = users.value[userIndex].balance + amount
    const newPoints = users.value[userIndex].points + amount
    const newLevel = Math.floor(newPoints / 500) + 1
    
    await supabase
      .from('users')
      .update({ balance: newBalance, points: newPoints, level: newLevel })
      .eq('id', user.value.id)

    await supabase.from('transactions').insert({
      id: generateId(),
      user_id: user.value.id,
      amount,
      type: 'bonus',
      description: 'Welcome bonus',
      status: 'completed',
      created_at: new Date().toISOString()
    })
    
    await loadAllData()
    const updatedUser = users.value.find(u => u.id === user.value.id)
    user.value = updatedUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    if (coinAnimationCallback.value) {
      coinAnimationCallback.value(amount)
    }
    
    return { success: true, amount }
  }

  const claimWelcomeBonus = async () => {
    if (!user.value) return { success: false, message: 'Not logged in' }
    const alreadyClaimed = transactions.value.some(tx =>
      tx.user_id === user.value.id &&
      tx.type === 'bonus' &&
      tx.description === 'Welcome bonus' &&
      tx.status === 'completed'
    )
    if (alreadyClaimed) return { success: false, message: 'alreadyClaimed' }
    return addBalance(5000)
  }

  const updateProfile = async (userId, updates) => {
    try {
      const safeUpdates = { ...updates }
      if (safeUpdates.avatar_url == null || safeUpdates.avatar_url === '') {
        delete safeUpdates.avatar_url
      } else if (!(await ensureAvatarUrlColumn())) {
        delete safeUpdates.avatar_url
      }

      if (safeUpdates.currency && !(await ensureUserColumn('currency'))) {
        delete safeUpdates.currency
      }
      if (safeUpdates.language && !(await ensureUserColumn('language'))) {
        delete safeUpdates.language
      }

      await supabase
        .from('users')
        .update(safeUpdates)
        .eq('id', userId)

      await loadAllData()
      const updatedUser = users.value.find(u => u.id === userId)
      if (updatedUser) {
        user.value = updatedUser
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      }

      return { success: true, user: updatedUser }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, message: error.message }
    }
  }

  const getStats = () => {
    const totalUsers = users.value.length
    const activeUsers = users.value.filter(u => u.is_active).length
    const completedWithdrawals = transactions.value.filter(t => t.type === 'withdrawal' && t.status === 'completed')
    const totalPaid = completedWithdrawals.reduce((sum, t) => sum + t.amount, 0)
    const pendingWithdrawals = transactions.value.filter(t => t.type === 'withdrawal' && t.status === 'pending').length
    const totalEarned = transactions.value.filter(t => ['video', 'task', 'bonus', 'referral'].includes(t.type)).reduce((sum, t) => sum + t.amount, 0)

    return { totalUsers, activeUsers, totalPaid, pendingWithdrawals, totalEarned, videos: videos.value.length, tasks: tasks.value.length }
  }

  const currentUser = computed(() => {
    if (!user.value) {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        user.value = JSON.parse(stored)
        isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
        isAdmin.value = localStorage.getItem('isAdmin') === 'true'
      }
    }
    return user.value
  })

  const initAuth = async () => {
    const stored = localStorage.getItem('currentUser')
    if (stored) {
      user.value = JSON.parse(stored)
      isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
      isAdmin.value = localStorage.getItem('isAdmin') === 'true'
    }
    await initializeDatabase()
  }

  initAuth()

  return {
    user,
    isLoggedIn,
    isAdmin,
    loading,
    currentUser,
    login,
    register,
    logout,
    addVideoReward,
    addTaskReward,
    requestWithdrawal,
    approveWithdrawal,
    rejectWithdrawal,
    checkDailyBonus,
    claimDailyBonus,
    getUserTransactions,
    getAllTransactions,
    getPendingWithdrawals,
    toggleUserStatus,
    getStats,
    getUsers: () => users.value,
    getVideos: () => videos.value,
    getTasks: () => tasks.value,
    addBalance,
    claimWelcomeBonus,
    refreshData: loadAllData,
    getAdminAlerts,
    hasFraudWarning,
    recordFraudWarning,
    completeRegistrationRecord,
    getUserEarned,
    setCoinAnimationCallback: (callback) => {
      coinAnimationCallback.value = callback
    },
    updateProfile,
    getExchangeRate: () => EXCHANGE_RATE,
    convertToUSD: (rwf) => (rwf / EXCHANGE_RATE).toFixed(2),
    convertToRWF: (usd) => (usd * EXCHANGE_RATE).toFixed(0)
  }
})