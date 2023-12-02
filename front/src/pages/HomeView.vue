<script setup>
import { onMounted, inject } from "vue";
import { storeToRefs } from "pinia";
import useStore from "../store";
const { counter } = useStore();
const __axios = inject("$axios");
import TheWelcome from "../components/TheWelcome.vue";
// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter);
counter.incrementAsync();

// const __axios = inject($axios);

// 发起接口请求
const getData = async () => {
  console.log("BB-----", __axios);
};

onMounted(() => {
  getData();
});
</script>

<template>
  <main>
    <el-button type="primary">Primary Button</el-button>
    <div>count: {{ count }}</div>
    <div>double: {{ double }}</div>
    <div>{{ VITE_BASE_API }}</div>
    <TheWelcome />
  </main>
</template>
