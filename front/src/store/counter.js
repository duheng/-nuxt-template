import { defineStore } from 'pinia'
import request from '@/utils/request.js'
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
      console.log('FETCH-------',  request)
      setTimeout(() => {
      this.lists =   [{"user_id":1002,"content":"MOZI","status":2},{"user_id":1002,"content":"MOZI","status":2}]
    }, 100)
      setTimeout(() => {
        this.count++
        this.lists[0].content = 'Aasoigsofghdiduhfgusd'
      }, 1000)
    },
  },
})

export default useCounterStore
