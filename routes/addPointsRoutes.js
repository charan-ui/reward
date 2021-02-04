/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */


//dependencies
const router = require("express").Router();

//import service layer
const addPointsService = require("../service/addPointsService");

/**
 * Route for addPoints
 * @param {call back function} route entry point
 */
router.post("/addPoints", async function (req, res) {
  //entering addPoints route
  //call the service layer
  await addPointsService.addPointsParticularUserService(req)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.status(500).send({ message: 'error in deduct points service', errorDetails: error });
    })

})

module.exports = router;