require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./user.js');

const uri = "mongodb://localhost:27017/bhukkad"
const app = express();

mongoose.connect(uri);

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.redirect("/bhukkad")
})

app.get("/bhukkad", (req, res) => {
    res.json({
        status: 200,
        message: "Backend Server is running"
    });
});

app.post("/bhukkad/user", (req, res) => {

    // res.json(userModel)

    const newUser = new userModel({
        fullName: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    })
    newUser.save(err => {
        try {
            if (!err) {
                res.json({
                    status: 201,
                    message: "User created successfully"
                })
            }else {
                throw err;
            }
        }
            catch (error) {
                res.json({
                    status: 404,
                    message: err
                })
            }
            
        
    });

    
});





app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server is running at port " + process.env.PORT);
    }
})