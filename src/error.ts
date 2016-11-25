'use strict'

/* LIBS */

/* EXEC */

/**
  * Exceção URLDecolarInvalidaError.
  * @class Exceção lançada quando uma URL da Decolar invalida é encontrada.
  * @param {string} message Mensagem do erro.
  * @param {string} url
  */
export class URLDecolarInvalidaError extends Error {

  constructor(public message: string, public url: string) {
    super(message)
    this.name = "URLDecolarInvalidaError"
    this.url = url
    this.stack = (<any> new Error()).stack
  }

}

/**
  * Exceção RequestStatusNotOKError.
  * @class Exceção lançada quando a requisição retornou status não Ok.
  * @param {string} message Mensagem do erro.
  * @param {string} url URL fornecida.
  * @param {number} statusCode Status code retornado.
  */
export class RequestStatusNotOKError extends Error {

  constructor(public message: string, public url: string, public statusCode: number) {
    super(message)
    this.name = 'RequestStatusNotOKError'
    this.url = url
    this.statusCode = statusCode
  }
}