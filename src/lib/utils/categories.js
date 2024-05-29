export function sortedCategories(categories) {
	return categories.sort((a, b) => {
		if (a.type !== b.type) return a.type > b.type ? 1 : -1
		return a.id > b.id ? 1 : -1
	})
}
