require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userModel = require('./user.js');
const recipeModel =  require('./recipes.js');


const uri = "mongodb://localhost:27017/bhukkad"
const saltRounds = 10;
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

app.get('/bhukkad/getrecipes', (req, res) => {
    recipeModel.find({}, (err, recipe) => {
        if (!err) {
            res.json({
                status: 200,
                message: recipe
            })
        }
    })
});

app.post("/bhukkad/signup", (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
        const newUser = new userModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile
        });

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
                        message: err.message
                    })
                }
                
            
        });
    });
});

app.post("/bhukkad/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    userModel.findOne({email: email}, (err, data) => {
        if (!err) {
            if (data) {
                bcrypt.compare(password, data.password, (err, result) => {
                    if (err) {
                        res.json({
                            status: 404,
                            message: err
                        })
                    } else {
                        if (result) {
                            res.json({
                                status: 200,
                                message: "User authenticated"
                            })
                        } else {
                            res.json({
                                status: 403,
                                message: "User not authenticated"
                            })
                        }
                    }
                })
            }
        } else {
            console.log(err);
        }
    })
});


app.post("/bhukkad/addrecipe", (req, res) => {

    const newRecipe = new recipeModel({
        recipeName: req.body.recipeName,
        foodClass: req.body.foodClass,
        foodType: req.body.foodType,
        recipe: req.body.recipe
    })
    newRecipe.save(err => {
        try {
            if (!err) {
                res.json({
                    status: 201,
                    message: "Recipe added successfully"
                })
            } else {
                throw err;
            }
        } catch (error) {
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