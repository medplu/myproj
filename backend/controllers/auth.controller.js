import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Doctor from '../models/doctor.model.js';
import { sendVerificationEmail } from '../utils/email.util.js';
import bcrypt from 'bcryptjs';

// Utility function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'  // token expires in 15 days
    });
};
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decoded.userId, emailVerificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in verifyEmail controller:", error.message);
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

        const verificationToken = generateVerificationToken(newUser._id);

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
            emailVerificationToken: verificationToken,
        });

        await newUser.save();

        await sendVerificationEmail(newUser.email, verificationToken);

        const token = generateToken(newUser._id);
        const redirectUrl = accountType === 'professional' ? '/doctor' : '/';

        res.status(201).json({
            message: "Account created successfully. Please verify your email.",
            token,
            userId: newUser._id,
            redirectUrl
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};
// Logout controller
export const logout = async (req, res) => {
    try {
        // Clear the JWT by setting an expired token (optional in token-based auth, mainly for UI handling)
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

        // Initialize doctorInfo as null
        let doctorInfo = null;

        // Check if user is a professional and a doctor
        if (user.accountType === 'professional' && user.specialties.includes('Doctor')) {
            // Fetch doctor information
            doctorInfo = await Doctor.findOne({ userId: user._id }).select('-__v');
        }

        // Return user data along with doctor info if applicable
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
            phone: user.phone, // New attribute
            gender: user.gender, // New attribute
            age: user.age, // New attribute
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
}

// ResetPassword controller
export const resetPassword = async (req, res) => {
    res.json({ data: 'you hit the reset-password end point' });
}
