<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface AddressForm {
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
}

const router = useRouter()
const formData = ref<AddressForm>({
  street: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: ''
})

const errors = ref<Partial<Record<keyof AddressForm, string>>>({})

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.street) {
    errors.value.street = 'Street address is required'
  }

  if (!formData.value.city) {
    errors.value.city = 'City is required'
  }

  if (!formData.value.state) {
    errors.value.state = 'State is required'
  }

  if (!formData.value.zipCode) {
    errors.value.zipCode = 'ZIP code is required'
  } else if (!/^\d{5}(-\d{4})?$/.test(formData.value.zipCode)) {
    errors.value.zipCode = 'Please enter a valid ZIP code'
  }

  return Object.keys(errors.value).length === 0
}

const handleUpdate = () => {
  if (validateForm()) {
    router.push('/payment')
  }
}
</script>

<template>
  <div class="form-section">
    <h2>Shipping Address</h2>
    <form @submit.prevent="handleUpdate">
      <div class="form-group">
        <label for="street">Street Address</label>
        <input
          type="text"
          id="street"
          v-model="formData.street"
          class="form-control"
          :class="{ error: errors.street }"
        />
        <span v-if="errors.street" class="error-message">{{ errors.street }}</span>
      </div>

      <div class="form-group">
        <label for="apartment">Apartment, suite, etc. (optional)</label>
        <input type="text" id="apartment" v-model="formData.apartment" class="form-control" />
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input
          type="text"
          id="city"
          v-model="formData.city"
          class="form-control"
          :class="{ error: errors.city }"
        />
        <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
      </div>

      <div class="form-group">
        <label for="state">State</label>
        <input
          type="text"
          id="state"
          v-model="formData.state"
          class="form-control"
          :class="{ error: errors.state }"
        />
        <span v-if="errors.state" class="error-message">{{ errors.state }}</span>
      </div>

      <div class="form-group">
        <label for="zipCode">ZIP Code</label>
        <input
          type="text"
          id="zipCode"
          v-model="formData.zipCode"
          class="form-control"
          :class="{ error: errors.zipCode }"
        />
        <span v-if="errors.zipCode" class="error-message">{{ errors.zipCode }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Update Address</button>
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
@import '../styles/variables.less';

.form-control.error {
  border-color: @color-error;
}
</style>
