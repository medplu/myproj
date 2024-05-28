import mongoose from 'mongoose';
const appointMentSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
        
    }, 
    gender:{
        type: String,
    },
    age:{
        type: String
    },
    
    Date:{
        type: String,
    
    },
    doctor_id:{
        type: String,
        
    },
    user_id:{
        type: String,
        
    }
}, {timestamps: true})

const Appointment = mongoose.model('Appointment', appointMentSchema);
export default Appointment;
