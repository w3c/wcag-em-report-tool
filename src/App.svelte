<!--
  * This file should be used to arange the base of the App.
  * Meaning: importing stuff and display without the need
  * to do any logic etc.
  * If the app needs configuration, this can be passed on
  * from the main file 'client.js' and passed as props.
  * e.g.:
  *   new App({
  *     ...
  *     props: {
  *       settings,
  *       theme,
  *       hacks,
  *       etc
  *     }
  *     ...
  *   });
  *
  * In here, App.svelte, they would then be accessed like props:
  * e.g.:
  *   export let setting;
  *   export let theme;
  *   export let hacks;
  *   export let etc;
  *
  *   and passed on to the Components who need them.
  -->
<Header/>
<!-- Content please -->
<Footer/>

<script>

  import Header from './includes/components/Header.svelte';
  import Footer from './includes/components/Footer.svelte';
</script>
