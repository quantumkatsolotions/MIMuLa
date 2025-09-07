import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minLength: 3,
        maxLegth: 50,
        lowercase: true
    },
    email:{
        type: String,
        required: [true, 'Email address is required'],
        trim: true,
        minLength: 6,
        maxLegth: 50, 
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    }, 
    password:{
        type: String,
        minLength: 8,
        maxLegth: 16,
        unique: true,
        
    }
}, {timestamps: true}) 

const User = mongoose.model('User', userSchema);

export default User;