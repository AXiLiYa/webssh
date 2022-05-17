import { createRouter, createWebHistory } from 'vue-router'
import HelloWorldVue from '../views/HelloWorld.vue';
import TestVue from '../views/Test.vue';
import { useStore } from '../store/app';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/hello', component: HelloWorldVue },
    { path: '/test', component: TestVue },
  ]
})

router.beforeEach((to, from) => {
  const appStore = useStore();
  const token = appStore.token;
  if (to.path !== '/test' && !token) {
    return {
      path: '/test'
    }
  }
})

export default router;