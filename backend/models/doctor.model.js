import mongoose from 'mongoose';

const doctorsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: null,
    },
    experience: {
        type: String,
        default: null,
    },
    specialties: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: null,
    },
    consultationFee: {
        type: Number,
        required: true,
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
}, { timestamps: true });

export default mongoose.model('Doctor', doctorsSchema);
