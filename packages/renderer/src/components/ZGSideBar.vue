<template>
  <TreeSelect
    v-model:active-id="activeId"
    v-model:main-active-index="activeIndex"
    :items="items"
  />
</template>

<script setup lang="ts">
import {TreeSelect} from 'vant';

const activeId = ref(1);
const activeIndex = ref(0);
const items = [
  {
    text: '浙江',
    children: [
      {text: '杭州', id: 1},
      {text: '温州', id: 2},
    ],
  },
  {
    text: '江苏',
    children: [
      {text: '南京', id: 5},
      {text: '无锡', id: 6},
    ],
  },
];

</script>

<style scoped>

</style>
