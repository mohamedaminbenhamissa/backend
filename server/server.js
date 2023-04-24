const express = require('express')
const app = express()
const swaggerSetup = require('./swagger');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())
app.use(cookieParser())
const users = require('./routes/api/auth')
const formations = require('./routes/api/formations')
const membre = require('./routes/api/membre')
const transaction = require('./routes/api/transaction')
const activites = require('./routes/api/activites')
const commentaire = require('./routes/api/commentaire')
const { checkToken } = require('./middleware/auth')


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}retryWrites=true&w=majority`
mongoose.connect(mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
})
swaggerSetup(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(checkToken)
app.use("/api/users",users)
app.use("/api/formation",formations)
app.use("/api",membre)
app.use("/api",transaction)
app.use("/api",activites)
app.use('/api',commentaire)
const port = process.env.PORT || 3003
app.listen(port,()=>{
    console.log(`Server is running on port  ${port}`)
})