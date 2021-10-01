javascript: (function () {
  var url = document.location.href
  var links = document.getElementsByTagName('link')
  for (i in links) {
    if (links[i].rel) {
      if (links[i].rel.toLowerCase() == 'canonical') {
        url = links[i].href
      }
    }
  }
  var redirect =
    'https://bookmarcs.yusukebe.workers.dev/?url=' + encodeURIComponent(url)
  location.href = redirect
})()
