<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Settings Navigation -->
      <div class="col-12 col-md-3">
        <q-card class="settings-nav">
          <q-list padding>
            <q-item clickable v-ripple
                    v-for="item in menuItems"
                    :key="item.label"
                    :active="selectedTab === item.value"
                    @click="selectedTab = item.value"
                    active-class="text-primary">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Settings Content -->
      <div class="col-12 col-md-9">
        <q-card class="settings-content">
          <!-- Account Settings -->
          <q-tab-panels v-model="selectedTab" animated>
            <q-tab-panel name="account">
              <div class="text-h6 q-mb-md">Account Settings</div>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input filled v-model="form.firstName"
                             label="First Name"
                             class="custom-input">
                      <template v-slot:prepend>
                        <q-icon name="person" class="gradient-text" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input filled v-model="form.lastName"
                             label="Last Name"
                             class="custom-input">
                      <template v-slot:prepend>
                        <q-icon name="person" class="gradient-text" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-input filled v-model="form.email"
                             label="Email" type="email"
                             class="custom-input">
                      <template v-slot:prepend>
                        <q-icon name="email" class="gradient-text" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row justify-end q-mt-md">
                  <q-btn label="Save Changes" type="submit"
                         class="add-new-btn"/>
                </div>
              </q-form>
            </q-tab-panel>

            <!-- Security Settings -->
            <q-tab-panel name="security">
              <div class="text-h6 q-mb-md">Security Settings</div>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input filled v-model="form.currentPassword"
                         label="Current Password"
                         type="password"
                         class="custom-input">
                  <template v-slot:prepend>
                    <q-icon name="lock" class="gradient-text" />
                  </template>
                </q-input>
                <q-input filled v-model="form.newPassword"
                         label="New Password"
                         type="password"
                         class="custom-input">
                  <template v-slot:prepend>
                    <q-icon name="lock" class="gradient-text" />
                  </template>
                </q-input>
                <q-input filled v-model="form.confirmPassword"
                         label="Confirm Password"
                         type="password"
                         class="custom-input">
                  <template v-slot:prepend>
                    <q-icon name="lock" class="gradient-text" />
                  </template>
                </q-input>
                <div class="row justify-end q-mt-md">
                  <q-btn label="Update Password" type="submit"
                         class="add-new-btn" />
                </div>
              </q-form>
            </q-tab-panel>

            <!-- Notification Settings -->
            <q-tab-panel name="notifications">
              <div class="text-h6 q-mb-md">Notification Settings</div>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Email Notifications</q-item-label>
                    <q-item-label caption>
                      Receive email updates about your account
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.email" color="primary"/>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Push Notifications</q-item-label>
                    <q-item-label caption>
                      Receive push notifications on your device
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.push" color="primary"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <!-- Theme Settings -->
            <q-tab-panel name="appearance">
              <div class="text-h6 q-mb-md">Appearance Settings</div>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>Theme Mode</q-item-label>
                    <q-item-label caption>
                      Choose between light and dark mode
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn-toggle
                      v-model="theme"
                      flat
                      spread
                      :options="[
                        {label: 'Light', value: 'light', icon: 'light_mode'},
                        {label: 'Dark', value: 'dark', icon: 'dark_mode'}
                      ]"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SettingsPage',
  setup () {
    const $q = useQuasar()
    const selectedTab = ref('account')
    const theme = ref($q.dark.isActive ? 'dark' : 'light')

    const menuItems = [
      { label: 'Account', value: 'account', icon: 'person' },
      { label: 'Security', value: 'security', icon: 'security' },
      { label: 'Notifications', value: 'notifications', icon: 'notifications' },
      { label: 'Appearance', value: 'appearance', icon: 'palette' }
    ]

    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const notifications = ref({
      email: true,
      push: false
    })

    const onSubmit = () => {
      // Handle form submission
      console.log('Form submitted')
    }

    // Watch for theme changes
    watch(theme, (newTheme) => {
      $q.dark.set(newTheme === 'dark')
      localStorage.setItem('theme', newTheme)
    })

    return {
      selectedTab,
      menuItems,
      form,
      notifications,
      theme,
      onSubmit
    }
  }
})
</script>

<style scoped>
.settings-nav {
  border-radius: 12px;
  transition: all 0.3s ease;
  height: 100%;
}

.settings-content {
  border-radius: 12px;
  transition: all 0.3s ease;
  padding: 24px;
}

.settings-nav:hover, .settings-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.q-item.q-router-link--active,
.q-item--active {
  background: rgba(0, 0, 0, 0.03);
}

