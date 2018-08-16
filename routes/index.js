var express = require('express');
var router = express.Router();
//Require Controller Modules
var main_controller = require('../controllers/mainController');




//MAIN PAGES

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Which games do I need to catch all the Pokémon?' });
});

//GET request for Your Path page
router.get('/yourpath', main_controller.yourPathGet);

//POST request for Your Path Page
router.post('/yourpath', main_controller.yourPathPost2);

//GET request for About page
router.get('/about', main_controller.about_get);

//GET request for new players page.
router.get('/newplayers', main_controller.new_get);


//SEARCH PAGES

//GET request for 1 pokemon by id
router.get('/search/:id', main_controller.pokemon_id_search);

//EXPERIMENTAL PAGE
router.get('/db', main_controller.db_get);


module.exports = router;
