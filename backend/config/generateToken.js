const jwt = require('jsonwebtoken');

// Ye function user ki ID aur humari secret key mila kar token banayega
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // InfoSec standard: Token 30 din baad expire ho jayega
    });
};

module.exports = generateToken;