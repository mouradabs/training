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

## css

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
