/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

 //dependencies
const router = require("express").Router();
//custom service import
const fetchPointsService = require('../service/fetchPointsService');

/**
 * @param {Call Back} function req ,res
 */
router.get('/fetchPoints',async function(req,res){
  //entering this to fetch remaining points after deduction
  await fetchPointsService.fetchPointsService(req)
  .then(result=>{
     res.send(result);
  }).catch(error=>{
    res.status(500).send({ message: 'error in fetch Points Service', errorDetails: error });
  })
})



module.exports = router;
