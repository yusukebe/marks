# 🔖 Marks

Bookmark App with Cloudflare Workers.

You can deploy your own Marks to the Cloudflare Workers.

## Screenshots

![SS](https://user-images.githubusercontent.com/10682/156680928-90de1e4e-2409-4b70-b33b-d632d2fd46d1.png)

Add Bookmark from shortcuts of macOS:

![SS](https://user-images.githubusercontent.com/10682/156680941-975aaf03-c9f6-4ef6-af2d-948d3ed6c525.png)

## Prerequisites

* Cloudflare Account
* [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/)

## Install

```plain
$ git clone https://github.com/yusukebe/marks.git
$ cd marks
$ yarn install
```

## Setting

Rename `wrangler.toml`:

```plain
$ mv wrangler.example.toml wrangler.toml
```

Make KV namespace id:

```plain
$ wrangler kv:namespace create BOOKMARK

🌀 Creating namespace with title "marks-BOOKMARK"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "BOOKMARK", id = "your id" }
```

Edit `wrangler.toml`:

```toml
kv_namespaces = [
  { binding = "BOOKMARK", id = "your id" }
]
```

Set your Basic Auth username and password:

```plain
$ wrangler secret put NAME
$ wrangler secret put PASS
```

## Build&Deploy

```plain
$ wrangler publish
```

## macOS Shortcuts

![SS](https://user-images.githubusercontent.com/10682/156721647-be28cc16-73d8-4059-83c9-0dcd2989d5f5.png)

## Bookmarklet

```js
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
    'https://{app-name}.{your-name}.workers.dev/?url=' + encodeURIComponent(url)
  location.href = redirect
})()
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
