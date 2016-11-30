'use strict';
/* LIBS */
var url = require('url');
var rp = require('request-promise-native');
var validURL = require('valid-url');
var error_1 = require('./error');
/* LIBS EXPORTS */
var error_2 = require('./error');
exports.URLDecolarInvalidaError = error_2.URLDecolarInvalidaError;
exports.RequestStatusNotOKError = error_2.RequestStatusNotOKError;
/* EXEC */
/**
  * Retorna URL contendo os dados da passagem a partir da URL fornecida.
  * @param {string} DecolarURL ULR da passagem da Decolar.
  * @throws {URLDecolarInvalidaError} Se url fornecida for invalida.
  * @return {string} URL dos dados da passagem.
  */
function getDecolarDataURL(DecolarURL) {
    // 1. Converte para URL lower case
    DecolarURL = DecolarURL.toLowerCase();
    // 2. Adiciona prefixo "http://" se necessario
    var HTTP_PREFIX_REGEX = /http:\/\//;
    if (HTTP_PREFIX_REGEX.test(DecolarURL) === false) {
        DecolarURL = 'http://' + DecolarURL;
    }
    // 3. Verifica se a URL é valida
    if (validURL.isWebUri(DecolarURL) === undefined) {
        throw new error_1.URLDecolarInvalidaError('Decolar URL invalida', DecolarURL);
    }
    // 4. Parse URL
    var urlParsed = url.parse(DecolarURL);
    // 5. Valida host da URL
    var DECOLAR_HOST_REGEX = /w{0,3}\.{0,1}decolar.com/;
    if (DECOLAR_HOST_REGEX.test(urlParsed.host) === false) {
        throw new error_1.URLDecolarInvalidaError('Host invalido.', DecolarURL);
    }
    // 6. Remove a query da URL
    delete urlParsed.search;
    delete urlParsed.query;
    // 7. Obtem path dos dados
    var URLPathPrefix = '/shop/flights/data/search';
    var URLPathSlice = urlParsed.pathname.slice(21);
    var URLPathSufix = '/fare/ascending/na/na/na/na';
    var URLPathFinal = URLPathPrefix + URLPathSlice + URLPathSufix;
    // 8. Cria url final
    urlParsed.pathname = URLPathFinal;
    DecolarURL = url.format(urlParsed);
    // 9. Verifica se a URL final é valida
    if (validURL.isWebUri(DecolarURL) === undefined) {
        throw new error_1.URLDecolarInvalidaError('URL final invalida.', DecolarURL);
    }
    return DecolarURL;
}
exports.getDecolarDataURL = getDecolarDataURL;
/**
  * Scrape as passagem da decolar a partir da URL.
  * @param {String} DecolarURL URL da passagem da Decolar.
  * @return {Promise<DecolarData>} Objeto contendo menor preço.
  */
function scrape(DecolarURL) {
    // 1. Obtem URL dos dados
    var DecolarDataURL = getDecolarDataURL(DecolarURL);
    // 2. Requisita os dados e retorna os mesmos
    return rp({
        uri: DecolarDataURL,
        json: true
    })
        .then(function (data) {
        return data;
    });
}
exports.scrape = scrape;
//# sourceMappingURL=index.js.map