const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  DateIn: {
    type: Date,
    default: Date.now,
  },
  Price: {
    type: Number,
  },
  Discount: {
    type: Number,
    default: 0,
  },
  Sex: {
    type: String,
    default: "male",
  },
  Comments: {
    type: Array,
  },
  Image: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/fir-react-upload-992b7.appspot.com/o/images%2Fao-thun-in-hoa-tet-logo-tn-21802-1-600x840.jpg?alt=media&token=7984fe9b-f511-4706-b882-b49e92554469",
  },
  enteringQuantity: {
    type: Number,
    required: true,
  },
  soldQuantity: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
  },
  materials: {
    type: String,
  },
  age: {
    type: String,
    default: "adult",
  },
  colors: {
    type: String,
  },
  type: {
    type: String,
  },
  tag: {
    type: String,
  },
});

module.exports = mongoose.model("Course", courseSchema);
