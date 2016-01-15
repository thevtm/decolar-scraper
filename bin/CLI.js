#!/usr/bin/env node

"use strict";
let R = require("ramda");
let pkg = require(__dirname + '/../package.json'); // eslint-disable-line
let program = require("commander");
let decolar_scraper = require("./../lib/decolar-scraper");

/*** Const ***/
const INTERVALO_PADRAO = 90000;
const INTERVALO_MIN = 10000;

/*** CLI Definition ***/
program
  .version(pkg.version)
  .usage('[options] <urls ...>')
  .option('-i, --intervalo <n>', "define o intervalo que o alarme obtera novos dados da Decolar em milisegundos (Padrao: "+INTERVALO_PADRAO+"ms)", parseInt)
  .option('-a, --alarme', 'apita quando um preço menor é recebido');
program.parse(process.argv);

/*** CLI Execution ***/
function setIntervalFirst(fun, delay) {
  fun();
  return setInterval(fun, delay);
}

let preco = undefined;
let intervalo = Math.max(program.intervalo || INTERVALO_PADRAO, INTERVALO_MIN);

console.log("Decolar Scraper Iniciado\n\
  Preco sera atualizado a cada %d milisegundos.\n",
  intervalo);

console.log("ARGV", program.args);

let urlDecolar = R.head(program.args);

let intervalID = setIntervalFirst(() => {
  decolar_scraper.scrape(urlDecolar)
    .done(data => {
      let novoPreco = data.MenorPreco[0].formatted;
      let beep = "";
      let now = new Date();

      if(preco === undefined) {
        preco = novoPreco;
      } else if(novoPreco.amount !== preco.amount) {
        beep = "\tBEEP\u0007";
        preco = novoPreco;
      }

      console.log("[%d/%d/%d - %d:%d:%d]\t%s %d" + beep,
          now.getFullYear(), now.getMonth(), now.getDay(), now.getHours(),
          now.getMinutes(), now.getSeconds(), novoPreco.mask, novoPreco.amount);
    }, console.error);

}, intervalo);
