var Q = require('q')
var _ = require('underscore')

var resolvers = {
  'registry' : require('./registry'),
  's3'       : require('./s3'),
  'sequence' : require('./sequence')
}

exports.create = function(type, params) {
  return Q().then(function() {
    if (!_.has(resolvers, type)) {
      throw new Error('unknown resolver type: ' + type)
    }
    return resolvers[type].create(params)
  })
}