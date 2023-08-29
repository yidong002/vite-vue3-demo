import { defineStore } from 'pinia'


export const useStore = defineStore('main', {
  state: () => ({
    mainTitle: '小苹果',
    counter:<number> 0,
    htmlString: <String> '',
  }),
  getters: {
    getTitle: (state) => {
      return state.mainTitle[0]
      // 传参的写法--但是缓存会失效
      // return (index:number) => {
      //   return state.mainTitle[index]
      // }
    }
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})