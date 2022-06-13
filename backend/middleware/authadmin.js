const jwt = require("jsonwebtoken");
const connection = require("../db__connection"); 

module.exports = (req, res, next) => {
  try {
    console.log("authadmin.js checking....");
    console.log(req.userId);

    if (!req.body.headers) {
      console.log("Authadmin no body");
      token = req.headers.authorization.split(" ")[1];
    }else {
      console.log("Authadmin with body");
      token = req.body.headers.authorization.split(" ")[1];
    }

    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
    const userId = decodedToken.userId;
    req.userId = userId; //the id which sends request = token's id

    let checkadminid = `SELECT id as id FROM user WHERE roll = 'admin'`;
    connection.query(checkadminid, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "erreur: on ne peut pas trouvé d'id d'admin."
            })
        }
        console.log(req.userId);
        console.log('userId' + userId);
        console.log(JSON.stringify(result[0].id));
        const adminId = JSON.stringify(result[0].id);

        if ( req.userId == adminId || req.userId == userId) {
            next(); 
        } else {
            throw "401: unauthorized request."; //'Invalid userId'
        }    
    });
  } catch (e)  {
    console.log('authadmin.js : catch');
    res.status(400).json({
      error: new Error("Requête invalide"),
    });
  }
};

