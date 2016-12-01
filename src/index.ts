'use strict'

/* LIBS */
import * as url from 'url'
import * as validURL from 'valid-url'

import { URLDecolarInvalidaError, RequestStatusNotOKError } from './error'
import { DecolarData } from './decolar-data'

/* LIBS EXPORTS */
export { URLDecolarInvalidaError, RequestStatusNotOKError } from './error'
export { DecolarData, DecolarFare } from './decolar-data'

/* EXEC */

/**
  * Retorna URL contendo os dados da passagem a partir da URL fornecida.
  * @param {string} DecolarURL ULR da passagem da Decolar.
  * @throws {URLDecolarInvalidaError} Se url fornecida for invalida.
  * @return {string} URL dos dados da passagem.
  */
export function getDecolarDataURL (DecolarURL: string): string {

  // 1. Converte para URL lower case
  DecolarURL = DecolarURL.toLowerCase()

  // 2. Adiciona prefixo "http://" se necessario
  const HTTP_PREFIX_REGEX = /http:\/\//
  if (HTTP_PREFIX_REGEX.test(DecolarURL) === false)
  {
    DecolarURL = 'http://' + DecolarURL
  }

  // 3. Verifica se a URL é valida
  if(validURL.isWebUri(DecolarURL) === undefined) {
    throw new URLDecolarInvalidaError('Decolar URL invalida', DecolarURL)
  }

  // 4. Parse URL
  let urlParsed = url.parse(DecolarURL)

  // 5. Valida host da URL
  const DECOLAR_HOST_REGEX = /w{0,3}\.{0,1}decolar.com/

  if (DECOLAR_HOST_REGEX.test(urlParsed.host!) === false) {
    throw new URLDecolarInvalidaError('Host invalido.', DecolarURL)
  }

  // 6. Remove a query da URL
  delete urlParsed.search
  delete urlParsed.query

  // 7. Obtem path dos dados
  var URLPathPrefix = '/shop/flights/data/search'
  var URLPathSlice  = urlParsed.pathname!.slice(21)
  var URLPathSufix  = '/fare/ascending/na/na/na/na'
  var URLPathFinal  = URLPathPrefix + URLPathSlice + URLPathSufix

  // 8. Cria url final
  urlParsed.pathname = URLPathFinal
  DecolarURL = url.format(urlParsed)

  // 9. Verifica se a URL final é valida
  if(validURL.isWebUri(DecolarURL) === undefined) {
    throw new URLDecolarInvalidaError('URL final invalida.', DecolarURL)
  }

  return DecolarURL
}
