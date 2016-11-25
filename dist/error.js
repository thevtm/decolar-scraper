'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* LIBS */
/* EXEC */
/**
  * Exceção URLDecolarInvalidaError.
  * @class Exceção lançada quando uma URL da Decolar invalida é encontrada.
  * @param {string} message Mensagem do erro.
  * @param {string} url
  */
var URLDecolarInvalidaError = (function (_super) {
    __extends(URLDecolarInvalidaError, _super);
    function URLDecolarInvalidaError(message, url) {
        _super.call(this, message);
        this.message = message;
        this.url = url;
        this.name = "URLDecolarInvalidaError";
        this.url = url;
        this.stack = (new Error()).stack;
    }
    return URLDecolarInvalidaError;
}(Error));
exports.URLDecolarInvalidaError = URLDecolarInvalidaError;
/**
  * Exceção RequestStatusNotOKError.
  * @class Exceção lançada quando a requisição retornou status não Ok.
  * @param {string} message Mensagem do erro.
  * @param {string} url URL fornecida.
  * @param {number} statusCode Status code retornado.
  */
var RequestStatusNotOKError = (function (_super) {
    __extends(RequestStatusNotOKError, _super);
    function RequestStatusNotOKError(message, url, statusCode) {
        _super.call(this, message);
        this.message = message;
        this.url = url;
        this.statusCode = statusCode;
        this.name = 'RequestStatusNotOKError';
        this.url = url;
        this.statusCode = statusCode;
    }
    return RequestStatusNotOKError;
}(Error));
exports.RequestStatusNotOKError = RequestStatusNotOKError;
//# sourceMappingURL=error.js.map