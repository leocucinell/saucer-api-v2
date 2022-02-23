//SECTION: Requires
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

//SECTION: express setup
app.use(express.json({extended: false}));

//SECTION: Routes
app.use('/auth', routes.auth);
//~~Protect below routes with Bearer token~~
app.use('/user', routes.user);
app.use('/city', routes.city);
app.use('/reservation', routes.reservation);
app.use('/restuarant', routes.restuarant);


//SECTION: Server Bind
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});