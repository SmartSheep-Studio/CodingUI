import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
  state: (): any => {
    return {
      profile: {
        user: null,
        group: null,
        backpack: null,
      },
      node: {
        name: null,
        details: null,
      }
    }
  },
  actions: {
    setUserProfile(user: object, group: object, backpack: object) {
      this.profile.user = user
      this.profile.group = group
      this.profile.backpack = backpack
    },

    setNodeInformation(name: string, details: object) {
      this.node.name = name
      this.node.details = details
    },

    getMaterial(id: string) {
      const material = this.profile.backpack["materials"][id]
      return {
        amount: material ? material.amount : 0,
        attributes: material ? material.attributes : {},
      }
    }
  }
})
