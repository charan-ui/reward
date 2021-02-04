//dependencies
const router = require("express").Router();

//custom service import
const deductPointsService = require('../service/deductPointsService');

/**
 * @param {Call Back} function req ,res
 */
router.put('/deductPoints', async function (req, res) {
  //entering this deduct points route
  await deductPointsService.deductPointsService(req)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.status(500).send({ message: 'error in deduct points service', errorDetails: error });
    })
})




module.exports = router;