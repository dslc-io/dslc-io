document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (!isTSVUrlDefined()) return;

    const tsvData = await getOrFetchTSVData(TSV_URL);
    if (!tsvData) return;

    const bookGroups = parseTSVDataToGroups(tsvData);
    const sortedKeys = Object.keys(bookGroups).sort();

    const container = getContainerElement('playlist-container');
    if (!container) return;

    buildAndDisplayBookGroups(sortedKeys, bookGroups, container);

    // Delay calling highlightAnchorFromUrl until the next event loop to ensure elements are rendered
    setTimeout(highlightAnchorFromUrl, 0);

    // Add listener for hashchange to handle highlighting when the anchor changes
    window.addEventListener('hashchange', highlightAnchorFromUrl);
  } catch (error) {
    console.error("Error processing TSV data or building the list:", error);
  }
});

const getContainerElement = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Playlist container not found in the document.");
    return null;
  }
  return container;
};

const buildAndDisplayBookGroups = (sortedKeys, bookGroups, container) => {
  const fragment = document.createDocumentFragment(); // Create a DocumentFragment

  sortedKeys.forEach(book_title => {
    const { cohorts, book_code } = bookGroups[book_title];
    if (cohorts.length === 0) return; // Skip empty groups

    const column = createBookGroupColumn(book_title, book_code);
    const listContainer = createBookGroupList(cohorts);

    column.appendChild(listContainer);
    fragment.appendChild(column); // Append to the fragment instead of the container directly
  });

  container.appendChild(fragment); // Append the fragment to the container
};

const createBookGroupColumn = (book_title, book_code) => {
  const column = document.createElement('div');
  column.classList.add('book-group-column'); // Add CSS class for column styling

  const titleHeader = document.createElement('h3');
  titleHeader.textContent = book_title;
  titleHeader.id = book_code; // Set the anchor ID to book_code
  column.appendChild(titleHeader);

  return column;
};

const createBookGroupList = (cohorts) => {
  const listContainer = document.createElement('ul');
  // Sort cohorts by cohort number in descending order
  cohorts.sort((a, b) => b.cohort - a.cohort);
  cohorts.forEach(({ cohort_id, playlist_url, cohort }) => {
    const listItem = createBookGroupListItem(cohort_id, playlist_url, cohort);
    listContainer.appendChild(listItem);
  });
  return listContainer;
};

const createBookGroupListItem = (cohort_id, playlist_url, cohort) => {
  const listItem = document.createElement('li');
  const link = document.createElement('a');

  // Set link attributes
  link.href = playlist_url;
  link.textContent = `Cohort ${cohort} (${cohort_id})`;

  // Append to the list
  listItem.appendChild(link);
  return listItem;
};

const highlightAnchorFromUrl = () => {
  // Remove existing highlights
  const previouslyHighlighted = document.querySelector('.book-group-column > .highlighted');
  if (previouslyHighlighted) {
    previouslyHighlighted.classList.remove('highlighted');
  }

  // Highlight the new anchor element
  const hash = window.location.hash.slice(1);
  if (hash) {
    const targetElement = document.getElementById(hash);
    if (targetElement) {
      targetElement.classList.add('highlighted');
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
