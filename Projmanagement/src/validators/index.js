import {body} from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid"),

        body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLowercase()
        .withMessage("Username must be lowercase")
        .isLength({min: 3, max: 20})
        .withMessage("Username must be between 3 and 20 characters long")
        .isString()
        .withMessage("Username must be a string"),
        
        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 6, max: 20})
        .withMessage("Password must be between 6 and 20 characters long")
        .isString()
        .withMessage("Password must be a string"),

        body("fullname")
        .optional()
        .trim()
        .isString()
        .withMessage("Fullname must be a string")
    ]

};


const userLoginValidator = () => {
    return [
        body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),
        body("password")
        .notEmpty()
        .withMessage("Password is Required")
    ];
};

const userChangeCurruntPasswordValidator = () => {
    return [
        body("oldPassword")
        .notEmpty()
        .withMessage("Current Password is required"),
        body("newPassword")
        .notEmpty()
        .withMessage("New Password is required")
    ];
};

const userForgotPasswordValidator = () => {
    return [
        body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid"),
    ]
};

const userResetForgotPasswordValidator = () => {
    return [
        body("newPassword")
        .notEmpty()
        .withMessage("New Password is required")
    ];
};

export {
    userRegisterValidator , 
    userLoginValidator, 
    userChangeCurruntPasswordValidator, 
    userForgotPasswordValidator, 
    userResetForgotPasswordValidator
};