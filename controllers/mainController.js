var express = require('express');
var app = express();

//Code to enable body-parser to be used 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


//Code to use async
var async = require('async');

//Declaring the sqlite3 database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('pokemon.db');

//My own custom module to decode the availability letters.
var ad = require('./availabilityDecoder');


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
exports.yourPathPost = function (req, res, next){
    //Game count necessary in case user didn't select any boxes
    var gameCount = 0;
    //Seeing whether the user checked the Ultra Sun Box
    if (req.body.ultra_sun == 'ultra_sun') {
        var ultraSun = ' AND USun NOT IN ("C","E","B","R","S")';
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
        var ultraMoon = ' AND UMoon NOT IN ("C","E","B","R","S")';
        var ultraMoonBox = 'checked';
        gameCount+= 1;
    }
    else{
        var ultraMoon = '';
        var ultraMoonBox = 'unchecked';
    }
    if (req.body.sun == 'sun') {
        var sun = ' AND Sun NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var sun = '';
    }
    if (req.body.moon == 'moon') {
        var moon = ' AND Moon NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var moon = '';
    }
    if (req.body.omega_ruby == 'omega_ruby') {
        var omegaRuby = ' AND OmegaR NOT IN ("C","E","B","R","S")';
        var omegaRubyBox = 'checked';
        gameCount+= 1;
    }
    else{
        var omegaRuby = '';
        var omegaRubyBox = 'unchecked';
    }
    if (req.body.alpha_sapphire == 'alpha_sapphire') {
        var alphaSapphire = ' AND AlphaS NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
        var alphaSapphireBox = 'checked';
    }
    else{
        var alphaSapphire = '';
        var alphaSapphireBox = 'unchecked';
    }
    if (req.body.friend_safari == 'friend_safari') {
        var friendSafari = ' AND FSafari NOT IN ("C", "E", "B")';
        gameCount+= 1;
    }
    else{
        var friendSafari = '';
    }
    if (req.body.x == 'x') {
        var x = ' AND X NOT IN ("C","E","B","R","S")';
        var xBox = 'checked';
        gameCount+= 1;
    }
    else{
        var x = '';
        var xBox = 'unchecked';
    }
    if (req.body.y == 'y') {
        var y = ' AND Y NOT IN ("C","E","B","R","S")';
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
            var black2 = ' AND Black2 NOT IN ("C","E","B","R","S","DR","DRE")';
            gameCount+= 1;
        }
        else{
            var black2 = '';
        }
        if (req.body.white_2 == 'white_2') {
            var white2 = ' AND White2 NOT IN ("C","E","B","R","S","DR","DRE")';
            gameCount+= 1;
        }
        else{
            var white2 = '';
        }
    }
    //No Dream Radar in Calculation
    else {
        if (req.body.black_2 == 'black_2') {
            var black2 = ' AND Black2 NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var black2 = '';
        }
        if (req.body.white_2 == 'white_2') {
            var white2 = ' AND White2 NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var white2 = '';
        }
    }
    //End of Dream Radar affected games
    if (req.body.black == 'black') {
        var black = ' AND Black NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var black = '';
    }
    if (req.body.white == 'white') {
        var white = ' AND White NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var white = '';
    }
    if (req.body.pokewalker == 'pokewalker') {
        var pokewalker = ' AND Pokewalker NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var pokewalker = '';
    }
    if (req.body.heartgold == 'heartgold') {
        var heartGold = ' AND HeartGold NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var heartGold = '';
    }
    if (req.body.soulsilver == 'soulsilver') {
        var soulSilver = ' AND SoulSilver NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var soulSilver = '';
    }
    //Checking if the dual_slot box was checked. If so include Pokemon that can be caught in dual slot mode in Diamond, Pearl, and Platinum
    if (req.body.dual_slot = 'dual_slot') {
        if (req.body.diamond == 'diamond') {
            var diamond = ' AND Diamond NOT IN ("C","E","B","R","S","D")';
            gameCount+= 1;
        }
        else{
            var diamond = '';
        }
        if (req.body.pearl == 'pearl') {
            var pearl = ' AND Pearl NOT IN ("C","E","B","R","S","D")';
            gameCount+= 1;
        }
        else{
            var pearl = '';
        }
        if (req.body.platinum == 'platinum') {
            var platinum = ' AND Platinum NOT IN ("C","E","B","R","S","D")';
            gameCount+= 1;
        }
        else{
            var platinum = '';
        }
    }
    //Dual slot box not checked
    else{
        if (req.body.diamond == 'diamond') {
            var diamond = ' AND Diamond NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var diamond = '';
        }
        if (req.body.pearl == 'pearl') {
            var pearl = ' AND Pearl NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var pearl = '';
        }
        if (req.body.platinum == 'platinum') {
            var platinum = ' AND Platinum NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var platinum = '';
        }
    }
    //end of dual slot affected games
    if (req.body.firered == 'firered') {
        var fireRed = ' AND FireRed NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var fireRed = '';
    }
    if (req.body.leafgreen == 'leafgreen') {
        var leafGreen = ' AND leafGreen NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var leafGreen = '';
    }
    if (req.body.ruby == 'ruby') {
        var ruby = ' AND Ruby NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var ruby = '';
    }
    if (req.body.sapphire == 'sapphire') {
        var sapphire = ' AND Sapphire NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var sapphire = '';
    }
    if (req.body.emerald == 'emerald') {
        var emerald = ' AND Emerald NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var emerald = '';
    }
    if (req.body.gold == 'gold') {
        var gold = ' AND Gold NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var gold = '';
    }
    if (req.body.silver == 'silver') {
        var silver = ' AND Silver NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var silver = '';
    }
    if (req.body.crystal_3DS == 'crystal_3DS') {
        var crystal3DS = ' AND Crystal3DS NOT IN ("C","E","B","R","S")';
        var crystal3DSBox = 'checked';
        gameCount+= 1;
    }
    else{
        var crystal3DS = '';
        var crystal3DSBox = 'unchecked';
    }
    if (req.body.crystal == 'crystal') {
        var crystal = ' AND Crystal NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var crystal = '';
    }
    if (req.body.red == 'red') {
        var red = ' AND Red NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var red = '';
    }
    if (req.body.blue == 'blue') {
        var blue = ' AND EngBlue NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var blue = '';
    }
    if (req.body.yellow == 'yellow') {
        var yellow = ' AND Yellow NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var yellow = '';
    }
    //Creating some variables to make the recommendation query easier
    var sumWhen = ' SUM(CASE WHEN ';
    var inAs = ' IN ("C","E","B","R","S") THEN 1 ELSE 0 END) AS ';
    //Case where user didn't check any of the boxes. Return full list of Pokemon
    if (gameCount == 0) {
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon WHERE Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807)';
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
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon WHERE ' + newWhereStatement + ' AND Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802, 807)';
        //Including query to count the number of missing Pokemon
        var sqlCountQuery = 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon WHERE ' + newWhereStatement + ' AND Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807)';
        var sqlRecQuery = 'SELECT ' + sumWhen + 'USun' + inAs + 'USunR,' + sumWhen + 'UMoon' + inAs + 'UMoonR,' + sumWhen + 'OmegaR' + inAs + 'OmegaRR,' + sumWhen + 'AlphaS' + inAs + 'AlphaSR,' + sumWhen + 'X' + inAs + 'XR,' + sumWhen + 'Y' + inAs + 'YR,' +  sumWhen + 'Crystal3DS' + inAs + 'Crystal3DSR ' + 'FROM AvPokemon WHERE ' + newWhereStatement;
        var sqlEventQuery = 'SELECT Id, Name FROM AvPokemon WHERE Id IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802)'
    }
    //Now to actually pull the information from the database. 
    db.all(sqlQuery, function (err,rows) {
        if (err) {res.send(err.message);}
        //No error so proceed
        var Ids = [];
        for (var i=0; i<rows.length; i++){
            Ids.push(rows[i].Id);
        }
        var Names = [];
        for (var i=0; i<rows.length; i++){
            Names.push(rows[i].Name);
        }
        var Pokemon = {};
        Ids.forEach((Id, i) => Pokemon[Id] = Names[i]);
        //2nd SQL Query for the Count of the missing pokemon
        db.get(sqlCountQuery, function (err, row){
            if (err) {res.send(err.message);}
            //No error so proceed
            var pokemonCount = row.Pokemon_Count;
            db.get(sqlRecQuery, function (err, row){
                if (err) {res.send(err.message);}
                //No error so render
                if (ultraSunBox == 'unchecked') {var ultraSunRec = row.USunR}
                else {var ultraSunRec = 'no'}
                if (ultraMoonBox == 'unchecked') {var ultraMoonRec = row.UMoonR}
                else {var ultraMoonRec = 'no'}
                if (omegaRubyBox == 'unchecked') {var omegaRubyRec = row.OmegaRR}
                else {var omegaRubyRec = 'no'}
                if (alphaSapphireBox == 'unchecked') {var alphaSapphireRec = row.AlphaSR}
                else {var alphaSapphireRec = 'no'}
                if (xBox == 'unchecked') {var xRec = row.XR}
                else {xRec = 'no'}
                if (yBox == 'unchecked') {var yRec = row.YR}
                else {yRec = 'no'}
                if (crystal3DSBox == 'unchecked') {var crystal3DSRec = row.Crystal3DSR}
                else {crystal3DSRec = 'no'}
                //SQL Query for the event only Pokemon
                db.all(sqlEventQuery, function (err, rows){
                    //No error so proceed
                    var EventIds = [];
                    for (var i=0; i<rows.length; i++){
                        EventIds.push(rows[i].Id);
                    }
                    var EventNames = [];
                    for (var i=0; i<rows.length; i++){
                        EventNames.push(rows[i].Name);
                    }
                    var EventPokemon = {};
                    EventIds.forEach((Id, i) => EventPokemon[Id] = EventNames[i]);
                    res.render('your_path_results', {title: "Your Path to Catch'em All", pokemon: Pokemon, pokemon_count: pokemonCount, ultra_sun_rec: ultraSunRec, ultra_moon_rec: ultraMoonRec, omega_ruby_rec: omegaRubyRec, alpha_sapphire_rec: alphaSapphireRec, x_rec: xRec, y_rec: yRec, crystal_3ds_rec: crystal3DSRec, event_pokemon: EventPokemon});
                })
            })
        });
    })
};






