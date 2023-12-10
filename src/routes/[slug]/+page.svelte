<script>
	import { user } from "$lib/stores/session"
	import { supabase } from "$lib/db"

	import Category from "$lib/components/Category.svelte"
	import Grade from "$lib/components/Grade.svelte"
	import Background from "$lib/components/Background.svelte"
	import Tentative from "$lib/components/Tentative.svelte"
	import Image from "$lib/components/Image.svelte"

	export let data

	$: ({ game } = data)

	const defaultMetaDescription =
		"This page details the monetisation practices in this game and rates it in comparison to other games."
</script>

<svelte:head>
	<title>Macrotransactions | {game.title}</title>
	<meta
		name="description"
		content={`Are there microtransactions in ${game.title}? ` +
			(game.description || defaultMetaDescription)}
	/>
</svelte:head>

<div class="wrapper">
	<h1 style="view-transition-name: title-{game.id}">{game.title}</h1>

	<div class="block" style="view-transition-name: card-{game.id}">
		<aside class="sidebar sm:mr-1/2">
			<div class="image mb-1/4" style="--view-transition-name: image-{game.id}">
				{#if game.image_url}
					<Image
						{supabase}
						from="games"
						key={game.image_url.split("games/")[1]}
						width={160}
						height={213}
						alt={game.title}
					/>
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

		<div>
			{#if game.tentative}
				<Tentative />
			{/if}

			<h3>Microtransactions in <em>{game.title}</em> are summarized as...</h3>

			{#if game.description}
				<p class="description">
					{@html game.description.replace(/\n/g, "<br>")}
				</p>
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
			<Background key={game.image_url.split("games/")[1]} />
		{/if}
	</div>
</div>

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
	}
</style>
