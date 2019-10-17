
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  'username': {type: String},
  'pwd': {type: String},
  'fullname': {type: String},
  'birthday': {type: String, default: "1990-01-01"},
  'age': {type: String, default: "29"},
  'education': {type: Array, default: [["University", "National Universition of Singapore"], ["Junior College", "Anglo-Chinese Junior College"]]},
  "aboutme": {type: Array, default: [["Sports", "Badminton"], ["Favorite fruit","Mongo"]]}
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel