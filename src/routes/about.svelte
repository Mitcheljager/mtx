<script context="module">
	import { browser, dev } from "$app/env"

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true
</script>



<svelte:head>
	<title>Macrotransactions | About</title>
	<meta name="description" content="Microtransactions are a way of monetising virtual goods in games. Microtransactions often times don't have the customers best interest in mind and only exist to squeeze as much money out of you as possible. That's not cool.">
</svelte:head>



<article class="wrapper">
	<h1>Microtransactions, what and why?</h1>

	<p>
		TL;DR: "Micro"transactions are a way of monetising virtual goods in games. Microtransactions often times don't have the customers best interest in mind and only exist to squeeze as much money out of you as possible. That's not cool.
	</p>

	<p>
		Premium currency, lootboxes, xp-boosts, bundles, and timed-exclusives, are a couple of the most common techniques to screw you over. Let's go over them one by one and see why they suck.
	</p>

	<ul>
		<li>
			<strong>Premium Currency</strong>: Premium currencies are virtual currencies you buy with real money, which are then used to buy virtual goods. So why can't you simply buy these virtual goods with real currencies? To force you to spend more without it feeling like you spend more. <br>
			Take this example; The exchange rate for Coins in game is 1000 coins = 10 USD. A skins costs 1800 coins. So a skin costs 18 USD, right? Except you can only buy these Coins in set values, 1000 Coins, 2000 coins, 5000 coins. You're forced to spend 20 USD even though 18 USD would be enough. This goes a step further when skins go on "sale". For this week only the skin costs 1200 Coins instead of 1800! You can still only obtain 1200 Coins by spending 20 USD, the same amount as before the sale.
		</li>

		<li>
			<strong>Lootboxes</strong>: You get a box with unknown contents. It could contain a rare cool item, but more likely it contains something you didn't want and will never use. You're given lootboxes for "free" from time to time, giving you a little taste of what they could contain. Did it contain something cool? Great, let's get some more lootboxes for more cool stuff! Did it contain trash? Surely the next one is going to be better? <br>
			So why not just buy the item directly instead of gambling? Either because you're hoping to save a few bucks, or because you can't. Lootboxes are the only way.
			Lootboxes prey on gambling highs and try and exploit the same emotions as slot machines.
		</li>

		<li>
			<strong>XP-Boosts</strong>: Leveling up can be a slow process. Your friends are all high level, and there you are, low level. Either you started player way after they did, or you simply don't have enough time to put in to the game. <br>
			Often times XP grinds are intentionally brutal to encourage you to spend money on meaningless boosts. These purchases can also be called "pay for convenience", or more accurately "pay to not be inconvenienced".
		</li>

		<li>
			<strong>Bundles</strong>: Bundles are made to look enticing. An item you would want, and it comes with a couple of other things for a good discount? Great deal right? Except that if the bundle didn't exist you probably wouldn't have bought the other items. So why not just buy the item instead of the bundle? It can be for a couple of reasons. Either psychologically you feel like you don't want to miss out on the great deal, or more commonly; it's only available in the bundle. So either spend more or go fuck yourself.
		</li>

		<li>
			<strong>Timed-exclusives</strong>: A common practise is to have a daily/weekly revolving in-game shop with discounts and special items only available during that time period. You don't want to miss out on that sale, and you certainly don't want to miss out on that exclusive item that might not return for a long time. <br>
			Another example are Battle Passes. Battle passes contain an unlock path of virtual items that are only available during a specific time period. <br>
			Time-exclusives prey on your fear of missing out.
		</li>
	</ul>

	These are just a couple of examples, but keep in mind that many games don't contain just some of these, they contain <em>all</em>, and almost always at revolting prices.

	<h2>But they are just cosmetics, who cares?</h2>

	<p>
		Of course most games only cosmetic microtransactions. They don't make you any stronger, they don't give you any advantage. But that's not the point. These monetisation practices prey on every insecurity and addictive quality you have. Gambling, fear of missing out, impulsive buying, and wanting to "fit in". All of these are psychological traits that are exploited to get you to spend all of your money.
	</p>

	<p>
		This is only made worse when you realise that a large portion of the target audience is kids.
	</p>

	<p>
		Cosmetics can cost very high amounts of money, often times even costing as much as entire full priced games. They do this because they know some people will buy them, and those who can't afford it are left out. Maybe you can't afford it because you're a kid and you don't have an income, or maybe you're from a country where these prices are en entire month of wages. Whatever the case might be, it sucks to miss out on cool thing because you aren't able to afford them.
	</p>

	<h2>Don't like it? Don't buy it!</h2>

	<p>
		If you are the type of person to not buy cosmetics items, great, but you aren't the target audience anyway. A great statistics that is very relevant here is the 80-20 rule which states that <strong>80% of outcomes  result from 20% of all causes</strong>. In this case that means that 80% of microtransactions are made by 20% of users.
	</p>

	<p>
		These companies practically survive on a small percentage of players making them most of their money, these players are also referred to as "Whales". Whales can spend absurd amounts of money, some even thousands per year. Some of these people are rich and can afford it, others are not and are simply bad with their money for various reasons. These companies don't care, they will gladly take your money, no matter your financial position.
	</p>

	<h2>But they have to make money somehow!</h2>

	<p>
		Let's start off by saying; Microtransactions are not exclusive to free-to-play games. They are very present in full-priced AAA games (Even in singleplayer only games!). But let's focus on free-to-play games for the sake of this argument.
	</p>

	<p>
		Sure, free-to-play games have to make money somehow. But does that have to be through exploitative means? Keep in mind that these games are <strong>not</strong> free-to-play because of the good will of the developers. They didn't choose to go free-to-play because they want everyone to have a chance of playing their game. They choose free-to-play because that's how they can make the most amount of money.
	</p>

	<p>
		So what's the alternative? That's not for me to say. All alternatives would likely result in less profit, and that's a big nono. It's no longer about what's best for the player, it's about what's best for the CEO of the company. <br>
	</p>

	<hr>

	<p>
		This website sets to make you aware of different monetisation practises games might use and how they might try to exploit you as a person.
	</p>

	<p>
		The goal is not to stop you from purchasing microtransactions. By all means, if you enjoy a game and you want to support the developers, buy stuff! But be aware of how much you're spending and what it is you're buying. Is that skin for that weapon you never use really worth it? Is that 60 USD bundle really a good deal? Are lootboxes even fair? <br>
		Ask yourself questions before purchasing microtransactions and evaluate if the money you're spending justifies the time you've put in to the game.
	</p>

	<p>
		<big>Not all microtransactions are bad, but it is a shame that "micro" is no longer a descriptor.</big>
	</p>

	<hr>

	<h3>Sources</h3>

	<p>If you would like to learn more about microtransactions, here's a few sources I can recommend:</p>

	<strong>Reading</strong>
	<ul>
		<li>
			<a href="https://psyarxiv.com/cdwhq" target="_blank" rel="noreferrer noopener">Predatory monetisation? A categorisation of unfair, misleading, and aggressive monetisation techniques in digital games from the perspective of players - Elena Petrovskaya, David Zendle, University of York</a>
		</li>
		<li>
			<a href="https://www.ftc.gov/system/files/documents/reports/staff-perspective-paper-loot-box-workshop/loot_box_workshop_staff_perspective.pdf" target="_blank" rel="noreferrer noopener">FTC Video Game Loot Box Workshop - FTC Bureau of Consumer Protection</a>
		</li>
	</ul>

	<strong>Video</strong>
	<ul>
		<li>
			<a href="https://www.youtube.com/watch?v=7E5pcpanOto" target="_blank" rel="noreferrer noopener">The FALLACY of Video Game Prices and the Complete Evolution of Microtransactions - Upper Echelon Gamers</a>
		</li>
		<li>
			<a href="https://www.youtube.com/watch?v=YLSX4yw6Jzo" target="_blank" rel="noreferrer noopener">The War of The Lootboxes and Microtransactions - Upper Echelon Gamers</a>
		</li>
	</ul>
</article>



<style lang="scss">
	p {
		line-height: 1.5em;
	}

	strong {
		color: var(--text-color-light);
	}

	hr {
		border-color: var(--border-color);
		margin: 6rem 0;
	}

	ul {
    list-style: none;
    padding-left: 1.5rem;

    li {
      position: relative;
			margin-top: .5rem;

      &::before {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        content: "•";
        color: var(--primary);
        padding-right: .5rem;
        transform: translateX(-100%);
      }
    }
  }
</style>
