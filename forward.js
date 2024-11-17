(async () => {
  try {
    // Ensure TSV_URL is defined
    if (typeof TSV_URL === 'undefined') {
      console.error("TSV_URL is not defined. Please configure it in the HTML.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('target');

    // Exit early if no target (stay on the page)
    if (!target) return;

    // Fetch the TSV file
    const response = await fetch(TSV_URL);
    if (!response.ok) return;

    const tsvData = await response.text();
    const redirectMap = {};

    tsvData.split('\n').forEach(line => {
      const [key, url] = line.split('\t');
      if (key && url) redirectMap[key.trim()] = url.trim();
    });

    // Redirect if target exists in the map
    if (redirectMap[target]) {
      window.location.href = redirectMap[target];
    }
  } catch (error) {
    console.error("Error during redirection:", error);
  }
})();
