import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
  state: (): any => {
    return {
      profile: {
        user: null,
        group: null,
        backpack: null,
      }
    }
  },
  actions: {
    setUserProfile(user: object, group: object, backpack: object) {
      this.profile.user = user
      this.profile.group = group
      this.profile.backpack = backpack
    }
  }
})
