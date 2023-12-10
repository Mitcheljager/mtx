export function sortedCategories(categories) {
	return categories.sort((a, b) => (a.type > b.type ? 1 : -1))
}
