var a = Buffer('abc')
var b = Buffer('xyz')
console.log(Buffer.concat([a,b]))
var c = Buffer.concat([a,b])
console.log(c.toString())
console.log(Buffer('c0ff33', 'hex'))
