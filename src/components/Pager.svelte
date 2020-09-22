<!--
 * @component
 * Pager
 * -->
<aside class="pager">
  <ul>
    {#if previousPage}
      <li class="pager--item previous">
        <Link to="{previousPage.path}">
          <svg aria-hidden="true" class="pager--item-icon icon-arrow-left"><use
              xlink:href="images/icons.svg#icon-arrow-left"
            ></use></svg>
          <span class="pager--item-text">
            <span class="pager--item-text-direction">Previous {label}</span>
            <span class="pager--item-text-target">{$translate(previousPage.title)}</span>
          </span>
        </Link>
      </li>
    {/if}

    {#if nextPage}
      <li class="pager--item next">
        <Link to="{nextPage.path}">
          <svg aria-hidden="true" class="pager--item-icon icon-arrow-right"><use
              xlink:href="images/icons.svg#icon-arrow-right"
            ></use></svg>
          <span class="pager--item-text">
            <span class="pager--item-text-direction">Next {label}</span>
            <span class="pager--item-text-target">{$translate(nextPage.title)}</span>
          </span>
        </Link>
      </li>
    {/if}
  </ul>
</aside>
<!-- /component -->

<style>
  .pager {
    grid-row: 2;
    grid-column: 2 / span 5;
  }

  .pager--item-text {
    margin: 0 0.5em;
  }

  .next {
    text-align: right;
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';
  import { Link, useLocation } from 'svelte-navigator';

  export let label = 'page';
  export let context = [];

  let indexedContext = context.map((page, index) => {
    return {
      path: page.path || '/',
      title: page.title || '',
      index
    };
  });

  let pageCount = indexedContext.length;
  let location = useLocation();

  $: currentPage = indexedContext.find((page) => page.path === $location.pathname);
  $: currentPageIndex = currentPage ? currentPage.index : null;

  $: previousPage = currentPageIndex > 0 && indexedContext[currentPageIndex - 1];
  $: nextPage = currentPageIndex < pageCount - 1 && indexedContext[currentPageIndex + 1];
</script>
