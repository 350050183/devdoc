<template>
  <div>
    <Row>
      <Col span="5">
        <TreeSelect
          v-model:active-id="activeId"
          v-model:main-active-index="activeIndex"
          :items="leftMenu"
          height="1000px"
          max="1"
          @click-item="clickLeftMenuItem"
        />
      </Col>

      <Col span="19">
        <IndexBar
          v-for="(indexItem,alpha) of middleMenu"
          :key="alpha"
        >
          <IndexAnchor :index="alpha" />
          <Cell>
            <Grid clickable>
              <GridItem
                v-for="item in indexItem"
                :key="item.id"
                :icon="item.icon"
                :text="item.text"
                :dot="item.is_new===1"
                @click="openUrl(item.url)"
              />
            </Grid>
          </Cell>
        </IndexBar>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
import {IndexBar, Cell, IndexAnchor, Grid, GridItem, TreeSelect, Col, Row} from 'vant';
import {docsStore} from '/@/store/docs';
// import {storeToRefs} from 'pinia';

const store = docsStore();

// (async () => {
// const result: { success: boolean, msg: string, items: any[] } = await axios.get(api).then((res) => res.data);
// console.log(result);
// })();

const activeId = ref([1]);
const activeIndex = ref(0);

const leftMenu = computed(() => store.leftMenu);
const middleMenu = computed(() => store.middleMenu);

function openUrl(url: string) {
  window.bridge.openUrl(url);
}

function clickLeftMenuItem(e: { text: string, id: number }) {
  console.log(e.id);
  store.setLeftMenuValue(e.id);
  store.getMiddleList(e.id);
}


onMounted(() => {
  store.setLeftMenuValue(1);
});

</script>

<style scoped>

</style>
