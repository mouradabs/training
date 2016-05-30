var router = require('./router.js')
var html = require('yo-yo')
var root = document.body
var catchLinks = require('catch-links')
var xhr = require('xhr')

var singlePage = require('single-page')
var showPage = singlePage(function (href) {
  console.log('show', href)
  show(href)
})

catchLinks(window, function (href) {
  showPage(href)
})
show(location.pathname)


function show (href) {
  var m = router.match('GET ' + href)
  if (m) {
    m.fn(m.params, getData, function (err, tree) {
      if (err) {
        return console.error('error: ' + err)
      }
      else html.update(root, tree)
    })
  } else return console.error('route not found')
}

function getData (topic, cb) {
  xhr('/' + topic + '.json', function (err, res, body) {
    if (err) cb(err)
    else cb(null, JSON.parse(body))
  })
}
