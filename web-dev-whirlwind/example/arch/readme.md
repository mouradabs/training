# frontend architectures

In the [dom section](../dom), we briefly introduced a reactive architecture
centered around state transitions using [virtual-dom][] and [main-loop][].

# bus

In a simple app using [virtual-dom][] and [main-loop][]:

``` js
var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

function render (state) {
  return h('div', [
    h('h1', 'clicked ' + state.times + ' times'),
    h('div', [
      h('button', { onclick: onclick }, 'click me')
    ])
  ])
  function onclick (ev) {
    loop.update({ times: state.times + 1 })
  }
}
```

State transitions are triggered by calling `loop.update(newState)` with the new
state that the render function should use to draw the updated version of the
display.

This basic design works pretty well to start with, but as the rendering
code gets longer, manipulating the state directly inside of event handlers like
`onclick` can get tiresome and might end up putting too much state management
logic into the display code.

A good idea we can borrow here from the react community are architectures based
around "unidirectional flow", where our event-handling code will emit events to
an event emitter and we can handle the state transitions in a consolidated
controller layer elsewhere.

To update our example to handle state transitions from outside the rendering
code, we can make some small changes:

``` js
var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter

var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

require('./actions.js')(bus, loop)

function render (state) {
  return h('div', [
    h('h1', 'clicked ' + state.times + ' times'),
    h('div', [
      h('button', { onclick: onclick }, 'click me')
    ])
  ])
  function onclick (ev) {
    loop.update({ times: state.times + 1 })
  }
}
```

and now in `actions.js`, we can listen for events on our event bus and trigger
state updates accordingly:

``` js
module.exports = function (bus, loop) {
  bus.on('increment', function () {
    loop.update({ times: state.times + 1 })
  })
}
```

This is an overly simple example, and the benefits of this approach are mostly
realized as an application grows, so don't worry about getting everything right
to start out.

[virtual-dom]: https://npmjs.com/package/virtual-dom
[main-loop]: https://npmjs.com/package/main-loop

# universal

Universal code works in both node and the browser. Many of the libraries we've
seen have this property, but how can we build our application so that we can
move our rendering around between the server and the client?

By rendering content on the server first where appropriate, we can make a web
page feel very fast to load and make it easier for search engines to index our
content.

The first thing we can do is separate our DOM construction and routing logic
from any browser or server specific APIs.

Here's an example of what a router using the [routes][] module looks like:

``` js
var h = require('virtual-dom/h')
var router = require('routes')()
module.exports = router

router.addRoute('/', function (m) {
  return layout(m.state, h('div', 'welcome!'))
})

router.addRoute('/wow', function (m) {
  return layout(m.state, h('div', 'wowsers!'))
})

router.addRoute('/amaze', function (m) {
  return layout(m.state, h('div', [
    h('div', 'such universal javascript!'),
    h('div', 'very client server')
  ]))
})

function layout (state, page) {
  var links = [ '/', '/wow', '/amaze' ]
  var titles = {
    '/': 'home',
    '/wow': 'wow',
    '/amaze': 'amaze'
  }
  return h('div', [
    h('h1', titles[state.path]),
    h('div.links', links.map(function (href) {
      return h(
        'a' + (state.path === href ? '.active' : ''),
        { href: href },
        titles[href]
      )
    })),
    page
  ])
}
```

Here we have a layout function and we have some custom content for each route.

On our server, we can load this router and inject the dom tree as a string into
our index.html page using [hyperstream][]:

``` js
var fs = require('fs')
var path = require('path')
var xtend = require('xtend')
var hyperstream = require('hyperstream')

var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'public'))
var createElement = require('virtual-dom/create-element')

var http = require('http')
var router = require('./router.js')

var server = http.createServer(function (req, res) {
  var state = { path: req.url }
  var m = router.match(req.url)
  if (m) {
    var elem = createElement(m.fn(xtend(m, { state: state })))
    read('index.html').pipe(hyperstream({
      '#content': elem.toString()
    })).pipe(res)
  } else st(req, res)
})
server.listen(8000)

function read (x) {
  return fs.createReadStream(path.join(__dirname, 'public', x))
}
```

And finally, our browser code can load the `router.js` and update the URL using
[single-page][] to speak the pushState API. We can also intercept all internal
links on the page and redirect them through our pushState handler using
[catch-links][]:

``` js
var h = require('virtual-dom/h')
var xtend = require('xtend')

var main = require('main-loop')
var state = {
  path: location.pathname
}
var router = require('./router.js')
var loop = main(state, render, require('virtual-dom'))
var target = document.querySelector('#content')
target.parentNode.replaceChild(loop.target, target)

var show = require('single-page')(function (href) {
  loop.update(xtend({ path: href }))
})
require('catch-links')(window, show)

function render (state) {
  var m = router.match(state.path)
  if (!m) return h('div.error', 'not found')
  else return m.fn(xtend(m, { state: state }))
}
```

[routes]: https://npmjs.com/package/routes
[hyperstream]: https://npmjs.com/package/hyperstream
[single-page]: https://npmjs.com/package/single-page
[catch-links]: https://npmjs.com/package/catch-links
