# MONKEY MONEY

# Install

```
npm install
gulp serve
```

# usage

## Retrieves premarket information

GET **<BASE_URL>/symbol/:SYMBOL/premarket** _OBJECT_


- **BASE_URL** = server base path
- **SYMBOL** = market stock symbol

_Examples:_
```
http://localhost:3000/symbol/jd/premarket
http://localhost:3000/symbol/tsla/premarket
http://localhost:3000/symbol/amd/premarket
```

_Response:_

```
{
    "name": "Tesla, Inc. Pre-Market Trading",
    "sale": "$314.57",
    "net": "-0.83",
    "pct": "-0.83"
}
```

## Yahoo Statistics Parser retrieves stocks fundamentals

GET **<BASE_URL>/symbol/:SYMBOL/fundamental** _ARRAY_

- **BASE_URL** = server base path
- **SYMBOL** = market stock symbol

_Examples:_
```
http://localhost:3000/symbol/jd/fundamental
http://localhost:3000/symbol/tsla/fundamental
http://localhost:3000/symbol/amd/fundamental
```

_Response:_

```
[
    {
        "key": "Market Cap (intraday) 5",
        "value": "483.66B"
    },
    {
        "key": "Enterprise Value 3",
        "value": "467.88B"
    },
    {
        "key": "Trailing P/E ",
        "value": "46.37"
    }
    // data...
]
```

_Note:_
Use valid symbols

## Retrieves current RSI of a predefined list of stock

GET **<BASE_URL>/oportunidades** _ARRAY_

**NOTE:**
**please change your apikey on //src/stock/config.json**
**[Claim your API Key](https://www.alphavantage.co/support/#api-key)**
**please change your list of stoks on //src/stock/symbol.json**

_Response:_
```
[
    {
        "symbol": "GE",
        "rsi": "28.1159"
    },
    {
        "symbol": "AAPL",
        "rsi": "28.2566"
    },
    {
        "symbol": "AA",
        "rsi": "33.8401"
    }
]
```

## Running your application with Gulp

It's time to use Gulp tasks:
- *$ gulp serve* to start server on your source files with live reload

## License
[The MIT License](LICENSE.md)
