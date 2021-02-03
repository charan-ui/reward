//imports
const fileName = '../data/transaction.json';
//loading the json data file
let postPointsArray = require(fileName);

//loading the transaction Helper file
const transactionHelper = require('../helpers/transactionHelper');

/**
 * @params {object} to fetch a particular user of our reward programme
 */

async function fetchUserDao(query) {
  return new Promise(async function (resolve, reject) {
    transactionHelper.presenceOfUser(postPointsArray, query.userId)
      .then(user => {
        resolve(user);
      }).catch(error => {
        reject(error);
      })
  })
}



module.exports = {
  fetchUserDao
}