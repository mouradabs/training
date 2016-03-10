# dom

In this section, we will explore some libraries for constructing virtual DOMs
and inlining static assets.

# brfs

[brfs][] is a browserify transform that replaces `fs.readFileSync()` calls with
the contents of files.

For example, if we had a node program:

``` js
var fs = require('fs')
var src = fs.readFileSync(__dirname + '/hello.txt', 'utf8')
console.log(src)
```

and a file `hello.txt`:

```
$ echo GREETINGS > hello.txt
```

We can run the program in node:

```
$ node main.js
GREETINGS
```

or we can compile the same code using browserify with brfs:

```
$ browserify main.js -t brfs > bundle.js
```

and when we open an index.html with `<script src="bundle.js"></script>` in the
browser, we should see the message `GREETINGS` in the debugger.

You can also update `package.json` with a browserify transform field so you
don't need to remember to put the `-t brfs`:

``` json
{
  "browserify": {
    "transform": [ "brfs" ]
  }
}
```

Another cool feature is that watchify is smart enough to know to recompile your
bundle when you change one of the files loaded with brfs, so you can edit static
assets and refresh like normal.

## brfs base64

The `fs.readFileSync()` api from node.js can accept a 2nd argument to specify
the encoding. [brfs][] supports the same feature. For example, we can inline
some file contents as a base64-encoded string:

``` js
var fs = require('fs')
var data = fs.readFileSync(__dirname + '/apatosaur.png', 'base64')

var img = document.createElement('img')
img.src = 'data:image/png;base64,' + data
document.body.appendChild(img)
```

In this example, we can construct a [data uri][] to inline a png file into our
javascript bundle.

## brfs css

With [brfs][], you can include css files inline in your bundle and you can use
[insert-css][]. [insert-css][] inserts a block of css text into the `<head>` of
the current page. This is handy if you have some code that needs some css to
function properly, but don't want consumers of your code to worry about
including the correct css.

``` js
var fs = require('fs')
var insertcss = require('insert-css')
insertcss(fs.readFileSync(__dirname + '/whatever.css', 'utf8'))

var div = document.createElement('div')
div.className = 'whatever'
div.innerText = 'blah'
document.body.appendChild(div)
```

[brfs]: https://npmjs.com/package/brfs
[insert-css]: https://npmjs.com/package/insert-css
[data uri]: https://en.wikipedia.org/wiki/Data_URI_scheme

# virtual-dom

There are a lot of ways to modify and generate html from javascript, but
it's easy to write spaghetti code when modifying the DOM directly with the
browser's native DOM methods.

With [virtual-dom][] and [main-loop][], it's much easier to whip something up
quickly that won't quickly become a mess.

You may have heard about virtual DOMs from react, but I think the virtual-dom
library combined with main-loop gets to the same concept in a more modular
fashion (we can swap out components at will) with fewer unnecessary details.

The [virtual-dom][] library creates an object hierarchy similar to the browser
DOM and provides patch and diff methods to update the browser DOM as the virtual
DOM changes without creating flashes of content.

[main-loop][] takes care of calling [virtual-dom][]'s methods as necessary as
the state of our application changes.

Here's a very simple example:

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

[main-loop][]'s `main()` function takes 3 arguments: an initial state object, a
`render(state)` function, and an object with `patch()`, `diff()`, and
`createElement()` methods like what `require('virtual-dom')` provides.

We can use the `h()`

[virtual-dom]: https://npmjs.com/package/virtual-dom
[main-loop]: https://npmjs.com/package/main-loop

# template strings

The javascript language has a relatively new feature called template strings.

Template strings are strings that use backticks as delimiters and can span
multiple lines:

``` js
var str = `
  This string
  spans multiple
  lines.`
```

Template strings have a special `${}` substitution syntax that you can use to
place the result expressions into the template string output. For example:

``` js
var who = 'wizards', what = 'conjuring'
console.log(`The ${who} are ${what}.`)
```

Template strings are even more powerful than a simple substitution syntax
because you can use a tagged template function to take the template string and
all the substitution expressions to decide what kind of object to create.

## hyperx

If you dislike building up HTML with hyperscript-style `h()` functions, we can
use template strings and a tagged template function from [hyperx][] to provide a
more familiar html syntax that can build the same virtual-dom objects.

``` js
var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var hx = hyperx(vdom.h)
var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

function render (state) {
  return hx`<div>
    <h1>clicked ${state.times} times</h1>
    <div>
      <button onclick=${onclick}>click me</button>
    </div>
  </div>`

  function onclick (ev) {
    loop.update({ times: state.times + 1 })
  }
}
```

You can use any library with hyperx that has an element construction function
`h(tagName, attrs, children)`. Here's an example using `React.createElement`:

``` js
var React = require('react')
var render = require('react-dom').render
var hyperx = require('hyperx')
var hx = hyperx(React.createElement)

var App = React.createClass({
  getInitialState: function () { return { times: 0 } },
  render: function () {
    return hx`<div>
      <h1>clicked ${this.state.times} times</h1>
      <div>
        <button onClick=${this.handleClick}>click me!</button>
      </div>
    </div>`
  },
  handleClick: function () {
    this.setState({ times: this.state.times + 1 })
  }
})
render(React.createElement(App), document.querySelector('#content'))
```
