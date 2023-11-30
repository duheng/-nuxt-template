import { defineStore } from 'pinia'
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
})

export default useCounterStore
