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
          @click-nav="clickLeftMenuNav"
        />
      </Col>

      <Col span="19">
        <IndexBar
          v-for="(indexItem,alpha) of middleMenu"
          :key="alpha"
        >
          <IndexAnchor :index="alpha" />
          <Cell>
            <Grid
              icon-size="100px"
            >
              <GridItem
                v-for="item in indexItem"
                :key="item.id"
                :icon="item.icon"
                :text="item.text"
                :dot="item.is_new===1"
              >
                <template #icon>
                  <div
                    class="zg-grid-item-icon"
                    @click="openUrl(item.url)"
                  >
                    <van-image
                      :src="logo_url(item.icon)"
                      style="width:110px;"
                    />
                  </div>
                </template>
                <template #text>
                  <div class="zg-grid-item-text">
                    <div class="zg-grid-item-title">
                      <span
                        style="cursor:pointer;"
                        @click="openUrl(item.url)"
                      >{{ item.text }}</span>
                      <div class="zg-grid-item-description">
                        {{ item.description }}
                      </div>
                      <div style="padding-top: 10px;">
                        <el-button
                          v-if="item.is_fav===false"
                          type="warning"
                          icon="Star"
                          circle
                          @click="onAddFavorite($event,item.id)"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </GridItem>
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
import docFavoriteNode from '/@/api/docFavoriteNode';
import {userStore} from '/@/store/user';
// import {storeToRefs} from 'pinia';

const store = docsStore();
const user = userStore();

// (async () => {
// const result: { success: boolean, message: string, items: any[] } = await axios.get(api).then((res) => res.data);
// console.log(result);
// })();

const activeId = ref([1]);
const activeIndex = ref(0);

const leftMenu = computed(() => store.leftMenu);
const middleMenu = computed(() => store.middleMenu);

const logo_url = (url:string)=>import.meta.env.VITE_API_SERVER_URL + url;

function openUrl(url: string) {
  window.bridge.openUrl(url);
}

function clickLeftMenuItem(e: { text: string, id: number }) {
  store.setLeftMenuValue(e.id);
  store.getMiddleList(e.id,user.token);
}

function clickLeftMenuNav(idx:number) {
  store.getMiddleList(parseInt(store.leftMenu[idx].id),user.token);
}


onMounted(() => {
  store.setLeftMenuValue(1);
});

const token = computed(() => user.token);

async function onAddFavorite(e:Event,id:number){
  store.isNeedRefreshFavUrl = false;
  const result = await docFavoriteNode.add(id, token.value);
  if (result.success) {
    ElMessage({
      message: '收藏成功。',
      type: 'success',
    });
    store.isNeedRefreshFavUrl = true;
    (e.target as HTMLElement).parentElement.parentElement.style.display = 'none';
  } else {
    ElMessage({
      message: '收藏失败：' + result.message,
      type: 'error',
    });
  }
}

</script>

<style scoped>
.zg-grid-item-text{
  font-size:20px;
  color: #4b4545;
}
.zg-grid-item-icon{
  cursor:pointer;
}
.zg-grid-item-title{
  text-align: center;
}
.zg-grid-item-description{
  font-size:15px;
  color: #a0a0a0;
}
</style>
