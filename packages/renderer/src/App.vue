<script lang="ts" setup>
// import ReactiveCounter from '/@/components/ReactiveCounter.vue';
// import ReactiveHash from '/@/components/ReactiveHash.vue';
// import ElectronVersions from '/@/components/ElectronVersions.vue';
import {Row, Col} from 'vant';
// import ZGSideBar from '/@/components/ZGSideBar.vue';
import ZGMenuTop from '/@/components/ZGMenuTop.vue';
import ZGMiddle from '/@/components/ZGMiddle.vue';
import ZGLogin from '/@/components/ZGLogin.vue';
import ZGRegister from '/@/components/ZGRegister.vue';
import ZGUrl from '/@/components/ZGUrl.vue';
import ZGCate from '/@/components/ZGCate.vue';
import ZGFavoriteUrl from '/@/components/ZGFavoriteUrl.vue';
import ZGSearch from '/@/components/ZGSearch.vue';
import ZGMap from '/@/components/ZGMap.vue';
import {userStore} from '/@/store/user';

const siteTitle = computed(() => import.meta.env.VITE_SITE_TITLE);
const siteCompanyName = computed(() => import.meta.env.VITE_SITE_COMPANY_NAME);

let currentTabComponent = shallowRef({});

currentTabComponent.value = ZGMiddle;

const store = userStore();
const token = computed(() => store.token);

function onZgNavClick(menu_title=''){
  console.log('ZgNavClick',menu_title);
  if(menu_title==='ZGLogin') {
    currentTabComponent.value = ZGLogin;
  }else if(menu_title==='ZGRegister') {
    currentTabComponent.value = ZGRegister;
  }else if(menu_title==='ZGMap') {
    currentTabComponent.value = ZGMap;
  }else if(menu_title==='ZGSearch') {
    currentTabComponent.value = ZGSearch;
  }else if(menu_title==='ZGUrl') {
    if(token.value.length>=32) {
      currentTabComponent.value = ZGUrl;
    }else{
      currentTabComponent.value = ZGLogin;
    }
  }else if(menu_title==='ZGCate') {
    if(token.value.length>=32) {
      currentTabComponent.value = ZGCate;
    }else{
      currentTabComponent.value = ZGLogin;
    }
  }else if(menu_title==='ZGFavoriteUrl') {
    if(token.value.length>=32) {
      currentTabComponent.value = ZGFavoriteUrl;
    }else{
      currentTabComponent.value = ZGLogin;
    }
  }else{
    currentTabComponent.value = ZGMiddle;
  }
}
</script>

<template>
  <div class="zg-layout">
    <Row class="zg-header">
      <Col
        span="1"
        class="zg-center"
      >
        <img
          src="/assets/icon.png"
          class="zg-logo-img"
        >
      </Col>
      <Col
        span="2"
        class="zg-center"
      >
        {{ siteTitle }}
      </Col>
      <Col
        span="21"
        class="zg-nav-top"
      >
        <div>
          <ZGMenuTop @ZgNavClick="onZgNavClick" />
        </div>
      </Col>
    </Row>
    <Row class="zg-middle">
      <Col span="24">
        <!--        <keep-alive>-->
        <!--          <component-->
        <!--            :is="currentTabComponent"-->
        <!--            @ZgNavClick="onZgNavClick"-->
        <!--          />-->
        <!--        </keep-alive>-->
        <router-view />
      </Col>
    </Row>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body,a {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  -webkit-tap-highlight-color: transparent;
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #151313;
}

/*#app {*/
/*  height: 100%;*/
/*}*/

.zg-layout {
  height: 100%;
}

.zg-header {
  height: 60px;
  /*background-color: beige;*/
  border-bottom: #949494 solid 1px;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.2);
}

.zg-center {
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.zg-logo-img {
  width: 50px;
  height: 50px;
  margin-left:10px;
}

.zg-header .zg-logo div {
  text-align: center;
  justify-items: center;
  align-items: center;
  display: flex;
}

.zg-header .zg-nav-top {
  display: flex;
  justify-items: center;
  align-items: center;
}

.zg-header .zg-nav-top div {
  width: 100%;
  text-align: left;
  /*margin: 0 10px 0 10px;*/
}

.zg-middle {
  /*height: 100%;*/
  /*background-color: bisque;*/
}

.zg-footer {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  text-align: center;
  background-color: beige;
}

</style>
