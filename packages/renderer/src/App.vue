<script lang="ts" setup>
// import ReactiveCounter from '/@/components/ReactiveCounter.vue';
// import ReactiveHash from '/@/components/ReactiveHash.vue';
// import ElectronVersions from '/@/components/ElectronVersions.vue';
import {Row, Col} from 'vant';
// import ZGSideBar from '/@/components/ZGSideBar.vue';
import ZGMenuTop from '/@/components/ZGMenuTop.vue';
import ZGMiddle from '/@/components/ZGMiddle.vue';

const siteTitle = computed(() => import.meta.env.VITE_SITE_TITLE);
const siteCompanyName = computed(() => import.meta.env.VITE_SITE_COMPANY_NAME);
</script>

<template>
  <div class="zg-layout">
    <Row class="zg-header">
      <Col
        span="4"
        class="zg-logo"
      >
        <div>{{ siteTitle }}</div>
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
        <ZGMiddle />
      </Col>
    </Row>
    <Row class="zg-footer">
      <Col span="24">
        {{ siteCompanyName }}
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

#app {
  height: 100%;
}

.zg-layout {
  height: 100%;
}

.zg-header {
  height: 60px;
  /*background-color: beige;*/
  border-bottom: #949494 solid 1px;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2);
}

.zg-header .zg-logo {
  display: flex;
  justify-items: center;
  align-items: center;
  /*background-color: #e6e3b3;*/
}

.zg-header .zg-logo div {
  width: 100%;
  text-align: center;
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
