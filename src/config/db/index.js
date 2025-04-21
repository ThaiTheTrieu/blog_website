require('dotenv').config();
const {env} = require('process');
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(env.URL);
        console.log('Connecting...!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connect};