/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */


//dependencies
const router = require("express").Router();

//import service layer
const addPointsService = require("../service/addPointsService");
const { validationResult } = require("express-validator");
const sendErrorresponse = require("../helpers/errorUtils")._sendValidationErrorResponse;
const userIdValidator = require("../helpers/validators").userIdValidator

/**
 * Route for addPoints
 * @param {call back function} route entry point
 */
router.post("/addPoints", userIdValidator,async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      sendErrorresponse(req, res, errors)
  }else{
  //entering addPoints route
  //call the service layer
  await addPointsService.addPointsParticularUserService(req)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.status(500).send({ message: 'error in add points service', errorDetails: error });
    })
  }
})

module.exports = router;