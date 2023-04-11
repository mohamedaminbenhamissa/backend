const mongoose = require('mongoose')

const commentaireSchema = new mongoose.Schema({
idelement : {
    type : Number
},
idmodule : {
    type:Number
},
idpage :{
    type:Number
},
message:{
    type:String
},
site:{
    type:String
},
adresse:{
    type:String
},
telephone:{
    type:Number
},
orig_comment:{
    type:Boolean
},
notification:{
    type:Boolean
}

})
const Commentaire = mongoose.model("Commentaire", commentaireSchema);

module.exports = Commentaire;