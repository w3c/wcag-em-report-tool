<aside class="relatedPages">
  {#if previousPage}
    <a href="{previousPage.href}" rel="prev">{previousPage.title}</a>
  {/if}

  {#if nextPage}<a href="{nextPage.href}" rel="next">{nextPage.title}</a>{/if}
</aside>
