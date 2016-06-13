var pump = require('pump')

//foo.pipe(bar).pipe(baz).pipe(quux)

pump(foo, bar, baz, quux, function (err) {
})
