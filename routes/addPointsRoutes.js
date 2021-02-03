
//dependencies
const router = require("express").Router();

//import service layer
const addPointsService = require("../service/addPointsService");

/**
 *
 * @param {call back function} route entry point
 */
router.post("/addPoints", async function (req, res) {
  //entering addPoints route
  //call the service layer
  await addPointsService.addPointsParticularUserService(req)
    .then(result => {
      res.send(result);
    }).catch(error => {
      console.log(error);
      res.status(500).send('error in add points service');
    })

})

module.exports = router;