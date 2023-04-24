const axios = require('axios');
const activitesURL = 'https://mohamed1252.learnybox.com/api/v2/activities/';

async function getactivitesInfo( accessToken) {
    try {
      const response = await axios.get(activitesURL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = { getactivitesInfo };