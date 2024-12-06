function handlePageNotFound() {
  try {
    const target = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    console.log("Handling page not found for target:", target);

    // Exit early if no target (stay on the page)
    if (!target) {
      console.log("No target found, redirecting to notfound.html");
      redirectToNotFound();
      return;
    }

    handleRedirection(
      target,
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJVHVYt-8eeuR8iq0cxEz1uMuLY02AdFyuSeSECQSxdLbWV9PqIeVzz4Lh_Udm1nT92FDBLXDTWMqV/pub?gid=1314751843&single=true&output=tsv"
    ).then(redirected => {
      if (!redirected) {
        console.log("Redirection failed, redirecting to notfound.html");
        redirectToNotFound();
      }
    }).catch(error => {
      console.error("Error during redirection:", error);
      redirectToNotFound();
    });
  } catch (error) {
    console.error("Error during redirection:", error);
    redirectToNotFound();
  }
}

function redirectToNotFound() {
  console.log("Redirecting to notfound.html");
  window.location.href = 'notfound.html';
}
