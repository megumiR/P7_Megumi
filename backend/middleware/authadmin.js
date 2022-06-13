const jwt = require("jsonwebtoken");
const connection = require("../db__connection"); 

module.exports = (req, res, next) => {
  try {
    //many error occurs so put in try-catch
    console.log("authadmin.js checking....");
    console.log(req.body);
    //let token=null;
    if (!req.body.headers) {
      ///signup login MAYBE all passes here now
      console.log("Authadmin no body");
      token = req.headers.authorization.split(" ")[1];
    }else {
      console.log("Authadmin with body");
      token = req.body.headers.authorization.split(" ")[1];
    }

    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
    const userId = decodedToken.userId;
    req.userId = userId; //the id which sends request = token's id

    let checkadminid = `SELECT id FROM user WHERE roll = 'admin'`;
    connection.query(checkadminid, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "erreur: on ne peut pas trouvé d'id d'admin."
            })
        }
        res.status(200).json({ result });
        
    });
    console.log(result);
    const adminId = result;
    if (req.body.userId && req.body.userId == adminId) {
        next();
    } else if(req.body.userId && req.body.userId !== userId) {
      throw "401: unauthorized request."; //'Invalid userId'
    } else {
      next(); 
    }
  } catch (e)  {
    console.log('auth.js : catch');
    console.log(req.headers);
    res.status(400).json({
      error: new Error("Requête invalide"),
    });
  }
};

