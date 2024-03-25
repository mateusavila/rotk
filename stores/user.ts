import { defineStore } from 'pinia'
import type { LoggedUser } from '~/utils'

export const useUserStore = defineStore('user', {
  persist: true,
  state: (): { user: LoggedUser } => ({
    user: {
      id: '',
      name: '',
      avatar: '',
      email: '',
      level: 0
    }
  }),
  actions: {
    updateUser(data: LoggedUser) {
      this.user = data
    }
  }
})