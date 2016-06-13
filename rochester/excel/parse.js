var parseXlsx = require('excel')

parseXlsx('test.xlsx', function(err, data) {
  if (err) return console.error(err)
  console.log(data)
})
