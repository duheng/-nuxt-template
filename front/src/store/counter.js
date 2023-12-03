import { defineStore } from 'pinia'
import Axios from '@/utils/request.js'
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      lists:  []
    }
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      Axios.get("/api/user/getTodoList?user_id=1002&status=2").then((res) => {
        this.lists = res.data.bean.list;
      });
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
})

export default useCounterStore
