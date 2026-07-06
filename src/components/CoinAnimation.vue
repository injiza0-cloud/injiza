<template>
  <Teleport to="body">
    <div v-if="show" class="coin-animation-container" ref="containerRef">
      <div 
        v-for="(coin, index) in coins" 
        :key="index"
        class="flying-coin"
        :style="getCoinStyle(coin)"
      >
        🪙
      </div>
      <div class="amount-popup" :class="{ show: showAmount }">
        +{{ amount.toLocaleString() }} RWF
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  amount: {
    type: Number,
    default: 0
  }
})

const containerRef = ref(null)
const showAmount = ref(false)

const playCoinSound = () => {
  if (typeof window === 'undefined') return
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return

  const ctx = new AudioCtx()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(880, ctx.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.16)

  gainNode.gain.setValueAtTime(0.0001, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3)

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.32)
  setTimeout(() => ctx.close(), 350)
}

const coins = computed(() => {
  const coinCount = 10
  return Array.from({ length: coinCount }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: Math.random() * 100 - 50,
    rotation: Math.random() * 360,
    size: 20 + Math.random() * 20
  }))
})

const getCoinStyle = (coin) => {
  return {
    '--delay': `${coin.delay}s`,
    '--x': `${coin.x}px`,
    '--rotation': `${coin.rotation}deg`,
    '--size': `${coin.size}px`
  }
}

watch(() => props.show, (value) => {
  if (!value) {
    showAmount.value = false
    return
  }

  showAmount.value = false
  playCoinSound()
  setTimeout(() => {
    showAmount.value = true
  }, 1000)
}, { flush: 'post' })
</script>

<style scoped>
.coin-animation-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
  overflow: hidden;
}

.flying-coin {
  position: absolute;
  font-size: var(--size);
  animation: flyUp 2.4s var(--delay) ease-out forwards;
  left: 50%;
  bottom: 0;
  transform: translateX(var(--x)) rotate(var(--rotation));
}

@keyframes flyUp {
  0% {
    transform: translateX(var(--x)) translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(var(--x)) translateY(-100vh) rotate(var(--rotation));
    opacity: 0;
  }
}

.amount-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 800;
  color: #FFD700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.8s ease-out;
}

.amount-popup.show {
  opacity: 1;
  animation: pulseAmount 0.5s ease-out;
}

@keyframes pulseAmount {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>