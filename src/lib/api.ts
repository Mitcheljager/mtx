import { cache } from "$lib/stores/cache"

export async function api<T>(path: string, serverFetch: Function | null = null) : Promise<T> {
  const cachedInStore = cache.check(path)
  if (cachedInStore) return cachedInStore

  const response = await (serverFetch || fetch)(`/api/${path}`)
  if (!response.ok) throw new Error()

  const parsed = await response.json()
  cache.add(path, parsed)

  return parsed
}
