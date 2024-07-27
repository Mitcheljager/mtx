import type { CachedData } from "$lib/types/CachedData"
import { writable } from "svelte/store"

export interface CacheStore {
  add: (key: string, data: any, ttl?: number) => void
  check: (key: string) => any
  clear: () => void
}

export const cache: CacheStore = cacheStore()

function cacheStore() : CacheStore  {
  const { subscribe, set, update } = writable({})

  return {
    add: (key: string, data: any, ttl = 3600000) => {
      const expiresAt = Date.now() + ttl

      update(cache => ({ ...cache, [key]: { data, expiresAt } }))
    },
    check: (key: string) => {
      let cachedData: CachedData = {}

      subscribe((cache: Record<string, any>) => cachedData = cache[key])()

      if (cachedData?.expiresAt > Date.now()) return cachedData.data

      return null
    },
    clear: () => set({})
  }
}
