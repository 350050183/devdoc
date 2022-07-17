
import ZGMiddle from '/@/components/ZGMiddle.vue';
import ZGNodeCate from '/@/components/ZGNodeCate.vue';
import ZGNode from '/@/components/ZGNode.vue';
import ZGMap from '/@/components/ZGMap.vue';
import ZGFavoriteNode from '/@/components/ZGFavoriteNode.vue';
import ZGLogin from '/@/components/ZGLogin.vue';
import ZGRegister from '/@/components/ZGRegister.vue';
import ZGSearch from '/@/components/ZGSearch.vue';
import {createRouter,createWebHashHistory} from 'vue-router';

const routes = [
  { path: '/', component: ZGMiddle },
  { path: '/ZGMiddle', component: ZGMiddle },
  { path: '/ZGNodeCate/:id', component: ZGNodeCate },
  { path: '/ZGMap', component: ZGMap },
  { path: '/ZGNode/:id', component: ZGNode },
  { path: '/ZGFavoriteNode', component: ZGFavoriteNode },
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
