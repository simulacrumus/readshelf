const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'No authorization header found!',
        });
    }

    const token = authorization.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET).user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token is not valid!',
        });
    }
}