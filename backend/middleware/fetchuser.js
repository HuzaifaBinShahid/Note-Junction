const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Huzaifaisawebdevl@per';



const fetchuser = (req, res, next) => {


    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send("Please authenticate with a valid token");
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();


    } catch (error) {
        console.error(error.message);
        res.status(401).send("Please authenticate with a valid token");
    }
}

module.exports = fetchuser;