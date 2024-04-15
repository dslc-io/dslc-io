var redirects = "redirects.tsv";
var current_path = window.location.pathname.replace(/\/$/, "");
var query = window.location.search;
var hash = window.location.hash;
var new_url = "";
var xhr = new XMLHttpRequest();
xhr.open("GET", redirects, false);
xhr.send();
var lines = xhr.responseText.split("\n");
for (var i = 0; i < lines.length; i++) {
  var parts = lines[i].split("\t");
  parts = parts.map(x => x.replace(/\/$/, ""));
  if (parts[0] == current_path) {
    window.location.href = parts[1] + query + hash;
    break;
  }
}
