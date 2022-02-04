export const getCurrencySymbol = (currency) => {
    switch (currency) {
        case 'uah': {
            return '₴'
        }
        case 'usd': {
            return '$'
        }
        case 'eur': {
            return '€'
        }
        case 'btc': {
            return '₿'
        }
        default:
          return ''
    }
}