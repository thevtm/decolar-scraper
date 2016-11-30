/// <reference types="node" />
/**
  * Exceção URLDecolarInvalidaError.
  * @class Exceção lançada quando uma URL da Decolar invalida é encontrada.
  * @param {string} message Mensagem do erro.
  * @param {string} url
  */
export declare class URLDecolarInvalidaError extends Error {
    message: string;
    url: string;
    constructor(message: string, url: string);
}
/**
  * Exceção RequestStatusNotOKError.
  * @class Exceção lançada quando a requisição retornou status não Ok.
  * @param {string} message Mensagem do erro.
  * @param {string} url URL fornecida.
  * @param {number} statusCode Status code retornado.
  */
export declare class RequestStatusNotOKError extends Error {
    message: string;
    url: string;
    statusCode: number;
    constructor(message: string, url: string, statusCode: number);
}
