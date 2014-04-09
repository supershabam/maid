var registry = require('./lib/resolvers/registry')

registry.stream('http://registry.npmjs.org/', 'express', '4.0.0').then(function(provides) {
  setTimeout(function() {
    provides.pipe(process.stdout)
  }, 500)
}).fail(function(err) {
  console.error(err)
})