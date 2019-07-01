const express = require('express')
const mongoose = require('mongoose')
const app = new express()
const PORT = 5000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// require model
const Artist = require('./models/Artist')

// require routes
const artistRoute = require('./routes/artistRoute')
const albumRoute = require('./routes/albumRoute')

const mongoURI = 'mongodb://localhost/nestedDemo'

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
  if(err) return console.log(err)

  console.log('Successfully connected to MongoDB')
})

// routes configuration
app.use( '/', artistRoute)
app.use( '/', albumRoute)


app.get('/seedArtist', async(req, res) => {
  try {
    const artist = await Artist.create({
      name: "The test",
      albums: [
        {
          title: "tested",
          yearReleased: 2019,
          songs: [
            {
              title: 'Anything',
              songDuration: 172,
            }
          ]
        }
      ]
    })
    return res.send(artist)
  } catch(err){
    return res.send(err)
  }
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