//Display information about a single pokemon by id
exports.pokemon_id_search = function (req, res, next){
    console.log("Return pokemon with Id: " + req.params.id);
    var sqlStatement = 'SELECT Id, Name, USun, UMoon, Sun, Moon, OmegaR, AlphaS, FSafari, X, Y, White2, Black2, White, Black, Pokewalker, SoulSilver, HeartGold, Platinum, Pearl, Diamond, Emerald, LeafGreen, FireRed, Sapphire, Ruby, Crystal3DS, Crystal, Silver, Gold, Yellow, JpBlue, EngBlue, Red FROM AvPokemon WHERE id = ?';
    db.get(sqlStatement, [req.params.id], function (err, row) {
        if (err) { res.send(err.message); }
        //No error so render. 
        else{
            var pokedexNumber = row.Id;
            var pokemonName = row.Name;
            //Using the custom availabilityDecoder Module and its functions
            var UltraSun = ad.availabilityDecoder(row.USun);
            var UltraSunMethod = ad.availabilityMethod(row.USun);
            var UltraMoon = ad.availabilityDecoder(row.UMoon);
            var UltraMoonMethod = ad.availabilityMethod(row.UMoon);
            var Sun = ad.availabilityDecoder(row.Sun);
            var SunMethod = ad.availabilityMethod(row.Sun);
            var Moon = ad.availabilityDecoder(row.Moon);
            var MoonMethod = ad.availabilityMethod(row.Moon);
            var AlphaSapphire = ad.availabilityDecoder(row.AlphaS);
            var AlphaSapphireMethod = ad.availabilityMethod(row.AlphaS);
            var OmegaRuby = ad.availabilityDecoder(row.OmegaR);
            var OmegaRubyMethod = ad.availabilityMethod(row.OmegaR);
            var FriendSafari = ad.availabilityDecoder(row.FSafari);
            var FriendSafariMethod = ad.availabilityMethod(row.FSafari);
            var X = ad.availabilityDecoder(row.X);
            var XMethod = ad.availabilityMethod(row.X);
            var Y = ad.availabilityDecoder(row.Y);
            var YMethod = ad.availabilityMethod(row.Y);
            var Black2 = ad.availabilityDecoder(row.Black2);
            var Black2Method = ad.availabilityMethod(row.Black2);
            var White2 = ad.availabilityDecoder(row.White2);
            var White2Method = ad.availabilityMethod(row.White2);
            var Black = ad.availabilityDecoder(row.Black);
            var BlackMethod = ad.availabilityMethod(row.Black);
            var White = ad.availabilityDecoder(row.White);
            var WhiteMethod = ad.availabilityMethod(row.White);
            var HeartGold = ad.availabilityDecoder(row.HeartGold);
            var HeartGoldMethod = ad.availabilityMethod(row.HeartGold);
            var SoulSilver = ad.availabilityDecoder(row.SoulSilver);
            var SoulSilverMethod = ad.availabilityMethod(row.SoulSilver);
            var Pokewalker = ad.availabilityDecoder(row.Pokewalker);
            var PokewalkerMethod = ad.availabilityMethod(row.Pokewalker);
            var Diamond = ad.availabilityDecoder(row.Diamond);
            var DiamondMethod = ad.availabilityMethod(row.Diamond);
            var Pearl = ad.availabilityDecoder(row.Pearl);
            var PearlMethod = ad.availabilityMethod(row.Pearl);
            var Platinum = ad.availabilityDecoder(row.Platinum);
            var PlatinumMethod = ad.availabilityMethod(row.Platinum);
            var FireRed = ad.availabilityDecoder(row.FireRed);
            var FireRedMethod = ad.availabilityMethod(row.FireRed);
            var LeafGreen = ad.availabilityDecoder(row.LeafGreen);
            var LeafGreenMethod = ad.availabilityMethod(row.LeafGreen);
            var Ruby = ad.availabilityDecoder(row.Ruby);
            var RubyMethod = ad.availabilityMethod(row.Ruby);
            var Sapphire = ad.availabilityDecoder(row.Sapphire);
            var SapphireMethod = ad.availabilityMethod(row.Sapphire);
            var Emerald = ad.availabilityDecoder(row.Emerald);
            var EmeraldMethod = ad.availabilityMethod(row.Emerald);
            var Gold = ad.availabilityDecoder(row.Gold);
            var GoldMethod = ad.availabilityMethod(row.Gold);
            var Silver = ad.availabilityDecoder(row.Silver);
            var SilverMethod = ad.availabilityMethod(row.Silver);
            var Crystal3DS = ad.availabilityDecoder(row.Crystal3DS);
            var Crystal3DSMethod = ad.availabilityMethod(row.Crystal3DS);
            var Crystal = ad.availabilityDecoder(row.Crystal);
            var CrystalMethod = ad.availabilityMethod(row.Crystal);
            var Red = ad.availabilityDecoder(row.Red);
            var RedMethod = ad.availabilityMethod(row.Red);
            var Blue = ad.availabilityDecoder(row.EngBlue);
            var BlueMethod = ad.availabilityMethod(row.EngBlue);
            var Yellow = ad.availabilityDecoder(row.Yellow);
            var YellowMethod = ad.availabilityMethod(row.Yellow);

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
            blue: Blue, blue_method: BlueMethod, yellow: Yellow, yellow_method: YellowMethod
        });
        }
    });
};