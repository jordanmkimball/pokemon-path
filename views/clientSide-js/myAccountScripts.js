
const input = document.getElementById('inputNameTextbox');
const form = document.querySelector('form');
const nameForm = document.getElementById('nameForm');
const clearButton = document.querySelector('button');
let welcomeUserBlock = document.getElementById('welcomeUserBlock');
let welcomeUserText = document.getElementById('welcomeUserText');
let dateAndTime = document.getElementById('dateAndTime');


//if firstName already exists with a value in local storage, userName is equal to the localStorage value. Otherwise userName is empty
let userName = localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "";
console.log(userName);

//Converts a string into titleCase
toTitleCase = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Switches the visability of the nameForm and the welcomeUserBlocks
function switchVisability(){
    if(welcomeUserBlock.getAttribute("hidden")){
        welcomeUserBlock.removeAttribute("hidden");
        nameForm.setAttribute("hidden", "true");
        //We replace the "user" placeholder with the their userName
        welcomeUserText.textContent = welcomeUserText.textContent.replace("user", userName);
    }
    else{
        nameForm.removeAttribute("hidden");
        welcomeUserBlock.setAttribute("hidden", "true");
    }
}


//By default the nameForm will be visable and the Welcome User form will be hidden
//However if the user has already selected their name, we will hide the name form and the welcome user element will be visable. 
if(userName != ""){
    switchVisability();
}

//TO-DO: Determine if I should sanitize the user Input for this function any further

//Function that handles taking the users first name text input and moving it to localStorage.
form.addEventListener('submit', function(e){
    e.preventDefault();
    userName = input.value;
    //Function won't accept empty strings or a name over 70 characters long
    if(userName == "" || userName.length > 70){
        window.alert("You cannot leave the name form empty or input a name longer than 70 characters")
    }
    else{
        //Make sure userInput is only one word and that the first letter is capitalized.
        userName = userName.split(" ")
        userName = userName[0];
        userName = toTitleCase(userName);
        //set userName as the "firstName" value in localStorage
        localStorage.setItem("firstName", userName);
        //Make the nameForm hidden, and the welcomeUserText visiable
        switchVisability();
    }
});

clearButton.addEventListener('click', function() {
    //Clear local Storage
    localStorage.clear();
    switchVisability();
    //We reset the welcomeUserText to the default of user
    welcomeUserText.textContent = welcomeUserText.textContent.replace(userName, "user");
});


//Retrieve the local date and time 
var todaysDate = new Date();
console.log(todaysDate);
//Using a function from moment.js 
todaysDate = moment(todaysDate).format("MMMM Do YYYY, hh:mm a");;
//Insert the local date and time onto the myAccount page
dateAndTime.textContent = dateAndTime.textContent + todaysDate;


