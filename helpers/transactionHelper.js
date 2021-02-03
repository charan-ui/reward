//import the file model of node
const fs = require('fs');

// /**
//  * @param {Array} userTransactionArray
//  * this function is to generate new user id for insertion of particular transaction points
//  * searching in the array the last userid and increment of 1 to return new userid
//  */

//  const generateUserId = (userTransactionArray)=>{
//    //if the array is not empty
//    if(array.length > 0){
//      return userTransactionArray[userTransactionArray.length -1 ].userId + 1
//    }else{
//      //if the array is empty and this is the first transaction record
//      return 1;
//    }
//  }

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

 function presenceOfUser(userTransactionArray,userId)
 {
   return new Promise((resolve,reject)=>{
     //find a particular user's transaction
     const user = userTransactionArray.find(each => each.userId === userId);
     //if user is not present
     if(!user){
        reject({
          message :'User Is not present',
          status:404
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
function writeTransactionDetails(fileName,content){
  fs.writeFileSync(fileName,JSON.stringify(content),'utf8',(err)=>{
    if(err){
      console.log(err);
    }
  })
}

module.exports ={
  generateUserId,
  transactionDate,
  presenceOfUser,
  writeTransactionDetails
}