import { writable } from "svelte/store"

export const cache = cacheStore()

function cacheStore() {
  const { subscribe, set, update } = writable({})

  return {
    add: (key, data, ttl = 3600000) => {
      const expiresAt = Date.now() + ttl

      update(cache => ({ ...cache, [key]: { data, expiresAt } }))
    },
    check: (key) => {
      let cachedData = {}
      subscribe(cache => cachedData = cache[key])()

      if (cachedData?.expiresAt > Date.now()) return cachedData.data

      return null
    },
    clear: () => set({})
  }
}
