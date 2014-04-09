exports.create = function(options) {
  return Q().then(function() {
    return {
      provides: function() {
        return Q().then(function() {
          throw new Error('unimplemented')
        })
      },
      stream: function() {
        return Q().then(function() {
          throw new Error('unimplemented')
        })
      },
      versions: function() {
        return Q().then(function() {
          throw new Error('unimplemented')
        })
      }
    }
  })
}