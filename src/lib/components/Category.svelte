<script>
	/** @type {{key: object}} */
	let { category } = $props();

	function categoryTypeIcon(type) {
		if (type == "positive") return "👍"
		if (type == "negative") return "👎"
		if (type == "neutral") return "➖"
	}
</script>

<div class="category category--{category.type}">
	<div class="category__icon" aria-label="{category.type} category">
		{categoryTypeIcon(category.type)}
	</div>

	{category.title}
</div>

<style lang="scss">
	.category {
		display: flex;
		margin-bottom: 0.25rem;
		padding: 0.35rem 0 0.35rem 0.5rem;
		border-radius: 0.5rem;
		line-height: 1.5rem;
		color: hsla(0, 0%, 100%, 0.95);

		&--neutral {
			background: linear-gradient(to right, var(--border-color), transparent);
		}

		&--positive {
			background: linear-gradient(to right, var(--green), transparent);
		}

		&--negative {
			background: linear-gradient(to right, var(--red), transparent);
		}
	}

	.category__icon {
		display: inline-block;
		flex: 0 0 1.5rem;
		width: 1.5rem;
		margin-right: 0.25rem;
		color: white;
	}
</style>
