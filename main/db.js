require('dotenv')
const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongodb..'))
}
