import jwt from 'jsonwebtoken';

const generateToken = (userId, expiresIn = '15d') => {
    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }
        return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn });
    } catch (error) {
        console.error("Token generation error:", error.message);
        console.error("Stack trace:", error.stack);
        throw new Error("Error generating token");
    }
};

// Example usage for email verification
const generateEmailVerificationToken = (userId) => {
    return generateToken(userId, '1h'); // Token expires in 1 hour
};

// Function to generate token and set it as a cookie
const generateTokenAndSetCookie = (res, userId) => {
    const token = generateToken(userId);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hour
    });
    return token;
};

export { generateToken, generateEmailVerificationToken, generateTokenAndSetCookie };
