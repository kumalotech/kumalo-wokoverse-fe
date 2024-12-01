<template>
  <q-page class="landing-page">
    <hero-section @apply="onApply" />
    <sample-toys />
    <testimonials />
    <footer-section />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeroSection from 'components/landing/HeroSection.vue'
import SampleToys from 'components/landing/SampleToys.vue'
import Testimonials from 'components/landing/Testimonials.vue'
import FooterSection from 'components/landing/FooterSection.vue'

export default defineComponent({
  name: 'LandingPage',
  components: {
    HeroSection,
    SampleToys,
    Testimonials,
    FooterSection
  },
  methods: {
    onApply() {
      this.$router.push('/login')
    }
  }
})
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.landing-page :deep(.q-page-container) {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>