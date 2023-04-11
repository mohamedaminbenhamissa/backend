const axios = require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const TOKEN_URL = 'https://mohamed1252.learnybox.com/api/v2/oauth/token/';

async function getToken(req, res, next) {
  try {
    const response = await axios.post(TOKEN_URL, {
      grant_type: 'client_credentials',
      api_key: API_KEY
    });
    req.access_token = response.data.access_token;
    req.refresh_token = response.data.refresh_token;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving token');
  }
}
app.use(cookieParser());
app.use(getTokenFromCookie);

module.exports = getToken;