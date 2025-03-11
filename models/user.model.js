import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email address'
          ],
    },
    password: {
        type: String,
        require: true,
        minLength: 6,

    }
}, 

{
    Timestamp: true
});

const User = mongoose.model('User', userSchema);

export default User;