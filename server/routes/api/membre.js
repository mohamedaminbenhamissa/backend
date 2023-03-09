const axios = require('axios');
const { Membre } = require('../../models/membre_model');
// Récupération de l'access token depuis les cookies de login
const accessToken = req.cookies.access_token;

// Récupération des informations sur le nouveau membre depuis le corps de la requête

const membre = new Membre({
    prenom:req.body.prenom,
    nom:req.body.nom,
    email:req.body.email,
    groupes:req.body.groupes,
    adresse:req.body.adresse,
    ville:req.body.ville,
    pays:req.body.pays,
    code_postal:req.body.code_postal,
    tel:req.body.tel,
    rgpd:req.body.rgpd,
    rgpd_date:req.body.rgpd_date,
    rgpd_notice:req.body.rgpd_aff_notice,
    rgpd_aff:req.body.rgpd_aff,
    rrgpd_aff_date:req.body.rrgpd_aff_date,
    rgpd_aff_notice:req.body.rgpd_aff
})

// Configuration de l'en-tête Authorization avec l'access token
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

// Envoi de la requête HTTP POST avec les données et l'en-tête
axios.post(`https://diginov.learnybox.com/api/v2/formations/${id_formation}/membres/`, membre, config)
  .then((response) => {
    console.log(`Le membre ${membre.prenom} a été ajouté avec succès à la formation ${formationId}.`);
    
  })
  .catch((error) => {
    console.error(`Erreur lors de l'ajout du membre ${membre.prenom} à la formation ${formationId}.`, error);

  });


  axios.post(`https://diginov.learnybox.com/api/v2/formations/${id_formation}/membres/${id_membre}/`, membre, config)
  .then((response) => {
    console.log(`Le membre ${membre.prenom} a été modifié avec succès.`);
    
  })
  .catch((error) => {
    console.error(`Erreur lors de la modification du membre ${membre.prenom} .`, error);

  });

  axios.post(`https://diginov.learnybox.com/api/v2/formations/${id_formation}/membres/${id_membre}/`, membre, config)
  .then((response) => {
    console.log(`Le membre ${membre.prenom} a été supprimé avec succès de la formation ${formationId}.`);
    
  })
  .catch((error) => {
    console.error(`Erreur lors de la supression du membre ${membre.prenom} .`, error);

  });
  