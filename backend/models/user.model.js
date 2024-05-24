import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullName:{
            type: String,
            required: true,            
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        profileimg: {
            type: String,
            default: "",
        },
        coverimg: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
       specialties: {
        type: String,
        default: null,
       },
       location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
        accountType: {
            type: String,
            required: true,
            enum: ['client', 'student', 'professional', 'institution'],
        },
        
        link: {
            type: String,
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
