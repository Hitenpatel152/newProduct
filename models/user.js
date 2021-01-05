const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
	Name: {
        type: String,
        required: true,
    },
    EmailId: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    usejwtToken :{
        type: String,
    }

});
const user = mongoose.model("user",usermodel,'user');
module.exports = user;