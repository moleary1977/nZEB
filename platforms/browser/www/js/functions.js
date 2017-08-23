document.addEventListener("deviceready", onDeviceReady, false);

/*
* This function is called when the device is ready
*/
function onDeviceReady() {

    if (getLanguage() == null) {
        setLanguage("en");
    }

    if (getCourseToView() == null) {
        setCourseToView(0);
    }

    if (getCoursesCompleted() == null) {
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

// 
function showResults() {
    // calculate the user's grade for that quiz
    var grade = (correct_answers / 5) * 100;
    // decide if its a pass or fail
    var result;
    if (grade < 80) {
        result = "Repeat";
    } else if (grade >= 80) {
        result = "Pass";
    }
    // make anything active not-active 
    jQuery('li').attr("class", "");
    jQuery('div.tab-content > div').attr("class", "tab-pane fade");
    // add a new tab to the top
    jQuery('ul.nav-tabs').append("<li class='active'><a data-toggle='tab' href='#results'>Results</a></li>");
    // add a new content area for the new tab
    jQuery('div.tab-content').append("<div role='tabpanel' class='tab-pane fade active in' id='results'></div>");
    // add a results table to the content area
    jQuery('div#results').append("<table class='table'><tbody></tbody></table>");
    // add information to the table about the user's results
    jQuery('div#results table tbody').append('<tr><th>Total questions</th><td>5</td></tr>');
    jQuery('div#results table tbody').append('<tr><th>Correct answers</th><td>' + correct_answers + '</td></tr>');
    jQuery('div#results table tbody').append('<tr><th>Wrong answers</th><td>' + wrong_answers + '</td></tr>');
    jQuery('div#results table tbody').append('<tr><th>Total score</th><td>' + grade + '%</td></tr>');
    jQuery('div#results table tbody').append('<tr><th>Overall result</th><td>' + result + '</td></tr>');
    // add a button to continue depending on result
    if (result == "Pass") {
        // get the next course
        ++course_to_get
        // if the user is not repeating a course already passed
        if (course_to_get >= courses_completed) {
            // increment the number of completed courses
            setCoursesCompleted(course_to_get);
            // set the next course as the one to view next
            setCourseToView(course_to_get);
        } else {
            // just set the next course as the one to view next
            setCourseToView(course_to_get);
        }
        jQuery('div#results').append("<a onclick='setContentView(\"Material\")' class='btn btn-block elegant-color white-text' href='./training-content.html'>Continue to next course</a>");
    } else if (result == "Repeat") {
        setAttempts(--attempts);
        // if the user still has attempts
        if (attempts > 0) {
            // option to re-attempt the quiz
            jQuery('div#results').append("<a class='btn btn-block elegant-color white-text' href='./training-content.html'>Repeat this quiz</a>");
            // option to review material
            jQuery('div#results').append("<a onclick='setContentView(\"Material\")' class='btn btn-block elegant-color white-text' href='./training-content.html'>Review training material</a>");
            // if they run out of attempts
        } else if (attempts == 0) {
            // get the user to review the material again before trying the quiz
            jQuery('div#results').append("<p>You have repeated this quiz a number of times, we recommened you review the material before trying again</p>")
                .append("<a onclick='setContentView(\"Material\")' class='btn btn-block elegant-color white-text' href='./training-content.html'>Review training material</a>");
        }
    }
}

// 
function saveResults() {

    var latest_grade = (correct_answers / 5) * 100;
    var current_user_id = localStorage.getItem("user_id");

    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_save_quiz_results',
            grade: latest_grade,
            course: course_to_get,
            user_id: current_user_id,
            dataType: 'json',
            crossDomain: true
        },
        success: function (response) {
            console.log("Getting a response, server success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (textStatus === "timeout") {
                alert("Call has timed out"); //Handle the timeout
            } else {
                alert("Another error was returned" + errorThrown); //Handle other error type
            }
        }
    });
}

//
function getUserMeta() {
    var current_user_id = localStorage.getItem("user_id");
    var lang = getLanguage();

    var url = 'http://www.webhq.ie/api/user/get_user_meta/?cookie=' + document.cookie + '&user_id=' + current_user_id + '&insecure=cool';

    jQuery.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {

            jQuery("#first_name").val(data.first_name);
            jQuery("#last_name").val(data.last_name);
            jQuery("#language > option").each(function () {
                if (jQuery(this).val() === lang) {
                    jQuery(this).attr("selected", "selected");
                }
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (textStatus === "timeout") {
                alert("Call has timed out"); //Handle the timeout
            } else {
                alert("Another error was returned" + errorThrown); //Handle other error type
            }
        }
    });
}

function updateUserMeta() {

    var current_user_id = localStorage.getItem("user_id");
    var new_first_name = jQuery("#first_name").val();
    var new_last_name = jQuery("#last_name").val();
    var lang = jQuery("#language").val();

    setLanguage(lang);

    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_update_user_profile',
            user_id: current_user_id,
            first_name: new_first_name,
            last_name: new_last_name,
            dataType: 'json',
            crossDomain: true
        },
        success: function (response) {
            console.log("Getting a response, server success");
            jQuery(".content").prepend("<div class='alert alert-success'>Profile updated</div>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (textStatus === "timeout") {
                alert("Call has timed out"); //Handle the timeout
            } else {
                alert("Another error was returned" + errorThrown); //Handle other error type
            }
        }
    });

}

function openNav() {
    document.getElementById("mySidenav").style.width = "50%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}