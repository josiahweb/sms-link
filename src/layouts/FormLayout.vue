<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="usps-form-layout">
    <header class="usps-header">
      <div class="usps-logo">
        <img src="/usps-logo.svg" alt="USPS Logo" />
      </div>
    </header>

    <main class="usps-main">
      <router-view v-slot="{ Component }">
        <transition name="form-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="less" scoped>
@import '../styles/variables.less';

.usps-form-layout {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.usps-header {
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .usps-logo {
    max-width: 120px;
    margin: 0 auto;

    img {
      width: 100%;
      height: auto;
    }
  }
}

.usps-main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

// 过渡动画
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.3s ease;
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: @breakpoint-tablet) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
