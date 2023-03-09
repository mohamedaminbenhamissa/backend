const mongoose = require('mongoose');


const membreSchema = new mongoose.Schema({
  prenom: { 
    type: String,
     required: true,
},
  nom: { 
    type: String,
     required: true 
},
email:{
    type: String,
    required: true 
},
groupes : {
    type: String,
    required: true 
},
adresse:{
    type: String,
    required: true 
},
ville:{
    type: String,
    required: true 
},
pays:{
    type: String,
    required: true 
},
code_postal:{
    type: String,
    required: true 
},
tel:{
    type: String,
    required: true 
},
rgpd:{
    type: String,
    required: true 
},
rgpd_date:{
    type: String,
    required: true 
},
rgpd_notice:{
    type: String,
    required: true 
},
rgpd_aff:{
    type: String,
    required: true 
},
rrgpd_aff_date:{
    type: String,
    required: true 
},
rgpd_aff_notice:{
    type: String,
    required: true 
}

});



const Membre = mongoose.model('Membre', membreSchema);

module.exports = Membre;