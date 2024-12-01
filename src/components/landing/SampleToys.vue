<template>
  <section class="toys-section">
    <div class="toys-content">
      <h2 class="section-title">Amazing Creations by Our Learners</h2>
      <p class="section-subtitle">Discover the incredible toys handcrafted by our talented young innovators</p>

      <div class="toys-grid">
        <div v-for="(toy, index) in toys"
             :key="index"
             class="toy-card"
             :class="{ 'toy-card-active': hoveredCard === index }"
             @mouseenter="hoveredCard = index"
             @mouseleave="hoveredCard = null">
          <q-img :src="toy.image" class="toy-image" />
          <div class="toy-info">
            <h3>{{ toy.name }}</h3>
            <p>{{ toy.description }}</p>
            <div class="toy-creator">
              <q-avatar size="32px">
                <img :src="toy.studentImage">
              </q-avatar>
              <span>By {{ toy.student }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import toyTrain from '../../assets/toyElectricTrain1.jpeg'
import toyCar from '../../assets/toyElectricCar1.jpeg'
import toyJet from '../../assets/toyJet1.jpeg'
import student1 from '../../assets/student1.jpeg'
import student2 from '../../assets/student2.jpeg'
import student3 from '../../assets/student3.jpeg'

export default defineComponent({
  name: 'SampleToys',
  setup() {
    const toys = [
      {
        name: 'Electric Train',
        description: 'A fully functional electric train with remote control capabilities and LED lighting.',
        image: toyTrain,
        student: 'Sarah Johnson',
        studentImage: student1
      },
      {
        name: 'Smart Car',
        description: 'An innovative toy car with sensor-based obstacle detection and automatic braking.',
        image: toyCar,
        student: 'Michael Chen',
        studentImage: student2
      },
      {
        name: 'Model Jet',
        description: 'A detailed model jet aircraft with movable parts and realistic sound effects.',
        image: toyJet,
        student: 'Emma Davis',
        studentImage: student3
      }
    ]

    const hoveredCard = ref(null)

    return {
      toys,
      hoveredCard
    }
  }
})
</script>

<style scoped>
.toys-section {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.toys-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
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

.toys-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  padding: 1rem;
}

.toy-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
}

.toy-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.toy-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.toy-card:hover::after {
  border-color: #2193b0;
}

.toy-image {
  height: 300px;
  transition: transform 0.5s ease;
}

.toy-card:hover .toy-image {
  transform: scale(1.05);
}

.toy-info {
  padding: 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
}

.toy-info h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
  transition: color 0.3s ease;
}

.toy-card:hover .toy-info h3 {
  color: #2193b0;
}

.toy-info p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.toy-creator {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.toy-creator q-avatar {
  border: 2px solid #2193b0;
  transition: transform 0.3s ease;
}

.toy-creator span {
  font-weight: 600;
  color: #444;
}

.toy-card:hover .toy-creator q-avatar {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .toys-section {
    padding: 6rem 1rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  .toys-grid {
    gap: 2rem;
  }
}
</style>
