## Installation

The validatorjs library makes data validation in JavaScript very easy in both the browser and Node.js.
This library was inspired by the [Laravel framework's Validator](http://laravel.com/docs/validation).

Doc [validatorjs](https://github.com/skaterdav85/validatorjs)


```sh
$ npm install validatorjs-expressjs
```

or

```sh
$ yarn add validatorjs-expressjs
```

## Usage

### Simple Usage

```javascript
const express = require("express");
const validator = require("validatorjs-expressjs");
const bodyParser = require("body-parser");
const Validator = require("validatorjs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// IF YOU WANT TO ADD CUSTOM VALIDATE //
Validator.registerAsync("unique", async function(
  value,
  attribute,
  request,
  passes
) {
  passes();
});

app.use(
  validator({
    Validator
  })
);
// ------------------------------------

app.post("/products", [
  validator({
    rules: function(req) {
      return {
        name: "required|unique",
        price: "required|numeric"
      };
    }
  }),
  function(req, res, next) {
    res.json({ message: "submit products ok" });
  }
]);

app.use((err, req, res, next) => {
  res.status(400).json({
    message : err.message
  });
});

app.listen(3000, function() {
  console.log("web server listening on port 3000");
});
```


## License

Copyright © 2012-2019 David Tang Released under the MIT license

## Credits

validatorjs created by David Tang