import { DecolarData } from './decolar-data';
export { URLDecolarInvalidaError, RequestStatusNotOKError } from './error';
export { DecolarData, DecolarFare } from './decolar-data';
/**
  * Retorna URL contendo os dados da passagem a partir da URL fornecida.
  * @param {string} DecolarURL ULR da passagem da Decolar.
  * @throws {URLDecolarInvalidaError} Se url fornecida for invalida.
  * @return {string} URL dos dados da passagem.
  */
export declare function getDecolarDataURL(DecolarURL: string): string;
/**
  * Scrape as passagem da decolar a partir da URL.
  * @param {String} DecolarURL URL da passagem da Decolar.
  * @return {Promise<DecolarData>} Objeto contendo menor preço.
  */
export declare function scrape(DecolarURL: string): Promise<DecolarData>;
