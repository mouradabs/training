# nearform node.js training

topics:

  * modern, modular web development
  * p2p!

Monday, May 30, 2016
Nearform HQ, Tramore, Ireland

---
# the format

We will have short lectures throughout the day on
various topics.

Between the presentations, you the participant should
experiment with the topics and tools covered in the
lectures and should think up a new or existing project
to hack on and get help with throughout the day.

I'm here to introduce new ideas and to help you get
unstuck!

---
# schedule

There are not exact times and we may shuffle topics around
based on demand, but here is a rough outline:

```
09:30 - introductions, modularity
10:00 - simple servers
10:30 - frontend modules and build scripts
11:00 - websockets, webrtc
11:30 - frontend architecture, universal rendering
13:00 ? lunch!
14:00 - kappa architecture
14:30 - data replication
15:00-?? : topic requests! tests, offline, webgl, crypto,
  whatever!
?? - wrapping up, presentations
```

---
# modules

Before you show up, you might want to download all the
modules we'll be using:

```
$ npm init -y && npm install -S yo-yo xhr browserify \
watchify single-page catch-links body ecstatic hyperx \
virtual-dom brfs hyperlog level hyperdrive hypercore \
webtorrent hyperlog-index hyperkv subleveldown \
websocket-stream through2 split2 concat-stream \
level-browserify swarmlog chloride webrtc-swarm \
signalhub simple-peer
$ npm install -g browserfy watchify wsnc dupsh \
  electron-spawn
```

---
Here are some of the modules and tools we will use and
cover:

* [ecstatic](https://npmjs.com/package/ecstatic)
* [body](https://npmjs.com/package/body)
* [routes](https://npmjs.com/package/routes)
* [browserify](https://npmjs.com/package/browserify)
* [watchify](https://npmjs.com/package/watchify)
* [xhr](https://npmjs.com/package/xhr)
* [insert-css](https://npmjs.com/package/insert-css)
* [brfs](https://npmjs.com/package/brfs)
* [yo-yo](https://npmjs.com/package/yo-yo)
* [virtual-dom](https://npmjs.com/package/virtual-dom)
* [main-loop](https://npmjs.com/package/main-loop)
* [react](https://npmjs.com/package/react)
* [babelify](https://npmjs.com/package/babelify)
* [hyperx](https://npmjs.com/package/hyperx)
* [websocket-stream](https://npmjs.com/package/websocket-stream)
* [wsnc](https://npmjs.com/package/wsnc)
* [simple-peer](https://npmjs.com/package/simple-peer)
* [electron-spawn](https://npmjs.com/package/electron-spawn)
* [through2](https://npmjs.com/package/through2)
* [split2](https://npmjs.com/package/split2)
* [single-page](https://npmjs.com/package/single-page)
* [catch-links](https://npmjs.com/package/catch-links)
* [level-browserify](https://npmjs.com/package/level-browserify)
* [level](https://npmjs.com/package/level)
* [hyperdrive](https://npmjs.com/package/hyperdrive)
* [hypercore](https://npmjs.com/package/hypercore)
* [hyperlog](https://npmjs.com/package/hyperlog)
* [swarmlog](https://npmjs.com/package/swarmlog)
* [webtorrent](https://npmjs.com/package/webtorrent)
* [chloride](https://npmjs.com/package/chloride)

