const {
  getMembreInfo,
  addMembreToFormation,
  updateMembretoFormation,
  removeMembrefromFormation,
  ProgressiondesMembres,
  MembreInfo
} = require("../services/membre");

const { getFormationId } = require("../services/formation");

const Membre = require("../models/membre_model");
const { obtainAccessToken } = require("../config/token");

const getMembre = async (req, res) => {
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  const formationId = await getFormationId();

  if (!formationId) {
    res.status(500).send("erreur");
    return;
  }
  if (expire_in === 0) {
    accessToken = refreshToken;
  }

  const allmembre = await getMembreInfo(formationId, accessToken);

  //res.status(200).json(allmembre);
  res.status(200).json({
    message: "ok",
    status: 200,
    data: allmembre,
  });
};
const progressionMembre = async (req, res) => {
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  const formationId = await getFormationId();

  if (!formationId) {
    res.status(500).send("erreur");
    return;
  }
  if (expire_in === 0) {
    accessToken = refreshToken;
  }
  const progression = await ProgressiondesMembres(formationId, accessToken);
  res.status(200).json({
    message: "ok",
    status: 200,
    data: progression,
  });
};
const MembreData = async (req,res) => {
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();
  if (expire_in === 0) {
    accessToken = refreshToken;
  }

  const membreId = req.params.membreId;
  const info = await MembreInfo(membreId, accessToken);
  res.status(200).json({
    message: "ok",
    status: 200,
    data: info,
  });
}




async function addMembre(req, res) {
  try {
    const formationId = await getFormationId();
    const { accessToken, refreshToken, expire_in } = await obtainAccessToken();

    if (expire_in === 0) {
      accessToken = refreshToken;
    }
    
    const membre = req.body;
    const data = await addMembreToFormation(formationId, membre, accessToken);
    const newMembre = {
      prenom: membre.prenom,
      nom: membre.nom,
      email: membre.email,
      groupes: membre.groupes,
      adresse: membre.adresse,
      ville: membre.ville,
      pays: membre.pays,
      codePostal: membre.codePostal,
      tel: membre.tel,
      selectedFormation: membre.selectedFormation,
      
    };
    const savedMembre = await Membre.create(newMembre); // Save the member data to your database
    res.status(201).json(savedMembre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding member to formation' });
  }
}





async function updateMembre(req, res) {
  try {
    const formationId = await getFormationId();
    const { accessToken, refreshToken, expire_in } = await obtainAccessToken();

    if (expire_in === 0) {
      accessToken = refreshToken;
    }

    const membreId = req.params.id_membre;
    const updatedMembre = req.body;
    const data = await updateMembretoFormation(formationId, membreId, updatedMembre, accessToken);
    const savedMembre = await Membre.findByIdAndUpdate(membreId, updatedMembre); // Update the member data in your database
    res.status(200).json(savedMembre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating member in formation' });
  }
}


const removeMembre = async (req, res) => {
  const formationId = await getFormationId();
  const membreId = req.params.membreId
  const { accessToken, refreshToken, expire_in } = await obtainAccessToken();

      if (expire_in === 0) {
        accessToken = refreshToken;
      }

      
  await removeMembrefromFormation(formationId, membreId,accessToken);

  res.status(204).end();
};

module.exports = {
  getMembre,
  addMembre,
  updateMembre,
  removeMembre,
  progressionMembre,
  MembreData
};
