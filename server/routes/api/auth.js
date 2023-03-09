const express = require('express')
let router = express.Router ()
require('dotenv').config()
const {checkLogedIn} = require('../../middleware/auth')
const {grantAccess} = require('../../middleware/roles')

const { User } = require('../../models/user_model');
const { obtainAccessToken } = require('../../config/token')

router.route("/register")
.post(async (req,res)=>{
    try{
    
        if(await User.emailTaken(req.body.email)){
            return res.status(400).json({messgae:"Email already exist"})
        }
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        const token = user.generateToken()
        const doc = await user.save()

    res.cookie('x-access-token',token).status(200).send(getUserProps(doc))
    }catch(error){
        res.status(400).json({message:'Error',error: error})
    }
})

router.route('/signin').post(async (req, res) => {
    try {
      // Find the user
      let user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(400).json({ message: "Email doesn't exist" })
  
      // Compare the password
      const compare = await user.comparePassword(req.body.password)
      if (!compare) return res.status(400).json({ message: 'Wrong password' })
  
      // Obtain access token from third-party API
      const { accessToken, refreshToken } = await obtainAccessToken()
  
      // Store access and refresh tokens in cookies
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true // set to true if using https
      })
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true // set to true if using https
      })
  
      // Generate Token
      const token = user.generateToken()
  
      res
        .status(200)
        .cookie('x-access-token', token)
        .send(getUserProps(user))
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })


  router.route("/logout")
  .post(async (req, res) => {
    try {
      // Supprimer le token d'accès de la base de données pour invalider la session utilisateur
      req.user.token = req.user.token.filter(token => {
        return token.token !== req.token;
      });
  
      // Enregistrer les modifications dans la base de données
      await req.user.save();
  
      res.status(200).send({ message: "Utilisateur déconnecté" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  })
router.route("/profile")
.get(checkLogedIn,grantAccess('readOwn','profile'),async (req,res)=>{

    try{

            const user = await User.findById(req.user._id)
             if(!user) return res.status(400).json({message:'User not found'})
             res.status(200).json(user)

    }catch(error){
      return res.status(400).send(error)
    }

})

.patch(checkLogedIn,grantAccess('updateOwn','profile'),async (req,res)=>{
    try{

        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set":{
                    firstname: req.body.firstname,
                    lastname: req.body.lastname, 
                    age: req.body.age
                }
            },
            {new:this.true}
        )

            if(!user) return res.status(400).json({message:'User not Found'})

            res.status(200).json(getUserProps(user))

    }catch(error){
            res.status(400).json({message:"Problem updating",error:error})
    }
})


router.route('/update_email')
.patch(checkLogedIn,grantAccess('updateOwn','profile'), async(req,res)=>{
    try{

        if(await User.emailTaken(req.body.newemail)){
            return res.status(400).json({message:"Sorry email already taken"})
        }

        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set":{
                    email:req.body.newemail
                }
            },
            {new : true}
        )
            if(!user) return   res.status(400).json({message:"User not found"})

            const token = user.generateToken()
            res.cookie('x-access-token',token)
            .status(200).send({email:user.email})



    }catch(error){
            res.status(400).json({message:"Problem updating",error:error})
    }
})



router.route('/isauth')
.get(checkLogedIn,async (req,res)=>{
    res.status(200).send(getUserProps(req.user))
})
 


///filtre sur les donner ajouter a la base 
const getUserProps = (user) => {
    return{
        _id: user._id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        age:user.age
    }
}



module.exports = router