import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Doctor from '../models/doctor.model.js';
import { sendVerificationEmail } from '../utils/email.util.js';
import bcrypt from 'bcryptjs';
import Client from '../models/client.model.js'; // Import the Client model
export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password, accountType, additionalInfo, phone, gender, age } = req.body;

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationCode = generateVerificationCode();

        // Create common user data
        const commonUserData = {
            username,
            fullName,
            email,
            password: hashedPassword,
            accountType,
            phone,
            gender,
            age,
            emailVerificationCode: verificationCode,
            emailVerificationCodeExpiration: new Date(Date.now() + 3600000) // Set expiration time to 1 hour from now
        };

        let newUser;
        if (accountType === 'professional') {
            newUser = new Doctor({
                userId: new mongoose.Types.ObjectId(), // Generate a new ObjectId for userId
                name: fullName,
                email,
                phone,
                gender,
                age,
                password: hashedPassword,
                accountType,
                specialties: additionalInfo?.professionalTitle || [], // Ensure specialties is an array
                emailVerificationCode: verificationCode,
                emailVerificationCodeExpiration: new Date(Date.now() + 3600000), // Set expiration time to 1 hour from now
                availability: false, // Default to false (unavailable)
                schedule: {
                    Monday: [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                    Saturday: [],
                    Sunday: []
                }
            });

            // Save doctor-specific data
            await newUser.save();
        }

        // Save common user data
        const userRecord = new User({
            ...commonUserData,
            specialties: accountType === 'professional' ? additionalInfo?.professionalTitle || [] : null // Ensure specialties is set correctly
        });
        await userRecord.save();

        // Create and save client-specific data if account type is client
        if (accountType === 'client') {
            const clientRecord = new Client({
                userId: userRecord._id,
                name: fullName,
                email,
                phone,
                gender,
                age
            });
            await clientRecord.save();
        }

        await sendVerificationEmail(userRecord.email, verificationCode);

        const token = generateToken(userRecord._id);
        const redirectUrl = accountType === 'professional' ? '/doctor' : accountType === 'client' ? '/client' : '/';

        res.status(201).json({
            message: "Account created successfully. Please verify your email.",
            token,
            userId: userRecord._id,
            redirectUrl
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
// Utility function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'  // token expires in 15 days
    });
};
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
    
    // Fetch doctor information if the account type is professional
    let doctorInfo = null;
    if (user.accountType === 'professional') {
      doctorInfo = await Doctor.findOne({ userId: user._id }).select('-__v'); // Exclude version key
    }

    generateTokenAndSetCookie(user._id, res);
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
      specialties: user.specialties, // Include specialties in the response
      doctorInfo, // Include doctor information if available
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};



// Utility function to generate a 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};



export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        console.log('Verifying email:', email, 'with code:', code);

        const user = await User.findOne({ email, emailVerificationCode: code });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        // Check if the verification code is expired
        const codeExpirationTime = user.emailVerificationCodeExpiration;
        if (codeExpirationTime && new Date() > codeExpirationTime) {
            return res.status(400).json({ message: "Verification code has expired" });
        }

        user.isVerified = true;
        user.emailVerificationCode = undefined; // Clear the code once verified
        user.emailVerificationCodeExpiration = undefined; // Clear the expiration time
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in verifyEmail controller:", error.message);
        res.status(500).json({ message: error.message });
    }
};
export const resendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        console.log('Resending verification code to email:', email);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Generate a new verification code
        const newCode = generateVerificationCode();
        user.emailVerificationCode = newCode;
        user.emailVerificationCodeExpiration = new Date(Date.now() + 3600000); // Set expiration time to 1 hour from now
        await user.save();

        // Send the new verification code via email
        await sendVerificationEmail(user.email, newCode);

        res.status(200).json({ message: "Verification code resent successfully" });
    } catch (error) {
        console.error("Error in resendVerificationCode controller:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Function to validate additional information based on account type
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




// Logout controller
export const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: error.message });
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
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

// ForgotPassword controller
export const forgotPassword = async (req, res) => {
    res.json({ data: 'you hit the forgot-password end point' });
};

// ResetPassword controller
export const resetPassword = async (req, res) => {
    res.json({ data: 'you hit the reset-password end point' });
};
