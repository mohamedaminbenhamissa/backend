const axios = require('axios');

  const instance = axios.create(
    {
  baseURL: 'https://mohamed1252.learnybox.com/api/v2/',

});

 module.exports = { instance }
