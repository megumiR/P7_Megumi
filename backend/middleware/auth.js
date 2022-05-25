const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //many error occurs so put in try-catch
    console.log("auth.js checking....");
    console.log(req.body);
    let token=null;
    if (!req.body.headers) {
      ///signup login MAYBE all passes here now
      console.log("Auth no body");
      token = req.headers.authorization.split(" ")[1];
    }else {
      console.log("Auth with body");
      token = req.body.headers.authorization.split(" ")[1];
    }

    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
    const userId = decodedToken.userId;
    req.userId = userId; //the id which sends request = token's id
    if (req.body.userId && req.body.userId !== userId) {
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

