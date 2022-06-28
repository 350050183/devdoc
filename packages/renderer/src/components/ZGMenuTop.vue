<template>
  <div class="zg-menu-top">
    <Row>
      <Col
        span="17"
      >
        <ul class="zg-menu-ul">
          <li
            v-for="item in topMenuItems"
            :key="item.id"
          >
            <a
              href="#"
              :rel="item.id.toString()"
              @click="activeMenu"
            >{{ item.name }}</a>
          </li>
        </ul>
      </Col>

      <Col
        span="1"
        class="zg-search"
      >
        <el-button
          icon="Search"
          circle
          @click="onSearch"
        />
      </Col>
      <Col
        span="4"
        class="zg-welcome-you"
      >
        <div
          v-if="token!=''"
        >
          欢迎您！{{ userEmail }}
        </div>
      </Col>
      <Col
        span="2"
        class="zg-menu-my"
      >
        <div>
          <div>
            <el-dropdown>
              <el-button type="primary">
                我的
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="onMap">
                    图谱管理
                  </el-dropdown-item>
                  <el-dropdown-item @click="onUrl">
                    节点管理
                  </el-dropdown-item>
                  <el-dropdown-item @click="onCate">
                    类别管理
                  </el-dropdown-item>
                  <el-dropdown-item @click="onFavoriteUrl">
                    我的收藏
                  </el-dropdown-item>

                  <el-dropdown-item
                    v-if="token==''"
                    @click="onLogin"
                  >
                    登录
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-else
                    @click="onLoginOut"
                  >
                    登出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
import {Row, Col} from 'vant';

import docCate from '/@/api/docCate';
import {docsStore} from '/@/store/docs';
import {userStore} from '/@/store/user';

const user = userStore();
const token = computed(() => user.token);
const userEmail = computed(() => user.email);

interface DocItem {
  id: number,
  name: string
}

const list: Array<DocItem> = [];
const topMenuItems = ref(list);
// watch({list},(newValue)=>{});

//Way 1:
(async () => {
  topMenuItems.value = await docCate.index();
})();

//Way 2:
// onMounted(async () => {
//   const res = await axios.get(api);
//   topMenuItems.value = res.data.data.items;
// });

const store = docsStore();

function activeMenu(e: Event) {

  router.push('ZGMiddle');

  const parent_id = (e.target as HTMLElement).getAttribute('rel');
  store.setValue(parent_id ?? '');
  store.getLeftMenu();

  const nodes = document.querySelectorAll('ul.zg-menu-ul a');
  let el: object;
  for (el of nodes) {
    if ((el as HTMLElement).className === 'zg-menu-top-active') {
      (el as HTMLElement).className = '';
    }
  }
  (e.target as HTMLElement).className = 'zg-menu-top-active';
}


function onLogin() {
  router.push('ZGLogin');
}

function onLoginOut() {
  user.token = '';
  user.id = 0;
  router.push('ZGLogin');
}

const router = useRouter();
// const route = useRoute();

function onMap() {
  router.push('ZGMap');
}
function onUrl() {
  router.push('ZGUrl');
}
function onCate() {
  router.push('ZGCate');
}
function onFavoriteUrl() {
  router.push('ZGFavoriteUrl');
}
function onSearch() {
  router.push('ZGSearch');
}
</script>

<style scoped>
.zg-menu-top {

}

.zg-menu-top ul {
  width: 100%;
  list-style: none;
  display: flex;
  text-align: center;
  align-items: center;
  justify-items: center;
}

.zg-menu-top ul li {
  width: 100px;
  line-height: 60px;
  height: 60px;
}

.zg-menu-my {
  display: flex;
  align-items: center;
  justify-items: center;
}


.zg-menu-top-active {
  background-color: #c84d4d;
  color: white;
}

.zg-menu-top-unactived {
  background-color: white;
  color: black;
}

.zg-menu-top ul li a {
  display: block;
}

.zg-menu-top ul li a:hover {
  text-decoration: none;
  background-color: #c84d4d;
  color: white;
}


.zg-menu-top ul li a:active {
  text-decoration: none;
}
.zg-welcome-you{
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: right;
}
.zg-menu-ul{}
.zg-search{
  display: flex;
  justify-items: center;
  align-items: center;
}
</style>
