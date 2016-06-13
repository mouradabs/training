# writable

* stream.write(buf)
* stream.end(buf)
* stream.end()
* stream.once('finish', function () {})

* (...).pipe(stream)

---
# readable

* `stream.pipe(...)`
* `stream.once('end', function () {})`

you probably won't need to call these very often:

* `stream.read()`
* `stream.on('readable', function () {})`

let a module take care of those

---
# readable: paused mode

default behavior with automatic backpressure

---
# readable: flowing mode

data is consumed as soon as chunks are available (no backpressure)

turn on flowing mode with:

* stream.resume()
* stream.on('data', function (buf) {})

---
# transform

readable + writable stream where:

```
input -> transform -> output
```

All the readable AND writable methods are available.

---
# duplex

readable + writable stream where
input is decoupled from output

```
input -> duplex
duplex -> output
```

All the readable AND writable methods are available.

---
# duplex

If you see this:

  a.pipe(b).pipe(a)

or this:

  a.pipe(a)

You're dealing with a duplex stream `a`.
A transform stream would loop forever.

---
# objectMode

All the core APIs deal with strings or buffers as input and output types.

However, by passing `{ objectMode: true }`, streams can be made to handle
objects too, with backpressure.

This is particularly useful when you have a parser and want your handler that
deals with the parsed objects to factor into the backpressure upstream all the
way to the transport.

---
# events

streams are event emitters:

* AND any event emitter can emit an `'error'` event
* AND unhandled `'error'` events create a runtime exception
* THEREFORE you probably should listen for `'error'` events:

``` js
stream.on('error', function (err) { ... })
```

---
# more

There are more internals and interfaces that you probably
won't need to know about:

* highWaterMark
* cork() / uncork()
* pause()/resume()
