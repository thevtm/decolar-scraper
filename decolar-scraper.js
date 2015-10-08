var url = require('url');
var R = require('ramda');
var Q = require('q');
var request = require('request');
var validURL = require('valid-url');


/**
  * Cria nova exceção URLDecolarInvalidaError.
  * @class Exceção lançada quando uma URL da Decolar invalida é encontrada.
  * @param {String} message Mensagem do erro.
  * @return {URLDecolarInvalidaError}
  */
function URLDecolarInvalidaError(message, url) {
  this.name = 'URLDecolarInvalidaError';
  this.message = message || 'Decolar URL invalida.';
  this.url = url;
}
URLDecolarInvalidaError.prototype = Object.create(Error.prototype);
URLDecolarInvalidaError.prototype.constructor = URLDecolarInvalidaError;
exports.URLDecolarInvalidaError = URLDecolarInvalidaError;

/**
  * Retorna URL contendo os dados da passagem a partir da URL fornecida.
  * @param {String} DecolarURL ULR da passagem da Decolar.
  * @throws {URLDecolarInvalidaError} Se url fornecida for invalida.
  * @return {String} URL dos dados da passagem.
  */
function getDecolarDataURL (DecolarURL) {
  "use strict";

  // Converte para URL lower case
  DecolarURL = DecolarURL.toLowerCase();

  // Adiciona prefixo "http://" se necessario
  var HTTP_PREFIX_REGEX = /http:\/\//;
  if (HTTP_PREFIX_REGEX.test(DecolarURL) === false)
  {
    DecolarURL = 'http://' + DecolarURL;
  }

  // Parse URL
  var urlParsed = url.parse(DecolarURL);

  // Verifica se a URL é valida
  if(validURL.isWebUri(DecolarURL) === false) {
    throw new URLDecolarInvalidaError('URL invalida - ' + DecolarURL);
  }

  // Valida host da URL
  var DECOLAR_HOST_REGEX = /w{0,3}\.{0,1}decolar.com/;
  if(DECOLAR_HOST_REGEX.test(urlParsed.host) === false) {
    throw new URLDecolarInvalidaError('Host invalido.', DecolarURL);
  }

  // Obtem path dos dados
  var URLPathPrefix = '/shop/flights/data/search';
  var URLPathSlice  = urlParsed.path.slice(21);
  var URLPathSufix  = '/fare/ascending/na/na/na/na';
  var URLPathFinal  = URLPathPrefix + URLPathSlice + URLPathSufix;

  // Cria url final
  urlParsed.pathname = URLPathFinal;
  DecolarURL = urlParsed.format();

  // Verifica se a URL final é valida
  if(validURL.isWebUri(DecolarURL) === false) {
    throw new URLDecolarInvalidaError('URL final invalida.', DecolarURL);
  }

  return DecolarURL;
}
exports.getDecolarDataURL = getDecolarDataURL;

/**
  * Cria nova exceção RequestStatusNotOKError.
  * @class Exceção lançada quando a requisição retornou status não Ok.
  * @param {String} message Mensagem do erro.
  * @return {RequestStatusNotOKError}
  */
function RequestStatusNotOKError(message, statusCode, url) {
  this.name = 'RequestStatusNotOKError';
  this.message = message || 'Decolar StatusCode invalido.';
  this.statusCode = statusCode;
  this.url = url;
}
RequestStatusNotOKError.prototype = Object.create(Error.prototype);
RequestStatusNotOKError.prototype.constructor = RequestStatusNotOKError;
exports.RequestStatusNotOKError = RequestStatusNotOKError;

/**
  * Requisita dados da decolar.
  * @param {String} DecolarDataURL URL dos dados a serem requisitados.
  * @throws {RequestStatusNotOKError} Se o status retornado não for 200 ou 304.
  * @return {Promise}
  */
function fetchDecolarData (DecolarDataURL) {
  var deferred = Q.defer();

  // Request data
  request(DecolarDataURL, function (error, response, body) {
      // Verifica se ocorreu erro
      if ( error ) {
        deferred.reject(error);
      } else if ( response.statusCode !== 200 && response.statusCode !== 304 ) {
        deferred.reject(new RequestStatusNotOKError('Decolar request retornou um StatusCode não OK.',
          response.statusCode, DecolarURL));
      } else {
        deferred.resolve(body);
      }
    });

  return deferred.promise;
}
exports.fetchDecolarData = fetchDecolarData;

/**
  * Minera menor preco dos dados da Decolar.
  * @param {Object} DecolarDataJSON Dados obtidos da Decolar.
  * @throws {Error} Se status da operação não for bem sucedido.
  * @return {Object} Objeto contendo menor preco.
  */
function mineDecolarData (DecolarDataJSON) {
  // Verifica se a Query não foi bem sucedida
  if ( DecolarDataJSON.result.data.status.code !== 'SUCCEEDED') {
    throw new Error('Decolar Data JSON invalido.');
  }

  // Obtem items
  var items = R.project(['id', 'itinerariesBox', 'provider', 'emissionPrice'], DecolarDataJSON.result.data.items);

  // Obtem menor preço
  var menorPreco = DecolarDataJSON.result.data.lowestFare;

  return {MenorPreco:menorPreco, Items:items};
}
exports.mineDecolarData = mineDecolarData;

/**
  * Scrape passagem da decolar a partir da URL fornecida e retorna menor preço.
  * @param {String} DecolarURL URL da passagem da Decolar.
  * @return {Objeto} Objeto contendo menor preço.
  */
function scrape (DecolarURL) {
  return Q.fcall(getDecolarDataURL, DecolarURL)
    .then(fetchDecolarData)
    .then(function (data) {
      var deferred = Q.defer();

      try {
        deferred.resolve(JSON.parse(data));
      } catch (err) {
        err.DecolarData = data;
        deferred.reject(err);
      }

      return deferred.promise;
    })
    .then(mineDecolarData);
}
exports.scrape = scrape;
