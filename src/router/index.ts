import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/FormLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/warning'
      },
      {
        path: 'warning',
        name: 'PackageWarning',
        component: () => import('@/views/PackageWarning.vue'),
        meta: {
          step: 1,
          title: 'Package Warning'
        }
      },
      {
        path: 'address',
        name: 'AddressForm',
        component: () => import('@/views/AddressForm.vue'),
        meta: {
          step: 2,
          title: 'Address Information',
          requiresPrevValidation: true
        }
      },
      {
        path: 'payment',
        name: 'PaymentForm',
        component: () => import('@/views/PaymentForm.vue'),
        meta: {
          step: 3,
          title: 'Payment Information',
          requiresPrevValidation: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresPrevValidation) {
    // 这里可以添加表单验证逻辑
    const isFormValid = true // 临时设置为true，实际应该根据表单状态判断
    if (!isFormValid) {
      next({ name: 'AddressForm' })
      return
    }
  }
  next()
})

export default router
