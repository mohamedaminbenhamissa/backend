const axios = require("axios");

const MembreURL =
  "https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/membres/";
const progressionURL =
  "https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/membres/progression/";

async function getMembreInfo(formationId, accessToken) {
  try {
    const response = await axios.get(
      `${MembreURL.replace("{id_formation}", formationId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}


async function addMembreToFormation(formationId, membre, accessToken) {
  try {
    const addMembreURL = `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/membres/`;
    const response = await axios.post(addMembreURL, membre, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function MembreInfo(formationId,membreId, accessToken) {
  try {
    const addMembreURL = `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/membres/${membreId}/`;
    const response = await axios.get(addMembreURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async  function updateMembretoFormation(formationId,membreId,membre,accessToken){
  try {
  const updateMembreURL = `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/membres/${membreId}/`
  console.log(typeof updateMembreURL);
  const response = await axios.patch(updateMembreURL, membre, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
} 




async function removeMembrefromFormation(formationId, membreId,accessToken) {
  try {
    const removeMembreURL =
  `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/membres/${membreId}/`;
    const response = await axios.delete(removeMembreURL,
     
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function ProgressiondesMembres(formationId, accessToken) {
  try {
    const response = await axios.get(
      `${progressionURL.replace("{id_formation}", formationId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  getMembreInfo,
  addMembreToFormation,
  updateMembretoFormation,
  removeMembrefromFormation,
  ProgressiondesMembres,
  MembreInfo
};
