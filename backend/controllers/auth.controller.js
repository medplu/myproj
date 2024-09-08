import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import Doctor from '../models/doctor.model.js';
import { sendVerificationEmail } from '../utils/email.util.js';
import { google } from 'googleapis';

// Utility function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'  // Token expires in 15 days
    });
};

// Utility function to generate a 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to validate additional info based on account type
const validateAdditionalInfo = (accountType, additionalInfo) => {
    const errors = [];
    if (accountType === 'student' && !additionalInfo?.schoolName) {
        errors.push("School Name is required for students");
    }
    if (accountType === 'professional' && !additionalInfo?.professionalTitle) {
        errors.push("Professional Title is required for professionals");
    }
    if (accountType === 'institution' && !additionalInfo?.institutionName) {
        errors.push("Institution Name is required for institutions");
    }
    return errors;
};

// Google OAuth2 Client configuration
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET_KEY,
    process.env.REDIRECT
);

// Signup controller
export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password, accountType, additionalInfo, phone, gender, age } = req.body;

        // Validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const validAccountTypes = ['client', 'student', 'professional', 'institution'];
        if (!validAccountTypes.includes(accountType)) {
            return res.status(400).json({ message: "Invalid account type" });
        }

        const additionalInfoErrors = validateAdditionalInfo(accountType, additionalInfo);
        if (additionalInfoErrors.length > 0) {
            return res.status(400).json({ message: additionalInfoErrors.join(", ") });
        }

        if (isNaN(age) || age <= 0) {
            return res.status(400).json({ message: "Invalid age" });
        }

        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const verificationCode = generateVerificationCode();
        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
            accountType,
            specialties: additionalInfo?.professionalTitle,
            phone,
            gender,
            age,
            emailVerificationCode: verificationCode,
            emailVerificationCodeExpiration: new Date(Date.now() + 3600000) // 1 hour
        });

        await newUser.save();
        await sendVerificationEmail(newUser.email, verificationCode);

        const token = generateToken(newUser._id);
        const redirectUrl = accountType === 'professional' ? '/doctor' : '/';

        res.status(201).json({
            message: "Account created successfully. Please verify your email.",
            token,
            userId: newUser._id,
            redirectUrl
        });
    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Verify email controller
export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await User.findOne({ email, emailVerificationCode: code });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        if (new Date() > user.emailVerificationCodeExpiration) {
            return res.status(400).json({ message: "Verification code has expired" });
        }

        user.isVerified = true;
        user.emailVerificationCode = undefined;
        user.emailVerificationCodeExpiration = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in verifyEmail controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Resend verification code controller
export const resendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const newCode = generateVerificationCode();
        user.emailVerificationCode = newCode;
        user.emailVerificationCodeExpiration = new Date(Date.now() + 3600000); // 1 hour
        await user.save();

        await sendVerificationEmail(user.email, newCode);

        res.status(200).json({ message: "Verification code resent successfully" });
    } catch (error) {
        console.error("Error in resendVerificationCode controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            token,
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            accountType: user.accountType,
            followers: user.followers,
            following: user.following,
            profileimg: user.profileimg,
            coverimg: user.coverimg,
            specialties: user.specialties,
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout controller
export const logout = async (req, res) => {
    try {
        // Optionally handle token blacklisting here
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GetMe controller
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        let doctorInfo = null;

        if (user.accountType === 'professional' && user.specialties.includes('Doctor')) {
            doctorInfo = await Doctor.findOne({ userId: user._id }).select('-__v');
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            accountType: user.accountType,
            followers: user.followers,
            following: user.following,
            profileimg: user.profileimg,
            coverimg: user.coverimg,
            specialties: user.specialties,
            bio: user.bio,
            link: user.link,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            phone: user.phone,
            gender: user.gender,
            age: user.age,
            doctorInfo,
        });
    } catch (error) {
        console.error("Error in getMe controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ForgotPassword controller
export const forgotPassword = async (req, res) => {
    res.json({ data: 'you hit the forgot-password endpoint' });
};

// ResetPassword controller
export const resetPassword = async (req, res) => {
    res.json({ data: 'you hit the reset-password endpoint' });
};

// Google Authentication controller
export const googleAuth = (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(authUrl);
};

// Google OAuth2 callback controller
export const googleCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Get user info and save it to the database or use as needed
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        const calendarList = await calendar.calendarList.list();
        console.log(calendarList.data.items);

        // Redirect or respond with success
        res.redirect('/your-redirect-url');
    } catch (error) {
        console.error("Google OAuth2 callback error:", error.message);
        res.status(500).json({ message: "Google OAuth2 error" });
    }
};
