<template>
  <div class="zg-menu-top">
    <ul>
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
  </div>
</template>

<script lang="ts" setup>
import docCate from '/@/api/docCate';
import {docsStore} from '/@/store/docs';

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
  const parent_id = (e.target as HTMLElement).getAttribute('rel');
  store.setValue(parent_id??'');
  store.getLeftMenu();
  // console.log('click menu:', parent_id);

  const nodes = document.getElementsByTagName('a');
  let idx: object;
  for (idx of nodes) {
    if ((idx as HTMLElement).className === 'zg-menu-top-active') {
      (idx as HTMLElement).className = '';
    }
  }
  (e.target as HTMLElement).className = 'zg-menu-top-active';
}
</script>

<style scoped>
.zg-menu-top {

}

.zg-menu-top ul {
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


/*.zg-menu-top-active {*/
/*  background-color: #c84d4d;*/
/*  color: white;*/
/*}*/

/*.zg-menu-top-unactived {*/
/*  background-color: white;*/
/*  color: black;*/
/*}*/

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
</style>
