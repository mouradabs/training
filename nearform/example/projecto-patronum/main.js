var split = require('split2')
var randombytes = require('randombytes')
var onend = require('end-of-stream')

var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var swarm = wswarm(signalhub('sync-demo-nfb', [
  'https://signalhub.mafintosh.com'
]))

var player
var streams = {}
var seen = {}
swarm.on('peer', function (stream, id) {
  console.log('peer connected')
  streams[id] = stream

  stream
    .pipe(split(JSON.parse))
    .on('data', function (evn) {
      var id = evn.id
      if (seen[id]) return
      console.log('new event')
      handleNewEvent(evn)

      write(evn)
    })
    .on('error', function (err) {
      console.error(err)
    })

  onend(stream, function () {
    console.log('peer disconnected')
    delete streams[id]
  })

  var obj = {
    id: randombytes(8).toString('hex'),
    data: player.getPlayerState(),
    time: player.getCurrentTime()
  }

  write(obj)
})

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('player', {
    videoId: 'dQw4w9WgXcQ',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  })
}

function onPlayerReady (event) {
  event.target.playVideo()
}

function onPlayerStateChange (event) {
  console.log(event)
  var obj = {
    id: randombytes(8).toString('hex'),
    data: event.data,
    time: event.target.getCurrentTime()
  }

  write(obj)
}

function handleNewEvent (evn) {
  console.log(player)
  if (player.getCurrentTime() - evn.time > 2 ||
      player.getCurrentTime() - evn.time < -2)
        player.seekTo(evn.time)
  if(player.getPlayerState() !== evn.data) {
    switch (evn.data) {
      case YT.PlayerState.PLAYING:
        player.playVideo()
        break
      case YT.PlayerState.PAUSED:
        player.pauseVideo()
        break
      case YT.PlayerState.ENDED:
        player.stopVideo()
        break
    }
  }
}

function write (obj) {
  seen[obj.id] = true

  Object.keys(streams).forEach(function (key) {
    streams[key].write(JSON.stringify(obj)+'\n')
  })
}
