# MONKEY MONEY

# Install

```
npm install
```

#usage

GET **<BASE_URL>/symbol/<SYMBOL>/premarket** _OBJECT_

Retrieves premarket information

- **BASE_URL** = server base path
- **SYMBOL** = market stock symbol

_Examples:_
```
http://localhost:3000/symbol/jd/premarket
http://localhost:3000/symbol/tsla/premarket
http://localhost:3000/symbol/amd/premarket
```
_Note:_
Use valid symbols


GET **<BASE_URL>/oportunidades** _ARRAY_

Retrieves current RSI of a predefined list of stock

_Examples:_
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
