var constants = require('./constants');


    //We know the games they currently have Based on which boxes they check in the your_path page.
    //IMPORTANT NOTE: IN Node.js when creating SQL Queries column names ARE CASE SENSITIVE unlike regular SQL.
//Creates the SQL WHERE Statement that is used in multiple different Queries from the Pokemon Database
function whereStatement(checkedUltraSun, checkedUltraMoon, checkedSun, checkedMoon, checkedOmegaRuby, checkedAlphaSapphire, checkedX, checkedY, checkedBlack2, checkedWhite2, checkedBlack, checkedWhite, checkedHeartGold, checkedSoulSilver, checkedDiamond, checkedPearl, checkedPlatinum, checkedFireRed, checkedLeafGreen, checkedRuby, checkedEmerald, checkedGold, checkedSilver, checkedCrystal3DS, checkedCrystalGameboy, checkedRed, checkedBlue, checkedYellow, checkedFriendSafari, checkedDreamRadar, checkedPokewalker, checkedDualSlot){
    var ultraSun = '';
    var ultraMoon = '';
    var sun = '';
    var moon = '';
    var omegaRuby = '';
    var alphaSapphire = '';
    var x = '';
    var y = '';
    var friendSafari = '';
    var black2 = '';
    var white2 = '';
    var black = '';
    var white = '';
    var heartGold = '';
    var soulSilver = '';
    var pokewalker = '';
    var diamond = '';
    var pearl = '';
    var platinum = '';
    var fireRed = '';
    var leafGreen = '';
    var ruby = '';
    var sapphire = '';
    var emerald = '';
    var gold = '';
    var silver = '';
    var crystal3DS = '';
    var crystal = '';
    var red = '';
    var blue = '';
    var yellow = '';
    //If a games box is checked it gets added to the SQL WHERE Clause.
    if(checkedUltraSun){
        ultraSun = " AND USun NOT IN ('C','E','B','R','S')"
    }
    if(checkedUltraMoon){
        ultraMoon = " AND UMoon NOT IN ('C','E','B','R','S')";
    }
    if(checkedSun){
        sun = " AND Sun NOT IN ('C','E','B','R','S')";
    }
    if(checkedMoon){
        moon = " AND Moon NOT IN ('C','E','B','R','S')"
    }
    if(checkedOmegaRuby){
        omegaRuby = " AND OmegaR NOT IN ('C','E','B','R','S')";
    }
    if(checkedAlphaSapphire){
        alphaSapphire = " AND AlphaS NOT IN ('C','E','B','R','S')";
    }
    if(checkedX){
        x = " AND X NOT IN ('C','E','B','R','S')";
    }
    if(checkedY){
        y = " AND Y NOT IN ('C','E','B','R','S')";
    }
    //Check to see if we include Pokemon in the Dream Radar in the calculation: Dream Radar used exclusively with Black 2 and White 2
    //Case where the dream radar is checked and either white2 or black2 is also checked
    if((checkedDreamRadar && checkedBlack2) || (checkedDreamRadar && checkedWhite2)){
        if(checkedBlack2){
            black2 = " AND Black2 NOT IN ('C','E','B','R','S','DR','DRE')";
        }
        if(checkedWhite2){
            white2 = " AND White2 NOT IN ('C','E','B','R','S','DR','DRE')";
        }
    }
    //Case where dream radar isn't checked
    else{
        if(checkedBlack2){
            black2 = " AND Black2 NOT IN ('C','E','B','R','S')";
        }
        if(checkedWhite2){
            white2 = " AND White2 NOT IN ('C','E','B','R','S')";
        }
    }
    //End of Dream Radar Affected Games
    if(checkedBlack){
        black = " AND Black NOT IN ('C','E','B','R','S')";
    }
    if(checkedWhite){
        white = " AND White NOT IN ('C','E','B','R','S')";
    }
    if(checkedHeartGold){
        heartGold = " AND HeartGold NOT IN ('C','E','B','R','S')";
    }
    if(checkedSoulSilver){
        soulSilver = " AND SoulSilver NOT IN ('C','E','B','R','S')";
    }
    //Dual slot mode affected games: Diamond, Pearl, and Platinum. Pokemon that can be caught in Dual Slot mode included if checked.
    //Case Where Dual Slot Mode is checked
    if((checkedDualSlot && checkedDiamond) || (checkedDualSlot && checkedPearl) || (checkedDualSlot && checkedPlatinum)){
        if(checkedDiamond){
            diamond = " AND Diamond NOT IN ('C','E','B','R','S','D')";
        }
        if(checkedPearl){
            pearl = " AND Pearl NOT IN ('C','E','B','R','S','D')";
        }
        if(checkedPlatinum){
            platinum = " AND Platinum NOT IN ('C','E','B','R','S','D')";
        }
    }
    //Case where Dual Slot Mode is not checked
    else{
        if(checkedDiamond){
            diamond = " AND Diamond NOT IN ('C','E','B','R','S')";
        }
        if(checkedPearl){
            pearl = " AND Pearl NOT IN ('C','E','B','R','S')";
        }
        if(checkedPlatinum){
            platinum = " AND Platinum NOT IN ('C','E','B','R','S')";
        }
    }
    //End of Dual Slot Mode Affected Games
    if(checkedFireRed){
        fireRed = " AND FireRed NOT IN ('C','E','B','R','S')";
    }
    if(checkedLeafGreen){
        leafGreen = " AND LeafGreen NOT IN ('C','E','B','R','S')";
    }
    if(checkedRuby){
        ruby = " AND Ruby NOT IN ('C','E','B','R','S')";
    }
    if(checkedSapphire){
        sapphire = " AND Sapphire NOT IN ('C','E','B','R','S')";
    }
    if(checkedEmerald){
        emerald = " AND Emerald NOT IN ('C','E','B','R','S')";
    }
    if(checkedGold){
        gold = " AND Gold NOT IN ('C','E','B','R','S')";
    }
    if(checkedSilver){
        silver = " AND Silver NOT IN ('C','E','B','R','S')";
    }
    if(checkedCrystal3DS){
        crystal3DS = " AND Crystal3DS NOT IN ('C','E','B','R','S')";
    }
    if(checkedCrystal){
        crystal = " AND Crystal NOT IN ('C','E','B','R','S')";
    }
    if(checkedRed){
        red = " AND Red NOT IN ('C','E','B','R','S')";
    }
    if(checkedBlue){
        blue = " AND EngBlue NOT IN ('C','E','B','R','S')";
    }
    if(checkedYellow){
        yellow = " AND Yellow NOT IN ('C','E','B','R','S')";
    }
    //Friend Safari only applies to Pokemon X and Pokemon Y
    if((checkedFriendSafari && checkedX) || (checkedFriendSafari && checkedY)){
        friendSafari = " AND FSafari NOT IN ('C', 'E', 'B')";
    }
    //Pokewalker only applies to Pokemon HeartGold and SoulSilver
    if((checkedPokewalker && checkedHeartGold) || (checkedPokewalker && checkedSoulSilver)){
        pokewalker = " AND Pokewalker NOT IN ('C','E','B','R','S')";
    }
    //Finally concatinating all the strings together to complete the SQL WHERE statement
    var whereStatement = ultraSun + ultraMoon + sun + moon + omegaRuby + alphaSapphire + friendSafari + x + y + black2 + white2 + black + white + pokewalker + heartGold + soulSilver + diamond + pearl + platinum + fireRed + leafGreen + ruby + sapphire + emerald + gold + silver + crystal3DS + crystal + red + blue + yellow
    //Need to delete the extra ' AND' so SQL doesn't freak out
    return whereStatement.replace(' AND', '');
}



