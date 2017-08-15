document.addEventListener("deviceready", onDeviceReady, false);

/*
* This function is called when the device is ready
*/
function onDeviceReady() {

    if (getLanguage() == null) {
        jQuery("#activeLang").text("No language selected");
        setLanguage("en");
    } else {
        jQuery("#activeLang").text(getLanguage());
    }

    if (getCourseToView() == null) {
        setCourseToView(0);
    }

    if (getCoursesCompleted() == null){
        setCoursesCompleted(0);
    }

    if (getContentView() == null) {
        setContentView("Material");
    }

    if (getAttempts() == null) {
        setAttempts(3);
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



// Set the view for training content
function setContentView(view) {
    localStorage.setItem("content_view", view)
}

// Get the view for training content
function getContentView() {
    return localStorage.getItem("content_view");
}



// Set the number of quiz attempts
function setAttempts(attempts) {
    localStorage.setItem("attempts", attempts);
}

// Get the number of quiz attempts
function getAttempts() {
    return localStorage.getItem("attempts");
}