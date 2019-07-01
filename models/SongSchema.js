const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  songDuration: Number
}) 

module.exports = songSchema
