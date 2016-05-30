var Router = require('routes')
var html = require('yo-yo')
var strftime = require('strftime')
var router = Router()
module.exports = router

function layout (body) {
  return html`<body>
    <h1>my cool web page</h1>
    <div>
      <a href="/">home</a>
      <a href="/about">about</a>
      <a href="/whatever">whatever</a>
    </div>
    <div id="container">${body}</div>
    <script src="bundle.js"></script>
  </body>`
}

router.addRoute('GET /', function (params, getData, cb) {
  getData('posts', function (err, data) {
    if (err) return cb(err)
    var posts = data.map(function (post) {
      var t = strftime('%F', new Date(Number(post.time)))
      return html`<div class="post">
        <div>${t}</div>
        <div>${post.user}</div>
        <div>${post.body}</div>
      </div>`
    })
    cb(null, layout(html`<div>
      <h1>posts</h1>
      <div id="posts">${posts}</div>
    </div>`))
  })
})

router.addRoute('GET /about', function (params, getData, cb) {
  cb(null, layout(html`<div>about...</div>`))
})

router.addRoute('GET /whatever', function (params, getData, cb) {
  cb(null, layout(html`<div>whatever...</div>`))
})