.q-page {
  padding-top: 32px !important;
  max-width: 1400px;
  margin: 0 auto;
}

.q-input {
  max-width: 100%;
}

.q-input :deep(.q-field__control) {
  height: 44px;
  border-radius: 8px;
  background: var(--q-primary-fade);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.q-input :deep(.q-field__control:hover) {
  border-color: var(--q-primary);
}

.q-input :deep(.q-field__native) {
  padding: 0 12px;
}

.q-input :deep(.q-field__label) {
  top: 12px;
  left: 12px;
  font-weight: 500;
  font-size: 0.9rem;
}

.q-input :deep(.q-field--focused .q-field__control) {
  border-color: var(--q-primary);
  box-shadow: 0 0 0 3px rgba(var(--q-primary-rgb), 0.1);
}

.q-input :deep(.q-field__bottom) {
  display: none;
}

.q-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  border-radius: 8px;
  color: white;
  font-weight: 500;
  padding: 8px 24px;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.q-btn:active {
  transform: translateY(0);
}

.q-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.q-btn:hover::after {
  opacity: 1;
}

:root {
  --q-primary-rgb: 79, 70, 229;
  --q-primary-fade: rgba(79, 70, 229, 0.05);
}

.body--dark {
  --q-primary-fade: rgba(79, 70, 229, 0.1);
}

.body--dark .settings-nav,
.body--dark .settings-content {
  background: #1a1a1a;
}

.body--dark .q-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.body--dark .q-input :deep(.q-field__control:hover) {
  border-color: var(--q-primary);
}

.body--dark .q-item.q-router-link--active,
.body--dark .q-item--active {
  background: rgba(255, 255, 255, 0.05);
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 24px;
}

.q-form {
  max-width: 800px;
}

.q-list {
  padding: 0;
}

.q-item {
  padding: 12px 16px;
}

/* Button Styles from Learners.vue */
.add-new-btn {
  background: #ffffff;
  color: #64748b;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 8px 20px;
  font-weight: 600;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  min-height: 40px;
}

.add-new-btn:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(135deg, #153966, #2563eb);
  transition: 0.5s ease;
  z-index: -1;
}

.add-new-btn:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);
  border-color: transparent;
}

.add-new-btn:hover:before {
  width: 100%;
}

.add-new-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(21, 57, 102, 0.1);
}

/* Input Styles */
.custom-input {
  margin-bottom: 0;
}

.custom-input :deep(.q-field__control) {
  border-radius: 12px;
  height: 44px;
  background: var(--q-primary-fade);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.custom-input :deep(.q-field__marginal) {
  height: 44px;
  min-height: 44px;
}

.custom-input :deep(.q-field__label) {
  font-size: 14px;
  font-weight: 500;
  color: #3949AB;
}

.custom-input :deep(.q-field__native) {
  font-size: 14px;
  font-weight: 500;
  color: #1A237E;
  padding-top: 0;
  padding-bottom: 0;
}

.custom-input :deep(.q-field__control:before),
.custom-input :deep(.q-field__control:after) {
  display: none;
}

/* Icon styling */
.gradient-text {
  background: linear-gradient(135deg, #153966, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.2rem;
}

/* Hover and focus states for inputs */
.custom-input :deep(.q-field__control:hover) {
  border-color: var(--q-primary);
}

.custom-input :deep(.q-field--focused .q-field__control) {
  border-color: var(--q-primary);
  box-shadow: 0 0 0 3px rgba(var(--q-primary-rgb), 0.1);
}

/* Button container alignment */
.row.justify-end {
  margin-top: 24px;
  padding-right: 8px;
}

/* Add these CSS variables if not already present */
:root {
  --q-primary-rgb: 79, 70, 229;
  --q-primary-fade: rgba(79, 70, 229, 0.05);
}

/* Dark mode adjustments */
.body--dark {
  --q-primary-fade: rgba(79, 70, 229, 0.1);
}

.body--dark .custom-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.body--dark .custom-input :deep(.q-field__control:hover) {
  border-color: var(--q-primary);
}

/* Responsive adjustments */
@media (max-width: 599px) {
  .custom-input :deep(.q-field__control),
  .custom-input :deep(.q-field__marginal) {
    height: 40px;
    min-height: 40px;
  }

  .custom-input :deep(.q-field__label),
  .custom-input :deep(.q-field__native) {
    font-size: 13px;
  }

  .row.justify-end {
    margin-top: 16px;
  }
}
</style>
