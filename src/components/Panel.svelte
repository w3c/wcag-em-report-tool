<aside class="Panel">
  <header class="Panel__Header">
    <h2 class="Panel__Header__heading">Panel heading</h2>
    <button type="button" class="Panel__Toggle button-small showhidebutton">Hide</button>
  </header>

  <div class="Panel__Body">
    <p>Panel body</p>
    <slot></slot>
  </div>

  <footer class="Panel__Footer">Panel footer</footer>
</aside>

<style>
  .Panel {
    -ms-grid-column: 8;
    -ms-grid-column-span: 1;
    grid-column: 8 / span 2;
    -ms-grid-row: 2;
    grid-row-start: 1;

    align-self: start;
    justify-self: end;

    margin-bottom: 2em;
    outline: none;
    border: 1px solid var(--line-grey);
    padding: 1em;
    width: 100%;
    background-color: var(--footer-grey);
    box-shadow: 0px 2px 8px -7px #000;
  }

  @media (min-width: 60em) {
    .Panel {
      position: sticky;
      top: 1em;
    }
  }
  .Panel__Header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid var(--line-grey);
  }

  .Panel__Header__heading {
    margin: 0;
    border-bottom: none;
    font-size: 1em;
    line-height: 1.5;
    font-weight: bold;
  }

  .Panel__Toggle {
    padding: 0.25em;
  }
  .showhidebutton::after {
    /* Corrections */
    margin-left: 0.5em;
  }
</style>
