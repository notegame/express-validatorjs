## Installation

Doc [validatorjs](https://github.com/skaterdav85/validatorjs)


```sh
$ npm install express-validatorjs
```

or

```sh
$ yarn add express-validatorjs
```

## Usage

### Simple Usage

```javascript
const express = require('express')
const validator = require('express-validatorjs')
const app = express()
const Validator = require("validatorjs");

// IF YOU WANT TO ADD CUSTOM VALIDATE //
Validator.registerAsync("unique", async function(
    value,
    attribute,
    request,
    passes
) {
    passes()
});

app.use(validator({
    Validator
}))
// ------------------------------------

app.post('/products', [
    validator({
        rules:function (req) {
            name : "required",
            price : "required|numeric",
        }
    })
    function (req, res, next) {
        res.json({'message' : 'submit products ok'})
    }
])

app.use((err: any, req: any, res: any, next: any) => {
    res.status(400).json({
        message
    });
});

app.listen(80, function () {
  console.log('web server listening on port 80')
})
```


## License

Copyright © 2012-2019 David Tang Released under the MIT license

## Credits

validatorjs created by David Tang