(() => {
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

    // Synchronously fetch the TSV file
    const xhr = new XMLHttpRequest();
    xhr.open("GET", TSV_URL, false); // false = synchronous
    xhr.send();

    if (xhr.status !== 200) {
      console.error(`Failed to fetch TSV file. HTTP status: ${xhr.status}`);
      return;
    }

    const tsvData = xhr.responseText;

    // Parse the TSV data
    const redirectMap = {};
    tsvData.split('\n').forEach(line => {
      const [key, url] = line.split('\t');
      if (key && url) redirectMap[key.trim()] = url.trim();
    });

    // Redirect if the target exists in the map
    if (redirectMap[target]) {
      window.location.href = redirectMap[target];
    }
  } catch (error) {
    console.error("Error during redirection:", error);
  }
})();
