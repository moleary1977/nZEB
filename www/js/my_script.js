document.addEventListener("deviceready", onDeviceReady, false);

/*
* This function is called when the device is ready
*/
function onDeviceReady() {

    if (getLanguage != null) {
        jQuery("#activeLang").text(getLanguage);
    } else {
        jQuery("#activeLang").text("No language selected");
    }
}

/*
 * This function takes in a parameter to set the user's language and store it locally
 */
function setLanguage(language) {
    localStorage.setItem("user_language", language);
    jQuery("#activeLang").text(language);
}

/*
 * This function returns the language stored locally
 */
function getLanguage() {
    return localStorage.getItem("user_language");
}

function login() {
    var username = jQuery('#username').val();
    var password = jQuery('#password').val();

    var url = "http://www.webhq.ie/wp-admin/admin-ajax.php";

    jQuery.ajax({
        type: 'POST',
        url: url,
        data: { action: 'login', username: username, password: password },
        crossDomain: true,
        success: function (data, status, xhr) {
            alert(data);
            alert(status);
            alert(xhr.status);
        },
        error: function (xhr, status, errorThrown) {
            alert(xhr.status);
            alert(status);
            alert(errorThrown);
        }
    });
}