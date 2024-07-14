import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a pasword"],
        min: [8, "password must contain 8 charachters"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpires: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyExpires: {
        type: Date,
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User