<template>
  <div class="ads-container">
    <ins
      class="adsbygoogle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="responsive"
    ></ins>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  adClient: {
    type: String,
    default: 'ca-pub-2947665984633906'
  },
  adSlot: {
    type: String,
    required: true
  },
  adFormat: {
    type: String,
    default: 'auto'
  },
  responsive: {
    type: Boolean,
    default: true
  }
})

onMounted(() => {
  try {
    (adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.log('AdSense error:', e)
  }
})
</script>

<style scoped>
.ads-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  min-height: 90px;
}
</style>
