<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo -->
      <div class="text-center q-mb-md">
        <img src="../assets/wokober-logo.png" alt="Logo" class="login-logo">
      </div>

      <!-- OTP Verification Text -->
      <div class="text-center q-mb-lg">
        <div class="text-h3 text-weight-bold gradient-text">Enter OTP</div>
        <div class="text-subtitle1 text-grey-8 q-mt-md q-mb-md">
          Please enter the verification code sent to your email
        </div>
      </div>

      <!-- OTP Form -->
      <q-form @submit.prevent="onSubmit" class="q-gutter-md q-mt-lg">
        <q-input
          v-model="otpValue"
          label="OTP Code"
          filled
          class="custom-input"
          :rules="[
            val => !!val || 'Please enter the OTP',
            val => val.length === 6 || 'OTP must be 6 digits'
          ]"
          mask="######"
          unmasked-value
          @update:model-value="handleOTPChange"
        >
          <template v-slot:prepend>
            <q-icon name="lock_clock" class="gradient-text" />
          </template>
        </q-input>

        <!-- Verify Button -->
        <div class="text-center q-mt-xl">
          <q-btn
            type="submit"
            class="full-width login-btn"
            label="Verify OTP"
            :loading="loading"
            :disable="!isComplete"
          >
            <template v-slot:loading>
              <q-spinner-dots class="on-left" />
              Verifying...
            </template>
            <q-icon name="arrow_forward" class="q-ml-sm" />
          </q-btn>
        </div>

        <!-- Resend OTP -->
        <div class="text-center q-mt-md">
          <q-btn flat class="font-medium" label="Resend OTP" @click="resendOTP" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { authService } from '../services/authService'

export default defineComponent({
  name: 'VerifyOTPPage',

  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const otpValue = ref('')
    const isComplete = ref(false)
    const loading = ref(false)
    const phone = ref('')

    onMounted(() => {
      const storedPhone = localStorage.getItem('phone')
      if (!storedPhone) {
        router.push('/request-password-reset')
        $q.notify({
          type: 'negative',
          message: 'Please start the password reset process again',
          position: 'top',
          timeout: 2500
        })
        return
      } else {
        phone.value = storedPhone.replace(/^0/, '256')
      }

    })

    const handleOTPChange = (value) => {
      otpValue.value = value
      isComplete.value = value?.length === 6
    }

    const onSubmit = async (e) => {
      if (e) e.preventDefault()

      if (!isComplete.value) return
      console.log('Submitting OTP:', otpValue.value)

      loading.value = true
      try {
        const response = await authService.verifyOTP({
          phone: phone.value,
          otp: otpValue.value
        })
        console.log('API Response:', response)

        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token)
        }

        router.push('/reset-password')
      } catch (error) {
        console.error('API Error:', error)
        $q.notify({
          type: 'negative',
          message: error?.response?.data?.message || 'Invalid OTP. Please try again.',
          position: 'top',
          timeout: 2500
        })
      } finally {
        loading.value = false
      }
    }

    const resendOTP = async () => {
      loading.value = true
      try {
        await authService.requestPasswordReset({
          phone: phone.value
        })

        $q.notify({
          type: 'positive',
          message: 'OTP has been resent',
          position: 'top',
          timeout: 2000
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error?.response?.data?.message || 'Failed to resend OTP',
          position: 'top',
          timeout: 2500
        })
      } finally {
        loading.value = false
      }
    }

    return {
      otpValue,
      isComplete,
      loading,
      handleOTPChange,
      onSubmit,
      resendOTP
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
