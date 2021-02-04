/**
 * @author Charan H M
 * @CopyRights Rewards
 * @Date FEB 4 , 2021
 */

//load addPointsDao
const addPointsDao = require('../dao/addPointsdao');
const fetchPointsDao = require('../dao/fetchPointsDao');

/**
 *
 * @param {Object} req query string that has userId
 * @resolves {Array} having payer and remaining points with respect to that user
 */
async function fetchPointsService(req) {
  return new Promise(async (resolve, reject) => {
    try {
      //first find a user whether he is a valid user to deduct points
      await addPointsDao.fetchUserDao({ userId: parseInt(req.query.userId) });
      //retrieve the position of the user
      const userPosition = await addPointsDao.findUserPositionDao({ userId: parseInt(req.query.userId) });
      //fetching the remaining points for a particular user
      const returnFinalResult = await fetchPointsDao.fetchPointsServiceMemoryDao(userPosition);
      resolve(returnFinalResult);
    } catch (error) {
     reject(error);
    }

  })
}

module.exports = {
  fetchPointsService
}