const mongoose = require('mongoose')

const groupeSchema = new mongoose.Schema({

nom : {
    type:String
},
modules :{
    type:String
},
pages:{
    type:Number
},
date:{
    type:Date,
    default:Date.now
},
nb_membres:{
    type:Number
}

})
const Groupe = mongoose.model('Groupe', groupeSchema);

module.exports = Groupe;