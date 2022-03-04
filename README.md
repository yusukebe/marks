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

```plain
$ mv wrangler.example.toml
$ wrangler kv:namespace create BOOKMARK
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

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
