<template>
  <q-page class="about-page">
    <about-section />
    <footer-section />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AboutSection from 'components/landing/AboutSection.vue'
import FooterSection from 'components/landing/FooterSection.vue'

export default defineComponent({
  name: 'AboutPage',
  components: {
    AboutSection,
    FooterSection
  }
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
}
</style>
