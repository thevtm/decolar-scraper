/*jshint -W030 */
var chai = require("chai"),
    assert = chai.should(),
    chaiAsPromised = require("chai-as-promised"),
    path = require('path');
    fs = require('fs'),
    Q = require('q'),
    DecolarScraper = require('../decolar-scraper');

chai.use(chaiAsPromised);

describe('DecolarScraper', function () {

  describe('getDecolarDataURL', function () {
    it('Deve adicionar o prefixo "http://" quando necessario.', function () {
      var DECOLAR_URL = 'www.decolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0';
      var DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2015-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase());
    });

    it('Throw URLDecolarInvalidaError quando receber URL invalida.', function () {
      DecolarScraper.getDecolarDataURL.bind(null, 'DECOLAR_URL').should.throw(DecolarScraper.URLDecolarInvalidaError);
    });

    it('Throw retornar URLDecolarInvalidaError quando receber URL com host diferente de "www.decolar.com".', function () {
      var BECOLAR_URL = 'http://www.Becolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0';

      DecolarScraper.getDecolarDataURL.bind(null, BECOLAR_URL).should.throw(DecolarScraper.URLDecolarInvalidaError);
    });

    it('Deve ser Case-insensitive.', function () {
      var DECOLAR_URL = 'HTtP://wWW.Decolar.cOM/sHoP/fLiGHTs/reSULTS/ONeWay/Sao/POA/2016-08-16/1/0/0';
      var DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/SAO/POA/2016-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase());
    });

    it('Deve retornar a url de dados correta.', function () {
      var DECOLAR_URL = 'http://www.decolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0';
      var DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2015-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase());
    });

  });

  describe('fetchDecolarData', function () {

    it('Throw erro quando url invalida.', function () {
      return DecolarScraper.fetchDecolarData('DECOLAR_DATA_URL')
        .should.be.rejected;
    });
  });

  describe('mineDecolarData', function () {
    it('Deve retornar corretamente.', function () {
      var DATA_PATH = 'data/DecolarData.json';
      var DATA_PATH_EXPECTED = 'data/ExpectedOutput.json';

      // Le os dados do arquivo para o teste
      var DecolarDataPath = path.resolve(__dirname, DATA_PATH);
      var data = JSON.parse(fs.readFileSync(DecolarDataPath, "utf-8"));

      // Le os dados do arquivo do resultado esperado para o teste
      var DecolarDataExpectedPath = path.resolve(__dirname, DATA_PATH_EXPECTED);
      var dataExpected = JSON.parse(fs.readFileSync(DecolarDataExpectedPath, "utf-8"));

      // Aplica a função a ser testada
      var precoData = DecolarScraper.mineDecolarData(data);

      // Compara resultado
      return JSON.stringify(precoData).should.be
        .equal(JSON.stringify(dataExpected));
    });

  });

  describe('scrape', function (){
    it('Throw Error quando url invalida.', function () {
      this.timeout(5000);
      var DECOLAR_URL_ANTIGA = 'http://www.decolar.com/shop/flights/results/oneway/POA/SAO/2014-12-25/1/0/0';

      return DecolarScraper.scrape(DECOLAR_URL_ANTIGA)
        .should.be.rejectedWith(Error);
    });
  });

});
