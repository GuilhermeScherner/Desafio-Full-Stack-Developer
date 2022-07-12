let initialSymbols = [
  {
    symbol: "BTC",
    name: "bitcoin",
    active: false,
  },
  {
    symbol: "ETH",
    name: "ethereum",
    active: false,
  },
  {
    symbol: "LTC",
    name: "litecoin",
    active: false,
  },
  {
    symbol: "BNB",
    name: "binance coin",
    active: false,
  },
  {
    symbol: "XRP",
    name: "riple",
    active: false,
  },
  {
    symbol: "ADA",
    name: "cardano",
    active: false,
  },
  {
    symbol: "SOL",
    name: "solana",
    active: false,
  },
  {
    symbol: "DOGE",
    name: "dogecoin",
    active: false,
  },
  {
    symbol: "DOT",
    name: "polkadot",
    active: false,
  },
  {
    symbol: "TRX",
    name: "tron",
    active: false,
  },
  {
    symbol: "SHIB",
    name: "shiba",
    active: false,
  },
  {
    symbol: "AVAX",
    name: "avalanche",
    active: false,
  },
  {
    symbol: "MATIC",
    name: "polygon",
    active: false,
  },
  {
    symbol: "UNI",
    name: "uniswap",
    active: false,
  },
  {
    symbol: "LINK",
    name: "chainlink",
    active: false,
  }
]

let ratesRes = initialSymbols.map(symbol => {
  return db.rates.insert(symbol)
})
printjson(ratesRes)

let user = {
  email: 'qr_capital@email.com',
  password: '$2b$12$ITH27c3MasPkotKHhwpS0.667XSRCYcmv9zTAWCH3sdp6KrxnLJ.K',
  name: 'qr capital',
  active: true
}

let userRes = db.user.insert(user)

printjson(userRes)

