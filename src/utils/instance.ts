// 封装getCurrentInstance
import { getCurrentInstance } from 'vue'

export function useCurrentInstance() {
  const instance = getCurrentInstance() 
  if (!instance) {
    throw new Error('instance is undefined')
  }
  return instance
}