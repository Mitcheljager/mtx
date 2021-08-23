<footer class="footer">
	<div>Made by Mitchel Jager | Find me on Discord: Mitsiee#9370</div>

  <div>
    <a href="/privacy" sveltekit:prefetch>Privacy</a> |
    Contribute on <a href="https://github.com/Mitcheljager/mtx/" target="_blank" rel="noreferrer noopener">GitHub</a>
</footer>



<style lang="scss">
  .footer {
    padding: 6rem 0 1.5rem;
    margin-top: auto;
    color: var(--text-color-dark);
    font-size: .85rem;

    @media (min-width: 640px) {
      display: flex;
      justify-content: space-between;
    }
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }
</style>
