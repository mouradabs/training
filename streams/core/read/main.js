var log = require('./')('localhost', 5000)
log.pipe(process.stdout)
