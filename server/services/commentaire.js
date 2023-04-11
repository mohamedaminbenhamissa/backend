const axios = require('axios');
const CommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/commentaires/';
const AddCommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/commentaires/';
const UpdateCommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/commentaires/{id_commentaire}/'
const RemoveCommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/commentaires/{id_commentaire}/'




async function getCommentaireInfo(formationId, accessToken) {
    try {
      const response = await axios.post(`${CommentaireURL.replace('{formationId}', formationId)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function addcommentaireToFormation(formationId, commentaire, accessToken) {
    try {
      const AddCommentaireURL = `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/commentaires/`;
      const response = await axios.post(AddCommentaireURL, commentaire, {
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

  async  function updatecommentairetoFormation(formationId,commentaire, commentaireId,accessToken){
    try {
    const UpdateCommentaireURL = `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/commentaires/${commentaireId}/`
    const response = await axios.post(UpdateCommentaireURL, commentaire, {
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
  




async function removeCommentaire( id_commentaire, access_token) {
  try {
    const response = await axios.delete(`${RemoveCommentaireURL.replace('{id_commentaire}', id_commentaire)}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getCommentaireInfo,addcommentaireToFormation,updatecommentairetoFormation,removeCommentaire };