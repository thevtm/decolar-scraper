'use strict'

/* LIBS */


/* EXEC */

export interface DecolarFare {
  raw: {
    code: string,
    amount: number
  },
  formatted: {
    code: string,
    amount: string,
    mask: string
  }
}

export interface DecolarData {
  result: {
    data: {
      items: [Object]
      cities: Object,
      airports: Object,
      airline: Object,
      cabinTypes: Object,
      refinementSummary: Object,
      paginationSummary: {
        itemCount: number,
        pageCount: number,
        currentPage: number
      },
      pricesSummary: Object,
      metadata: {
        status: {
          code: string
        },
        currencyCode: string,
        ticket: {
          id: string,
          version: string
        },
        providers: [string]
        hasFrequenFlyerInfo: boolean,
        upaTracking: string,
        gtmTracking: string,
        searchId: string,
        currencyRates: Object
      },
      reviewsSummary: Object,
      lowestFare: [DecolarFare],
      canShowFreeCancel: boolean,
      flightsTimes: Object,
      showCrosssellingBanner: boolean,
      abzTestingId: string,
      nonStopSuggestions: Object,
      searchHighlights: Object,
      status: {
        code: string
      },
      hiddenFlightsCount: number,
      promotionsCount: number
    },
    htmlContent: {
      "flights-alerts": string,
      "flights-alerts-fixed": string
    },
    status: {
      code: string
    }
  }
}

