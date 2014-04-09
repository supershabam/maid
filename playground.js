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
  return r.provides('express').then(function(provides) {
    console.log('provides', provides)
  })
}).fail(function(err) {
  console.error(err)
  console.error(err.stack)
})
