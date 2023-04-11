const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
  idFormation: {
    type: String,
  },
  nomFormation: {
    type: String,
  },
  uniqid: {
    type: String,
  },
  etat: {
    type: String,
  },
  type: {
    type: String,
  },
  version: {
    type: String,
  },

  date_start: {
    type: Date,
  },
  sommaire_all_elements: {
    type: Boolean,
  },
  nb_learning_days: {
    type: Number,
  },
  logo: {
    type: String,
  },

  banniere: {
    type: String,
  },
  theme: {
    type: String,
  },
  id_page_accueil: {
    type: Number,
  },
  hide_logo: {
    type: Boolean,
  },
  thumbnail: {
    type: String,
  },
  datecreation: {
    type: Date,
  },
  pages_count: {
    type: Number,
  },
  modules_count: {
    type: Number,
  },
  users_count: {
    type: Number,
  },
  non_admin_users_count: {
    type: Number,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});
const Formation = mongoose.model("Formation", formationSchema);

module.exports = Formation;
