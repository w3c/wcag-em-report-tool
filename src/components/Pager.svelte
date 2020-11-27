<!--
 * @component
 *   Pager
 * -->
<aside class="Pager pager">
  <ul>
    {#if previousPage}
      <li class="Pager__Item pager--item previous">
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
      <li class="Pager__Item pager--item next">
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
  .Pager {}

  .Pager__Item {}
</style>

<script>
  import { getContext } from 'svelte';
  import { Link, useLocation } from 'svelte-navigator';

  export let label = 'page';
  export let context = [];

  const { translate } = getContext('app');
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
