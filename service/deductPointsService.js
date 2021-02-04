/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');
//load dao
const deductPointsDao = require('../dao/deductPointsDao');
//load addPointsDao
const addPointsDao = require('../dao/addPointsdao');

/**
 *
 * @param {Object} req body that has how many points has to be deducted
 * @resolves {array} having deducted response
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
      //if the points of every payer to a particular user is zero then throw cannot deduct because user has no points
      const errorCheck = await errorCheckForCannotDeduct(sortedArray);
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
    let errorCount = 0;
    //hash map to keep track of remaining points after each deduction
    let deductionMap = new Map();
    deductionMap.set('deduction', req.body.deduct);
    //for each of the payer in the sorted array
    for (let i = 0; i < sortedArray.length; i++) {
      //because we cannot make each payer points to negative
      if (sortedArray[i].points > 0) {
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

    let count = 0
    //for all payer which has deductions response
    for (let i = 0; i < deductedResponse.length; i++) {
     count++;
     const wait =  await deductPointsDao.updateRewardsDao(userPosition, deductedResponse[i].payer, deductedResponse[i].deductedAmount);
    }

    if(count === deductedResponse.length)
    {
      resolve(true);
    }

  })
}


/**
 *
 * @param {sortedArray}  array having points values
 * @returns error or Boolean
 */
async function errorCheckForCannotDeduct(sortedArray) {
  return new Promise(async function (resolve, reject) {
    let count = 0;
    //for all payer which has deductions response
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i].points === 0) {
        count++;
      }
    }
    if (count === sortedArray.length) {
      reject({ status: 400, message: "this user has no points to deduct" });
    } else {
      resolve(true);
    }

  })
}







module.exports = {
  deductPointsService
}
