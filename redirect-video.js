(async function() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('target');

    // Exit early if no target (stay on the page)
    if (!target) return;

    handleRedirection(
      target,
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSz2OM6l9NYafJp4SISUs8W8Kql2MUumFKxpg_GLtoaybuqBxI1l9MegNceSAgPRmCOqEoNhGxp504g/pub?gid=1409549687&single=true&output=tsv"
    );
  } catch (error) {
    console.error("Error during redirection:", error);
  }
})();
