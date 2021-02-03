//import the file model of node
const fs = require('fs');
const fileName = 'abc.json'



/**
 * this function is to create a transactionDate
 * @returns date of server in ISO 8601
 */
const transactionDate = () => new Date().toString();

/**
 * @param {Array} userTransactionArray
 * @param {Number} userId
 * function is to find out the presence of userId before deduction or update or fetching points
 */
function presenceOfUser(userTransactionArray, userId) {
  return new Promise((resolve, reject) => {
    //find a particular user's transaction
    const user = userTransactionArray.find(each => each.userId === userId);
    //if user is not present
    if (!user) {
      reject({
        message: 'User Is not present',
        status: 404
      })
    }
    //else  user is present
    resolve(user);
  })
}
/**
 * @param {String} fileName
 * @param {Object} content
 * write a new transaction array in the Json file data(service memory)
 */
function writeTransactionDetails(content) {
  fs.writeFile(fileName, JSON.stringify(content), (err) => {
    if (err) {
      console.log(err);
    }
  })
}

module.exports = {
  transactionDate,
  presenceOfUser,
  writeTransactionDetails
}