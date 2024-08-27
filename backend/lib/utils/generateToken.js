import jwt from 'jsonwebtoken';

const generateToken = (userId, expiresIn = '15d') => {
    try {
        return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn });
    } catch (error) {
        console.error("Token generation error:", error.message);
        throw new Error("Error generating token");
    }
};

