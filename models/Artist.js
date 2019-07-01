const mongoose = require('mongoose')
const albumSchema = require('./AlbumSchema')


const artistSchema = new mongoose.Schema({
  name: String,
  albums: [ albumSchema ]
})

module.exports = mongoose.model('Artist', artistSchema )
