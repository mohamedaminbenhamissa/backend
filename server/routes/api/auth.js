const express = require('express')
let router = express.Router ()
require('dotenv').config()
const {checkLogedIn} = require('../../middleware/auth')

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
            password: req.body.password,
            pseudo : req.body.pseudo,
            lastname : req.body.lastname,
            firstname : req.body.firstname
        })
        const token = user.generateToken()
        const doc = await user.save()
console.log("***********************")
       
    res.cookie('x-access-token',token).status(200).send(doc)
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
      const { accessToken, refreshToken , expire_in } = await obtainAccessToken()
      
      // Generate Token
      res
        .status(200)
        .cookie('x-access-token',accessToken, 'refresh_token',refreshToken, 'expire_in',expire_in)
        .json({id:user._id,data:user, accessToken:accessToken,refreshToken:refreshToken,expire_in:expire_in})
       // .send(getUserProps(user))
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

router.route("/users/:id")
  .get(async (req,res)=>{
      try{
          const user = await User.findById(req.params.id)
          if (!user) return res.status(404).json({message:"User not found"})
          res.status(200).json(user)
      }catch(error){
          res.status(400).json({message:'Error',error: error})
      }
  })

router.route('/isauth')
.get(checkLogedIn,async (req,res)=>{
    res.status(200).send(getUserProps(req.user))
})
 

// filtre sur les donner ajouter a la base 
const getUserProps = (user) => {
    return{
        _id: user._id,
        email:user.email,
        pseudo:user.pseudo,
        lastname : user.lastname,
        firstname : user.firstname
    }
}

module.exports = router