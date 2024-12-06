// Store parsed data across multiple URLs
const parsedTSVData = {};

// General function to handle redirection
async function handleRedirection(target, TSV_URL) {
  try {
    console.log("Handling redirection for target:", target);
    if (!target || !TSV_URL) {
      console.warn("Missing target or TSV_URL");
      return false;
    }

    if (!parsedTSVData[TSV_URL]) {
      console.log("Fetching and parsing TSV data for URL:", TSV_URL);
      const tsvData = await getOrFetchTSVData(TSV_URL);
      if (!tsvData) {
        console.warn("No TSV data available for URL:", TSV_URL);
        return false;
      }

      parsedTSVData[TSV_URL] = parseTSVDataToMap(tsvData);
    }

    const redirectMap = parsedTSVData[TSV_URL];
    if (redirectMap[target]) {
      console.log("Redirecting to URL:", redirectMap[target]);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for 1 second before redirecting
      window.location.href = redirectMap[target];
      return true;
    } else {
      console.warn("Target not found in redirect map:", target);
    }
  } catch (error) {
    console.error("Error during redirection:", error);
  }
  return false; // Redirection failed or target not found
}
