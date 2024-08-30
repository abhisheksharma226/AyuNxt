const JWT = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

function createTokenForUser(startup){
    const payload = {
        _id: startup._id,
        fullName: startup.fullName,
        email: startup.email,
        profileImageURL: startup.profileImageURL,
        role: startup.role,
    };
    const token = JWT.sign(payload , secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token , secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
};