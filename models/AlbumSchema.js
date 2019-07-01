const mongoose = require('mongoose')
const songSchema = require('./SongSchema')

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  yearReleased: Number,
  songs: [ songSchema ]
})

module.exports = albumSchema
