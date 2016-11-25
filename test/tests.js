'use strict'

const chai = require("chai")
const assert = chai.should()
const chaiAsPromised = require("chai-as-promised")
const path = require('path')
const fs = require('fs')
const DecolarScraper = require('../dist/index')

chai.use(chaiAsPromised)

describe('DecolarScraper', function () {

  describe('getDecolarDataURL', function () {
    it('Deve adicionar o prefixo "http://" quando necessario.', function () {
      const DECOLAR_URL = 'www.decolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0'
      const DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2015-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA'

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase())
    })

    it('Throw URLDecolarInvalidaError quando receber URL invalida.', function () {
      DecolarScraper.getDecolarDataURL.bind(null, 'DECOLAR_URL').should.throw(DecolarScraper.URLDecolarInvalidaError)
    })

    it('Throw retornar URLDecolarInvalidaError quando receber URL com host diferente de "www.decolar.com".', function () {
      const BECOLAR_URL = 'http://www.Becolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0'

      DecolarScraper.getDecolarDataURL.bind(null, BECOLAR_URL).should.throw(DecolarScraper.URLDecolarInvalidaError)
    })

    it('Deve ser case-insensitive.', function () {
      const DECOLAR_URL = 'HTtP://wWW.Decolar.cOM/sHoP/fLiGHTs/reSULTS/ONeWay/Sao/POA/2016-08-16/1/0/0'
      const DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/SAO/POA/2016-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA'

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase())
    })

    it('Deve retornar a url de dados correta 0.', function () {
      const DECOLAR_URL = 'http://www.decolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0'
      const DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2015-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA'

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase())
    })

    it('Deve retornar a url de dados correta 1.', function () {
      const DECOLAR_URL = "http://www.decolar.com/shop/flights/results/oneway/POA/SAO/2016-11-19/1/0/0"
      const DECOLAR_DATA_URL = "http://www.decolar.com/shop/flights/data/search/oneway/poa/sao/2016-11-19/1/0/0/FARE/ASCENDING/NA/NA/NA/NA"

      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase())
    })
  })

})
