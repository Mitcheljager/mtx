// Taken from https://geoffrich.net/posts/page-transitions-1/

import { navigating } from "$app/stores"
import { onDestroy } from "svelte"

export function getNavigationStore() {
  /** @type {((val?: any) => void)[]} */
  const callbacks = []

  const navigation = {
    ...navigating,
    complete: async() => {
      await new Promise((res, _) => {
        callbacks.push(res)
      })
    }
  }

  // This used to subscribe inside the callback, but that resolved the promise too early
  const unsub = navigating.subscribe(n => {
    if (n === null) {
      while (callbacks.length > 0) {
        const res = callbacks.pop()
        res?.()
      }
    }
  })

  onDestroy(() => {
    unsub()
  })

  return navigation
}
