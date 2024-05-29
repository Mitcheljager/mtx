import { cache } from "$lib/stores/cache"

export async function api(path, serverFetch = null) {
  try {
    const cachedInStore = cache.check(path)
    if (cachedInStore) return cachedInStore

    const response = await (serverFetch || fetch)(`/api/${path}`)
    if (!response.ok) throw new Error()

    const parsed = await response.json()
    cache.add(path, parsed)

    return parsed
  } catch (error) {
    console.error(error)
    return null
  }
}
