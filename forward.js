document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Check if TSV_URL is defined
    if (typeof TSV_URL === 'undefined') {
      console.error("TSV_URL is not defined. Please configure it in the HTML.");
      return;
    }

    // Parse the query string for the 'target' parameter
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('target');

    // If no query string or 'target' is provided, stay on the page
    if (!target) {
      return; // Quietly exit without warnings
    }

    // Fetch the TSV file from the configured URL
    const response = await fetch(TSV_URL);
    if (!response.ok) {
      console.error(`Failed to fetch the TSV file. HTTP status: ${response.status}`);
      return;
    }

    const tsvData = await response.text();

    // Parse the TSV file into a lookup map
    const redirectMap = {};
    tsvData.split('\n').forEach(line => {
      const [key, url] = line.split('\t');
      if (key && url) {
        redirectMap[key.trim()] = url.trim();
      }
    });

    // Look up the target in the redirect map
    if (redirectMap[target]) {
      console.log(`Redirecting to: ${redirectMap[target]}`);
      window.location.href = redirectMap[target];
    }
    // If no match is found, quietly stay on the page
  } catch (error) {
    console.error("An error occurred while processing the redirection:", error);
  }
});
