const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'] //Bearer token
    if(!authHeader) return res.status(401).json({'message': 'unauthorized attempt'});
    
    //console.log(authHeader);
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({'message': 'invalid auth credentials'});
        console.log('~~ DECODED JWT ~~')
        console.log(decoded)
        next();
    });
    
}

module.exports = verifyJWT;