# webcom

In this section we will experiment with some libraries to speak websockets
between the browser and the server and webrtc between two browsers directly.

# wsnc

One very simple way to start experimenting with websockets is to use the
[wsnc][] command (`npm install -g wsnc`). [wsnc][] is very similar to the netcat
command, but using websockets.

We can make a server:

```
$ wsnc -l 5001
```

and we can connect to our server:

```
$ wsnc ws://localhost:5001
```

Type a message to stdin on either program and see it displayed on the stdout of
the other process.

[wsnc]: https://npmjs.com/package/wsnc

# websocket-stream

With [websocket-stream][], we can create a websocket server or client with
streams in node and the browser.

To make a client:

``` js
var wsock = require('websocket-stream')
var stream = wsock('ws://localhost:5001')
```

and now we have a duplex `stream` that we can write to and read from. Here's a
more involved client that will print linebuffered messages from the websocket
server and will write a message every second:

``` js
var wsock = require('websocket-stream')
var stream = wsock('ws://localhost:5000')

var split = require('split2')
var through = require('through2')
stream.pipe(split()).pipe(through(function (line, enc, next) {
  console.log('line=' + line)
  next()
}))

setInterval(function () {
  stream.write(new Date().toISOString() + '\n')
}, 1000)
```

To make a server, we can bolt [websocket-stream][] onto an existing node http
server:

``` js
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var http = require('http')
var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)

var wsock = require('websocket-stream')
var split = require('split2')
var through = require('through2')
var onend = require('end-of-stream')

wsock.createServer({ server: server }, function (stream) {
  stream.pipe(process.stdout)
  var i = 0
  var iv = setInterval(function () {
    stream.write('HELLO ' + (i++) + '\n')
  }, 1000)
  onend(stream, function () { clearInterval(iv) })
})
```

[websocket-stream]: https://npmjs.com/package/websocket-stream

# webrtc-swarm

We can make peer to peer connections directly between browsers using a new web
feature called webrtc.

In order to create a webrtc connection, clients need to exchange a small SDP message
that contains network information to establish the initial connection. The
simplest thing to do right now is to use a server for this relatively minor
task. You can roll this part yourself using [simple-peer][], or an even easier
thing to do is to use [webrtc-swarm][] to set everything up using a
[signalhub][]. We'll use the signalhub at `https://signalhub.mafintosh.com`:

``` js
var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var swarm = wswarm(signalhub(
  'webrtc-example',
  ['https://signalhub.mafintosh.com']
))

var split = require('split2')
var through = require('through2')

swarm.on('peer', function (stream, id) {
  console.log('CONNECTED', id)

  stream.pipe(split()).pipe(through(function (line, enc, next) {
    console.log(id + ': ' + line)
    next()
  }))
  
  setInterval(function () {
    stream.write(new Date().toISOString() + '\n')
  }, 1000)
})
```

Every instance of this program will connect to every other instance and they
will send messages to each other.

[simple-peer]: https://npmjs.com/package/simple-peer
[signalhub]: https://npmjs.com/package/signalhub
[webtorrent]: https://npmjs.com/package/webtorrent

## electron-spawn

Server-side WebRTC support is still in its infancy. There is a binary node
module that speaks webrtc, [wrtc][], but it can be difficult to compile on some
platforms and is not very reliable.

Another way to get webrtc support from the server is to use electron. Electron
is a chrome web browser that has a built-in version of node.

To run the previous example in node, we can use electron with the
[electron-spawn][] (`npm install -g electron-spawn`) command:

```
$ electron-spawn main.js
```

[wrtc]: https://npmjs.com/package/wrtc
[electron-spawn]: https://npmjs.com/package/electron-spawn
