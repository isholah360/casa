const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;


const JWT_SECRET = process.env.SECRETE_CODE
console.log(JWT_SECRET)
// Generate Token
exports.generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Verify Token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.driverId = decoded.userId;
    next();
  });
};