var path = require('path')
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' })
  res.sendFile(path.join(__dirname + '/../views/index.html'))
})

module.exports = router
