<template>
  <section class="testimonials-section">
    <div class="testimonials-content">
      <h2 class="section-title">What Our Learners Say</h2>
      <p class="section-subtitle">Hear from the young innovators who have experienced our program</p>

      <div class="testimonials-grid">
        <div v-for="(testimonial, index) in testimonials"
             :key="index"
             class="testimonial-card"
             :class="{ 'testimonial-card-active': hoveredCard === index }"
             @mouseenter="hoveredCard = index"
             @mouseleave="hoveredCard = null">
          <div class="testimonial-header">
            <q-avatar size="80px" class="testimonial-avatar">
              <img :src="testimonial.image" alt="Student Avatar">
            </q-avatar>
            <div class="quote-marks">"</div>
          </div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <div class="testimonial-author">
            <strong>{{ testimonial.name }}</strong>
            <span>{{ testimonial.age }} years old</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import student4 from 'src/assets/student4.jpeg'
import student5 from 'src/assets/student5.jpeg'
import student6 from 'src/assets/student6.jpeg'

export default defineComponent({
  name: 'Testimonials',
  setup() {
    const hoveredCard = ref(null)

    const testimonials = [
      {
        name: 'David Okello',
        age: 12,
        text: "I never thought I could build my own toys! The mentors are amazing and helped me turn my ideas into reality. Now I want to become an engineer!",
        image: student4
      },
      {
        name: 'Sarah Akello',
        age: 14,
        text: "Wokober has taught me that I can create anything I imagine. Making toys is not just fun, it's teaching me problem-solving and creativity.",
        image: student5
      },
      {
        name: 'John Opio',
        age: 13,
        text: "The best part is seeing my toy ideas come to life. I've learned so much about electronics and mechanics while having fun with my friends.",
        image: student6
      }
    ]

    return {
      testimonials,
      hoveredCard
    }
  }
})
</script>

<style scoped>
.testimonials-section {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
}

.testimonials-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.section-subtitle {
  text-align: center;
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  padding: 1rem;
}

.testimonial-card {
  background: white;
  padding: 3rem 2rem 2rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 2px solid transparent;
}

.testimonial-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.testimonial-card:hover::after {
  border-color: #2193b0;
}

.testimonial-header {
  position: relative;
  margin-bottom: 2rem;
}

.testimonial-avatar {
  border: 4px solid #2193b0;
  box-shadow: 0 8px 16px rgba(33, 147, 176, 0.2);
  transition: all 0.3s ease;
}

.testimonial-card:hover .testimonial-avatar {
  transform: scale(1.1) rotate(5deg);
  border-color: #6dd5ed;
}

.quote-marks {
  position: absolute;
  top: -1rem;
  left: 1rem;
  font-size: 6rem;
  color: #2193b0;
  opacity: 0.1;
  font-family: 'Georgia', serif;
  transition: all 0.3s ease;
}

.testimonial-card:hover .quote-marks {
  transform: translateY(-5px) rotate(-10deg);
  opacity: 0.15;
}

.testimonial-text {
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #2193b0;
}

.testimonial-author strong {
  font-size: 1.2rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.testimonial-author span {
  color: #666;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 6rem 1rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  .testimonials-grid {
    gap: 2rem;
  }

  .testimonial-card {
    padding: 2rem 1.5rem 1.5rem;
  }
}
</style>
