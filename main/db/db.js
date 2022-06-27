const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/vg_db', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongodb..'))
}
