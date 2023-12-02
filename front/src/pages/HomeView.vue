<script setup>
import { onMounted, inject, reactive } from "vue";
import { storeToRefs } from "pinia";
import useStore from "../store";
const { counter } = useStore();
const Axios = inject("$axios");
import TheWelcome from "../components/TheWelcome.vue";
// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double, lists } = storeToRefs(counter);
counter.incrementAsync();

let state = reactive({
  list: [],
});
// 发起接口请求
const getData = async () => {
  Axios.get("/api/user/getTodoList?user_id=1002&status=2").then((res) => {
    console.log("DT-----", JSON.stringify(res.data.bean.list));
    state.list = res.data.bean.list;
  });
};

onMounted(() => {
  getData();
  console.log("DT3----", lists);
  setTimeout((_) => {
    state.list[0].content = "Aaron test11";
    console.log("DT2-----", state.list);
  }, 5000);
});
</script>

<template>
  <main>
    <el-button type="primary">Primary Button</el-button>
    <div>count: {{ count }}</div>
    <div>double: {{ double }}</div>
    <div v-for="item in state.list" :key="`${item.user_id}-${item.content}`">
      {{ item.user_id }}: {{ item.content }}
    </div>
    <div>{{ VITE_BASE_API }}</div>
    <TheWelcome />
  </main>
</template>
