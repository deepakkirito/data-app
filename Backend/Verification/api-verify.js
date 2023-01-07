const { check, validationResult } = require('express-validator');

const validateDataParams = async (req, res, next) => {
    await check('skip', 'skip should be a number').optional().isNumeric().run(req);
    await check('limit', 'limit should be a number').optional().isNumeric().run(req);
    await check('updateId', 'updateId should be a string').optional().isString().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

module.exports = validateDataParams;