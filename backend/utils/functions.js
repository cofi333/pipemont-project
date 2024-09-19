const jwt = require('jsonwebtoken');

const generateToken = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

 const correctNameMessage = (name) => {
  const lastLetter = name.charAt(name.length - 1);
  if (["o", "a"].includes(lastLetter)) return name;
  return `${name}e`;
};

const authenticateToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if(token == null) return res.status(401).json({message: "Kod za autorizaciju je obavezan"});
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(401).json({message: "Kod za autorizaciju je obavezan"});
      next()
    })

}


module.exports = {
    generateToken,
    correctNameMessage,
    authenticateToken
};  
