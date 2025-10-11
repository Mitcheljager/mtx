<script lang="ts">
	import { user } from "$lib/stores/session";

	import Category from "$lib/components/Category.svelte";
	import Grade from "$lib/components/Grade.svelte";
	import Background from "$lib/components/Background.svelte";
	import Tentative from "$lib/components/Tentative.svelte";
	import Image from "$lib/components/Image.svelte";
  import type { Game } from "$lib/types/Game";

	interface Props { data: { game: Game } }

	const { data } : Props = $props();

	const defaultMetaDescription = "This page details the monetisation practices in this game and rates it in comparison to other games.";

	const { game } = $derived(data);
	const { id, image_url, description, title, categories, publisher, year_of_release, tentative } = $derived(game);
	const [_, key] = $derived(image_url.split("games/"));
	const parsedDescription = $derived(parseDescription(description || ""));

	function parseDescription(description: string) : string {
	  if (!description) return "";

	  const paragraphs = description.split(/\n\s*\n/);
	  let result = "";

	  paragraphs.forEach(paragraph => {
	    if (/<[^>]+>/.test(paragraph)) {
	      result += paragraph.trim();
	      return;
	    }

	    paragraph = `<p>${paragraph.replaceAll(/\n/g, "<br>").trim()}</p>`;

	    const containsListItems = paragraph.includes("<br>-");

	    if (!containsListItems) {
	      result += paragraph;
	      return;
	    }

	    // This isn't the most sophisticated thing ever, but this parses markdown like lists to use <ul><li> elements.
	    // It's based purely on both the previous parsing of lines lines and formatting of lists.

	    // Lists are parsed as paragraphs above, but we want to transform them to <ul> instead, as a <ul> can't exist inside of a <p> tag.
	    // We start with the closing tag to make things a little easier.
	    paragraph = paragraph.replace("</p>", "</li></ul>");

	    // Account for both lists that are separate paragraph and once that are on new lines only.
	    // In other words, whether the list has 2 new lines before it or one. This is done for the first
	    // list item only, where we also open the <ul> tag.
	    if(paragraph.includes("<p>-")) paragraph = paragraph.replace("<p>-", "<ul><li>");
	    else paragraph = paragraph.replace("<br>-", "</p><ul><li>");

			// Finally replace all remaining list items with proper tags.
			// Note that none of this works for lists with only 1 item.
	    result += paragraph.replaceAll("<br>-", "</li><li>");
	  });

	  return result;
	}
</script>

<svelte:head>
	<title>{title} | Macrotransactions.org</title>
	<meta
		name="description"
		content="Are there microtransactions in {title}? {parsedDescription || defaultMetaDescription}" />
</svelte:head>

<div class="wrapper">
	<h1 style="view-transition-name: title-{id}">{title}</h1>

	<div class="block" style="view-transition-name: card-{id}">
		<aside class="sidebar sm:mr-1/2">
			<div class="image mb-1/4" style="--view-transition-name: image-{id}">
				{#if image_url}
					<Image
						{key}
						from="games"
						width={160}
						height={213}
						alt={title} />
				{/if}
			</div>

			<div class="grade mb-1/2 sm:mb-1/4">
				<Grade categories={categories} size="large" />
			</div>

			<div class="info">
				{#if publisher}
					<a href="/?search={publisher}" class="name sm:mt-1/8">{publisher}</a>
				{/if}

				{#if year_of_release}
					<div class="date mt-1/8">{year_of_release}</div>
				{/if}

				{#if $user}
					<div class="mt-1/2">
						<a class="button button--block button--small mb-1/8" href="/games/{id}/categories">Edit categories</a><br />
						<a class="button button--block button--small" href="/games/{id}/edit">Edit game</a>
					</div>
				{/if}
			</div>
		</aside>

		<div class="content">
			{#if tentative}
				<Tentative />
			{/if}

			<h2>Microtransactions in <em>{title}</em> are summarized as...</h2>

			{#if parsedDescription}
				<div class="description">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html parsedDescription}
				</div>
			{/if}

			{#if categories}
				<div class="categories">
					{#each categories as category (category.id)}
						<Category {category} />
					{/each}
				</div>
			{/if}
		</div>

		{#if image_url}
			<Background {key} />
		{/if}
	</div>
</div>

{#if image_url}
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

		@include high-contrast() {
			background: transparent;
			color: currentColor;
		}
	}

	h2 {
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
		padding: 0.5rem 0;
		margin: -0.5rem 0;
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
			margin: 1.5rem 0 0;
		}

		:global(hr) {
			background: darken($text-color, 50%);
			height: 1px;
			border: 0;
			margin: 1.5rem 0;
		}

		:global(p + ul) {
			margin-top: -0.75rem;
		}

		:global(ul) {
			padding-left: 1rem;
		}

		:global(li::marker) {
			color: var(--primary);
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
