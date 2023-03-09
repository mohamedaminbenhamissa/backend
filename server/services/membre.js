const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/add_member', async (req, res) => {
  const { access_token, refresh_token } = req.headers;
  const api_url = 'https://diginov.learnybox.com/api/v2/formations/{id_formation}/membres/';
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    // Make the API request using the access token
    const response = await axios.post(api_url, data, { headers });

    // If the access token is invalid, use the refresh token to get a new one
    if (response.status === 401 && refresh_token) {
      const new_access_token = await get_new_access_token(refresh_token);

      // Retry the API request with the new access token
      const headers_with_new_token = {
        Authorization: `Bearer ${new_access_token}`,
      };
      const response_with_new_token = await axios.post(api_url, data, {
        headers: headers_with_new_token,
      });
      res.json(response_with_new_token.data);
    } else {
      res.json(response.data);
    }
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

async function get_new_access_token(refresh_token) {
  const api_url = 'https://example-api.com/refresh_token';
  const data = {
    refresh_token,
  };
  const response = await axios.post(api_url, data);
  return response.data.access_token;
}

