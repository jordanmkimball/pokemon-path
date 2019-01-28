
const input = document.getElementById('inputNameTextbox');
const form = document.querySelector('form');
const nameForm = document.getElementById('nameForm');
const clearButton = document.querySelector('button');
let welcomeUserBlock = document.getElementById('welcomeUserBlock');
let welcomeUserText = document.getElementById('welcomeUserText');
let dateAndTime = document.getElementById('dateAndTime');
let localizedString = document.getElementById('localizedString')


//if firstName already exists with a value in local storage, userName is equal to the localStorage value. Otherwise userName is empty
let userName = localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "";
console.log(userName);
//if lang already exists with a value in sessionStorage, lang is equal to sessionStorage value. Otherwise lang is empty
let langPreference = sessionStorage.getItem("lang") ? sessionStorage.getItem("lang") : "";


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

//Clears user's name and resets local storage. 
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


//Function to retrieve the users local language setting
var getFirstBrowserLanguage = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };


console.log(getFirstBrowserLanguage());

//Storing users local language setting in session Storage
if(langPreference == ""){
    langPreference = getFirstBrowserLanguage();
    sessionStorage.setItem("lang", langPreference);
}

console.log(sessionStorage.getItem("lang"));

//Localizing the "localizedString" based on the user's language settings
//Spanish
if(langPreference.startsWith('es')){
    localizedString.textContent = "Esta oración cambia según la configuración de idioma de su navegador";
}
//French
else if(langPreference.startsWith('fr')){
    localizedString.textContent = "Cette phrase change en fonction des paramètres de langue de votre navigateur";
}
//German
else if(langPreference.startsWith('de')){
    localizedString.textContent = "Dieser Satz ändert sich je nach Spracheinstellung Ihres Browsers";
}
//Chinese
else if(langPreference.startsWith('zh')){
    localizedString.textContent = "这句话根据浏览器的语言设置而变化";
}
//Hindi
else if(langPreference.startsWith('hi')){
    localizedString.textContent = "यह वाक्य आपके ब्राउज़र की भाषा सेटिंग के आधार पर बदलता है।";
}
//Arabic
else if(langPreference.startsWith("ar")){
    localizedString.textContent = "تتغير هذه الجملة بناءً على إعداد لغة متصفحك";
}
//Malay
else if(langPreference.startsWith("ms")){
    localizedString.textContent = "Perubahan ayat ini berdasarkan tetapan bahasa penyemak imbas anda";
}
//Russian
else if(langPreference.startsWith("ru")){
    localizedString.textContent = "Это предложение изменяется в зависимости от языковой настройки вашего браузера"
}
//English
else{
    localizedString.textContent = "This text changes based on your browser language setting";
}


