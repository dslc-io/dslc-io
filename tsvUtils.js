const isTSVUrlDefined = () => {
  if (typeof TSV_URL === 'undefined') {
    console.error("TSV_URL is not defined. Please configure it in the HTML.");
    return false;
  }
  return true;
};

const fetchTSVData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch TSV file. HTTP status: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (fetchError) {
    console.error("Error fetching TSV file:", fetchError);
    return null;
  }
};

let parsedTSVData = null; // Cache the parsed TSV data

const getOrFetchTSVData = async (url) => {
  if (parsedTSVData) {
    return parsedTSVData;
  }
  const tsvData = await fetchTSVData(url);
  if (tsvData) {
    parsedTSVData = tsvData;
  }
  return tsvData;
};

const parseTSVDataToMap = (tsvData) => {
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
