var Q = require('q')

module.exports = function(options) {
  return {
    publish: function(module, version, stream) {
      return Q().then(function() {
        throw new Error('unimplemented')
      })
    }
  }
}