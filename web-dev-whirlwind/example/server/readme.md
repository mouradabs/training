# modular servers

Here are some example servers programs using some useful tiny modules:

* [static-file-server.js][] - example server using [ecstatic][]
* [routes.js][] - example router using [routes][]
* [routes-and-files.js][] - routing with [routes][] and static files with
[ecstatic][]
* [form.js][] - parse form data with [body][]
* [form-routes-files.js][] - parse form data, routing, and static files
* [static-argv][] - static files with [ecstatic][] and option parsing with
[minimist][]

# modules

The modules we will be using in this section are:

* [http][] - http implementation built into node.js
* [ecstatic][] - serve up static files from a directory
* [routes][] - use patterns to match URLs and dispatch with a handler function

## http

In these examples, we load the http module:

```
var http = require('http')
```

and we create a server using `http.createServer(handler)`.
`handler` is a function that accepts two arguments: the first is a
[request object][] and the second is a [response object][].

A basic server looks like this:

``` js
var http = require('http')
var server = http.createServer(function (req, res) {
  res.end('beep boop\n')
})
server.listen(5000)
```

The [response object][] is a [writable stream][]. You can do:

* `res.statusCode = code` - set the status code (200, 404, etc)
* `res.setHeader(key, value)` - set an http header called `key` to `value`
* `res.write(msg)` - write a message to the client
* `res.end()` - close the connection
* `res.end(msg)` - a shortcut to do: `res.write(msg); res.end()`

The [request object][] is a [readable stream][]. You can do:

* `req.url` - the path requested by the client. Example: `"/hello.txt"`
* `req.method` - the http method: `"GET"`, `"POST"`, `"PUT"`, etc.
* `req.headers` - object containing the http request headers
* `res.pipe(dst)` - copy data from `res` into `dst` as it arrives
* `res.on('data', function (buf) {})` - handle the chunks of data, `buf` as
they arrive

## ecstatic

ecstatic is a module that will serve up static files from a directory.

``` js
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
```

The function exported by ecstatic takes an object of configuration options or a
single string argument and returns an object `st` that can serve up requests when
given a request and response object from inside your http server handler
function: `st(req, res)`.

## routes

`routes` is a module that can help us organize what should happen when a client
requests a URL from our server. Instead of writing a long chain of `if/else if`
statements, we can organize our URLs with a simple pattern syntax
(`/hello/:name`):

``` js
var Routes = require('routes')
var router = Routes()

router.addRoute('/hello/:name', function (req, res, m) {
  res.end('hello there ' + m.params.name + '!\n')
})
```

To wire this up to the server, we can use `router.match(req.url)` inside of our
http server handler function:

``` js
var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) m.fn(req, res, m)
  else {
    res.statusCode = 404
    res.end('not found\n')
  }
})
```

When one of our patterns matches, `router.match()` returns a match object `m`.
This `m` object contains the handler function we used to set up the route that
matched as `m.fn`. You can call this `m.fn` function with whatever parameters
you like, just make sure your handler function is expecting the correct
arguments.

I like to call the match object with `req`, `res`, and the match object `m`:

```
if (m) m.fn(req, res, m)
```

When there is a match, names prefixed with a colon like `name` in our
`'/hello/:name'` example are available as `m.params.name`.

When no route matches, `router.match()` returns `null`, so you'll need to wire
up something else to happen like a 404 message or else the server will hang
because `res.end()` was never called.

Simple modules like [routes][] are not coupled to any node-specific APIs or
system I/O, so they work great in the browser too! This will come in handy later
when we will build more complicated universal architectures.

## minimist

Finally, we might need to parse some options in our server.

We can use [minimist][]:

``` js
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))
console.log(argv)
```

to turn command-line options into an object we can manipulate:

```
$ node cmd.js --port=5000 --staticdir=public
{ _: [], port: 5000, staticdir: 'public' }
```

---

[static-file-server.js]: static-file-server.js
[routes.js]: routes.js
[routes-and-files.js]: routes-and-files.js
[form.js]: form.js
[form-routes-files.js]: form.js
[static-argv.js]: static-argv.js
[ecstatic]: https://npmjs.com/package/ecstatic
[routes]: https://npmjs.com/package/routes
[body]: https://npmjs.com/package/body
[http]: https://nodejs.org/api/http.html
[request object]: https://nodejs.org/api/http.html#http_class_http_clientrequest
[response object]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[readable stream]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[writable stream]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[minimist]: https://npmjs.com/package/minimist
