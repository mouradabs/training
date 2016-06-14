var Git = require('../')
var git = Git()
git.history().on('data', console.log)
