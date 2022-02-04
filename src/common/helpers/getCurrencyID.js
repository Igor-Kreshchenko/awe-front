export const getCurrencyID = (currency) => {
    switch (currency) {
        case 'uah': {
            return 1
        }
        case 'usd': {
            return 2
        }
        case 'eur': {
            return 3
        }
        case 'btc': {
            return 4
        }
        default:
          return 0
    }
}