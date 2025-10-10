<script lang="ts">
	import { page } from "$app/stores";
	import Category from "$lib/components/Category.svelte";
	import Background from "$lib/components/Background.svelte";
	import Grade from "$lib/components/Grade.svelte";
	import Tentative from "$lib/components/Tentative.svelte";
	import Image from "$lib/components/Image.svelte";
  import type { Game } from "$lib/types/Game";

	interface Props { game: Game }

	const { game } : Props = $props();

	const maxCategories = 10;
	const publisherQuery = game.publisher?.replace(/[.,]/g, " ");

	const query = $derived($page.url.searchParams.get("search"));
	const title = $derived(query ? highlightQueryInString(query, game.title) : game.title);
	const publisher = $derived(query ? highlightQueryInString(query, game.publisher) : game.publisher);

	function highlightQueryInString(query: string, string: string): string {
	  const regex = new RegExp(query, "gi");
	  return string.replace(regex, (match: string) => `<em>${match}</em>`);
	}
</script>

<div class="card" style="view-transition-name: card-{game.id}">
	<div class="card__content">
		<div class="card__header">
			<a
				class="card__image"
				style="view-transition-name: image-{game.id}"
				href="/{game.slug}"
				tabindex="-1">
				{#if game.image_url}
					<Image
						from="games"
						key={game.image_url.split("games/")[1]}
						width={80}
						height={106}
						alt={game.title} />
				{/if}
			</a>

			<div>
				<div>
					<a class="card__title" style="view-transition-name: title-{game.id}" href="/{game.slug}">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html title}
					</a>
				</div>

				{#if game.year_of_release}
					<div class="card__date">{game.year_of_release}</div>
				{/if}

				{#if publisher}
					<a
						href="/?search={publisherQuery}"
						data-sveltekit-reload
						class="card__name">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html publisher}
					</a>
				{/if}

				<div class="card__grade">
					<Grade categories={game.categories} />
				</div>
			</div>
		</div>

		{#if game.tentative}
			<Tentative />
		{/if}

		{#each game.categories.filter((c, i) => i < maxCategories) as category (category.title)}
			<Category {category} />
		{/each}

		{#if game.categories.length > maxCategories}
			<a class="card__more" href="/{game.slug}" tabindex="-1">
				and {game.categories.length - maxCategories} more...
			</a>
		{/if}

		<a class="card__continue button" href="/{game.slug}">
			Read more <span class="sr-only">about {game.title}</span>
		</a>
	</div>

	{#if game.image_url}
		<Background key={game.image_url.split("games/")[1]} />
	{/if}
</div>

<style lang="scss">
	.card {
		position: relative;
		display: block;
		height: 100%;
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--bg-dark);
		box-shadow: var(--shadow-medium);
		overflow: hidden;

		@include high-contrast() {
			border: 2px solid currentColor;
		}

		:global(em) {
			color: white;
			background: var(--primary);
		}
	}

	.card__content {
		position: relative;
		z-index: 1;
	}

	.card__header {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.card__image {
		flex: 0 0 80px;
		width: 80px;
		aspect-ratio: 1 / 1.333;
		margin-right: 1.5rem;
		border-radius: 0.5rem;
		background: var(--content-bg);
		overflow: hidden;

		&:hover,
		&:active,
		&:focus {
			filter: brightness(1.1);
		}
	}

	.card__title {
		padding: 0.25rem 0;
		margin: -0.25rem 0;
		width: 100%;
		color: var(--text-color-title);
		font-size: 1.3rem;
		font-weight: bold;
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			color: var(--text-color-title);
			text-decoration: underline;
			text-decoration-thickness: 2px;
		}

		&:focus-visible {
			box-shadow: none;
		}
	}

	.card__date {
		color: var(--text-color-dark);
	}

	.card__name {
		padding: 0.35rem 0;
		margin: -0.35rem 0;
		color: var(--text-color-medium);
		text-decoration: none;

		&:hover,
		&:active,
		&:focus-visible {
			color: var(--text-color);
		}
	}

	.card__grade {
		margin-top: 0.5rem;
	}

	.card__more {
		display: inline-block;
		margin-top: 0.5rem;
		line-height: 1em;
		color: var(--text-color-medium);
		text-decoration: none;

		&:hover,
		&:active,
		&:focus {
			color: var(--text-color);
		}
	}

	.card__continue {
		width: 100%;
		margin-top: 1rem;
		border-radius: 0.5rem;
		background: $base-bg;
		color: var(--text-color-light);

		&:hover {
			background: var(--content-bg);
			color: white;
		}
	}

	.sr-only {
		position: absolute;
		clip: rect(0 0 0 0);
		overflow: hidden;
		height: 1px;
		width: 1px;
	}
</style>
