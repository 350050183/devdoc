
import ZGMiddle from '/@/components/ZGMiddle.vue';
import ZGCate from '/@/components/ZGCate.vue';
import ZGUrl from '/@/components/ZGUrl.vue';
import ZGMap from '/@/components/ZGMap.vue';
import ZGFavoriteUrl from '/@/components/ZGFavoriteUrl.vue';
import ZGLogin from '/@/components/ZGLogin.vue';
import ZGRegister from '/@/components/ZGRegister.vue';
import ZGSearch from '/@/components/ZGSearch.vue';
import {createRouter,createWebHashHistory} from 'vue-router';

const routes = [
  { path: '/', component: ZGMiddle },
  { path: '/ZGMiddle', component: ZGMiddle },
  { path: '/ZGCate', component: ZGCate },
  { path: '/ZGMap', component: ZGMap },
  { path: '/ZGUrl', component: ZGUrl },
  { path: '/ZGFavoriteUrl', component: ZGFavoriteUrl },
  { path: '/ZGLogin', component: ZGLogin },
  { path: '/ZGRegister', component: ZGRegister },
  { path: '/ZGSearch', component: ZGSearch },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});

export default router;
