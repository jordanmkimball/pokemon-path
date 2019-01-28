var express = require('express');
var router = express.Router();
//Require Controller Modules
var main_controller = require('../controllers/mainController');




//MAIN PAGES

/* GET request for home page. */
router.get('/',  main_controller.home_page_get);

//GET request for Your Path page
router.get('/yourpath', main_controller.your_path_get);

//POST request for Your Path Page
router.post('/yourpath', main_controller.your_path_post);

//GET request for About page
router.get('/about', main_controller.about_get);

//GET request for new players page
router.get('/newplayers', main_controller.new_get);

//GET request for My Account page
router.get('/myaccount', main_controller.my_account_get);


//SEARCH PAGES

//GET request for 1 pokemon by id
router.get('/search/:id', main_controller.pokemon_id_search);



module.exports = router;
