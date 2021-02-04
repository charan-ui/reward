/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */


// imports
var appConstants = require('../constants/constants.js');


/**
 *
 * @param {Number} code
 * @param {String} msg
 */
function ErrorInfo(code, msg, status) {
  this.code = code;
  this.msg = msg;
  this.status = status;
}


/**
 * The map which holds the error configuration details. The app error
 * code is the key which maps to an appropriate ErrorInfo object.
 * The error object is used to create error responses for any given
 * application error code.
 */
const ERROR_LOOKUP_TABLE =
  new Map([
    [appConstants.REWARDS_APP_ERROR_CODE.MISSING_FIELD,
    new ErrorInfo(appConstants.REWARDS_APP_ERROR_CODE.MISSING_FIELD, appConstants.ERROR_DESC.MISSING_FIELD, appConstants.ERROR_CODE.BAD_REQUEST)],
    [appConstants.REWARDS_APP_ERROR_CODE.INVALID_FIELD,
    new ErrorInfo(appConstants.REWARDS_APP_ERROR_CODE.INVALID_FIELD, appConstants.ERROR_DESC.INVALID_FIELD, appConstants.ERROR_CODE.BAD_REQUEST)],
    [appConstants.REWARDS_APP_ERROR_CODE.UNKNOWN_ERROR,
    new ErrorInfo(appConstants.REWARDS_APP_ERROR_CODE.UNKNOWN_ERROR, appConstants.ERROR_DESC.UNKNOWN_ERROR, appConstants.ERROR_CODE.FAILED)]
    ])


/**from
* @description helper function which maps the errors from the service to the response expected
* @memberof requestMapper
* @function validateError
* @param {object} errors the errors obtained from the service
* @returns {object} the response expected from the endpoint for a successful transaction
*/
function validateError(errors) {
  console.log(errors);
  const missingData = [];
  const invalidData = [];

  let responseObj = {};

  errors.forEach(error => {
    var missingObj = {};
    var invalidObj = {};

    if (error.msg === appConstants.ERROR_DESC.MISSING_FIELD) {
      missingObj.field = error.param;
      missingData.push(missingObj);
    }
    if (error.msg === appConstants.ERROR_DESC.INVALID_FIELD) {
      invalidObj[error.param] = error.value;
      invalidData.push(invalidObj)
    }
  });
  if (missingData.length !== 0) {
    responseObj = getErrorInfo(appConstants.REWARDS_APP_ERROR_CODE.MISSING_FIELD);
    responseObj.fields = missingData;
  }
  else if (invalidData.length !== 0) {
    responseObj = getErrorInfo(appConstants.REWARDS_APP_ERROR_CODE.INVALID_FIELD);
    responseObj.fields = invalidData;
  }
  return responseObj;
}


/**
 * Gets the ErrorInfo object for the specified key.
 *
 * @memberof errorUtil
 * @function getErrorInfo
 * @param {Number} error_key the application error code.
 */
function getErrorInfo(errorKey) {
  var eKey = (errorKey >= 0) ? errorKey : appConstants.REWARDS_APP_ERROR_CODE.UNKNOWN_ERROR;
  return (ERROR_LOOKUP_TABLE.has(eKey)) ?
    ERROR_LOOKUP_TABLE.get(eKey) :
    ERROR_LOOKUP_TABLE.get(appConstants.REWARDS_APP_ERROR_CODE.UNKNOWN_ERROR);
}


/**
 * Helper function to form and send error response
 */
function _sendValidationErrorResponse(req, res, errors) {
  const resObj = {};
  const responseBody = [];
  var errorInfo = validateError(errors.array());
  resObj.code = errorInfo.code;
  resObj.message = errorInfo.msg;
  resObj.data = errorInfo.fields;
  responseBody.push(resObj)
  res.status(appConstants.ERROR_CODE.INVALID_MISSING_PARAMETER)
  res.send(responseBody).end();
}


module.exports = Object.freeze({ getErrorInfo, validateError, _sendValidationErrorResponse });