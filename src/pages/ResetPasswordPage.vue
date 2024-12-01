<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo -->
      <div class="text-center q-mb-md">
        <img src="../assets/wokober-logo.png" alt="Logo" class="login-logo">
      </div>

      <!-- Reset Password Text -->
      <div class="text-center q-mb-lg">
        <div class="text-h3 text-weight-bold gradient-text">Reset Password</div>
        <div class="text-subtitle1 text-grey-8 q-mt-md q-mb-md">Enter your new password</div>
      </div>

      <!-- Reset Password Form -->
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="New Password"
          filled
          class="custom-input"
          :rules="[
            val => !!val || 'Please enter your new password',
            val => val.length >= 8 || 'Password must be at least 8 characters'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" class="gradient-text" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer gradient-text"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          v-model="confirmPassword"
          :type="isConfirmPwd ? 'password' : 'text'"
          label="Confirm Password"
          filled
          class="custom-input"
          :rules="[
            val => !!val || 'Please confirm your password',
            val => val === password || 'Passwords do not match'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" class="gradient-text" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer gradient-text"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
        </q-input>

        <!-- Reset Now Button -->
        <div class="text-center q-mt-xl">
          <q-btn
            type="submit"
            class="full-width login-btn"
            label="Reset Now"
            :loading="loading"
          >
            <q-icon name="arrow_forward" class="q-ml-sm" />
          </q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, Notify } from 'quasar'
import { authService } from '../services/authService'

export default defineComponent({
  name: 'ResetPasswordPage',

  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const password = ref('')
    const confirmPassword = ref('')
    const isPwd = ref(true)
    const isConfirmPwd = ref(true)
    const loading = ref(false)

    const onSubmit = async () => {
      loading.value = true
      try {
        const phone = localStorage.getItem('phone')
        if (!phone) {
          throw new Error('Phone number not found. Please restart the password reset process.')
        }

        await authService.resetPassword({
          phone: phone.replace(/^0/, '256'), // Format phone number
          newPassword: password.value
        })

        // Clear stored phone number
        localStorage.removeItem('phone')

        Notify.create({
          type: 'positive',
          message: 'Password reset successful! Please login with your new password.',
          position: 'top',
          timeout: 2000,
          actions: [{ icon: 'close', color: 'white' }]
        })

        // Redirect to login page after successful reset
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } catch (error) {
        console.error('Password reset error:', error)
        Notify.create({
          type: 'negative',
          message: error?.response?.data?.message || 'Failed to reset password. Please try again.',
          position: 'top',
          timeout: 2000,
          actions: [{ icon: 'close', color: 'white' }]
        })
      } finally {
        loading.value = false
      }
    }

    return {
      password,
      confirmPassword,
      isPwd,
      isConfirmPwd,
      loading,
      onSubmit
    }
  }
})
</script>


<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0D06A9 0%, #030F65 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.login-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

.login-logo {
  width: 100%;
  height: 60px;
  object-fit: contain;
  margin-bottom: 10px;
}

.gradient-text {
  background: linear-gradient(135deg, #153966, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-btn {
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

.login-btn:before {
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

.login-btn:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);
  border-color: transparent;
}

.login-btn:hover:before {
  width: 100%;
}

.login-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(21, 57, 102, 0.1);
}

.login-btn :deep(.q-icon) {
  font-size: 1.2em;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.login-btn:hover :deep(.q-icon) {
  transform: scale(1.1);
}


.custom-input {
  margin-bottom: 0;
}

.custom-input :deep(.q-field__control) {
  border-radius: 12px;
  height: 56px;
}

.custom-input :deep(.q-field__marginal) {
  height: 56px;
}

.custom-input :deep(.q-field__label) {
  font-size: 16px;
  font-weight: 500;
  color: #3949AB;
}

.custom-input :deep(.q-field__native) {
  font-size: 16px;
  font-weight: 500;
  color: #1A237E;
}

.custom-checkbox {
  font-size: 15px;
  font-weight: 500;
  color: #3949AB;
}

.custom-checkbox :deep(.q-checkbox__label) {
  color: #3949AB;
}

.font-medium {
  font-weight: 500;
  font-size: 15px;
  text-transform: none;
  color: #1A237E !important;
}

.text-h3 {
  font-size: 32px;
  line-height: 1.2;
  color: #1A237E;
}

.text-subtitle1 {
  font-size: 16px;
  line-height: 1.5;
  color: #3949AB;
}

@media (max-width: 599px) {
  .login-card {
    padding: 32px;
    border-radius: 20px;
  }

  .text-h3 {
    font-size: 28px;
  }

  .login-btn {
    height: 52px;
    font-size: 16px;
  }
}

.custom-input :deep(.q-field__control:before),
.custom-input :deep(.q-field__control:after) {
  display: none;
}
</style>
