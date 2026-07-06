<template>
  <div v-if="show" class="interstitial-ad" @click="close">
    <div class="ad-content" @click.stop>
      <button class="close-ad" @click="close">✕</button>
      <ins class="adsbygoogle"
        data-ad-client="ca-pub-2947665984633906"
        :data-ad-slot="adSlot"
        data-ad-format="rectangle"
        data-full-width-responsive="false"></ins>
      <p class="ad-label">Advertisement</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  adSlot: {
    type: String,
    default: '1234567894'
  },
  autoShow: {
    type: Boolean,
    default: true
  }
})

const show = ref(false)

const display = () => {
  show.value = true
  try {
    (adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.log('Ad error:', e)
  }
}

const close = () => {
  show.value = false
}

defineExpose({ display, close })

onMounted(() => {
  if (props.autoShow) {
    setTimeout(display, 3000)
  }
})
</script>

<style scoped>
.interstitial-ad {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.ad-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  position: relative;
}

.close-ad {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #333;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.ad-label {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
</style>
