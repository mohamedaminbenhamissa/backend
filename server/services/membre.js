const axios = require('axios');

function createMembre(membre, accessToken, id_formation) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return axios
    .post(
      `https://diginov.learnybox.com/api/v2/formations/${id_formation}/membres/`,
      membre,
      config
    )
    .then((response) => {
      console.log(`Le membre ${membre.prenom} a été ajouté avec succès à la formation ${formationId}.`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Erreur lors de l'ajout du membre ${membre.prenom} à la formation ${formationId}.`, error);
      throw error;
    });
}
// Function to update a member in a formation
async function updateMembre(id_formation, id_membre, data, accessToken) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const membre = new Membre(data);
  try {
    const response = await axios.post(`https://diginov.learnybox.com/api/v2/formations/${id_formation}/membres/${id_membre}/`, membre, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to delete a member from a formation
async function deleteMembre(id_formation, id_membre, accessToken) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  try {
    const response = await axios.delete(`https://diginov.learnybox.com/api/v2/formations/${id_formation}/membres/${id_membre}/`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
module.exports = { createMembre, updateMembre, deleteMembre };
