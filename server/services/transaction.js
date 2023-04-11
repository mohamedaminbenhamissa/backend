const axios = require('axios');
const transactionURL = 'https://mohamed1252.learnybox.com/api/v2/transactions/'


async function getTransactionInfo(accessToken) {
 
    try {
      const response = await axios.get(`${transactionURL}`,
      { headers: {
        'Authorization': `Bearer ${accessToken}`
      }}
    )
      
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = {getTransactionInfo}