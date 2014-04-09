var Q        = require('q')
var resolver = require('./resolver')

exports.create = function() {
  return Q.all(
    _.map(arguments, function(options) {
      return resolver(options.type, options.params)
    })
  ).then(function(resolvers) {
    return {
      provides: function(module) {
        return Q().then(function() {
          throw new Error('unimplemented')
        })
      },
      stream: function(module, version) {
        return Q().then(function() {
          throw new Error('unimplemented')
        })
      },
      versions: function(module) {
        return Q().then(function() {
          throw new Error('unimplemented')
        })
      }
    }
  })
}