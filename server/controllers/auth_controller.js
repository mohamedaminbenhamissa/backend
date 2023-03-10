const User = require('../models/user_model')
const { obtainAccessToken } = require('../middleware/auth')

async function signin(req, res) {
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
}
const getUserProps = (user) => {
    return{
        _id: user._id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        age:user.age
    }
}
module.exports = {
  signin
}