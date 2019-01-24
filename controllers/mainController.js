var express = require('express');
var app = express();

//Code to enable body-parser to be used 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//Code to use async
var async = require('async');

//Code to use moment for formatting dates
var moment = require('moment');

//Declaring the PostgreSQL database
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://rqlkiotufjxeqb:0e25f74221e45862308077974662f71db82d533f96fb1c0a51c1962c3c9a6024@ec2-54-83-19-244.compute-1.amazonaws.com:5432/d3f76p8j58u7fc',
  ssl: true
});

//My own custom module to decode the availability letters.
var ad = require('../my_modules/availabilityDecoder');
//My own custom module to create the queries for the pokemon database
var pokemonQueryBuilder = require('../my_modules/pokemonQueryBuilder');
//My own custom module that contains a list of constants that can all be changed from one convenient location
var constants = require('../my_modules/constants')


//START OF GET REQUEST FUNCTIONS


//Display About Page on GET
exports.about_get = function (req, res){
    res.render('about');
};

//Display New Players Page on GET
exports.new_get = function (req, res, next){
    res.render('new_players');
};

//Display My Account Page on GET
exports.my_account_get = function (req, res, next){
    res.render('my_account');
};

//Display Your Path Page on GET
exports.yourPathGet = function (req, res, next){
    res.render('your_path');
};

