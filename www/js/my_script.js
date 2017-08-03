document.addEventListener("deviceready", onDeviceReady, false);

/*
* This function is called when the device is ready
*/
function onDeviceReady() {
    if(getLanguage){
        jQuery("#activeLang").text(getLanguage);
    }
}

/*
 * This function takes in a parameter to set the user's language and store it locally
 */
function setLanguage(language){
    localStorage.setItem("user_language", language);
    jQuery("#activeLang").text(language);
}

/*
 * This function returns the language stored locally
 */
function getLanguage(){
    return localStorage.getItem("user_language");
}