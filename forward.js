(async function() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('target');

    // Exit early if no target (stay on the page)
    if (!target) return;

    if (!isTSVUrlDefined()) return;

    const tsvData = await getOrFetchTSVData(TSV_URL);
    if (!tsvData) return;

    // Parse TSV data into a map
    const redirectMap = parseTSVDataToMap(tsvData);

    // Redirect if the target exists in the map
    if (redirectMap[target]) {
      window.location.href = redirectMap[target];
    } else {
      urlParams.delete('target');
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${
          urlParams.toString() ? '?' + urlParams.toString() : ''
        }#${target}`
      );
    }
  } catch (error) {
    console.error("Error during redirection:", error);
  }
})();