exports.yourPathPost = async (req, res, next) => {
    //The gameCount lets us know how many boxes on the your_path page the user checks. Useful to know in case they didn't check any boxes.
    var gameCount = 0;
    //We start out assuming that all the boxes are unchecked.
    var checkedUltraSun = false;
    var checkedUltraMoon = false;
    var checkedSun = false;
    var checkedMoon = false;
    var checkedOmegaRuby = false;
    var checkedAlphaSapphire = false;
    var checkedX = false;
    var checkedY = false;
    var checkedBlack2 = false;
    var checkedWhite2 = false;
    var checkedWhite = false;
    var checkedBlack = false;
    var checkedHeartGold = false;
    var checkedSoulSilver = false;
    var checkedDiamond = false;
    var checkedPearl = false;
    var checkedPlatinum = false;
    var checkedFireRed = false;
    var checkedLeafGreen = false;
    var checkedRuby = false;
    var checkedSapphire = false;
    var checkedEmerald = false;
    var checkedGold = false;
    var checkedSilver = false;
    var checkedCrystal3DS = false;
    var checkedCrystalGameboy = false;
    var checkedRed = false;
    var checkedBlue = false;
    var checkedYellow = false;
    var checkedFriendSafari = false;
    var checkedDreamRadar = false;
    var checkedPokewalker = false;
    var checkedDualSlot = false;
    //Determine which boxes the user checked and switch them to 'true'
    //Games
    if (req.body.ultra_sun == 'ultra_sun'){
        checkedUltraSun = true;
        gameCount++;
    }
    if (req.body.ultra_moon == 'ultra_moon'){
        checkedUltraMoon = true;
        gameCount++;
    }
    if (req.body.sun == 'sun'){
        checkedSun = true;
        gameCount++;
    }
    if (req.body.moon == 'moon'){
        checkedMoon = true;
        gameCount++;
    }
    if (req.body.omega_ruby == 'omega_ruby'){
        checkedOmegaRuby = true;
        gameCount++;
    }
    if (req.body.alpha_sapphire == 'alpha_sapphire'){
        checkedAlphaSapphire = true;
        gameCount++;
    }
    if (req.body.x == 'x'){
        checkedX = true;
        gameCount++;
    }
    if (req.body.y){
        checkedY = true;
        gameCount++;
    }
    if (req.body.black_2 == 'black_2'){
        checkedBlack2 = true;
        gameCount++;
    }
    if (req.body.white_2 == 'white_2'){
        checkedWhite2 = true;
        gameCount++;
    }
    if (req.body.black == 'black'){
        checkedBlack = true;
        gameCount++;
    }
    if (req.body.white == 'white'){
        checkedWhite = true;
        gameCount++;
    }
    if (req.body.heartgold == 'heartgold'){
        checkedHeartGold = true;
        gameCount++;
    }
    if (req.body.soulsilver == 'soulsilver'){
        checkedSoulSilver = true;
        gameCount++;
    }
    if (req.body.pearl == 'pearl'){
        checkedPearl = true;
        gameCount++;
    }
    if (req.body.platinum == 'platinum'){
        checkedPlatinum = true;
        gameCount++;
    }
    if (req.body.diamond == 'diamond'){
        checkedDiamond = true;
        gameCount++;
    }
    if (req.body.firered == 'firered'){
        checkedFireRed = true;
        gameCount++;
    }
    if (req.body.leafgreen == 'leafgreen'){
        checkedLeafGreen = true;
        gameCount++;
    }
    if (req.body.ruby == 'ruby'){
        checkedRuby = true;
        gameCount++;
    }
    if (req.body.sapphire == 'sapphire'){
        checkedSapphire = true;
        gameCount++;
    }
    if (req.body.emerald == 'emerald'){
        checkedEmerald = true;
        gameCount++;
    }
    if (req.body.gold == 'gold'){
        checkedGold = true;
        gameCount++;
    }
    if (req.body.silver == 'silver'){
        checkedSilver = true;
        gameCount++;
    }
    if (req.body.crystal_3DS == 'crystal_3DS'){
        checkedCrystal3DS = true;
        gameCount++;
    }
    if (req.body.crystal == 'crystal'){
        checkedCrystalGameboy = true;
        gameCount++;
    }
    if (req.body.red == 'red'){
        checkedRed = true;
        gameCount++;
    }
    if (req.body.blue == 'blue'){
        checkedBlue = true;
        gameCount++;
    }
    if (req.body.yellow == 'yellow'){
        checkedYellow = true;
        gameCount++;
    }
    //Find out which additional options boxes are checked
    if (req.body.friend_safari == 'friend_safari'){
        checkedFriendSafari = true;
    }
    if (req.body.dream_radar == 'dream_radar'){
        checkedDreamRadar = true;
    }
    if (req.body.pokewalker == 'pokewalker'){
        checkedPokewalker = true;
    }
    if (req.body.dual_slot == 'dual_slot'){
        checkedDualSlot = true;
    }
    //Create the query that will determine how many pokemon the user will be missing based on the games they have. (Uses the custom pokemonQueryBuilder Module)
    var countMissingPokemonQuery = pokemonQueryBuilder.missingPokemonCountQuery(checkedUltraSun, checkedUltraMoon, checkedSun, checkedMoon, checkedOmegaRuby, checkedAlphaSapphire, checkedX, checkedY, checkedBlack2, checkedWhite2, checkedBlack, checkedWhite, checkedHeartGold, checkedSoulSilver, checkedDiamond, checkedPearl, checkedPlatinum, checkedFireRed, checkedLeafGreen, checkedRuby, checkedSapphire, checkedEmerald, checkedGold, checkedSilver, checkedCrystal3DS, checkedCrystalGameboy, checkedRed, checkedBlue, checkedYellow, checkedFriendSafari, checkedDreamRadar, checkedPokewalker, checkedDualSlot, gameCount);
    //Running the missingPokemonCountQuery
    try {
        const client = await pool.connect();
        //Testing use of constants
        console.log(countMissingPokemonQuery)
        const result = await client.query(countMissingPokemonQuery);
        var jsonResult = result.rows;
        var missingPokemonCount = jsonResult[0].pokemon_count;
        console.log(missingPokemonCount);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    //Create the query that will list the names and Ids of the missing pokemon.
    var missingPokemonQuery = pokemonQueryBuilder.missingPokemonQuery(checkedUltraSun, checkedUltraMoon, checkedSun, checkedMoon, checkedOmegaRuby, checkedAlphaSapphire, checkedX, checkedY, checkedBlack2, checkedWhite2, checkedBlack, checkedWhite, checkedHeartGold, checkedSoulSilver, checkedDiamond, checkedPearl, checkedPlatinum, checkedFireRed, checkedLeafGreen, checkedRuby, checkedSapphire, checkedEmerald, checkedGold, checkedSilver, checkedCrystal3DS, checkedCrystalGameboy, checkedRed, checkedBlue, checkedYellow, checkedFriendSafari, checkedDreamRadar, checkedPokewalker, checkedDualSlot, gameCount);
    //Running the findMissingPokemonListQuery
    try {
        const client = await pool.connect();
        console.log(missingPokemonQuery);
        const result = await client.query(missingPokemonQuery);
        var jsonResult = result.rows;
        //creating the names array
        var Names = [];
        for (var i=0; i<jsonResult.length; i++){
            Names.push(jsonResult[i].name);
        }
        //creating the ids array
        var Ids = [];
        for (var i=0; i<jsonResult.length; i++){
            Ids.push(jsonResult[i].id);
        }
        //Creating the Pokemon Object so it can be iterated through on my Pug View
        var missingPokemon = {};
        Ids.forEach((Id, i) => missingPokemon[Id] = Names[i]);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    //Create the Query that will make game recommendations
    var recommendationsQuery = pokemonQueryBuilder.recommendationsQuery(checkedUltraSun, checkedUltraMoon, checkedSun, checkedMoon, checkedOmegaRuby, checkedAlphaSapphire, checkedX, checkedY, checkedBlack2, checkedWhite2, checkedBlack, checkedWhite, checkedHeartGold, checkedSoulSilver, checkedDiamond, checkedPearl, checkedPlatinum, checkedFireRed, checkedLeafGreen, checkedRuby, checkedSapphire, checkedEmerald, checkedGold, checkedSilver, checkedCrystal3DS, checkedCrystalGameboy, checkedRed, checkedBlue, checkedYellow, checkedFriendSafari, checkedDreamRadar, checkedPokewalker, checkedDualSlot, gameCount);
    try {
        const client = await pool.connect();
        const result = await client.query(recommendationsQuery);
        console.log(result);
        var jsonResult = result.rows;
        if (checkedUltraSun) {var ultraSunRec = 'no'}
        else {var ultraSunRec = jsonResult[0].usunr}
        if (checkedUltraMoon) {var ultraMoonRec = 'no'}
        else {var ultraMoonRec = jsonResult[0].umoonr}
        if (checkedOmegaRuby) {var omegaRubyRec = 'no'}
        else {var omegaRubyRec = jsonResult[0].omegarr}
        if (checkedAlphaSapphire) {var alphaSapphireRec = 'no'}
        else {var alphaSapphireRec = jsonResult[0].alphasr}
        if (checkedX) {xRec = 'no'}
        else {var xRec = jsonResult[0].xr}
        if (checkedY) {yRec = 'no'}
        else {var yRec = jsonResult[0].yr}
        if (checkedCrystal3DS) {crystal3DSRec = 'no'}
        else {var crystal3DSRec = jsonResult[0].crystal3dsr}
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    //The event only pokemon Query
    var eventOnlyPokemonQuery = pokemonQueryBuilder.eventPokemonQuery();
    try {
        const client = await pool.connect();
        const result = await client.query(eventOnlyPokemonQuery);
        var jsonResult = result.rows;
        var eventIds = [];
        for (var i=0; i<jsonResult.length; i++){
            eventIds.push(jsonResult[i].id);
        }
        var eventNames = [];
        for (var i=0; i<jsonResult.length; i++){
            eventNames.push(jsonResult[i].name);
        }
        var eventPokemon = {};
        eventIds.forEach((Id, i) => eventPokemon[Id] = eventNames[i]);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
    //RENDERING THE ACTUAL PAGE
    //loading some of the constants that will be used on the page
    var totalPokemon = constants.totalPokemon();
    var eventOnlyPokemonTotal = constants.eventOnlyPokemonCount();
    res.render('your_path_results', { event_pokemon: eventPokemon, missing_pokemon_count: missingPokemonCount, missing_pokemon: missingPokemon, ultra_sun_rec: ultraSunRec, ultra_moon_rec: ultraMoonRec, omega_ruby_rec: omegaRubyRec, alpha_sapphire_rec: alphaSapphireRec, x_rec: xRec, y_rec: yRec, crystal_3ds_rec: crystal3DSRec, event_only_pokemon_total: eventOnlyPokemonTotal, total_pokemon: totalPokemon});
}





//Display information about a single pokemon by id
exports.pokemon_id_search = async (req, res, next) => {
    console.log("Return pokemon with Id: " + req.params.id);
    var pokemonID = req.params.id;
    var pokemonAvailabilityQuery = pokemonQueryBuilder.singlePokemonAvailabilityQuery(pokemonID);
    try {
        const client = await pool.connect();
        const result = await client.query(pokemonAvailabilityQuery);
        var jsonResult = result.rows;
        var pokedexNumber = jsonResult[0].id;
        var pokemonName = jsonResult[0].name;
        //Using the custom availabilityDecoder Module and its functions
        var UltraSun = ad.availabilityDecoder(jsonResult[0].usun);
        var UltraSunMethod = ad.availabilityMethod(jsonResult[0].usun);
        var UltraMoon = ad.availabilityDecoder(jsonResult[0].umoon);
        var UltraMoonMethod = ad.availabilityMethod(jsonResult[0].umoon);
        var Sun = ad.availabilityDecoder(jsonResult[0].sun);
        var SunMethod = ad.availabilityMethod(jsonResult[0].sun);
        var Moon = ad.availabilityDecoder(jsonResult[0].moon);
        var MoonMethod = ad.availabilityMethod(jsonResult[0].moon);
        var AlphaSapphire = ad.availabilityDecoder(jsonResult[0].alphas);
        var AlphaSapphireMethod = ad.availabilityMethod(jsonResult[0].alphas);
        var OmegaRuby = ad.availabilityDecoder(jsonResult[0].omegar);
        var OmegaRubyMethod = ad.availabilityMethod(jsonResult[0].omegar);
        var FriendSafari = ad.availabilityDecoder(jsonResult[0].fsafari);
        var FriendSafariMethod = ad.availabilityMethod(jsonResult[0].fsafari);
        var X = ad.availabilityDecoder(jsonResult[0].x);
        var XMethod = ad.availabilityMethod(jsonResult[0].x);
        var Y = ad.availabilityDecoder(jsonResult[0].y);
        var YMethod = ad.availabilityMethod(jsonResult[0].y);
        var Black2 = ad.availabilityDecoder(jsonResult[0].black2);
        var Black2Method = ad.availabilityMethod(jsonResult[0].black2);
        var White2 = ad.availabilityDecoder(jsonResult[0].white2);
        var White2Method = ad.availabilityMethod(jsonResult[0].white2);
        var Black = ad.availabilityDecoder(jsonResult[0].black);
        var BlackMethod = ad.availabilityMethod(jsonResult[0].black);
        var White = ad.availabilityDecoder(jsonResult[0].white);
        var WhiteMethod = ad.availabilityMethod(jsonResult[0].white);
        var HeartGold = ad.availabilityDecoder(jsonResult[0].heartgold);
        var HeartGoldMethod = ad.availabilityMethod(jsonResult[0].heartgold);
        var SoulSilver = ad.availabilityDecoder(jsonResult[0].soulsilver);
        var SoulSilverMethod = ad.availabilityMethod(jsonResult[0].soulsilver);
        var Pokewalker = ad.availabilityDecoder(jsonResult[0].pokewalker);
        var PokewalkerMethod = ad.availabilityMethod(jsonResult[0].pokewalker);
        var Diamond = ad.availabilityDecoder(jsonResult[0].diamond);
        var DiamondMethod = ad.availabilityMethod(jsonResult[0].diamond);
        var Pearl = ad.availabilityDecoder(jsonResult[0].pearl);
        var PearlMethod = ad.availabilityMethod(jsonResult[0].pearl);
        var Platinum = ad.availabilityDecoder(jsonResult[0].platinum);
        var PlatinumMethod = ad.availabilityMethod(jsonResult[0].platinum);
        var FireRed = ad.availabilityDecoder(jsonResult[0].firered);
        var FireRedMethod = ad.availabilityMethod(jsonResult[0].firered);
        var LeafGreen = ad.availabilityDecoder(jsonResult[0].leafgreen);
        var LeafGreenMethod = ad.availabilityMethod(jsonResult[0].leafgreen);
        var Ruby = ad.availabilityDecoder(jsonResult[0].ruby);
        var RubyMethod = ad.availabilityMethod(jsonResult[0].ruby);
        var Sapphire = ad.availabilityDecoder(jsonResult[0].sapphire);
        var SapphireMethod = ad.availabilityMethod(jsonResult[0].sapphire);
        var Emerald = ad.availabilityDecoder(jsonResult[0].emerald);
        var EmeraldMethod = ad.availabilityMethod(jsonResult[0].emerald);
        var Gold = ad.availabilityDecoder(jsonResult[0].gold);
        var GoldMethod = ad.availabilityMethod(jsonResult[0].gold);
        var Silver = ad.availabilityDecoder(jsonResult[0].silver);
        var SilverMethod = ad.availabilityMethod(jsonResult[0].silver);
        var Crystal3DS = ad.availabilityDecoder(jsonResult[0].crystal3ds);
        var Crystal3DSMethod = ad.availabilityMethod(jsonResult[0].crystal3ds);
        var Crystal = ad.availabilityDecoder(jsonResult[0].crystal);
        var CrystalMethod = ad.availabilityMethod(jsonResult[0].crystal);
        var Red = ad.availabilityDecoder(jsonResult[0].red);
        var RedMethod = ad.availabilityMethod(jsonResult[0].red);
        var Blue = ad.availabilityDecoder(jsonResult[0].engblue);
        var BlueMethod = ad.availabilityMethod(jsonResult[0].engblue);
        var Yellow = ad.availabilityDecoder(jsonResult[0].yellow);
        var YellowMethod = ad.availabilityMethod(jsonResult[0].yellow);
        res.render('pokemon_id_search', {pokemon_id: pokedexNumber, pokemon_name: pokemonName, 
            ultra_sun: UltraSun, ultra_sun_method: UltraSunMethod, ultra_moon: UltraMoon, ultra_moon_method: UltraMoonMethod, sun: Sun, sun_method: SunMethod, 
            moon: Moon, moon_method: MoonMethod, alpha_sapphire: AlphaSapphire, alpha_sapphire_method: AlphaSapphireMethod, 
            omega_ruby: OmegaRuby, omega_ruby_method: OmegaRubyMethod, friend_safari: FriendSafari, friend_safari_method: FriendSafariMethod, 
            x: X, x_method: XMethod, y: Y, y_method: YMethod, black_2: Black2, black_2_method: Black2Method, 
            white_2: White2, white_2_method: White2Method, black: Black, black_method: BlackMethod, white: White, white_method: WhiteMethod, 
            heartgold: HeartGold, heartgold_method: HeartGoldMethod, soulsilver: SoulSilver, soulsilver_method: SoulSilverMethod, 
            pokewalker: Pokewalker, pokewalker_method: PokewalkerMethod, diamond: Diamond, diamond_method: DiamondMethod, pearl: Pearl, pearl_method: PearlMethod, 
            platinum: Platinum, platinum_method: PlatinumMethod, firered: FireRed, firered_method: FireRedMethod, leafgreen: LeafGreen, leafgreen_method: LeafGreenMethod, 
            ruby: Ruby, ruby_method: RubyMethod, sapphire: Sapphire, sapphire_method: SapphireMethod, emerald: Emerald, emerald_method: EmeraldMethod, 
            crystal3ds: Crystal3DS, crystal3ds_method: Crystal3DSMethod, crystal: Crystal, crystal_method: CrystalMethod, 
            gold: Gold, gold_method: GoldMethod, silver: Silver, silver_method: SilverMethod, red: Red, red_method: RedMethod, 
            blue: Blue, blue_method: BlueMethod, yellow: Yellow, yellow_method: YellowMethod});
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
};




