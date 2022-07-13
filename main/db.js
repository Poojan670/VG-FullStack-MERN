require('dotenv')
const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongodb..'))
}
