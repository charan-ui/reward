/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

//Dependencies
const { check } = require('express-validator');
const REQUEST_PARAM = require('../constants/constants').REQUEST_PARAM;
const CONSTANTS = require('../constants/constants');




/**
* Contains the validations for userId in API
* @memberof validator
* @constant userIdValidator
*/
const userIdValidator = [
  check(REQUEST_PARAM.USER_DETAILS.USER_ID)
    .exists()
    .withMessage(CONSTANTS.ERROR_DESC.MISSING_FIELD)
    .isNumeric()
    .withMessage(CONSTANTS.ERROR_DESC.INVALID_FIELD)
]

/**
* Contains the validations for userId in API
* @memberof validator
* @constant deductFieldValidation
*/
const deductFieldValidation =[
  check(REQUEST_PARAM.DEDUCTION_DETAILS.DEDUCT)
    .exists()
    .withMessage(CONSTANTS.ERROR_DESC.MISSING_FIELD)
    .isNumeric()
    .withMessage(CONSTANTS.ERROR_DESC.INVALID_FIELD)
]



module.exports = {
  userIdValidator,
  deductFieldValidation
}