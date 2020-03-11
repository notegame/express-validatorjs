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

### Custom Field Label

```javascript
app.post("/products", [
  validator({
    rules: function(req) {
      return {
        firstName: "required",
        lastName: "required"
      };
    },
    //Custom field label
    attributeNames: req => {
      return {
        firstName: "First Name",
        lastName: "Last Name",
      };
    }
  }),
  function(req, res, next) {
    res.json({ message: "submit products ok" });
  }
]);
```

Errot Response

```json
{
  "message" : "The First Name field is required."
}
```


###  Separate Request file

src/request/product_create_request.js
```javascript
module.exports = {
  //Rule
  rules: function(req) {
    return {
      firstName: "required",
      lastName: "required"
    };
  },
  //Custom field label
  attributeNames: req => {
    return {
      firstName: "First Name",
      lastName: "Last Name",
    };
  }
}
```

```javascript
const productCreateRequest = require("./request/product-create.request");

app.post("/products", [
  validator(productCreateRequest),
  function(req, res, next) {
    res.json({ message: "submit products ok" });
  }
]);
```

## License

Copyright © 2020 Released under the MIT license

## Credits

validatorjs created by David Tang