document.addEventListener("deviceready", onDeviceReady, false);

/*
* This function is called when the device is ready
*/
function onDeviceReady() {

    if (getLanguage != null) {
        jQuery("#activeLang").text(getLanguage());
        console.log(getLanguage());
    } else {
        jQuery("#activeLang").text("No language selected");
    }

    if (getCourseToView() == null) {
        setCourseToView(0);
    }

    if (getCoursesCompleted() == null){
        setCoursesCompleted(0);
    }
}



// This function takes in a parameter to set the user's language and store it locally
function setLanguage(language) {
    localStorage.setItem("user_language", language);
    jQuery("#activeLang").text(language);
}

// This function returns the language stored locally
function getLanguage() {
    return localStorage.getItem("user_language");
}



// Set the number for the training course the user last viewed
function setCourseToView(course) {
    localStorage.setItem("course_to_view", course);
}

// Get the number of the course last viewed by the user
function getCourseToView() {
    return localStorage.getItem("course_to_view");
}



// Set the number of courses completed by a user
function setCoursesCompleted(courses) {
        localStorage.setItem("courses_completed", courses);
}

// Get the number of courses completed by a user
function getCoursesCompleted() {
        return localStorage.getItem("courses_completed");
}