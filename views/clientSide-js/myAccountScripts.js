
const input = document.getElementById('inputNameTextbox');
const form = document.querySelector('form');
const nameForm = document.getElementById('nameForm');
const clearButton = document.querySelector('button');
let welcomeUserBlock = document.getElementById('welcomeUserBlock');
let welcomeUserText = document.getElementById('welcomeUserText');
let dateAndTime = document.getElementById('dateAndTime');
let localizedString = document.getElementById('localizedString');
let browserLangText = document.getElementById('browserLangText');
let notTranslatedWarning = document.getElementById('notTranslatedWarning');
let browserLangBlock = document.getElementById('browserLangBlock');
let userLangText = document.getElementById('userLangText');

//variables for the language selection radio form
let browserBox = document.getElementById('browser');
let englishBox = document.getElementById('english');
let spanishBox = document.getElementById('spanish');
let frenchBox = document.getElementById('french');
let germanBox = document.getElementById('german');
let chineseBox = document.getElementById('chinese');
let hindiBox = document.getElementById('hindi');
let arabicBox = document.getElementById('arabic');
let malayBox = document.getElementById('malay');
let russianBox = document.getElementById('russian');



//if firstName already exists with a value in local storage, userName is equal to the localStorage value. Otherwise userName is empty
let userName = localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "";
console.log(userName);
//if langPref already exists with a value in localStorage userLangPref is equal to the localStorage value. Otherwise langPref is empty
let userLangPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "";


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



//Function that handles taking users my account form selections and recording them in localStorage
form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(input.value);
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

        //EVALUATING THE CHOOSE LANGUAGE RADIO BUTTON Add the value of the selected button to localStorage. 
        if(browserBox.checked){
            userLangPref = browserBox.value;
        }
        else if(englishBox.checked){
            userLangPref = englishBox.value;
        }
        else if(spanishBox.checked){
            userLangPref = spanishBox.value;
        }
        else if(frenchBox.checked){
            userLangPref = frenchBox.value;
        }
        else if(germanBox.checked){
            userLangPref = germanBox.value;
        }
        else if(chineseBox.checked){
            userLangPref = chineseBox.value;
        }
        else if(hindiBox.checked){
            userLangPref = hindiBox.value;
        }
        else if(arabicBox.checked){
            userLangPref = arabicBox.value;
        }
        else if(malayBox.checked){
            userLangPref = malayBox.value;
        }
        else if(russianBox.checked){
            userLangPref = russianBox.value;
        }
        localStorage.setItem("langPref", userLangPref);
        setlocalizedString();
        console.log("userLangPref: " + userLangPref);
        console.log("localStorage: " + JSON.stringify(localStorage));
    } 
});



//Clears user's name and resets local storage. 
clearButton.addEventListener('click', function() {
    //Clear local Storage
    localStorage.clear();
    userLangPref = "";
    console.log("userLangPref: " + userLangPref);
    switchVisability();
    setlocalizedString();
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


//Get the browsers preferred language
var browserLangPref = getFirstBrowserLanguage();
//If the user hasn't selected a language preference, the browser language preference will be used as default. 
if(userLangPref == ""){
    userLangPref = browserLangPref;
}

console.log("browserLangPref: " + browserLangPref);
console.log("userLangPref: " + userLangPref);



//changes "localizedString" based on the user's language settings
//Spanish
function setlocalizedString() {
    if(userLangPref.startsWith('es')){
        localizedString.textContent = "\"Esta oración cambia según la configuración de idioma de su navegador\"";
    }
    //French
    else if(userLangPref.startsWith('fr')){
        localizedString.textContent = "\"Cette phrase change en fonction des paramètres de langue de votre navigateur\"";
    }
    //German
    else if(userLangPref.startsWith('de')){
        localizedString.textContent = "\"Dieser Satz ändert sich je nach Spracheinstellung Ihres Browsers\"";
    }
    //Chinese
    else if(userLangPref.startsWith('zh')){
        localizedString.textContent = "这句话根据浏览器的语言设置而变化";
    }
    //Hindi
    else if(userLangPref.startsWith('hi')){
        localizedString.textContent = "यह वाक्य आपके ब्राउज़र की भाषा सेटिंग के आधार पर बदलता है।";
    }
    //Arabic
    else if(userLangPref.startsWith("ar")){
        localizedString.textContent = "يتغير هذا النص بناءً على إعداد لغة متصفحك";
    }
    //Malay
    else if(userLangPref.startsWith("ms")){
        localizedString.textContent = "\"Perubahan ayat ini berdasarkan tetapan bahasa penyemak imbas anda\"";
    }
    //Russian
    else if(userLangPref.startsWith("ru")){
        localizedString.textContent = "Это предложение изменяется в зависимости от языковой настройки вашего браузера";
    }
    //English
    else{
        localizedString.textContent = "\"This text changes based on your browser language setting\"";
    }
}

//Translates the localizedString into the users preferred language
setlocalizedString();



//Displaying the language currently used by the user's browser
//Spanish
if(browserLangPref.startsWith('es')){
    browserLangText.textContent = "Spanish";
}
//French
else if(browserLangPref.startsWith('fr')){
    browserLangText.textContent = "French";
}
//German
else if(browserLangPref.startsWith('de')){
    browserLangText.textContent = "German";
}
//Chinese
else if(browserLangPref.startsWith('zh')){
    browserLangText.textContent = "Chinese";
}
//Hindi
else if(browserLangPref.startsWith('hi')){
    browserLangText.textContent = "Hindi";
}
//Arabic
else if(browserLangPref.startsWith("ar")){
    browserLangText.textContent = "Arabic";
}
//Malay
else if(browserLangPref.startsWith("ms")){
    browserLangText.textContent = "Malay";
}
//Russian
else if(browserLangPref.startsWith("ru")){
    browserLangText.textContent = "Russian";
}
//English
else if(browserLangPref.startsWith("en")){
    browserLangText.textContent = "English";
}
//Display warning if the browsers language preference could not be retrieved
else if(browserLangPref == null){
    browserLangBlock.textContent = "Error: could not retrieve user’s browser language preference. English is being displayed instead."
}
else{
    browserLangText.textContent = "ISO 639-2 Language Code: " + browserLangPref;
    //If langPref exists in local storage return false otherwise return true. 
    if((localStorage.getItem("langPref") ? false : true) || localStorage.getItem("langPref") == "browser"){
        //Add a warning that language won't be translated, as it is not one of the supported languages. 
        notTranslatedWarning.textContent = "This language is not currently one of the 9 languages supported for the above text. English is being displayed instead."
    }
}