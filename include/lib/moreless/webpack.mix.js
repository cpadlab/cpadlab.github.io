let mix = require("laravel-mix");
mix
  .js("index.js", "moreless.js")
  .js("demo.js", "demo/demo.js")
  .setPublicPath("./");