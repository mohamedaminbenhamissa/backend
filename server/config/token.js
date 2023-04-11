const axios = require('axios')
let accessToken = ""
let refreshToken = ""
let expire_in = ""


const obtainAccessToken = async () => {

 
    const headers = {
      'X-API-Key': process.env.API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  
    const response = await axios.post(
      'https://mohamed1252.learnybox.com/api/v2/oauth/token/',
      {
        grant_type: 'access_token'
      },
      {
        headers: headers
      }
    )
  
     accessToken = response.data.data.access_token
     refreshToken = response.data.data.refresh_token
     expire_in = response.data.data.expires_in

   
    
    return { accessToken, refreshToken , expire_in }

  }


  module.exports = { obtainAccessToken }