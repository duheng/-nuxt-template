<script setup>
import { getCurrentInstance, onMounted, inject, reactive } from "vue";
import { storeToRefs } from "pinia";
const instance = getCurrentInstance();
const Axios = instance.appContext.config.globalProperties.$axios;

import TheWelcome from "../components/TheWelcome.vue";
import useStore from "../store";
const { counter } = useStore();
const { count, double, lists } = storeToRefs(counter);
counter.incrementAsync();
let state = reactive({
  list: [],
});
// 发起接口请求
const getData = async () => {
  Axios.get("/api/user/getTodoList?user_id=1002&status=2").then((res) => {
    state.list = res.data.bean.list;
  });
};

onMounted(() => {
  getData();
  setTimeout((_) => {
    state.list[0].content = "Aaron test11";
  }, 5000);
});
</script>

<template>
  <main>
    <el-button class="cancel-button" type="primary">Primary Button</el-button>
    <div>count: {{ count }}</div>
    <div>double: {{ double }}</div>
    <div v-for="item in state.list" :key="`${item.user_id}-${item.content}`">
      {{ item.user_id }}: {{ item.content }}
    </div>
    <div>{{ VITE_BASE_API }}</div>
    <TheWelcome />
  </main>
</template>
<style>
.cancel-button:focus {
  /* 取消按钮被点击和获得焦点时的样式 */
  outline: none; /* 隐藏焦点样式 */
  box-shadow: none; /* 隐藏焦点样式 */
  background-color: var(--el-button-bg-color);
  border: var(--el-border);
  border-color: var(--el-button-border-color);
}

.cancel-button:hover {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-color-primary-dark-2);
  background-color: var(--el-color-primary-dark-2);
  outline: 0;
}
</style>
