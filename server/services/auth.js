const axios = require('axios');

app.get('/api/token', async (req, res) => {
  // Retrieve the access token from the cookie
  const accessToken = req.cookies.access_token;

  try {
   
    const response = await axios.get('https://diginov.learnybox.com/api/v2/oauth/token/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving data.');
  }
});