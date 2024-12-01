<template>
  <q-page class="contact-page">
    <div class="contact-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#215CD4" fill-opacity="0.3" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>

    <div class="contact-content">
      <h1 class="section-title" v-motion-slide-visible-once-bottom>Get in Touch</h1>
      <p class="section-subtitle" v-motion-slide-visible-once-bottom>We'd love to hear from you. Let's build something amazing together.</p>

      <div class="contact-grid">
        <div class="contact-info" v-motion-slide-visible-once-left>
          <div class="info-card">
            <div class="info-item">
              <q-icon name="location_on" class="gradient-icon" />
              <div class="info-text">
                <h3>Visit Us</h3>
                <p>Elephante Commons, Gulu - Uganda</p>
              </div>
            </div>

            <div class="info-item">
              <q-icon name="phone" class="gradient-icon" />
              <div class="info-text">
                <h3>Call Us</h3>
                <p>+256 784 041 804</p>
              </div>
            </div>

            <div class="info-item">
              <q-icon name="email" class="gradient-icon" />
              <div class="info-text">
                <h3>Email Us</h3>
                <p>info@wokober.com</p>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="social-icon"><q-icon name="fab fa-twitter" /></a>
              <a href="#" class="social-icon"><q-icon name="fab fa-linkedin" /></a>
              <a href="#" class="social-icon"><q-icon name="fab fa-github" /></a>
              <a href="#" class="social-icon"><q-icon name="fab fa-instagram" /></a>
            </div>
          </div>
        </div>

        <div class="contact-form" v-motion-slide-visible-once-right>
          <form @submit.prevent="submitForm" class="form-card">
            <div class="form-grid">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="form.firstName" placeholder="John" required>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="form.lastName" placeholder="Doe" required>
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" placeholder="john@example.com" required>
            </div>

            <div class="form-group">
              <label>Subject</label>
              <input type="text" v-model="form.subject" placeholder="How can we help?" required>
            </div>

            <div class="form-group">
              <label>Message</label>
              <textarea v-model="form.message" rows="5" placeholder="Your message here..." required></textarea>
            </div>

            <button type="submit" class="submit-btn">
              <span class="btn-content">
                <q-icon name="send" class="icon-right" />
                <span class="btn-text">Send Message</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <footer-section />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FooterSection from 'components/landing/FooterSection.vue'

export default defineComponent({
  name: 'ContactPage',
  components: {
    FooterSection
  },
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    })

    const submitForm = () => {
      // Handle form submission
      console.log('Form submitted:', form.value)
    }

    return {
      form,
      submitForm
    }
  }
})
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.contact-wave {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  line-height: 0;
  transform: rotate(180deg);
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.info-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(33, 147, 176, 0.08);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.gradient-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #153966 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info-text h3 {
  color: #153966;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.info-text p {
  color: #64748b;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #153966 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.form-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(33, 147, 176, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #153966;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.submit-btn {
  background: linear-gradient(135deg, #153966, #2563eb);
  border-radius: 50px;
  padding: 8px 36px;
  width: 100%;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  gap: 0.5rem;
}

.icon-right {
  transition: transform 0.3s ease;
}

.submit-btn:hover .icon-right {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-content {
    padding: 4rem 1.5rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .info-card,
  .form-card {
    padding: 2rem;
  }
}
</style>
