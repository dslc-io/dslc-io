function handleVideoRedirection() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('target') || window.location.hash.replace(/^#/, '');
    console.log("Handling video redirect for target:", target);

    // Exit early if no target
    if (!target) {
      console.log("No target found, redirecting to playlists.html");
      redirectToPlaylists();
      return;
    }

    handleRedirection(
      target,
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSz2OM6l9NYafJp4SISUs8W8Kql2MUumFKxpg_GLtoaybuqBxI1l9MegNceSAgPRmCOqEoNhGxp504g/pub?gid=1409549687&single=true&output=tsv"
    ).then(redirected => {
      if (!redirected) {
        console.log("Redirection failed, redirecting to playlists.html");
        redirectToPlaylists(target);
      }
    }).catch(error => {
      console.error("Error during redirection:", error);
      redirectToPlaylists(target);
    });
  } catch (error) {
    console.error("Error during redirection:", error);
    redirectToPlaylists();
  }
}

function redirectToPlaylists(target) {
  console.log("Redirecting to playlists.html", target ? `with target as hash: #${target}` : "without target");
  const hash = target ? `#${encodeURIComponent(target)}` : '';
  console.log(`playlists.html${hash}`);
  window.location.href = `playlists.html${hash}`;
}
