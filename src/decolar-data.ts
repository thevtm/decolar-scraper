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

export interface DecolarLocation {
  city: {
    code: string
  },
  airport: {
    code: string
  },
  takeAsCity: boolean,
  code: string
}

export interface DecolarItinerariesBox {
  outboundLocations: {
    departure: DecolarLocation,
    arrival: DecolarLocation
  }
}

export interface DecolarItem {
  internalId: string,
  clusterAlertType: string,
  id: string,
  itinerariesBox: DecolarItinerariesBox,
  emissionPrice: {
    total: {
      fare: {
        raw: number,
        formatted: {
          code: string,
          amount: string,
          mask: string
        }
      }
    }
  },
  provider: string
}

export interface DecolarData {
  result: {
    data?: {
      items: [DecolarItem]
      cities: Object,
      airports: Object,
      airlines: Object,
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
    htmlContent?: {
      "flights-alerts": string,
      "flights-alerts-fixed": string
    },
    status: {
      code: string,
      message?: string
    }
  },
  messages?: [{
    code: string,
    value: string,
    description: string
  }]
}

