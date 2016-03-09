# frontend modules and build scripts

[npm][] is full of useful javascript packages that run in node.js, the browser,
and oftentimes, in both!

However, to make npm packages, which use `module.exports` and `require()` work
in the browser, we'll need to add a build step to compile our code into a form
that browsers understand.

One of the easiest build steps to get started with is [browserify][].

When you install browserify with npm using the `-g` option:

```
npm install -g browserify
```

(Note: you may need to do `sudo npm install -g browserify` depending on how npm
is configured)

You will get a `browserify` command in your terminal. Equipped with the
`browserify` command, we can use packages from npm in the browser.

For example, you can write some code that uses the [uniq][] module to remove
duplicate elements from an array:

``` js
var uniq = require('uniq')
var elems = [3,5,1,2,1,5,4,2]
console.log(uniq(elems))
```

If this file is saved as `main.js`, then you can do:

```
$ browserify main.js -o bundle.js
```

which makes a file `bundle.js` that you can include in some HTML:

``` html
<html>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

If you open `index.html` in your browser, in the debugger you should see the
message:

```
[ 1, 2, 3, 4, 5 ]
```

# watching for updates

Every time we change `main.js`, we need to remember to re-run the browserify
command. Instead, we can use [watchify][] to automatically re-compile our code
when we change a file with our text editor.

This watch and auto-compile behavior is useful when you're working on your local
copy of a project. The ordinary browserify command is more useful when you go to
deploy your code on a server.

[watchify][] takes the same arguments as browserify:

```
$ watchify main.js -o bundle.js
```

To provide more information about when watchify has written the bundle file, we
can use the `-v` argument to the watchify command:

```
$ watchify main.js -o bundle.js -v
```

Our bundle.js file includes all the source code necessary for our program to
work, which may come from many files. You can use the `-d` flag (short for
`--debug`) to add source maps to the bundle output so that stack traces in the
browser will refer to the original files, not the line offset into bundle.js:

```
$ watchify main.js -o bundle.js -v -d
```

# npm scripts

We can streamline these commands so that we don't need to remember how to run
them by putting them into `package.json`:

``` json
{
  "scripts": {
    "build": "browserify main.js -o bundle.js",
    "watch": "watchify main.js -o bundle.js -v -d"
  }
}
```

To run the build command for compiling a version for deployment, do:

```
$ npm run build
```

To run the watch command for hacking locally on your project, do:

```
$ npm run watch
```

One neat thing about npm scripts is that the commands we use can be local
packages installed by npm into `./node_modules`.

If we install `browserify` and `watchify` locally into our project (without -g):

```
$ npm install --save browserify watchify
```

Now other people who check out our code won't need to install browserify and
watchify globally and they will compile against the versions of browserify and
watchify that we've specified in our package.json. This way, we don't need to
worry about whatever versions of these commands people have installed globally
on their systems.

---

[npm]: https://www.npmjs.com/
[browserify]: http://browserify.org
[uniq]: https://npmjs.com/package/uniq

# frontend modules

Now that we have those build script concepts out of the way, let's dive into
some handy frontend modules you can use in your code!

For each of these examples, make sure to compile your code with browserify or
watchify and serve up the bundle in an `index.html` file with a
`<script src="bundle.js"></script>` in it!

## xhr

We can make http requests from our browser code using the [xhr][] module.

First, let's set up a simple static file server on port 5000 to serve up files
from the current working directory (`.`):

```
$ npm install -g ecstatic
$ ecstatic -p 5000 .
```

(Note: depending on how your system is configured, you may need to
`sudo npm install -g ecstatic`.)

Let's make a file, `hello.txt`:

``` js
$ echo BEEP BOOP > hello.txt
```

Now we can use the [xhr][] module to make a GET request for our `hello.txt`
file in our browser code:

``` js
var xhr = require('xhr')
xhr({
  method: 'GET',
  url: '/hello.txt'
}, function (err, res, body) {
  console.log('STATUS CODE:', res.statusCode)
  console.log('BODY:', body)
})
```

In the debugger window in the browser, we should see:

```
STATUS CODE: 200
BODY: BEEP BOOP
```

We can write the same code in a more terse way using `xhr(url)` or
`xhr.get(url)` as a shortcut:

``` js
var xhr = require('xhr')
xhr.get('/hello.txt', function (err, res, body) {
  console.log('STATUS CODE:', res.statusCode)
  console.log('BODY:', body)
})
```

---

Now we can make a POST request. First we can set up a simple server that will
serve up static files and print out the POST requests we send to stdout:

``` js
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname)

var http = require('http')
var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(process.stdout)
    req.on('end', function () { res.end('ok\n') })
  } else st(req, res)
})
server.listen(5000)
```

Now for some browser code to send a POST request:

``` js
var xhr = require('xhr')
xhr({
  method: 'POST',
  url: '/',
  body: 'Hello server, this is the browser.\n'
}, function (err, res, body) {
  console.log('got response:', body)
})
```

After compiling with browserify or watchify, when you load the server in the
browser, you should see the message `got response: ok` in the browser and on the
server, you should see the message `Hello server, this is the browser.` printed
to stdout.

[xhr]: https://npmjs.com/package/xhr

# url

With browserify, we have access to many node builtin modules and platform
globals like [path][], [querystring][], [buffer][], [events][], [util][],
[crypto][], [stream][], and [url][].

In this example, we'll use the built-in [url][] module to compute the full url
relative to the current location using `url.resolve()`:

```
var url = require('url')
console.log(url.resolve(location.href, 'hello.txt'))
```

We could combine this `url.resolve()` code with the previous example using
[xhr][] to fetch a file by its relative URL.

[path]: https://nodejs.org/api/path.html
[querystring]: https://nodejs.org/api/querystring.html
[buffer]: https://nodejs.org/api/buffer.html
[events]: https://nodejs.org/api/events.html
[util]: https://nodejs.org/api/util.html
[crypto]: https://nodejs.org/api/crypto.html
[stream]: https://nodejs.org/api/stream.html
[url]: https://nodejs.org/api/url.html

