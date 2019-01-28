//ClientSide code associated withthe your_path_results.pug page:
let yourPathResultsHeader = document.getElementById("yourPathResultsHeader");
let missingPokemonHeader = document.getElementById("missingPokemonHeader");


//if firstName already exists with a value in local storage, userName is equal to the localStorage value. Otherwise userName is empty
let userName = localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "";

//If the userName value isn't empty and the length is less than 30, replace your path to catch them all with userName's path to catch them all
//Also add user's name to list of missing Pokemon
if(userName != "" && userName.length < 30){
    yourPathResultsHeader.textContent = yourPathResultsHeader.textContent.replace("Your", userName + "'s");
    missingPokemonHeader.textContent = userName + "'s " + missingPokemonHeader.textContent;
}


