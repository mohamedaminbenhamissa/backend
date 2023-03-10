const mongoose = require('mongoose')

const formationSchema = new mongoose.Schema({
id_formation : {
    type : String
},
nom : {
    type:String
},
type :{
    type:String
},
etat:{
    type:String
},
lien:{
    type:String
},
membres:{
    type:Number
},
date:{
    type:Date,
    default:Date.now
}

})
const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;