const express = require('express')
require('dotenv').config()
const multer = require('multer')
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file , callback){
        callback(null,'')
    }
})

const upload = multer({storage}).single('video')

app.post('/upload',upload,(res,res) => {
    res.send("hello world")
})