<template>
  <q-layout view="lHh lpR fFf" style="height: 100vh;">
    <q-header class="gradient-navbar">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Wokoverse Tutor Assistant
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
                    <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                           @click="$q.fullscreen.toggle()"
                           v-if="$q.screen.gt.sm">
                    </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              class="notifications-menu"
            >
              <q-list style="min-width: 300px">
                <q-item class="notification-header">
                  <q-item-section>
                    <div class="text-h6">Notifications</div>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round dense icon="more_vert">
                      <q-menu>
                        <q-list style="min-width: 100px">
                          <q-item clickable v-close-popup>
                            <q-item-section>Mark all as read</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section>Clear all</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-item-section>
                </q-item>

                <q-separator />

                <messages></messages>

                <q-separator />

                <q-card-actions align="center" class="notification-footer">
                  <q-btn
                    label="View All Notifications"
                    flat
                    color="primary"
                    class="full-width"
                    icon="chevron_right"
                    icon-right
                  />
                </q-card-actions>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="32px">
              <img src="../assets/student5.jpeg">
            </q-avatar>
            <q-menu class="profile-menu">
              <q-list style="min-width: 220px">
                <q-item class="profile-header">
                  <q-item-section avatar>
                    <q-avatar size="56px">
                      <img src="../assets/student5.jpeg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-weight-bold">Maria Akello</div>
                    <div class="text-caption">Tutor</div>
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple class="profile-item" to="/profile">
                  <q-item-section avatar>
                    <q-icon name="person" size="sm" color="primary" />
                  </q-item-section>
                  <q-item-section>My Profile</q-item-section>
                </q-item>

                <q-item clickable v-ripple class="profile-item">
                  <q-item-section avatar>
                    <q-icon name="school" size="sm" color="primary" />
                  </q-item-section>
                  <q-item-section>My Learners</q-item-section>
                </q-item>

                <q-item clickable v-ripple class="profile-item" to="/settings">
                  <q-item-section avatar>
                    <q-icon name="settings" size="sm" color="primary" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple class="profile-item text-negative" @click="handleLogout">
                  <q-item-section avatar>
                    <q-icon name="logout" size="sm" color="negative" />
                  </q-item-section>
                  <q-item-section>Log Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="black-drawer"
    >
      <!-- Profile Section -->
      <div class="q-pt-none q-pb-sm flex items-center">
        <q-avatar size="40px" class="q-mr-md">
          <img src="../assets/student5.jpeg" alt="Profile Picture">
        </q-avatar>
        <div class="text-white">
          <div class="text-h6">Maria Akello</div>
        </div>
      </div>

      <!-- Thicker, White Separator -->
      <q-separator style="border-top: 1px solid white; margin-top: 4px; margin-bottom: 16px;"></q-separator>
      <div class="drawer-items">
        <q-list>
          <q-item
            class="item-element"
            to="/home"
            :class="{ 'item-active': activeItem === '/home' || activeItem === '/' }"
            @click="setActiveItem('/home')"
            >
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="item-element"
            to="/students"
            :class="{ 'item-active': activeItem === '/students' }"
            @click="setActiveItem('/students')"
            >
            <q-item-section avatar>
              <q-icon name="people"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Learners</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            class="item-element"
            to="/projects"
            :class="{ 'item-active': activeItem === '/projects' }"
            @click="setActiveItem('/projects')"
            >
            <q-item-section avatar>
              <q-icon name="card_giftcard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Projects</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="item-element"
            to="/lessonplans"
            :class="{ 'item-active': activeItem === '/lessonplans' }"
            @click="setActiveItem('/lessonplans')"
            >
            <q-item-section avatar>
              <q-icon name="insert_chart"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Lesson Plans</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="item-element"
            to="/calendar"
            :class="{ 'item-active': activeItem === '/calendar' }"
            @click="setActiveItem('/calendar')"
            >
            <q-item-section avatar>
              <q-icon name="table_chart"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Tutor Calendar</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="item-element"
            to="/wokoverse"
            :class="{ 'item-active': activeItem === '/wokoverse' }"
            @click="setActiveItem('/wokoverse')"
            >
            <q-item-section avatar>
              <q-icon name="insert_chart"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Wokoverse</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="item-element"
            to="/gallery"
            :class="{ 'item-active': activeItem === '/gallery' }"
            @click="setActiveItem('/gallery')"
            >
            <q-item-section avatar>
              <q-icon name="photo_library"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Resource Gallery</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="item-element"
            to="/users"
            :class="{ 'item-active': activeItem === '/users' }"
            @click="setActiveItem('/users')"
            >
            <q-item-section avatar>
              <q-icon name="card_giftcard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Application Users</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container class="scroll-content" :class="{ 'no-scroll': isWokoversePage }">
      <router-view/>
    </q-page-container>

    <!-- Bottom Navigation for Mobile -->
    <q-footer class="q-pa-none custom-footer" v-if="showFooter && $q.screen.lt.md">
      <q-tabs
        v-model="bottomNav"
        class="custom-tabs bg-grey-1 text-primary"
        align="justify"
        dense
        active-color="blue"
        indicator-color="blue"
      >
        <q-route-tab to="/home" name="home" label="Dashboard" icon="dashboard" class="custom-tab" @click="setActiveItem('/home')" />
        <q-route-tab to="/students" name="students" label="Learners" icon="people" class="custom-tab" @click="setActiveItem('/students')" />
        <q-route-tab to="/projects" name="projects" label="Projects" icon="card_giftcard" class="custom-tab" @click="setActiveItem('/projects')" />
        <q-route-tab to="/wokoverse" name="wokoverse" label="Wokoverse" icon="insert_chart" class="custom-tab" @click="setActiveItem('/wokoverse')" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import Messages from "./Messages.vue";
