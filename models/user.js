const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["super-admin","admin","user"],
        default: "user",
    },
    phone: {
        type: String,
    },
    profilePhoto: {
        type: String
    },
},{
    timestamp: true
});

// get user fullname
userSchema.virtual("fullName").get(()=>{
    return `${this.firstName} ${this.lastName}`;
});

// add new methods to user model ## User.authenticate()
userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.password);
    },
};

module.exports = mongoose.model("User",userSchema);