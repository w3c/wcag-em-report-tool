<!-- @Layout:Evaluation -->
<slot />
<Pager
  title="step"
  context={routes}
/>
<!-- /@Layout -->

<script>
  import Pager from '../Pager.svelte';

  let routes = [
    {
      title: 'SCOPE.TITLE',
      path: 'scope',
    },
    {
      title: 'EXPLORE.TITLE',
      path: 'explore',
    },
    {
      title: 'SAMPLE.TITLE',
      path: 'sample',
    },
    {
      title: 'AUDIT.TITLE',
      path: 'audit',
    },
    {
      title: 'SUMMARY.TITLE',
      path: 'summary',
    },
    {
      title: 'REPORT.TITLE',
      path: 'report',
    }
  ];
</script>
