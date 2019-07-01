const express = require('express')
const router = express.Router()

// require model
const Artist = require('../models/Artist')

router.get('/artists', async(req, res) => {
  const artists = await Artist.find()
  res.send(artists)
})

router.post('/newArtist', async(req, res) => {
  const { name } = req.body
  const artist = await Artist.create({ name })
  res.send(artist)
})

module.exports = router