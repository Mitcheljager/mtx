<script>
	import { user } from "$lib/stores/session"

	import Category from "$lib/components/Category.svelte"
	import Grade from "$lib/components/Grade.svelte"
	import Background from "$lib/components/Background.svelte"
	import Tentative from "$lib/components/Tentative.svelte"
	import Image from "$lib/components/Image.svelte"

	export let data

	const defaultMetaDescription = "This page details the monetisation practices in this game and rates it in comparison to other games."

	$: ({ game } = data)
	$: ([_, key] = game.image_url.split("games/"))
	$: description = parseDescription(game.description)

	function parseDescription(description) {
		if (!description) return ""

    const paragraphs = description.split(/\n\s*\n/)
    let result = ""

    paragraphs.forEach(paragraph => {
      if (/<[^>]+>/.test(paragraph)) result += paragraph.trim()
      else result += `<p>${paragraph.replaceAll(/\n/g, "<br>").trim()}</p>`
    })

    return result
  }
</script>

<svelte:head>
	<title>Macrotransactions | {game.title}</title>
	<meta
		name="description"
		content="Are there microtransactions in {game.title}? {game.description || defaultMetaDescription}" />
</svelte:head>

<div class="wrapper">
	<h1 style="view-transition-name: title-{game.id}">{game.title}</h1>

	<div class="block" style="view-transition-name: card-{game.id}">
		<aside class="sidebar sm:mr-1/2">
			<div class="image mb-1/4" style="--view-transition-name: image-{game.id}">
				{#if game.image_url}
					<Image
						{key}
						from="games"
						width={160}
						height={213}
						alt={game.title} />
				{/if}
			</div>

			<div class="grade mb-1/2 sm:mb-1/4">
				<Grade categories={game.categories} size="large" />
			</div>

			<div class="info">
				{#if game.publisher}
					<a href="/?search={game.publisher}" class="name sm:mt-1/8">{game.publisher}</a>
				{/if}

				{#if game.year_of_release}
					<div class="date mt-1/8">{game.year_of_release}</div>
				{/if}

				{#if $user}
					<div class="mt-1/2">
						<a class="button button--block button--small mb-1/8" href="/games/{game.id}/categories"
							>Edit categories</a
						> <br />
						<a class="button button--block button--small" href="/games/{game.id}/edit">Edit game</a>
					</div>
				{/if}
			</div>
		</aside>

		<div class="content">
			{#if game.tentative}
				<Tentative />
			{/if}

			<h3>Microtransactions in <em>{game.title}</em> are summarized as...</h3>

			{#if game.description}
				<div class="description">
					{@html description}
				</div>
			{/if}

			{#if game.categories}
				<div class="categories">
					{#each game.categories as category (category.id)}
						<Category {category} />
					{/each}
				</div>
			{/if}
		</div>

		{#if game.image_url}
			<Background {key} />
		{/if}
	</div>
</div>

{#if game.image_url}
	<div class="page-background">
		<Background {key} />
	</div>
{/if}

<style lang="scss">
	$breakpoint: 640px;

	h1 {
		background: linear-gradient(130deg, var(--primary), var(--secondary));
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		text-align: center;
	}

	h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
		color: var(--text-color);

		em {
			color: white;
		}
	}

	@keyframes loading {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(100%);
		}
	}

	.image {
		grid-area: image;
		width: 6rem;
		aspect-ratio: 1 / 1.333;
		border-radius: 0.5rem;
		background: var(--content-bg);
		box-shadow: inset 0 0 0 1px var(--border-color);
		overflow: hidden;

		@media (min-width: $breakpoint) {
			width: 7.5rem;
		}
	}

	.categories {
		position: relative;
		width: 100%;
		z-index: 1;
	}

	.date {
		color: var(--text-color-dark);
	}

	.name {
		color: var(--text-color-medium);
		text-decoration: none;

		&:hover,
		&:active,
		&:focus-visible {
			color: var(--text-color);
		}
	}

	.wrapper {
		max-width: 640px;

		:global(.tentative) {
			margin-top: 0;
		}
	}

	.sidebar {
		position: relative;
		display: grid;
		grid-template: "image info" "grade grade";
		grid-template-columns: 6rem auto;
		grid-gap: 0 0.75rem;
		z-index: 10;

		@media (min-width: $breakpoint) {
			display: block;
		}
	}

	.content {
		position: relative;
		z-index: 1;
	}

	.grade {
		grid-area: grade;
	}

	.info {
		grid-area: info;
	}

	.block {
		position: relative;
		overflow: hidden;

		@media (min-width: $breakpoint) {
			display: flex;
			align-items: flex-start;
		}
	}

	.description {
		margin: 0 0 1.5rem;
		line-height: 1.5em;

		:global(h2),
		:global(h3),
		:global(h4) {
			margin: 1rem 0 0;
		}
	}

	.page-background :global(.background) {
		height: 50vh;
		object-fit: cover;
		mask-image: none;
		-webkit-mask-image: none;
		z-index: -1;
		filter: blur(100px);
	}
</style>
