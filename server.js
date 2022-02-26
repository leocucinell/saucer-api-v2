//SECTION: Requires
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const middleware = require('./middleware');
var cors = require('cors')

//SECTION: express setup
app.use(express.json({extended: false}));
app.use(cors());

//SECTION: Routes
app.use('/auth', routes.auth);
//NOTE: Uncomment when testing JWT
//app.use(middleware.verifyJWT);
app.use('/user', routes.user);
app.use('/city', routes.city);
app.use('/reservation', routes.reservation);
app.use('/restuarant', routes.restuarant);


//SECTION: Server Bind
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});