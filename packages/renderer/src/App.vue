<script lang="ts" setup>
// import ReactiveCounter from '/@/components/ReactiveCounter.vue';
// import ReactiveHash from '/@/components/ReactiveHash.vue';
// import ElectronVersions from '/@/components/ElectronVersions.vue';
import {Row, Col} from 'vant';
import ZGMenuTop from '/@/components/ZGMenuTop.vue';
import {userStore} from '/@/store/user';
const store = userStore();
const siteTitle = computed(() => import.meta.env.VITE_SITE_TITLE);
</script>

<template>
  <div class="zg-layout">
    <Row class="zg-header">
      <Col
        span="1"
        class="zg-center"
      >
        <img
          src="/assets/logo.png"
          class="zg-logo-img"
        >
      </Col>
      <Col
        span="2"
        class="zg-center"
      >
        <div>
          <div class="zg-main-site-title">
            {{ siteTitle }}
          </div>
          <div class="zg-my-site-title">
            {{ store.default_map_name }}
          </div>
        </div>
      </Col>
      <Col
        span="20"
        class="zg-nav-top"
      >
        <div>
          <ZGMenuTop />
        </div>
      </Col>
    </Row>
    <Row class="zg-middle">
      <Col span="24">
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

.zg-center {
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
  /*flex-flow: column;*/
  /*flex-direction: column;*/
}

.zg-main-site-title{
  /*display: flex;*/
  font-size:16px;
}

.zg-my-site-title{
  /*display: flex;*/
  font-size:14px;
  color:#999;
}
</style>
