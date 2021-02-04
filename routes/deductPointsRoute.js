/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

//dependencies
const router = require("express").Router();

//custom service import
const deductPointsService = require('../service/deductPointsService');
const { validationResult } = require("express-validator");
const sendErrorresponse = require("../helpers/errorUtils")._sendValidationErrorResponse;
const userIdValidator = require("../helpers/validators").userIdValidator;
const deductFieldValidation = require("../helpers/validators").deductFieldValidation;

/**
 * @param {Call Back} function req ,res
 */
router.put('/deductPoints',userIdValidator,deductFieldValidation, async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      sendErrorresponse(req, res, errors)
  }else{
  //entering this deduct points route
  await deductPointsService.deductPointsService(req)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.status(500).send({ message: 'error in deduct points service', errorDetails: error });
    })
  }
})




module.exports = router;