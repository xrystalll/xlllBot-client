const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '..', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

server.listen(port, () => console.log('Electron: Server running on port ' + port))
