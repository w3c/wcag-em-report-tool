export function honourFragmentIdLinks(routerLocation) {
  if (routerLocation.hash) {
    const fragment = document.querySelector(routerLocation.hash);

    // explicitly move focus
    fragment.tabIndex = "-1";
    fragment.focus();

    // center in viewport
    fragment.scrollIntoView({
      behavior: "auto",
      block: "center",
    });

    // by setting location.hash explictly, we ensure :target
    // selectors in CSS will work as expected
    window.location.hash = routerLocation.hash;
  }
}
