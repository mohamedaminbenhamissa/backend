const axios = require('axios')

const obtainAccessToken = async () => {
    const headers = {
      'X-API-Key': process.env.API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  
    const response = await axios.post(
      'https://diginov.learnybox.com/api/v2/oauth/token/',
      {
        grant_type: 'access_token'
      },
      {
        headers: headers
      }
    )
  
    const accessToken = response.data.data.access_token
    const refreshToken = response.data.data.refresh_token
  
    return { accessToken, refreshToken }
  }


  module.exports = { obtainAccessToken }