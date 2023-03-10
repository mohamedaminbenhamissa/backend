const { Membre } = require('../models/membre_model');
const { createMembre } = require('../services/membre');
const { updateMembre } = require('../services/membre');
const { deleteMembre } = require('../services/membre');


exports.createMembre = async (req, res) => {
  try {
    // Récupération de l'access token depuis les cookies de login
    const accessToken = req.cookies.access_token;

    // Récupération des informations sur le nouveau membre depuis le corps de la requête
    const membre = new Membre({
      prenom: req.body.prenom,
      nom: req.body.nom,
      email: req.body.email,
      groupes: req.body.groupes,
      adresse: req.body.adresse,
      ville: req.body.ville,
      pays: req.body.pays,
      code_postal: req.body.code_postal,
      tel: req.body.tel,
      rgpd: req.body.rgpd,
      rgpd_date: req.body.rgpd_date,
      rgpd_notice: req.body.rgpd_aff_notice,
      rgpd_aff: req.body.rgpd_aff,
      rrgpd_aff_date: req.body.rrgpd_aff_date,
      rgpd_aff_notice: req.body.rgpd_aff
    });

    // Configuration de l'en-tête Authorization avec l'access token
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };

    // Appel du service pour créer le membre
    const response = await createMembre(id_formation, membre, config);

    console.log(`Le membre ${membre.prenom} a été ajouté avec succès à la formation ${formationId}.`);

    res.status(200).json({ message: `Le membre ${membre.prenom} a été ajouté avec succès à la formation ${formationId}.` });
  } catch (error) {
    console.error(`Erreur lors de l'ajout du membre ${membre.prenom} à la formation ${formationId}.`, error);

    res.status(500).json({ error: `Erreur lors de l'ajout du membre ${membre.prenom} à la formation ${formationId}.` });
  }
}

exports.updateMembre  = async(req, res) => {
  const { id } = req.params;
  const updatedMembre = req.body;

  try {
    const result = await updateMembre(id, updatedMembre);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Error updating member with ID ${id}: ${error.message}`);
    return res.status(500).json({ error: 'Unable to update member.' });
  }
}

exports.deleteMembre = async (req, res) => {
  try {
    const { id_formation, id_membre } = req.params;
    await deleteMembre(id_formation, id_membre, req.cookies.access_token);
    res.status(200).json({
      message: `Le membre avec l'ID ${id_membre} a été supprimé avec succès de la formation avec l'ID ${id_formation}.`,
    });
  } catch (error) {
    console.error(`Erreur lors de la suppression du membre.`, error);
    res.status(500).json({ message: "Erreur lors de la suppression du membre." });
  }
};

