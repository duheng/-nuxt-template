<script setup>
import { storeToRefs } from "pinia";
import useStore from "../store";
const { counter } = useStore();
import TheWelcome from "../components/TheWelcome.vue";
// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter);
counter.incrementAsync();
</script>

<template>
  <main>
    <div>count: {{ count }}</div>
    <div>double: {{ double }}</div>
    <TheWelcome />
  </main>
</template>
