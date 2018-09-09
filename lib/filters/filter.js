Vue.filter('toMoney', function(number, decimals = 2, decimalSep = '.', thousandSep = ',') {
  return parseFloat(number).toFixed(decimals) || ''
})
