<script lang="ts" setup>

const count = ref(0);
</script>

<template>
  <button @click="count++">
    count is: {{ count }}
  </button>
  <br><br>
  <code>packages/renderer/src/components/ReactiveCounter.vue</code>
</template>
