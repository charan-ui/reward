//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');
//load dao
const deductPointsDao = require('../dao/deductPointsDao');
//load addPointsDao
const addPointsDao = require('../dao/addPointsdao');
const { map } = require('../rewards-server');



/**
 *
 * @param {Object} req body that has how many points has to be deducted
 */
async function deductPointsService(req) {
  return new Promise(async function (resolve, reject) {
    try {
      //first find a user whether he is a valid user to deduct points
      await addPointsDao.fetchUserDao({ userId: req.body.userId });
      //retrieve the position of the user
      const userPosition = await addPointsDao.findUserPositionDao(req.body);
      //first sort the array that is there in our service memory based on the updatedAt Date field
      //where points created for older date will be accessed first and latest update to points will be at the last
      const sortedArray = await deductPointsDao.sortServiceDataStoreDao(userPosition);
      //this returns the deducted value for each payer
      const deductedResponse = await deductionHelperService(sortedArray, req);
      //update the remaining points in our service data Memory
      const updateResult = await updatePointsAfterDeduction(userPosition, deductedResponse);
      if (updateResult) {
        resolve(deductedResponse);
      }
    } catch (error) {
      reject(error);
    }
  })
}

/**
 *
 * @param {Array} sortedArray sorted array according to dates
 * @param {req} requestBody from service request
 */
async function deductionHelperService(sortedArray, req) {
  return new Promise(async function (resolve, reject) {
    let result = [];
    let deductionMap = new Map();
    deductionMap.set('deduction', req.body.deduct);
    //for each of the payer in the sorted array
    for (let i = 0; i < sortedArray.length; i++) {
      //check the points to that user
      if (deductionMap.get('deduction') > 0 && (sortedArray[i].points < deductionMap.get('deduction'))) {
        const subtract = deductionMap.get('deduction') - sortedArray[i].points
        //for this condition prepare the return response
        result.push({
          payer: sortedArray[i].payer,
          deductedAmount: parseInt('-' + sortedArray[i].points),
          deductedTime: new Date().toString()
        })
        deductionMap.set('deduction', subtract);
      } else if (deductionMap.get('deduction') > 0 && (sortedArray[i].points >= deductionMap.get('deduction'))) {
        result.push({
          payer: sortedArray[i].payer,
          deductedAmount: parseInt('-' + deductionMap.get('deduction')),
          deductedTime: new Date().toString()
        })
        deductionMap.set('deduction', 0);
      }
    }
    resolve(result);
  })
}

/**
 *
 * @param {userPosition}  position of user
 * @param {Array}  having deducted details of rewards
 */
async function updatePointsAfterDeduction(userPosition, deductedResponse) {
  return new Promise(async function (resolve, reject) {
    let updateResult = false;
    for (let i = 0; i < deductedResponse.length; i++) {
      await deductPointsDao.updateRewardsDao(userPosition, deductedResponse[i].payer, deductedResponse[i].deductedAmount);
    }
    updateResult = true;
    resolve(updateResult);
  })
}






module.exports = {
  deductPointsService
}
