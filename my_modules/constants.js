//The current number of Pokemon available accross all games
exports.totalPokemon = function(){
    return 807;
}

//The current number of event only Pokemon
exports.eventOnlyPokemonCount = function(){
    return 16;
}

//List of event only Pokemon as a string that can be used in a SQL Query
exports.eventOnlyPokemonIdsToString = function() {
    var eventOnlyPokemonIdArray = [151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802, 807];
    var eventOnlyPokemonString = eventOnlyPokemonIdArray.join(", ");
    return eventOnlyPokemonString;
}