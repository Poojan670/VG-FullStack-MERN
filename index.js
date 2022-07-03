require('dotenv').config();
const express = require('express'),
    app = express()

require('./main/logger')();
require('./main/admin')(app);
require('./main/config')(app);
require('./main/joi')();
require('./main/api/routes')(app);
require('./main/swagger/swagger')(app);
require('./main/db')();

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Listening on port ${port}, Please checkout : http://localhost:${port}/`)
);