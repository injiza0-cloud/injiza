import { ref } from 'vue'

const showCoinAnimation = ref(false)
const animationAmount = ref(0)

export function useCoinAnimation() {
  const triggerAnimation = (amount) => {
    animationAmount.value = amount
    showCoinAnimation.value = true
    setTimeout(() => {
      showCoinAnimation.value = false
    }, 2000)
  }

  return {
    showCoinAnimation,
    animationAmount,
    triggerAnimation
  }
}