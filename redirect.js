// Store parsed data across multiple URLs
const parsedTSVData = {};

// General function to handle redirection
async function handleRedirection(target, TSV_URL) {
  try {
    if (!target || !TSV_URL) return;

    if (!parsedTSVData[TSV_URL]) {
      const tsvData = await getOrFetchTSVData(TSV_URL);
      if (!tsvData) return;

      parsedTSVData[TSV_URL] = parseTSVDataToMap(tsvData);
    }

    const redirectMap = parsedTSVData[TSV_URL];
    if (redirectMap[target]) {
      window.location.href = redirectMap[target];
    }
  } catch (error) {
    console.error("Error during redirection:", error);
  }
}
