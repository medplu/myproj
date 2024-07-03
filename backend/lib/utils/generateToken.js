import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d' // You can change the expiration time as needed
    });

    return token;
};
