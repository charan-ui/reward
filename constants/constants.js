/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

/**
* @memberof constants
* @name ERROR_DESC holds the error messages associated with any failures
* @enum {object}
*/
const ERROR_DESC = {
  MISSING_FIELD: 'Missing field in request',
  INVALID_FIELD: 'Invalid field the data sent is not the type of data expected',
  UNKNOWN_ERROR: 'internal server error',
}

/**
* @memberof constants
* @name ERROR_DESC holds application error codes that is specific to our business requirement
* @enum {object}
*/
const REWARDS_APP_ERROR_CODE = {
  MISSING_FIELD: 0,
  INVALID_FIELD: 1,
  UNKNOWN_ERROR: -1,
}


const ERROR_CODE = {
  INVALID_MISSING_PARAMETER: 422,
  BAD_REQUEST: 400,
  FAILED: 500
}
/**
* @memberof constants
* @name REQUEST_PARAM holds the request parameters associated with APIs
* @enum {string}
*/
const REQUEST_PARAM = {
  USER_DETAILS: {
    USER_ID: 'userId',
  },
  DEDUCTION_DETAILS:{
    DEDUCT:'deduct'
  }
}


module.exports = {
  REQUEST_PARAM,
  ERROR_DESC,
  REWARDS_APP_ERROR_CODE,
  ERROR_CODE
}
