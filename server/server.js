const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())
const users = require('./routes/api/auth')

const { checkToken} = require('./middleware/auth')


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}retryWrites=true&w=majority`
mongoose.connect(mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
})

app.use(bodyParser.json())
app.use(checkToken)
app.use("/api/users",users)


const port = process.env.PORT || 3003
app.listen(port,()=>{
    console.log(`Server is running on port  ${port}`)
})