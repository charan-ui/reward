

 let postPoints = require('../transactions.json');

//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');

/**
 * @params {object} to fetch a particular user of our reward programme
 * @returns {object} a user object
 */

async function fetchUserDao(query) {
  return new Promise(async function (resolve, reject) {
    //send the entire json array and userId of the user
    await transactionHelper.presenceOfUser(postPoints.users, query.userId)
      .then(user => {
        resolve(user);
      }).catch(error => {
        reject(error);
      })
  })
}

/**
 * @param {object} query has the userId to which the points has to be inserted
 * @returns {Number} index of that user
 */
 async function findUserPositionDao(query){
  return new Promise(async function (resolve,reject)
  {
    try{
    const index = postPoints.users.findIndex(point => point.userId === query.userId);
    resolve(index);
    }catch(error){
    reject(error);
    }
  })
 }


/**
 * @param {object} payerObject having points,payer,createdAt and updatedAt values
 * @param {object} validUser in our service datasource
 * @param {Number} position of our user in the service datasource array
 */
async function insertPointsForUser(pointsPayerObject,findUser,userPosition){
return new Promise(async function(resolve,reject){

  try{
     postPoints.users[userPosition].transactionDetails.push(pointsPayerObject);
     transactionHelper.writeTransactionDetails(postPoints);
     resolve({status:200});
  }catch(error){
     reject(error);
  }
})


}


module.exports = {
  fetchUserDao,
  findUserPositionDao,
  insertPointsForUser
}