//html text elements
const input = document.getElementById('inputNameTextbox');
const form = document.querySelector('form');
const accountForm = document.getElementById('accountForm');
const clearButton = document.querySelector('button');
let welcomeUserBlock = document.getElementById('welcomeUserBlock');
let welcomeUserText = document.getElementById('welcomeUserText');
let dateAndTime = document.getElementById('dateAndTime');
let localizedString = document.getElementById('localizedString');
let browserLangText = document.getElementById('browserLangText');
let browserLangBlock = document.getElementById('browserLangBlock');
let notTranslatedWarning = document.getElementById('notTranslatedWarning');
let userLangText = document.getElementById('userLangText');
let userLangBlock = document.getElementById('userLangBlock');
let noteAboutTranslations = document.getElementById('noteAboutTranslations');

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
//if langPref already exists with a value in localStorage userLangPref is equal to the localStorage value. Otherwise langPref is empty
let userLangPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "";


//START OF NAMED FUNCTIONS


//Converts a string into Title Case
toTitleCase = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Switches the visability of the accountForm and the welcomeUserBlocks
function switchVisability(){
    if(welcomeUserBlock.getAttribute("hidden")){
        welcomeUserBlock.removeAttribute("hidden");
        accountForm.setAttribute("hidden", "true");
        //We replace the "user" placeholder with the their userName
        welcomeUserText.textContent = welcomeUserText.textContent.replace("user", userName);
    }
    else{
        accountForm.removeAttribute("hidden");
        welcomeUserBlock.setAttribute("hidden", "true");
    }
}

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


//changes "localizedString" based on the user's language settings
//Spanish
function setlocalizedString(userLangPref) {
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
    else if(userLangPref == "browser"){
        setlocalizedString(browserLangPref);
    }
    //English
    else{
        localizedString.textContent = "\"This text changes based on your browser language setting\"";
    }
}

//Takes ISO 639-2 Language Code as parameter and returns the english name of the language as a String. 
function decodeLangCode(langCode){
    if(langCode.startsWith('es')){
        return "Spanish";
    }
    else if(langCode.startsWith('fr')){
        return "French";
    }
    else if(langCode.startsWith('de')){
        return "German";
    }
    else if(langCode.startsWith('zh')){
        return "Chinese";
    }
    else if(langCode.startsWith('hi')){
        return "Hindi";
    }
    else if(langCode.startsWith("ar")){
        return "Arabic";
    }
    else if(langCode.startsWith("ms")){
        return "Malay";
    }
    else if(langCode.startsWith("ru")){
        return "Russian";
    }
    else if(langCode.startsWith("en")){
        return "English";
    }
    else if(langCode == "browser"){
        return "Browser Default Language";
    }
    //Display warning if the browsers language preference could not be retrieved
    else if(langCode == null || langCode == ""){
         "Error";
    }
    else{
        return "ISO 639-2 Language Code: " + langCode;
    }
}

//Replace browserLangText with English name of browserLangPref
function setBrowserLangText(){
    if(decodeLangCode(browserLangPref) == "Error"){
        //Case where user has NOT made a language selection in the user accountForm or selected to use browser
        if(localStorage.getItem("langPref") == null || localStorage.getItem("langPref") == "browser"){
            browserLangBlock.textContent = "Error: could not retrieve browser language preference. Displaying English text instead.";
        }
    //Case where user has made a language selection in user accountForm
        else{
            browserLangBlock.textContent = "Error: could not retrieve browser language preference.";
        }
    }
    //Case where we couldn't decode the ISO language code (not a supported language for translation)
    else if(decodeLangCode(browserLangPref).startsWith("ISO")){
        //Case where user has NOT made a language selection in the user accountForm or selected to use browser
        if(localStorage.getItem("langPref") == null || localStorage.getItem("langPref") == "browser"){
            notTranslatedWarning.textContent = "This is not currently one of the languages supported for limited translation. \nEnglish is displayed instead."
        }
        browserLangText.textContent = decodeLangCode(browserLangPref);
    }
    else{
        //Default case
        browserLangText.textContent = decodeLangCode(browserLangPref);
    }
}


//Replace userLangText with English name of userLangPref
function setUserLangText() {
    if(decodeLangCode(userLangPref) == "Error"){
        userLangBlock.textContent = "Error: could not retrieve your language selection";
    }
    else if(decodeLangCode(userLangPref).startsWith("Browser")){
        userLangText.textContent = decodeLangCode(userLangPref);
        //Change noteAboutTranslations text
        noteAboutTranslations.textContent = "This web application does not actually support full translations for any languages outside of English. The only sentence that changes based on your selected language preference is the sentence at the very bottom of this web page. Because you selected to use your browser default language as your preferred language, the sentence at the bottom of the page should stay translated in whatever language you have listed as your browser default (You can see which language is listed by looking at the bottom of this page)." 
    }
    else{
        userLangText.textContent = decodeLangCode(userLangPref);
    }
}


//END OF FUNCTION DEFINITIONS
//START OF MAIN PROGRAM AND HTML MODIFICATIONS


//By default the accountForm will be visable and the Welcome User form will be hidden
//However if the user has already made their selections, we will hide the accountForm and the welcomeUserBlock element will be visable. 
if(userName != ""){
    switchVisability();
}

//Get the browsers preferred language
var browserLangPref = getFirstBrowserLanguage();
//If the user hasn't selected a language preference, the browser language preference will be used as default. 
if(userLangPref == ""){
    userLangPref = browserLangPref;
}



//Retrieve the local date and time. Use moment.js to format date and time, and display on myAccount page 
var todaysDate = new Date();
todaysDate = moment(todaysDate).format("MMMM Do YYYY, hh:mm a");;
dateAndTime.textContent = dateAndTime.textContent + todaysDate;

//Translates the localizedString into the users preferred language or the browsers preferred language if no selection has been made yet
setlocalizedString(userLangPref);
//Adds english name of user's browser's default language
setBrowserLangText();
//Adds english name of user's selected default language
setUserLangText();

console.log("Hello, fellow developer")


//START OF EVENT HANDLERS

//ON acountForm Submition. Record User Selections in localStorage. Hide accountForm, Show welcomeUserBlock
form.addEventListener('submit', function(e){
    e.preventDefault();
    userName = input.value;
    //Function won't accept empty strings or a name over 70 characters long
    if(userName == "" || userName.length > 70){
        window.alert("You cannot leave the name form empty or input a name longer than 70 characters")
    }
    //Sanitize choices and store user selections in localStorage
    else{
        //Make sure userInput is only one word and that the first letter is capitalized.
        userName = userName.split(" ")
        userName = userName[0];
        userName = toTitleCase(userName);
        //set userName as the "firstName" value in localStorage
        localStorage.setItem("firstName", userName);

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
        //Add the users language Preference value to localStorage
        localStorage.setItem("langPref", userLangPref);
        //Translate the localizedString at the bottom of the page to the users preferred language.
        setlocalizedString(userLangPref);
        //Switch visibility to hide the accountForm and show the welcomeUserBlock
        switchVisability();
        if(userLangPref != browser){
            notTranslatedWarning.textContent = "";
        }
        setBrowserLangText();
        setUserLangText();
    } 
});


//When Clicked: Clears user's selections in localStorage. Flips visibiliity back to the accountForm
clearButton.addEventListener('click', function() {
    //Clear local Storage
    localStorage.clear();
    userLangPref = "";
    switchVisability();
    setlocalizedString(userLangPref);
    setBrowserLangText();
    //We reset the welcomeUserText to the default of user
    welcomeUserText.textContent = welcomeUserText.textContent.replace(userName, "user");
});






