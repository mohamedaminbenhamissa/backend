const axios = require('axios');
const { Formation } = require('../models/formation_model');


const accessToken = req.cookies.access_token;
const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
// Récupération des données de l'API et enregistrement dans la base de données
axios.get('https://diginov.learnybox.com/api/v2/formations/',config)
  .then(response => {
    const formations = response.data;

    // Enregistrement de chaque formation dans la base de données
    formations.forEach(formation => {
      const newFormation = new Formation({
        id_formation:formation.id_formation,
        nom:formation.nom,
        type:formation.type,
        etat:formation.etat,
        lien:formation.lien,
        membres:formation.membres,
        date:formation.date
      });

      newFormation.save()
        .then(() => console.log('Formation saved to MongoDB...'))
        .catch(err => console.error('Error saving formation to MongoDB...', err));
    });
  })
  .catch(error => {
    console.log(error);
  });