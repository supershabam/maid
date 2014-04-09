var Q        = require('q')
var resolver = require('./resolver')
var _        = require('underscore')

exports.create = function() {
  return Q.all(
    _.map(arguments, function(options) {
      return resolver.create(options.type, options.params)
    })
  ).then(function(resolvers) {
    return {
      provides: function(module) {
        return resolvers.reduce(function(memo, resolver) {
          return memo.then(function(provides) {
            if (!provides) {
              provides = resolver.provides(module)
            }
            return provides
          })
        }, Q(false))
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