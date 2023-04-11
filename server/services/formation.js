const axios = require('axios');
const learnBoxFormationURL = 'https://mohamed1252.learnybox.com/api/v2/formations/';
const Formation = require('../models/formation_model')

async function getFormationInfo(accessToken) {
 
  try {
   
    const response = await axios.get(`${learnBoxFormationURL}`,
    { headers: {
      'Authorization': `Bearer ${accessToken}`
    }}
  )
  
const formations = response.data.data.map((formation) => ({
  idFormation: formation.idformation,
  nomFormation: formation.nomformation,
  uniqid:formation.uniqid,
  modules_count:formation. modules_count,
  non_admin_users_count:formation.non_admin_users_count,

}));



return formations

  } catch (error) {
    console.error(error);
  }
}

const getFormationId = async () => {
  try {
    const formation = await Formation.findOne({ nomFormation: 'Corpus LS' });
    if (!formation) {
      console.log('Formation not found');
      return null;
    }
    return formation.idFormation;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getFormationInfo , getFormationId};