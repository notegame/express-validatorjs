let Validator = require("validatorjs");

function validate(validateObj) {
    return (req, res, next) => {
        const vld = validateObj;

        const data = vld.value ? vld.value(req) : req.body;

        if(vld.Validator){
            Validator = vld.Validator
            return 
        }

        const rules = vld.rules(req);
        let messages = null;
        let attributeNames = {};
        if (vld.messages) messages = vld.messages(req);
        if (vld.attributeNames) attributeNames = vld.attributeNames(req);

        const rulesFilter = {};

        Object.keys(rules).forEach(key => {
            const r = rules[key];
            if (r != "") rulesFilter[key] = r;
        });

        const validation = new Validator(data, rulesFilter, messages);

        validation.setAttributeNames(attributeNames);

        validation.fails(() => {
            const errors = Object.keys(validation.errors.all()).map(key =>
                validation.errors.first(key)
            );
            if (errors.length > 0) {
                return next(new Error(errors[0]));
            }
        });

        validation.passes(function() {
            req.validationData = {};

            Object.keys(rules).forEach(key => {
                if (data[key] !== null) req.validationData[key] = data[key];
            });

            return next();
        });
    };
}

module.exports = validate