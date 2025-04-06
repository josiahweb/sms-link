<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface PaymentForm {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}

const router = useRouter()
const formData = ref<PaymentForm>({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
})

const errors = ref<Partial<Record<keyof PaymentForm, string>>>({})

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.cardNumber) {
    errors.value.cardNumber = 'Card number is required'
  } else if (!/^\d{16}$/.test(formData.value.cardNumber.replace(/\s/g, ''))) {
    errors.value.cardNumber = 'Please enter a valid card number'
  }

  if (!formData.value.cardName) {
    errors.value.cardName = 'Cardholder name is required'
  }

  if (!formData.value.expiryDate) {
    errors.value.expiryDate = 'Expiry date is required'
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.value.expiryDate)) {
    errors.value.expiryDate = 'Please enter a valid expiry date (MM/YY)'
  }

  if (!formData.value.cvv) {
    errors.value.cvv = 'CVV is required'
  } else if (!/^\d{3,4}$/.test(formData.value.cvv)) {
    errors.value.cvv = 'Please enter a valid CVV'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    // 这里添加支付处理逻辑
    console.log('Payment submitted:', formData.value)
    // 提交成功后可以跳转到成功页面或显示成功消息
  }
}

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}
</script>

<template>
  <div class="form-section">
    <h2>Payment Information</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          v-model="formData.cardNumber"
          @input="
            (e: Event) =>
              (formData.cardNumber = formatCardNumber((e.target as HTMLInputElement).value))
          "
          class="form-control"
          :class="{ error: errors.cardNumber }"
          maxlength="19"
          placeholder="1234 5678 9012 3456"
        />
        <span v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</span>
      </div>

      <div class="form-group">
        <label for="cardName">Cardholder Name</label>
        <input
          type="text"
          id="cardName"
          v-model="formData.cardName"
          class="form-control"
          :class="{ error: errors.cardName }"
          placeholder="John Doe"
        />
        <span v-if="errors.cardName" class="error-message">{{ errors.cardName }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            v-model="formData.expiryDate"
            class="form-control"
            :class="{ error: errors.expiryDate }"
            placeholder="MM/YY"
            maxlength="5"
          />
          <span v-if="errors.expiryDate" class="error-message">{{ errors.expiryDate }}</span>
        </div>

        <div class="form-group">
          <label for="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            v-model="formData.cvv"
            class="form-control"
            :class="{ error: errors.cvv }"
            placeholder="123"
            maxlength="4"
          />
          <span v-if="errors.cvv" class="error-message">{{ errors.cvv }}</span>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Submit Payment</button>
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
@import '../styles/variables.less';

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: @spacing-md;
}

.form-control.error {
  border-color: @color-error;
}

@media (max-width: @breakpoint-tablet) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
