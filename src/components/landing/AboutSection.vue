<template>
  <section class="about-section">
    <div class="about-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#215CD4" fill-opacity="0.3" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>

    <div class="about-content">
      <h1 class="section-title" v-motion-slide-visible-once-bottom>Our Story</h1>
      <p class="section-subtitle" v-motion-slide-visible-once-bottom>Empowering young minds through innovation and creativity</p>

      <div class="about-grid">
        <div class="about-image-container" v-motion-slide-visible-once-left>
          <div class="image-stack">
            <q-img src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80" class="main-image" />
            <q-img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80" class="overlay-image" />
          </div>
        </div>

        <div class="about-text" v-motion-slide-visible-once-right>
          <div class="mission-card">
            <div class="mission-icon">
              <q-icon name="rocket_launch" size="48px" class="gradient-icon" />
            </div>
            <h2>Our Mission</h2>
            <p>At Wokober, we believe in nurturing creativity and innovation in young minds through hands-on learning experiences. Our mission is to empower the next generation of inventors, makers, and problem solvers.</p>
          </div>

          <div class="stats-grid">
            <div v-for="(stat, index) in stats"
                 :key="index"
                 class="stat-card"
                 v-motion-slide-visible-once-bottom
                 :style="{ transitionDelay: index * 100 + 'ms' }"
                 @mouseenter="hoveredStat = index"
                 @mouseleave="hoveredStat = null"
                 :class="{ 'stat-card-active': hoveredStat === index }">
              <q-icon :name="stat.icon" class="gradient-icon" />
              <h3><CountUp :endVal="parseInt(stat.value)" :duration="2" :suffix="stat.suffix" /></h3>
              <p>{{ stat.label }}</p>
              <p class="stat-description">{{ stat.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="values-section" v-motion-slide-visible-once-bottom>
        <h2 class="values-title">Our Values</h2>
        <div class="values-grid">
          <div v-for="(value, index) in values"
               :key="index"
               class="value-card"
               v-motion-slide-visible-once-bottom
               :style="{ transitionDelay: index * 100 + 'ms' }"
               @mouseenter="hoveredValue = index"
               @mouseleave="hoveredValue = null"
               :class="{ 'value-card-active': hoveredValue === index }">
            <q-icon :name="value.icon" class="gradient-icon" />
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
            <ul class="benefits-list">
              <li v-for="(benefit, idx) in value.benefits" :key="idx">
                {{ benefit }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CountUp from 'vue-countup-v3'

export default defineComponent({
  name: 'AboutSection',
  components: {
    CountUp
  },
  setup() {
    const hoveredStat = ref(null)
    const hoveredValue = ref(null)

    const stats = [
      {
        icon: 'school',
        value: '1000+',
        suffix: '+',
        label: 'Students Empowered',
        description: 'Young minds trained in STEM education and creative thinking'
      },
      {
        icon: 'engineering',
        value: '500+',
        suffix: '+',
        label: 'Projects Completed',
        description: 'Innovative projects built by our students using recycled materials'
      },
      {
        icon: 'psychology',
        value: '50+',
        suffix: '+',
        label: 'Expert Mentors',
        description: 'Dedicated professionals guiding students in their learning journey'
      },
      {
        icon: 'public',
        value: '10+',
        suffix: '+',
        label: 'Partner Schools',
        description: 'Educational institutions collaborating in our mission'
      }
    ]

    const values = [
      {
        icon: 'lightbulb',
        title: 'Innovation',
        description: 'Fostering creative thinking and problem-solving skills through hands-on projects and experimental learning',
        benefits: ['Critical thinking development', 'Creative problem solving', 'Technical skills growth']
      },
      {
        icon: 'diversity_3',
        title: 'Collaboration',
        description: 'Working together to achieve greater outcomes through team projects and peer learning experiences',
        benefits: ['Team building skills', 'Communication development', 'Leadership opportunities']
      },
      {
        icon: 'psychology_alt',
        title: 'Growth Mindset',
        description: 'Embracing challenges as opportunities to learn and develop new skills through continuous improvement',
        benefits: ['Resilience building', 'Confidence development', 'Lifelong learning']
      }
    ]

    return {
      hoveredStat,
      hoveredValue,
      stats,
      values
    }
  }
})
</script>

<style scoped>
.about-section {
  position: relative;
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  overflow: hidden;
}

.about-wave {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  line-height: 0;
  transform: rotate(180deg);
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-title {
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #184283 0%, #215CD4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  text-align: center;
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 4rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.image-stack {
  position: relative;
  width: 100%;
  height: 500px;
}

.main-image {
  width: 80%;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.overlay-image {
  position: absolute;
  width: 60%;
  height: 300px;
  bottom: 0;
  right: 0;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.image-stack:hover .main-image {
  transform: translateY(-10px);
}

.image-stack:hover .overlay-image {
  transform: translate(-10px, -10px);
}

.mission-card, .stat-card, .value-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(33, 147, 176, 0.08);
  transition: all 0.3s ease;
}

.gradient-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #153966 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.values-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #153966 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2.5rem;
  }
}

.stat-card, .value-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(33, 147, 176, 0.08);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  cursor: pointer;
}

.stat-card:hover, .value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(33, 147, 176, 0.12);
}

.stat-card::after, .value-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.stat-card:hover::after, .value-card:hover::after {
  border-color: #153966;
}

.benefits-list {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

.benefits-list li {
  margin: 0.5rem 0;
  color: #64748b;
  position: relative;
}

.benefits-list li::before {
  content: '•';
  color: #2193b0;
  position: absolute;
  left: -1rem;
}

.stat-description {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
}

.stat-card h3 {
  color: #153966;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0;
}

.stat-card p {
  color: #64748b;
}

.value-card h3 {
  color: #153966;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
}

.value-card p {
  color: #64748b;
  line-height: 1.6;
}

.mission-card {
  background: linear-gradient(135deg, rgba(21, 57, 102, 0.03) 0%, rgba(37, 99, 235, 0.03) 100%);
  border: 1px solid rgba(21, 57, 102, 0.1);
}

.mission-card h2 {
  color: #153966;
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0;
}

.mission-card p {
  color: #64748b;
  line-height: 1.8;
}

.stat-card-active, .value-card-active {
  background: linear-gradient(135deg, rgba(33, 147, 176, 0.03) 0%, rgba(109, 213, 237, 0.03) 100%);
}
</style>
