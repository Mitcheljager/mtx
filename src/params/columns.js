/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return new RegExp('(slug|id)').test(param)
}
