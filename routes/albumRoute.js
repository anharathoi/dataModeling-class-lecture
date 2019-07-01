const express = require('express')
const router = express.Router()

// require model
const Artist = require('../models/Artist')

// get all albums
router.get('/albums', async(req, res) => {
  let artists = await Artist.find()
  let albums = []
  try{
    artists.map( artist => {
      albums.push(artist.albums)
    })
    return res.send(albums)
  }catch(err){
    res.send(err)
  }
})

// get one album
router.get('/albums/:title', async(req, res) => {
  const { title } = req.params
  try{
    let artist = await Artist.findOne({'albums.title': title})
    const album = artist.albums.filter(album => album.title === title)
    return res.send(album)
  }catch(err){
    return res.send(`There has been an error: ${err}`)
  }
})

// create one album
router.post('/newAlbum', async(req, res) => {
  let { artistName, title, yearReleased } = req.body
  if(!artistName) {
    artistName = 'Unknown Artist'
  }
  try{
    let artist = await Artist.findOne({ name: artistName })
    
    if(!artist){
      artist = await Artist.create({name: artistName})
    }

    artist.albums.push({title, yearReleased})
    await artist.save()
    return res.status(200).send(artist)

  }catch(err){
    return res.send(err)
  }

})

module.exports = router
