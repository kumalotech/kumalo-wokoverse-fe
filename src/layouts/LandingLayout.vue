<template>
  <q-layout view="lHh lpR fFf">
    <q-header class="bg-white text-dark">
      <q-toolbar class="navbar">
        <q-toolbar-title>
          <router-link to="/" class="logo-link">
            <img src="../assets/wokober-logo.png" alt="Wokoverse" class="nav-logo">
          </router-link>
        </q-toolbar-title>

        <div class="nav-links" v-if="!$q.screen.lt.sm">
          <router-link to="/" class="nav-item" :class="{ 'active': $route.path === '/' }">
            <q-icon name="home" size="sm" class="nav-icon" />
            <span>Home</span>
          </router-link>
          <router-link to="/about" class="nav-item" :class="{ 'active': $route.path === '/about' }">
            <q-icon name="info" size="sm" class="nav-icon" />
            <span>About</span>
          </router-link>
          <router-link to="/contact" class="nav-item" :class="{ 'active': $route.path === '/contact' }">
            <q-icon name="contact_support" size="sm" class="nav-icon" />
            <span>Contact</span>
          </router-link>
          <q-btn unelevated class="login-btn" to="/login">
            <template v-slot:default>
              <q-icon name="login" class="login-icon" />
              <span>Login</span>
            </template>
          </q-btn>
        </div>

        <q-btn
          v-else
          flat
          round
          color="dark"
          icon="menu"
          class="menu-btn"
          @click="drawer = !drawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      side="right"
      overlay
      bordered
      v-if="$q.screen.lt.sm"
    >
      <q-list padding>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section>About</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/contact">
          <q-item-section>Contact</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/login">
          <q-item-section>Login</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LandingLayout',
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.logo-link {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.02);
}

.nav-logo {
  height: 40px;
  transition: filter 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #153966, #2563eb);
  transition: width 0.3s ease;
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 100%;
}

.nav-item:hover,
.nav-item.active {
  color: #2563eb;
}

.nav-item:hover .nav-icon,
.nav-item.active .nav-icon {
  transform: translateY(-2px);
  color: #2563eb;
}

.nav-icon {
  transition: all 0.3s ease;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  color: white;
  background: linear-gradient(135deg, #153966, #2563eb);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2563eb, #153966);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
}

.login-btn:hover::before {
  opacity: 1;
}

.login-btn:active {
  transform: translateY(0);
}

.login-btn span,
.login-btn .login-icon {
  z-index: 1;
  transition: all 0.3s ease;
}

.login-btn:hover .login-icon {
  transform: translateX(-2px);
}

.login-btn:hover span {
  transform: translateX(2px);
}

.menu-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.menu-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .nav-logo {
    height: 32px;
  }
}

/* Dark mode support */
:root[data-theme="dark"] .navbar {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

:root[data-theme="dark"] .nav-item {
  color: #e2e8f0;
}

:root[data-theme="dark"] .nav-item:hover {
  color: #60a5fa;
}

:root[data-theme="dark"] .nav-item::after {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

:root[data-theme="dark"] .login-btn {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

:root[data-theme="dark"] .login-btn::before {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}
</style>
