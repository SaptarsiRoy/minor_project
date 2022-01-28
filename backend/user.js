const mongoose = require('mongoose');


const validateEmail = email => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateName = name => {
    let re = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return !re.test(name);
}

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        validate: [validateName , 'Please enter a valid name'], 
        match: [/^[A-Za-z]+$/, 'Please enter a valid name']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String
    },
    mobile: {
        type: Number,
        minlenght: 10,
        maxlength: 13
    },

}, { versionKey: false })


module.exports = userModel = mongoose.model("User", userSchema);