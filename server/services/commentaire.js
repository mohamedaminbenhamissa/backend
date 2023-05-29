const axios = require('axios');

const AddCommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/commentaires/';
const UpdateCommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/{id_formation}/commentaires/{id_commentaire}/'
const RemoveCommentaireURL = 'https://mohamed1252.learnybox.com/api/v2/formations/commentaires/{id_commentaire}/'


/**
 * @swagger
 *   http://localhost:3003/api/formation/formations
 *   get:
 *     summary: Get formation data
 *     description: Returns the data for a specific formation
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *       
 *     responses:
 *       200:
 *         description: Data for the specified formattion
 *       404:
 *         description: Member not found
 */

async function getCommentaireInfo(formationId, accessToken) {
  try {
    const CommentaireURL = `https://mohamed1252.learnybox.com/api/v2/formations/${formationId}/commentaires/`;
    const response = await axios.get(CommentaireURL, {
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

module.exports = { getCommentaireInfo,addcommentaireToFormation,updatecommentairetoFormation,removeCommentaire }