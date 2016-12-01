export { URLDecolarInvalidaError, RequestStatusNotOKError } from './error';
export { DecolarData, DecolarFare } from './decolar-data';
/**
  * Retorna URL contendo os dados da passagem a partir da URL fornecida.
  * @param {string} DecolarURL ULR da passagem da Decolar.
  * @throws {URLDecolarInvalidaError} Se url fornecida for invalida.
  * @return {string} URL dos dados da passagem.
  */
export declare function getDecolarDataURL(DecolarURL: string): string;
