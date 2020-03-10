const validate = require("../src");
const Validator = require("validatorjs");

function fakeRequest(body) {
  return {
    body
  };
}

function fakeResponse() {
  return {};
}

test("required",  () => {
  var req, res, next;
  req = fakeRequest({
    firstName: "",
    lastName: "express",
    email: "john@express.com"
  });
  res = fakeResponse();
  next = function(error) {
    expect(error).toEqual(new Error('The firstName field is required.'))
  };

  validate({
    rules: req => {
      return {
        firstName: "required",
        lastName: "required",
        email: "email"
      };
    }
  })(req, res, next);

});

test("attributeNames_required_firstName",  () => {
  var req, res, next;
  req = fakeRequest({
    firstName: "",
    lastName: "express",
    email: "john@express.com"
  });
  res = fakeResponse();
  next = function(error) {
    expect(error).toEqual(new Error('The First Name field is required.'))
  };

  validate({
    rules: req => {
      return {
        firstName: "required",
        lastName: "required",
        email: "email"
      };
    },
    attributeNames: req => {
      return {
        firstName: "First Name",
      };
    }
  })(req, res, next);

});

test("email",  () => {
    var req, res, next;
    req = fakeRequest({
      firstName: "john",
      lastName: "express",
      email: "john"
    });
    res = fakeResponse();
    next = function(error) {
      expect(error).toEqual(new Error('The email format is invalid.'))
    };
  
    validate({
      rules: req => {
        return {
          firstName: "required",
          lastName: "required",
          email: "email"
        };
      }
    })(req, res, next);
  
  });


test("passed",  () => {
    var req, res, next;
    req = fakeRequest({
      firstName: "john",
      lastName: "express",
      email: "john@express.com"
    });
    res = fakeResponse();
    next = function(error) {
      expect(error).toEqual(undefined)
    };
  
    validate({
      rules: req => {
        return {
          firstName: "required",
          lastName: "required",
          email: "email"
        };
      }
    })(req, res, next);
  
  });

  test("add_registerAsync ",  () => {

    Validator.registerAsync("unique", async function(
        value,
        attribute,
        request,
        passes
    ) {
        passes()
    });

    validate({
        Validator
    })

    var req, res, next;
    req = fakeRequest({
      firstName: "john",
      lastName: "express",
      email: "john@express.com"
    });
    res = fakeResponse();
    next = function(error) {
      expect(error).toEqual(undefined)
    };
  
    validate({
      rules: req => {
        return {
          firstName: "required|unique",
          lastName: "required",
          email: "email"
        };
      }
    })(req, res, next);
  
  });