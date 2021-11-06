const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
    userId: {
        type: String,
        default:'NoLogin',
        required: true
       
    },
    userName: {
        type: String,
        required: true,
    },
    BillDate: {
        type: Date,
        default: Date.now,
    },
    TotalPrice: {
        type: Number,
    },
    Products: {
        type: Array,
    },
    Status: {
        type: String,
        default: "Đã đặt hàng",
    },
    Phone:{
        type:String
    },
    Address: {
        type: String,
        required: true,
    },
    Province: {
        type: String,
        required: true,
    },
    doneDate: {
        type: Date,
    },
    idShipper: {
        type: String,
    },
    Area: {
        type: String,
    },
    shipperName: {
        type: String,
    },
    userEmail: {
        type: String,
        default: "Nope",
    }
});

module.exports = mongoose.model("Bill", courseSchema);