const axios = require('axios');

async function addMembere(user) {
  const apiUrl = 'https://diginov.learnybox.com/api/v2/formations/';
  const apiKey = 'sy_cuqgtdvdDenrxyjhBghGna_DAEdeyF';

  try {
    const response = await axios.post(apiUrl, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add new user.');
  }
}