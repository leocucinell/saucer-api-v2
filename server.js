//SECTION: Requires
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

//SECTION: express setup
app.use(express.json({extended: false}));

//SECTION: Routes


//SECTION: Server Bind
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});