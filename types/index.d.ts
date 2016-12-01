export { URLDecolarInvalidaError, RequestStatusNotOKError } from './error';
export { DecolarData, DecolarFare, DecolarLocation, DecolarItinerariesBox, DecolarItem } from './decolar-data';
/**
  * Retorna URL contendo os dados da passagem a partir da URL fornecida.
  * @param {string} DecolarURL ULR da passagem da Decolar.
  * @throws {URLDecolarInvalidaError} Se url fornecida for invalida.
  * @return {string} URL dos dados da passagem.
  */
export declare function getDecolarDataURL(DecolarURL: string): string;
