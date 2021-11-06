const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    birthDate: {
        type: Date,
    },
    sex: {
        type: String,
        default: "male",
    },
    address: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "https://tanangroup.com/omg/img/profile.jpg",
    },
    role: {
        type: String,
        default: "Customer",
    },
    shipperArea: {
        type: Array,
    },
    currentBillQuantity: {
        type: Number,
        default: 0,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    phoneNumber: {
        type: String,
        default: "",
    },

});

userSchema.plugin(mongoosePaginate);

userSchema.pre("save", async function(next) {
    // Hash the password before saving the user model
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    // Search for a user by email and password.
    const user = await this.findOne({ email });
    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            return user;
        }
        throw { error: "Wrong password" };
    }
    throw { error: "Dont exists" };
};
const User = mongoose.model("user", userSchema);
module.exports = User;