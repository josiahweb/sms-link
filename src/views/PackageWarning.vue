<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNext = () => {
  router.push('/address')
}
</script>

<template>
  <div class="warning-section">
    <h3>Important Package Information</h3>
    <p>
      Your package requires additional information to ensure proper delivery. Please review the
      following details:
    </p>
    <ul class="warning-list">
      <li>Package tracking number: <strong>9405511298370938473927</strong></li>
      <li>Current status: <strong>Pending Address Verification</strong></li>
      <li>Estimated delivery: <strong>Within 2-3 business days</strong></li>
    </ul>
    <p>
      To proceed with the delivery, we need to verify your shipping address and collect payment
      information. Please click the button below to continue.
    </p>
    <div class="form-actions">
      <button class="btn btn-primary" @click="handleNext">Continue to Address Verification</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../styles/variables.less';

.warning-section {
  margin-bottom: @spacing-md;

  .warning-list {
    list-style: none;
    padding-left: @spacing-md;

    li {
      margin-bottom: @spacing-sm;
      position: relative;

      &:before {
        content: '•';
        position: absolute;
        left: -@spacing-md;
        color: @color-warning;
      }
    }
  }
}
</style>
