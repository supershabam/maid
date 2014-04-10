var Q        = require('q')
var resolver = require('./resolver')
var _        = require('underscore')

exports.resolver = function(resolvers, module) {
  return Q.all(resolvers.map(function(resolver) {
    return resolver.provides(module)
  })).then(function(provides) {
    return _.find(resolvers, function(resolver, index) {
      return provides[index]
    })
  })
}

exports.provides = function(resolvers, module) {
  return exports.resolver(resolvers, module).then(function(resolver) {
    return !!resolver
  })
}

exports.stream = function(resolvers, module, version) {
  return exports.resolver(resolvers, module).then(function(resolver) {
    return resolver.stream(module, version)
  })
}

exports.versions = function(resolvers, module) {
  return exports.resolver(resolvers, module).then(function(resolver) {
    return resolver.versions(module)
  })
}

// exports.provides = function(resolvers, module) {
//   return resolvers.reduce(function(memo, resolver) {
//     return memo.then(function(provides) {
//       if (!provides) {
//         provides = resolver.provides(module)
//       }
//       return provides
//     })
//   }, Q(false))
// }

exports.create = function() {
  return Q.all(
    _.map(arguments, function(options) {
      return resolver.create(options.type, options.params)
    })
  ).then(function(resolvers) {
    return {
      provides: _.partial(exports.provides, resolvers, _),
      stream: _.partial(exports.stream, resolvers, _, _),
      versions: _.partial(exports.versions, resolvers, _)
    }
  })
}