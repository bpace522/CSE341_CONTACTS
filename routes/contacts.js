const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const contactsController = require("../controllers/contacts");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getOneById);

router.post(
    '/',
    [
        body('firstName').notEmpty().withMessage('First Name is Required'),
        body('lastName').notEmpty().withMessage('Last Name is Required'),
        body('email').isEmail().withMessage('Email must be in correct format').bail().notEmpty().withMessage('Email cannot be empty').normalizeEmail(),
        body('favoriteColor').notEmpty().withMessage('Favorite Color is required'),
        body('birthday').isDate().withMessage('Must be Valid date format ie. 2000-01-01').bail().notEmpty().withMessage('Birthday cannot be empty'),
        handleValidationErrors
    ],
    contactsController.createUser
);

router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid Format'),
        body('firstName').notEmpty().withMessage('First Name is required'),
        body('lastName').notEmpty().withMessage('Last Name is required'),
        body('email').isEmail().withMessage('Email must be in correct format').bail().notEmpty().withMessage('Email cannot be empty'),
        body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
        body('birthday').isDate().withMessage('Must be Valid date format ie. 2000-01-01').bail().notEmpty().withMessage('Birthday cannot be empty'),
        handleValidationErrors
    ],
    contactsController.updateUser
);

router.delete(
    '/:id', [
        param('id').isMongoId().withMessage('Invalid Format'),
        handleValidationErrors
    ],
     contactsController.deleteUser
);

module.exports = router;