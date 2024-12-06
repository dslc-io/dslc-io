async function handlePageNotFound() {
  try {
    const target = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    console.log("Handling page not found for target:", target);

    // Exit early if no target (stay on the page)
    if (!target) {
      console.log("No target found, redirecting to notfound.html");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for 1 second before redirecting
      redirectToNotFound();
      return;
    }

    const redirected = await handleRedirection(
      target,
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJVHVYt-8eeuR8iq0cxEz1uMuLY02AdFyuSeSECQSxdLbWV9PqIeVzz4Lh_Udm1nT92FDBLXDTWMqV/pub?gid=1314751843&single=true&output=tsv"
    );

    // Only redirect to notfound.html if no redirection occurred
    if (!redirected) {
      console.log("Redirection failed, redirecting to notfound.html");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for 1 second before redirecting
      redirectToNotFound();
    }
  } catch (error) {
    console.error("Error during redirection:", error);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for 1 second before redirecting
    redirectToNotFound();
  }
}

function redirectToNotFound() {
  console.log("Redirecting to notfound.html");
  window.location.href = 'notfound.html';
}
