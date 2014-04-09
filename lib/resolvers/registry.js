var http    = require('http')
var Q       = require('q')
var request = require('request')
var url     = require('url')
var _       = require('underscore')

exports.provides = function(registryUri, module) {
  var deferred = Q.defer()
  request({
    url    : url.resolve(registryUri, module),
    method : 'HEAD'
  }, function(err, http, response) {
    if (err) {
      return deferred.reject(err)
    }
    if (http.statusCode == 404) {
      return deferred.resolve(false)
    }
    if (200 <= http.statusCode && http.statusCode < 300) {
      return deferred.resolve(true)
    }
    return deferred.reject(new Error('bad http status code: ' + http.statusCode))
  })
  return deferred.promise
}

exports.stream = function(registryUri, module, version) {
  var deferred = Q.defer()
  var urlParams = url.parse(url.resolve(registryUri, module + '/-/' + module + '-' + version + '.tgz'))
  var options = {
    host: urlParams.host,
    port: urlParams.port,
    path: urlParams.path
  }
  var req = http.request(options, function(res) {
    req.removeAllListeners('error')
    if (res.statusCode < 200 || 300 <= res.statusCode) {
      return deferred.reject(new Error('bad http status code: ' + res.statusCode))
    }
    deferred.resolve(res)
  })
  req.end()
  req.once('error', function(err) {
    deferred.reject(err)
  })
  return deferred.promise
}

exports.versions = function(registryUri, module) {
  var deferred = Q.defer()
  request({
    url : url.resolve(registryUri, module)
  }, function(err, http, response) {
    if (err) {
      return deferred.reject(err)
    }
    if (http.statusCode < 200 || 300 <= http.statusCode) {
      return deferred.reject(new Error('bad http status code: ' + http.statusCode))
    }
    try {
      response = JSON.parse(response)
      deferred.resolve(Object.keys(response.versions))
    } catch (err) {
      deferred.reject(err)
    }
  })
  return deferred.promise
}

exports.create = function(registryUri) {
  return Q().then(function() {
    return {
      provides : _.partial(exports.provides, registryUri, _),
      stream   : _.partial(exports.stream, registryUri, _, _),
      versions : _.partial(exports.versions, registryUri, _)
    }
  })
}