//Finds how many pokemon a player is unable to catch given the games they currently own
exports.missingPokemonCountQuery = function(checkedUltraSun, checkedUltraMoon, checkedSun, checkedMoon, checkedOmegaRuby, checkedAlphaSapphire, checkedX, checkedY, checkedBlack2, checkedWhite2, checkedBlack, checkedWhite, checkedHeartGold, checkedSoulSilver, checkedDiamond, checkedPearl, checkedPlatinum, checkedFireRed, checkedLeafGreen, checkedRuby, checkedEmerald, checkedGold, checkedSilver, checkedCrystal3DS, checkedCrystalGameboy, checkedRed, checkedBlue, checkedYellow, checkedFriendSafari, checkedDreamRadar, checkedPokewalker, checkedDualSlot, gameCount){
    //Case when none of the Game boxes are checked
    if(gameCount == 0){
        return 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon WHERE Id NOT IN (' + constants.eventOnlyPokemonIdsToString + ')';
    }
    else{
        var where = whereStatement(checkedUltraSun, checkedUltraMoon, checkedSun, checkedMoon, checkedOmegaRuby, checkedAlphaSapphire, checkedX, checkedY, checkedBlack2, checkedWhite2, checkedBlack, checkedWhite, checkedHeartGold, checkedSoulSilver, checkedDiamond, checkedPearl, checkedPlatinum, checkedFireRed, checkedLeafGreen, checkedRuby, checkedEmerald, checkedGold, checkedSilver, checkedCrystal3DS, checkedCrystalGameboy, checkedRed, checkedBlue, checkedYellow, checkedFriendSafari, checkedDreamRadar, checkedPokewalker, checkedDualSlot);
        var sqlQuery = 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon WHERE ' + where + ' AND Id NOT IN (' + constants.eventOnlyPokemonIdsToString + ')';
        return sqlQuery;
    }
}





    

    
    
    
    