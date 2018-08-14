exports.availabilityDecoder = function(letter) {
    if (letter == 'C' || letter == 'E' || letter == 'B' || letter == 'R' || letter == 'S' || letter == 'D'){var obtainableInGame = 'Yes';}

    else{
        var obtainableInGame = 'no';
    }
    return obtainableInGame
}

exports.availabilityMethod = function(letter) {
    if (letter == 'C') {var method = 'This Pokémon can be caught in-game.'}
    else if (letter == 'E') {var method = 'Catch earlier evolutionary stage, and evolve to obtain this Pokémon.'}
    else if (letter == 'B') {var method = 'A later evolutionary stage of this Pokémon can be caught and bred to obtain this Pokémon in-game.'}
    else if (letter == 'R') {var method = 'This Pokémon can be received from someone in-game'}
    else if (letter == 'S') {var method = 'This Pokémon can be caught in-game through a Pokémon swarm'}
    else if (letter == 'D') {var method = 'This Pokémon can only be caught through the use of Dual slot mode. If you do not have and older DS that has both a DS slot and a game boy advance slot. You will not be able to catch this Pokémon'}
    else if (letter == 'DR') {var method = 'This Pokémon is only available in this game via the Dream Radar'}
    else if (letter == 'DRE') {var method = 'This Pokémon is only available in this game via catching an earlier evolution through the Dream Radar, and evolving it to obtain this Pokémon'}
    else if (letter == 'EV' || letter == 'Ev' || letter == 'EvE' || letter == 'EvB') {var method = 'This Pokémon was obtainable in-game at some point through a special event. However, it is no longer obtainable this way.'}
    else if (letter == 'T') {var method = 'This Pokémon cannot be obtained in game, except through trade from a previous game'}
    else if (letter == 'N') {var method = 'This Pokémon is from a later generation than this game supports.'}
    else {var method = 'Error 404'}
    return method;
}