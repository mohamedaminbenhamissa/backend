const mongoose = require("mongoose");

// const formationSchema = new mongoose.Schema({
//     idFormation:{
//         type:String
//     }
// })

const membreSchema = new mongoose.Schema({
  membreId: {
    type: String,
  },

  prenom: {
    type: String,
  },
  nom: {
    type: String,
  },
  email: {
    type: String,
  },
  groupes: {
    type: String,
  },
  adresse: {
    type: String,
  },
  ville: {
    type: String,
  },
  pays: {
    type: String,
  },
  codePostal: {
    type: String,
  },
  tel: {
    type: String,
  },
  selectedFormation: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Formation",
    type: String,
  },
});

const Membre = mongoose.model("Membre", membreSchema);

module.exports = Membre;
