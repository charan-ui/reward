/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

//data
let postPoints = require('../serviceData.json');


/**
 * @param {Number} position of a User
 * @returns the points of each payer left after deduction
 */
async function fetchPointsServiceMemoryDao(userPosition) {
  return new Promise(async function (resolve, reject) {
    try {
      const pointsRemainingForPayer = postPoints.users[userPosition].transactionDetails;
      resolve(pointsRemainingForPayer);
    } catch (error) {
      reject(error);
    }
  })
}

module.exports =
{
  fetchPointsServiceMemoryDao
}