//imports
const addPointsDao = require('../dao/addPointsdao');
//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');

/**
 *
 * @param {Object} req body having details to add points to a particular
 */

async function addPointsParticularUserService(req) {
  //entering the add points function
  return new Promise(async function (resolve, reject) {
    //step:1 hit our service data store and retrieve the particular user
    try {
      //first find a user whether he is a valid user to add points
      const findUser = await addPointsDao.fetchUserDao({userId:req.body.userId});

      //after finding the user insert the points,payerDetails and createdDate and updatedDate
      //and push this details to transactionDetails array
      const pointsPayerObject = {
        payer : req.body.transactionDetails[0].payer,
        points: req.body.transactionDetails[0].points,
        createdAt :transactionHelper.transactionDate(),
        updatedAt:transactionHelper.transactionDate()
      }
       //find the index to which the points has to be added
        const userPosition = await addPointsDao.findUserPositionDao(findUser);
       //call the add Points to a user to add points to our file
       const addPoints = await addPointsDao.insertPointsForUser(pointsPayerObject,findUser,userPosition);
       resolve(addPoints);

    } catch (error) {
      reject(error);
    }


  })



}

module.exports = {
  addPointsParticularUserService
}
