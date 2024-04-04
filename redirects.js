var redirects = "redirects.tsv";
var current_url = window.location.href;
var new_url = "";
var xhr = new XMLHttpRequest();
xhr.open("GET", redirects, false);
xhr.send();
var lines = xhr.responseText.split("\n");
for (var i = 0; i < lines.length; i++) {
  var parts = lines[i].split("\t");
  if (parts[0] == current_url) {
    window.location.href = new_url;
    break;
  }
}
