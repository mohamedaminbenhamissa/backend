const axios = require('axios');
const activitesURL = 'https://mohamed1252.learnybox.com/api/v2/activities/';

async function getactivitesInfo( accessToken) {
    try {
      const response = await axios.post(activitesURL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = { getactivitesInfo};