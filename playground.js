var resolver = require('./lib/resolvers/resolver')

resolver.create('sequence', [
  {
    type: 'registry',
    params: ['http://registry.npmjs.eu/']
  },
  {
    type: 'registry',
    params: ['http://registry.npmjs.org/']
  }
]).then(function(r) {
  return r.stream('express', '3.0.0').then(function(s) {
    // console.log(s)
    s.pipe(process.stdout)
  })
}).fail(function(err) {
  console.error(err)
  console.error(err.stack)
})
