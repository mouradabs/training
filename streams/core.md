# fs

``` js
var fs = require('fs')
```

* `fs.createReadStream(file, opts)` - readable stream from a file
* `fs.createWriteStream(file, opts)` - writable stream to a file

---
# process

* `process.stdin` - readable stream command-line input
* `process.stdout` - writable stream command-line output
* `process.stderr` - writable stream command-line error output

---
# child process

``` js
var child = require('child_process')
var ps = child.spawn(cmd, args, opts)
var ps = child.exec(cmd, opts={}, cb)
var ps = child.execFile(file, args, opts={}, cb)
var ps = child.fork(cmd, args, opts)
```

* ps.stdin - writable stream to provide input
* ps.stdout - readable stream to get output
* ps.stderr - readable stream to get error output

---
# net/tls


``` js
var net = require('net')
var tls = require('tls')
```

* `net.connect()` - duplex stream connection
* `tls.connect(opts)` - duplex stream tls-encrypted connection

* `net.createServer(function (stream) {})` - duplex stream
* `tls.createServer(opts, function (stream) {})` - duplex stream

---
# http/https clients

``` js
var http = require('http')
var https = require('https')

var req = http.request(opts, function (res) {})
var req = https.request(opts, function (res) {})
```

* `req` is a writable stream to send the request body
* `res` is a readable stream to read the response body

---
# http/https servers

``` js
var http = require('http')
var https = require('https')

http.createServer(function (req, res) {})
https.createServer(opts, function (req, res) {})
```

* `req` is a readable stream to read the request body
* `res` is a writable stream to send the response body

---
# crypto

``` js
var crypto = require('crypto')
```

* `crtypo.createCipher(algo, password)` - transform stream to encrypt
* `crtypo.createDecipher(algo, password)` - transform stream to decrypt
* `crypto.createCipheriv(algo, key, iv)` - transform stream to encrypt with iv
* `crypto.createDecipheriv(algo, key, iv)` - transform stream to decrypt with iv
* `crypto.createHash(algo)` - transform stream to output cryptographic hash
* `crypto.createHMAC(algo, key)` - transform stream to output HMAC digest
* `crypto.createSign(algo)` - writable stream to sign messages
* `crypto.createVerify(algo)` - writable stream to verify signatures

---
# zlib

``` js
var zlib = require('zlib')
```

* `zlib.createGzip(opts)` - transform stream to compress with gzip
* `zlib.createGunzip(opts)` - transform stream to uncompress with gzip
* `zlib.createDeflate(opts)` - transform stream to compress with deflate
* `zlib.createDeflateRaw(opts)` - transform stream to compress with raw deflate
* `zlib.createInflate(opts)` - transform stream to uncompress with deflate
* `zlib.createInflateRaw(opts)` - transform stream to uncompress with raw deflate
* `zlib.createUnzip(opts)` - transform stream to uncompress gzip and deflate
