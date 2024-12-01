<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">Empowering Young Minds Through Creative Toy Making</h1>
        <p class="hero-subtitle">Join our innovative program where children learn engineering, creativity, and problem-solving through hands-on toy making experiences</p>
        <div class="hero-actions">
          <q-btn
            class="app-btn"
            unelevated
            to="/login"
          >
            <div class="btn-content">
              <q-icon name="school" class="icon-left" />
              <span class="btn-text">Apply Now</span>
              <q-icon name="arrow_forward" class="icon-right" />
            </div>
          </q-btn>
        </div>
      </div>
      <div class="hero-images">
        <div class="image-grid">
          <div v-for="(img, index) in images" :key="index" class="img-wrapper">
            <q-img
              :src="img"
              :class="['grid-img', `img${index + 1}`]"
              loading="lazy"
              transition="fade"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import student1 from '../../assets/student1.jpeg'
import student2 from '../../assets/student2.jpeg'
import student3 from '../../assets/student3.jpeg'
import student4 from '../../assets/student4.jpeg'

export default defineComponent({
  name: 'HeroSection',
  setup() {
    const images = [
      student1,
      student2,
      student3,
      student4
    ]

    return {
      images
    }
  }
})
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #0D06A9 0%, #030F65 100%);
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.app-btn {
  background: linear-gradient(135deg, #153966, #2563eb);
  border-radius: 50px;
  padding: 8px 36px;
  min-height: 54px;
  min-width: 200px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-btn:hover {
  background: linear-gradient(135deg, #2563eb, #153966);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.icon-left,
.icon-right,
.btn-text {
  color: white !important;
}

.icon-left {
  margin-right: 12px;
  font-size: 1.3em;
  transition: transform 0.3s ease;
}

.icon-right {
  margin-left: 12px;
  font-size: 1.2em;
  transition: transform 0.3s ease;
}

.btn-text {
  transition: transform 0.3s ease;
}

.app-btn:hover .icon-left {
  transform: translateX(-4px) scale(1.1);
}

.app-btn:hover .btn-text {
  transform: scale(1.02);
}

.app-btn:hover .icon-right {
  transform: translateX(4px) scale(1.1);
  color: white !important;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.img-wrapper {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
}

.grid-img {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.grid-img:hover {
  transform: scale(1.05);
}

.img1 { transform: rotate(-5deg); }
.img2 { transform: rotate(5deg); }
.img3 { transform: rotate(3deg); }
.img4 { transform: rotate(-3deg); }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .image-grid {
    max-width: 500px;
    margin: 0 auto;
  }

  .app-btn {
    padding: 8px 28px;
    min-height: 48px;
    min-width: 180px;
  }

  .btn-content {
    font-size: 1rem;
  }
}
</style>
