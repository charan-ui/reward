//imports
const addPointsDao = require('../dao/addPointsdao');
//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');

let postPoints = require('../abc.json');

/**
 *
 * @param {Object} req body having details to add points to a particular
 */
async function addPointsParticularUserService(req) {
  //entering the add points function
  return new Promise(async function (resolve, reject) {
    let result;
    //step:1 hit our service data store and retrieve the particular user
    try {
      //first find a user whether he is a valid user to add points
      const findUser = await addPointsDao.fetchUserDao({ userId: req.body.userId });
      //retrieve the position of the user
      const userPosition = await addPointsDao.findUserPositionDao(req.body);
      //for each payer info in request to add points
      for (let i = 0; i < req.body.transactionDetails.length; i++) {
        const transactionDetailsWithRespectTopayer = await addPointsDao.retrievePayerPosition( userPosition, req.body.transactionDetails[i])
        //check whether there is already a record with that payer with respect to the user
        if (transactionDetailsWithRespectTopayer >= 0) {
          //entering here when that payer record is already present so that we can update the points field
          result = await addPointsDao.updatePointsForOldPartnerForUser(userPosition, transactionDetailsWithRespectTopayer, req.body.transactionDetails[i]);
          resolve(result);
        }else
        {
        //entering this for new entry--> subsequent new entry case
           const pointsPayerObject = {
             payer : req.body.transactionDetails[i].payer,
             points :req.body.transactionDetails[i].points,
             createdAt : transactionHelper.transactionDate(),
             updatedAt:  transactionHelper.transactionDate()
           }
          result = await addPointsDao.insertPointsForNewPartnerForUser(pointsPayerObject,userPosition);
          resolve(result);
        }
      }
    }
    catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  addPointsParticularUserService
}
