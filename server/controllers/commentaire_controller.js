const {
  getCommentaireInfo,
  addcommentaireToFormation,
 
  removeCommentaire,
} = require("../services/commentaire");

const Commentaire = require("../models/commentaire_model");

const { getFormationId } = require("../services/formation");

const getCommentaires = async (req, res) => {
  const commentaires = await getCommentaireInfo();
  res.status(200).json(commentaires);
};


async function addCommentaireData(req, res) {
  try {
    const formationId = await getFormationId();
    const { accessToken, refreshToken, expire_in } = await obtainAccessToken();

        if (expire_in === 0) {
          accessToken = refreshToken;
        }
    
    const commentaire = req.body;
    const data = await addcommentaireToFormation(formationId, commentaire, accessToken);
    const savedCommentaire = await Commentaire.create(data); // Save the cmmentaire data to your database
    res.status(201).json(savedCommentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding commentaire to formation' });
  }
}



const removeCommentaireData = async (req, res) => {
  const { id_commentaire } = req.params;
  const access_token = req.cookies.access_token;

  await removeCommentaire(id_commentaire, access_token);

  res.status(204).end();
};

module.exports = {
  getCommentaires,
  addCommentaireData,

  removeCommentaireData,
};
