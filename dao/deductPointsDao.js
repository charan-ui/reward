/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */


//data
let postPoints = require('../serviceData.json');

//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');


/**
 * @param {Number} position of a User
 * @returns the sorted Array based on old dates at top and new dates at bottom
 */
async function sortServiceDataStoreDao(userPosition) {
  return new Promise(async function (resolve, reject) {
    try {
      //retrieve the array to sort from service memory
      const arrayToSort = postPoints.users[userPosition].transactionDetails;
      //sort it
      arrayToSort.sort(function (a, b) {
        return new Date(a.updatedAt) - new Date(b.updatedAt)
      });
      resolve(arrayToSort);
    } catch (error) {
      reject(error);
    }
  })
}

/**
 * @param {Number} userPosition of a User
 * @param {String} payer
 * @param {Number} amountDetected
 * @returns {Boolean} if success
 */
async function updateRewardsDao(userPosition, payer, amountDetected) {
  return new Promise(async function (resolve, reject) {
    try {
      //retrieve index of payer
      const indexOfPayer = postPoints.users[userPosition].transactionDetails.findIndex(every => every.payer === payer);
      postPoints.users[userPosition].transactionDetails[indexOfPayer].points += amountDetected;
      transactionHelper.writeTransactionDetails(postPoints);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}



module.exports = {
  sortServiceDataStoreDao,
  updateRewardsDao
}