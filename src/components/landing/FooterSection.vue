<template>
  <footer class="footer-section">
    <div class="footer-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#1a1a1a" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>

    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="../../assets/wokober-logo.png" alt="Wokoverse" class="footer-logo">
          <p class="brand-description">Empowering the next generation of innovators through creative toy making and hands-on learning experiences.</p>
          <div class="social-icons">
            <a href="#" class="social-icon" aria-label="Facebook">
              <q-icon name="fab fa-facebook" />
              <span class="social-tooltip">Follow on Facebook</span>
            </a>
            <a href="#" class="social-icon" aria-label="Twitter">
              <q-icon name="fab fa-twitter" />
              <span class="social-tooltip">Follow on Twitter</span>
            </a>
            <a href="#" class="social-icon" aria-label="Instagram">
              <q-icon name="fab fa-instagram" />
              <span class="social-tooltip">Follow on Instagram</span>
            </a>
            <a href="#" class="social-icon" aria-label="LinkedIn">
              <q-icon name="fab fa-linkedin" />
              <span class="social-tooltip">Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-contact">
          <h3>Contact Us</h3>
          <div class="contact-info">
            <p>
              <q-icon name="location_on" />
              <span>Elephante Commons, Gulu - Uganda</span>
            </p>
            <p>
              <q-icon name="phone" />
              <span>+256 784 041 804</span>
            </p>
            <p>
              <q-icon name="email" />
              <span>info@wokoverse.com</span>
            </p>
          </div>
        </div>

        <div class="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest updates and innovations.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Enter your email" class="newsletter-input">
            <button class="newsletter-btn">
              Subscribe
              <q-icon name="send" class="send-icon" />
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Wokoverse. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
.footer-section {
  position: relative;
  background: #1a1a1a;
  color: white;
  padding: 8rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-wave {
  position: absolute;
  top: -120px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-brand {
  grid-column: span 1;
}

.footer-logo {
  width: 150px;
  margin-bottom: 1.5rem;
  filter: brightness(0) invert(1);
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.05);
}

.brand-description {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.social-icon:hover {
  color: white;
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.2);
}

.social-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.social-icon:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.footer-links h3,
.footer-contact h3,
.footer-newsletter h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: white;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-links h3::after,
.footer-contact h3::after,
.footer-newsletter h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  line-height: 2.2;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: white;
  transform: translateX(8px);
}

.footer-links a:hover::after {
  width: 100%;
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.contact-info p:hover {
  color: white;
  transform: translateX(8px);
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 201, 255, 0.2);
}

.send-icon {
  transition: transform 0.3s ease;
}

.newsletter-btn:hover .send-icon {
  transform: translateX(4px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 6rem 1.5rem 2rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-brand {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }

  .footer-links h3::after,
  .footer-contact h3::after,
  .footer-newsletter h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-links,
  .footer-contact,
  .footer-newsletter {
    text-align: center;
  }

  .contact-info p {
    justify-content: center;
  }
}
</style>
