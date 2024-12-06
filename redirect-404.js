async function handlePageNotFound() {
  try {
    const target = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    // Exit early if no target (stay on the page)
    if (!target) {
      redirectToNotFound();
      return;
    }

    const redirected = await handleRedirection(
      target,
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJVHVYt-8eeuR8iq0cxEz1uMuLY02AdFyuSeSECQSxdLbWV9PqIeVzz4Lh_Udm1nT92FDBLXDTWMqV/pub?gid=1314751843&single=true&output=tsv"
    );

    // Only redirect to notfound.html if no redirection occurred
    if (!redirected) {
      redirectToNotFound();
    }
  } catch (error) {
    console.error("Error during redirection:", error);
    redirectToNotFound();
  }
}

function redirectToNotFound() {
  window.location.href = 'notfound.html';
}
