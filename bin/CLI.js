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
  .usage('[options] <url>')
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

let urlDecolar = R.head(program.args);

let intervalID = setIntervalFirst(() => {
  decolar_scraper.scrape(urlDecolar)
    .done(data => {
      let menorPreco = data.MenorPreco;
      let novoPreco = menorPreco.emissionPrice.baseFare;
      let beep = "";
      let now = new Date();

      if(preco === undefined) {
        preco = novoPreco;
      } else if(novoPreco.raw !== preco.raw) {
        beep = "\tBEEP\u0007";
        preco = novoPreco;
      }

      console.log("[" + now.toLocaleString() + "]\t%s %d - %d assentos restantes" + beep,
        novoPreco.formatted.mask, novoPreco.formatted.amount, menorPreco.seatsRemaining);
    }, console.error);

}, intervalo);
