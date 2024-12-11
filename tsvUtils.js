const isTSVUrlDefined = () => {
  if (typeof TSV_URL === 'undefined') {
    console.error("TSV_URL is not defined. Please configure it in the HTML.");
    return false;
  }
  return true;
};

const fetchTSVData = async (url, fallbackPath = null) => {
  try {
    console.log("Fetching TSV data from URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch TSV file. HTTP status: ${response.status}`);
      if (fallbackPath) {
        console.log("Using fallback data at ", fallbackPath);
        return await fetchFallbackTSVData(fallbackPath);
      }
      return null;
    }
    return await response.text();
  } catch (fetchError) {
    console.error("Error fetching TSV file:", fetchError);
    if (fallbackPath) {
      console.log("Using fallback data at ", fallbackPath);
      return await fetchFallbackTSVData(fallbackPath);
    }
    return null;
  }
};

const fetchFallbackTSVData = async (fallbackPath) => {
  try {
    const response = await fetch(fallbackPath);
    if (!response.ok) {
      console.error(`Failed to fetch fallback TSV file. HTTP status: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (fetchError) {
    console.error("Error fetching fallback TSV file:", fetchError);
    return null;
  }
};

const fetchedTSVData = {};

const getOrFetchTSVData = async (url, fallbackPath = null) => {
  if (fetchedTSVData[url]) {
    console.log("Using cached TSV data for URL:", url);
    return fetchedTSVData[url];
  }
  const tsvData = await fetchTSVData(url, fallbackPath);
  if (tsvData) {
    fetchedTSVData[url] = tsvData;
  }
  return tsvData;
};

const parseTSVDataToMap = (tsvData) => {
  console.log("Parsing TSV data");
  const redirectMap = {};
  tsvData.split('\n').forEach(line => {
    const [key, url] = line.split('\t').map(item => item.trim());
    if (key && url) {
      redirectMap[key] = url;
    }
  });
  return redirectMap;
};

const parseTSVDataToGroups = (tsvData) => {
  console.log("Parsing TSV data to groups");
  const bookGroups = {};
  const lines = tsvData.split('\n').slice(1); // Skip the header row
  lines.forEach(line => {
    let [cohort_id, playlist_url, book_code, cohort, book_title] = line.split('\t').map(item => item.trim());
    cohort = parseInt(cohort, 10); // Convert cohort to an integer
    if (book_title && book_title !== "#N/A" && playlist_url && cohort && cohort_id) {
      if (!bookGroups[book_title]) {
        bookGroups[book_title] = { cohorts: [], book_code };
      }
      bookGroups[book_title].cohorts.push({ cohort_id, playlist_url, cohort });
    }
  });
  return bookGroups;
};