import { useRoute } from 'vue-router';
import {defineComponent, ref, computed} from 'vue'
import {useQuasar} from "quasar";
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {Messages},

  setup() {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const route = useRoute();
    const activeItem = ref(route.path);
    const bottomNav = ref('home');
    const router = useRouter()

    const setActiveItem = (route) => {
      activeItem.value = route;
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const showFooter = computed(() => route.path !== '/wokoverse');

    const isWokoversePage = computed(() => route.path === '/wokoverse');

    const handleLogout = () => {
      // Here you would typically clear any auth tokens/state
      router.push('/login')
    }

    return {
      $q,
      leftDrawerOpen,
      activeItem,
      setActiveItem,
      bottomNav,
      toggleLeftDrawer,
      showFooter,
      isWokoversePage,
      handleLogout
    }
  }
})
</script>

<style>

/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

.gradient-navbar {
  background: linear-gradient(to right, #0D06A9, #030F65);
  padding-top: env(safe-area-inset-top);
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}

.black-drawer {
  background-color: #313746;
  color: white !important;
  padding: 15px;
}

.drawer-items {
  padding: 10px;
}

.black-drawer .q-item-label {
  color: white !important;
}

.black-drawer .q-item.active .q-item-label,
.black-drawer .item-active .q-item-label {
  color: white!important;
}

.item-element {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;
  transition: all 0.3s ease;
}

.item-element:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.item-active {
  background: linear-gradient(to right, #215CD4, #153966);
  color: white !important;
  margin-top: 5px;
  box-shadow: 0 4px 15px rgba(33, 92, 212, 0.3);
  transform: translateX(5px);
}

.item-active:hover {
  transform: translateX(8px);
}

.scroll-content {
  height: calc(100vh - 64px); /* Adjust based on your header height */
  overflow-y: auto; /* Make only this section scrollable */
}

.no-scroll {
  overflow: hidden !important;
}

.q-drawer {
  height: 100vh; /* Ensure the drawer takes the full height of the viewport */
  position: fixed; /* Fix the drawer in place */
}

.custom-footer {
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1); /* Slight shadow for a floating look */
}

.custom-tabs {
  font-size: 0.8rem; /* Small font for labels */
}

.custom-tab {
  color: #555;
  text-transform: none; /* Prevents capitalization */
  padding: 5px 10px;
  transition: color 0.3s ease; /* Smooth transition for color on hover */
}

.custom-tab .q-icon {
  font-size: 1.2rem; /* Smaller icon size */
  margin-bottom: 3px; /* Space between icon and label */
}

.custom-tab:hover {
  color: #1e88e5; /* Hover color */
}

.custom-tab .q-tab__label {
  font-weight: 500; /* Slightly bold for better readability */
}

.custom-tab--active {
  color: #1e88e5 !important; /* Active color matches active-color prop */
}

/* Updated notification styles */
.notifications-menu {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.notification-header {
  background: linear-gradient(to right, #f7f7f7, #ffffff);
  padding: 16px;
}

.notification-header .text-h6 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.notification-footer {
  background: #f8fafc;
  padding: 12px;
}

.notification-footer .q-btn {
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
}

.notifications-menu .q-separator {
  background-color: #eef2f7;
}

/* Animation for the menu */
.jump-down-enter-active,
.jump-down-leave-active,
.jump-up-enter-active,
.jump-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.jump-down-enter-from,
.jump-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.jump-down-leave-to,
.jump-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

/* Profile Menu Styles */
.profile-menu {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.profile-header {
  background: linear-gradient(to right, #f7f7f7, #ffffff);
  padding: 16px;
}

.profile-header .text-weight-bold {
  font-size: 1.1rem;
  color: #2c3e50;
}

.profile-header .text-caption {
  color: #666;
  font-size: 0.9rem;
}

.profile-item {
  padding: 12px 16px;
  min-height: 48px;
  transition: background-color 0.3s;
}

.profile-item:hover {
  background-color: #f8fafc;
}

.profile-item .q-icon {
  font-size: 1.2rem;
}

.text-negative {
  color: #dc3545;
}

.text-negative .q-icon {
  color: #dc3545;
}

/* Increase the size of the main avatar in the toolbar */
.q-toolbar .q-avatar {
  transition: transform 0.3s ease;
}

.q-toolbar .q-avatar:hover {
  transform: scale(1.05);
}
</style>
