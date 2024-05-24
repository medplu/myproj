import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import Doctor from '../models/doctor.model.js'; // Make sure you import the Doctor model
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password, accountType, additionalInfo, location } = req.body;

    // Ensure location has both latitude and longitude
    if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
      return res.status(400).json({ message: "Invalid location data" });
    }

    const { latitude, longitude } = location;
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

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user based on account type
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      accountType,
      specialties: additionalInfo?.professionalTitle,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

    // Save the user
    await newUser.save();

    // If the account type is professional, create a new professional account in the doctors model
    if (accountType === 'professional') {
      const newDoctor = new Doctor({
        userId: newUser._id,
        name: fullName,
        email,
        specialties: additionalInfo?.professionalTitle || "", // Assuming 'specialties' is collected during signup as additional information
        experience: additionalInfo?.experience || "", // Assuming 'experience' is collected during signup as additional information
        image: null, // Or provide a default image URL if available
        bio: null, // Or provide some default bio text if available
        schedule: {}, // Or provide initial scheduling information if available
      });
      await newDoctor.save();
    }

    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

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

// Other controller functions like login, logout, etc

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




export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({ message: "Logged out successfully" });
    } catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ message: error.message });
    }
}
export const forgotPassword = async (req, res) => {
    res.json({ data: 'you hit the forgot-password end point' });
}

export const resetPassword = async (req, res) => {
    res.json({ data: 'you hit the reset-password end point' });
}
