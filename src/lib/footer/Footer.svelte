<footer class="footer">
	<div>Made by Mitchel Jager</div>

  <div>
    <a href="/privacy" sveltekit:prefetch>Privacy</a> |
    Contribute on <a href="https://github.com/Mitcheljager/mtx/" target="_blank" rel="noreferrer noopener">GitHub</a>
</footer>



<style lang="scss">
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;
    margin-top: 6rem;
    color: var(--text-color-dark);
    font-size: .85rem;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }
</style>
