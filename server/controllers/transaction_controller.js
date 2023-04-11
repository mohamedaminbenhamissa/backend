const { obtainAccessToken } = require('../config/token');
const { getTransactionInfo } = require('../services/transaction');


const getTransaction = async (req, res) => {
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  if (expire_in === 0) {
    accessToken = refreshToken;
  }

  const transactions = await getTransactionInfo( accessToken);

  //res.status(200).json(allmembre);
  res.status(200).json({
    message:"ok",
    status:200,
    data:transactions
  });
};


module.exports = { getTransaction };
