var express = require('express');
var app = express();

//Code to enable body-parser to be used 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


//Code to use async
var async = require('async');

//Declaring the PostgreSQL database
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://rqlkiotufjxeqb:0e25f74221e45862308077974662f71db82d533f96fb1c0a51c1962c3c9a6024@ec2-54-83-19-244.compute-1.amazonaws.com:5432/d3f76p8j58u7fc',
  ssl: true
});


//My own custom module to decode the availability letters.
var ad = require('../my_modules/availabilityDecoder');


//START OF GET REQUEST FUNCTIONS



//Display About Page on GET
exports.about_get = function (req, res){
    res.render('about');
};

//Display New Players Page on GET
exports.new_get = function (req, res, next){
    res.render('new_players');
};

//Display Your Path Page on GET
exports.yourPathGet = function (req, res, next){
    res.render('your_path', {title: 'Which Pokémon are you missing?'});
};
 

//For Your Path Page: Display game recommendations, number, and list of missing Pokemon on POST
exports.yourPathPost = async (req, res, next) => {
    //Game count necessary in case user didn't select any boxes
    var gameCount = 0;
    //Seeing whether the user checked the Ultra Sun Box
    if (req.body.ultra_sun == 'ultra_sun') {
        var ultraSun = " AND USun NOT IN ('C','E','B','R','S')";
        //ultraSun2 is the variable that will determine if the game shows up in the game recommendations
        var ultraSunBox = 'checked';
        gameCount+= 1;
    }
    else{
        var ultraSun = '';
        //A value of unchecked will mean that the box isn't checked and therefor it is ok for Ultra Sun to show up as game recommendation
        var ultraSunBox = 'unchecked';
    }
    if (req.body.ultra_moon == 'ultra_moon') {
        var ultraMoon = " AND UMoon NOT IN ('C','E','B','R','S')";
        var ultraMoonBox = 'checked';
        gameCount+= 1;
    }
    else{
        var ultraMoon = '';
        var ultraMoonBox = 'unchecked';
    }
    if (req.body.sun == 'sun') {
        var sun = " AND Sun NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var sun = '';
    }
    if (req.body.moon == 'moon') {
        var moon = " AND Moon NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var moon = '';
    }
    if (req.body.omega_ruby == 'omega_ruby') {
        var omegaRuby = " AND OmegaR NOT IN ('C','E','B','R','S')";
        var omegaRubyBox = 'checked';
        gameCount+= 1;
    }
    else{
        var omegaRuby = '';
        var omegaRubyBox = 'unchecked';
    }
    if (req.body.alpha_sapphire == 'alpha_sapphire') {
        var alphaSapphire = " AND AlphaS NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
        var alphaSapphireBox = 'checked';
    }
    else{
        var alphaSapphire = '';
        var alphaSapphireBox = 'unchecked';
    }
    if (req.body.friend_safari == 'friend_safari') {
        var friendSafari = " AND FSafari NOT IN ('C', 'E', 'B')";
        gameCount+= 1;
    }
    else{
        var friendSafari = '';
    }
    if (req.body.x == 'x') {
        var x = " AND X NOT IN ('C','E','B','R','S')";
        var xBox = 'checked';
        gameCount+= 1;
    }
    else{
        var x = '';
        var xBox = 'unchecked';
    }
    if (req.body.y == 'y') {
        var y = " AND Y NOT IN ('C','E','B','R','S')";
        var yBox = 'checked';
        gameCount+= 1;
    }
    else{
        var y = '';
        var yBox = 'unchecked';
    }
    //Check to see if we include Pokemon from the dream_radar in calculation
    if (req.body.dream_radar == 'dream_radar' && req.body.white_2 == 'white_2') {
        if (req.body.black_2 == 'black_2') {
            var black2 = " AND Black2 NOT IN ('C','E','B','R','S','DR','DRE')";
            gameCount+= 1;
        }
        else{
            var black2 = '';
        }
        if (req.body.white_2 == 'white_2') {
            var white2 = " AND White2 NOT IN ('C','E','B','R','S','DR','DRE')";
            gameCount+= 1;
        }
        else{
            var white2 = '';
        }
    }
    //No Dream Radar in Calculation
    else {
        if (req.body.black_2 == 'black_2') {
            var black2 = " AND Black2 NOT IN ('C','E','B','R','S')";
            gameCount+= 1;
        }
        else{
            var black2 = '';
        }
        if (req.body.white_2 == 'white_2') {
            var white2 = " AND White2 NOT IN ('C','E','B','R','S')";
            gameCount+= 1;
        }
        else{
            var white2 = '';
        }
    }
    //End of Dream Radar affected games
    if (req.body.black == 'black') {
        var black = " AND Black NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var black = '';
    }
    if (req.body.white == 'white') {
        var white = " AND White NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var white = '';
    }
    if (req.body.pokewalker == 'pokewalker') {
        var pokewalker = " AND Pokewalker NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var pokewalker = '';
    }
    if (req.body.heartgold == 'heartgold') {
        var heartGold = " AND HeartGold NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var heartGold = '';
    }
    if (req.body.soulsilver == 'soulsilver') {
        var soulSilver = " AND SoulSilver NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var soulSilver = '';
    }
    //Checking if the dual_slot box was checked. If so include Pokemon that can be caught in dual slot mode in Diamond, Pearl, and Platinum
    if (req.body.dual_slot = 'dual_slot') {
        if (req.body.diamond == 'diamond') {
            var diamond = " AND Diamond NOT IN ('C','E','B','R','S','D')";
            gameCount+= 1;
        }
        else{
            var diamond = '';
        }
        if (req.body.pearl == 'pearl') {
            var pearl = " AND Pearl NOT IN ('C','E','B','R','S','D')";
            gameCount+= 1;
        }
        else{
            var pearl = '';
        }
        if (req.body.platinum == 'platinum') {
            var platinum = " AND Platinum NOT IN ('C','E','B','R','S','D')";
            gameCount+= 1;
        }
        else{
            var platinum = '';
        }
    }
    //Dual slot box not checked
    else{
        if (req.body.diamond == 'diamond') {
            var diamond = " AND Diamond NOT IN ('C','E','B','R','S')";
            gameCount+= 1;
        }
        else{
            var diamond = '';
        }
        if (req.body.pearl == 'pearl') {
            var pearl = " AND Pearl NOT IN ('C','E','B','R','S')";
            gameCount+= 1;
        }
        else{
            var pearl = '';
        }
        if (req.body.platinum == 'platinum') {
            var platinum = " AND Platinum NOT IN ('C','E','B','R','S')";
            gameCount+= 1;
        }
        else{
            var platinum = '';
        }
    }
    //end of dual slot affected games
    if (req.body.firered == 'firered') {
        var fireRed = " AND FireRed NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var fireRed = '';
    }
    if (req.body.leafgreen == 'leafgreen') {
        var leafGreen = " AND LeafGreen NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var leafGreen = '';
    }
    if (req.body.ruby == 'ruby') {
        var ruby = " AND Ruby NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var ruby = '';
    }
    if (req.body.sapphire == 'sapphire') {
        var sapphire = " AND Sapphire NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var sapphire = '';
    }
    if (req.body.emerald == 'emerald') {
        var emerald = " AND Emerald NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var emerald = '';
    }
    if (req.body.gold == 'gold') {
        var gold = " AND Gold NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var gold = '';
    }
    if (req.body.silver == 'silver') {
        var silver = " AND Silver NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var silver = '';
    }
    if (req.body.crystal_3DS == 'crystal_3DS') {
        var crystal3DS = " AND Crystal3DS NOT IN ('C','E','B','R','S')";
        var crystal3DSBox = 'checked';
        gameCount+= 1;
    }
    else{
        var crystal3DS = '';
        var crystal3DSBox = 'unchecked';
    }
    if (req.body.crystal == 'crystal') {
        var crystal = " AND Crystal NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var crystal = '';
    }
    if (req.body.red == 'red') {
        var red = " AND Red NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var red = '';
    }
    if (req.body.blue == 'blue') {
        var blue = " AND EngBlue NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var blue = '';
    }
    if (req.body.yellow == 'yellow') {
        var yellow = " AND Yellow NOT IN ('C','E','B','R','S')";
        gameCount+= 1;
    }
    else{
        var yellow = '';
    }
    //Creating some variables to make the recommendation query easier
    var sumWhen = ' SUM(CASE WHEN ';
    var inAs = " IN ('C','E','B','R','S') THEN 1 ELSE 0 END) AS ";
    //Case where user didn't check any of the boxes. Return full list of Pokemon
    if (gameCount == 0) {
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon WHERE Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807)';
        console.log(sqlQuery);
        var sqlCountQuery = 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon WHERE Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807)';
        //Attempting to make the SQL Recommendation Query
        var sqlRecQuery = 'SELECT ' + sumWhen + 'USun' + inAs + 'USunR,' + sumWhen + 'UMoon' + inAs + 'UMoonR,' + sumWhen + 'OmegaR' + inAs + 'OmegaRR,' + sumWhen + 'AlphaS' + inAs + 'AlphaSR,' + sumWhen + 'X' + inAs + 'XR,' + sumWhen + 'Y' + inAs + 'YR,' +  sumWhen + 'Crystal3DS' + inAs + 'Crystal3DSR ' + 'FROM AvPokemon'; 
        var sqlEventQuery = 'SELECT Id, Name FROM AvPokemon WHERE Id IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802, 807)'
    }
    else{
        var whereStatement = ultraSun + ultraMoon + sun + moon + omegaRuby + alphaSapphire + friendSafari + x + y + black2 + white2 + black + white + pokewalker + heartGold + soulSilver + diamond + pearl + platinum + fireRed + leafGreen + ruby + sapphire + emerald + gold + silver + crystal3DS + crystal + red + blue + yellow
        //Need to delete the extra ' AND' so SQL doesn't freak out
        var newWhereStatement = whereStatement.replace(' AND', '');
        //Excluding the event only Pokemon
        var sqlQuery = "SELECT Id, Name FROM AvPokemon WHERE " + newWhereStatement + " AND Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802, 807)";
        console.log(sqlQuery);
        //Including query to count the number of missing Pokemon
        var sqlCountQuery = 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon WHERE ' + newWhereStatement + ' AND Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807)';
        var sqlRecQuery = 'SELECT ' + sumWhen + 'USun' + inAs + 'USunR,' + sumWhen + 'UMoon' + inAs + 'UMoonR,' + sumWhen + 'OmegaR' + inAs + 'OmegaRR,' + sumWhen + 'AlphaS' + inAs + 'AlphaSR,' + sumWhen + 'X' + inAs + 'XR,' + sumWhen + 'Y' + inAs + 'YR,' +  sumWhen + 'Crystal3DS' + inAs + 'Crystal3DSR ' + 'FROM AvPokemon WHERE ' + newWhereStatement;
        var sqlEventQuery = 'SELECT Id, Name FROM AvPokemon WHERE Id IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802)'
    }
    //Now to actually pull the information from the database.
    //The missing pokemon Query 
    try {
        const client = await pool.connect();
        const result = await client.query(sqlQuery);
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
        var Pokemon = {};
        Ids.forEach((Id, i) => Pokemon[Id] = Names[i]);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
      //The Pokemon Count Query
      try {
        const client = await pool.connect();
        const result = await client.query(sqlCountQuery);
        var jsonResult = result.rows;
        var pokemonCount = jsonResult[0].pokemon_count;
        console.log(pokemonCount);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
      //The Pokemon Recommendations Query
      try {
        const client = await pool.connect();
        const result = await client.query(sqlRecQuery);
        console.log(result);
        var jsonResult = result.rows;
        if (ultraSunBox == 'unchecked') {var ultraSunRec = jsonResult[0].usunr}
        else {var ultraSunRec = 'no'}
        if (ultraMoonBox == 'unchecked') {var ultraMoonRec = jsonResult[0].umoonr}
        else {var ultraMoonRec = 'no'}
        if (omegaRubyBox == 'unchecked') {var omegaRubyRec = jsonResult[0].omegarr}
        else {var omegaRubyRec = 'no'}
        if (alphaSapphireBox == 'unchecked') {var alphaSapphireRec = jsonResult[0].alphasr}
        else {var alphaSapphireRec = 'no'}
        if (xBox == 'unchecked') {var xRec = jsonResult[0].xr}
        else {xRec = 'no'}
        if (yBox == 'unchecked') {var yRec = jsonResult[0].yr}
        else {yRec = 'no'}
        if (crystal3DSBox == 'unchecked') {var crystal3DSRec = jsonResult[0].crystal3dsr}
        else {crystal3DSRec = 'no'}
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
      //The Event only Pokemon Query
      try {
        const client = await pool.connect();
        const result = await client.query(sqlEventQuery);
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
        res.render('your_path_results', {title: "Your Path to Catch'em All", pokemon: Pokemon, pokemon_count: pokemonCount, ultra_sun_rec: ultraSunRec, ultra_moon_rec: ultraMoonRec, omega_ruby_rec: omegaRubyRec, alpha_sapphire_rec: alphaSapphireRec, x_rec: xRec, y_rec: yRec, crystal_3ds_rec: crystal3DSRec, event_pokemon: eventPokemon});
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
};




//Display information about a single pokemon by id
exports.pokemon_id_search = async (req, res, next) => {
    console.log("Return pokemon with Id: " + req.params.id);
    var useId = req.params.id;
    var sqlStatement = 'SELECT Id, Name, USun, UMoon, Sun, Moon, OmegaR, AlphaS, FSafari, X, Y, White2, Black2, White, Black, Pokewalker, SoulSilver, HeartGold, Platinum, Pearl, Diamond, Emerald, LeafGreen, FireRed, Sapphire, Ruby, Crystal3DS, Crystal, Silver, Gold, Yellow, JpBlue, EngBlue, Red FROM AvPokemon WHERE id =' + useId;
    try {
        const client = await pool.connect();
        const result = await client.query(sqlStatement);
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
        res.render('pokemon_id_search', {title: 'Pokémon Availability Details', pokemon_id: pokedexNumber, pokemon_name: pokemonName, 
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
