var hyperlog = require('hyperlog')
var level = require('level')
var net = require('net')

var db = level('copy.db')
var log = hyperlog(db, { valueEncoding: 'json' })

var stream = net.connect(5000)
stream.pipe(log.replicate({ live: true })).pipe(stream)

log.createReadStream({ live: true })
  .on('data', console.log)
