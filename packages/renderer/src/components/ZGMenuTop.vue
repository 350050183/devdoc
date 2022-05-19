<template>
  <div class="zg-menu-top">
    <ul>
      <li
        v-for="item in topMenuItems"
        :key="item.id"
      >
        <a
          href="#"
          @click="activeMenu"
        >{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
const api = 'http://devdocs.secret8.net/api/docs/index?parent_id=0';
interface DocItem  {
  id:number,
  name:string
}
const list:Array<DocItem> = [];
const topMenuItems = ref(list);

//Way 1:
(async ()=>{topMenuItems.value=await axios.get(api).then((res)=>res.data.data.items);})();

//Way 2:
// onMounted(async () => {
//   const res = await axios.get(api);
//   topMenuItems.value = res.data.data.items;
// });

console.log(topMenuItems);

function  activeMenu(e: any) {
  // console.log(e.target);
  const nodes = document.getElementsByTagName('a');
  let idx: any;
  for (idx of nodes) {
    // console.log(idx);
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
</style>
