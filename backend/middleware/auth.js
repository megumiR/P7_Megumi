const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {   //many error occurs so put in try-catch
        console.log('auth.js checking....');
        console.log(req.body);
        if (!req.body.headers) { ///signup login MAYBE all passes here now
            console.log('Auth no body');
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
            const userId = decodedToken.userId;
            req.userId = userId; //the id which sends request = token's id
                if (req.body.userId && req.body.userId !== userId) {
                    throw '401: unauthorized request.' ;  //'Invalid userId'
                } else {
                    next();
                }
        } else {  /// 
            console.log('Auth with body');
            const token = req.body.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
            const userId = decodedToken.userId;
            req.userId = userId; //the id which sends request = token's id
                if (req.body.userId && req.body.userId !== userId) {
                    throw '401: unauthorized request.' ;  //'Invalid userId'
                } else {
                    next();
                }
        }
    } catch {
        res.status(400).json({
            error: new Error ('Requête invalide')
        });
    }
};