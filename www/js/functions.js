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
        var current_user_id = localStorage.getItem("user_id");

        var url = 'http://www.webhq.ie/api/user/get_user_meta/?cookie=' + document.cookie + '&user_id=' + current_user_id + '&insecure=cool&meta_key=courses_completed';

        jQuery.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            success: function (data) {
                setCoursesCompleted(data.courses_completed);
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



// This function shows the result of a user's attempt at a quiz
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
    jQuery('div#results table tbody')
        .append('<tr><th>Total questions</th><td>5</td></tr>')
        .append('<tr><th>Correct answers</th><td>' + correct_answers + '</td></tr>')
        .append('<tr><th>Wrong answers</th><td>' + wrong_answers + '</td></tr>')
        .append('<tr><th>Total score</th><td>' + grade + '%</td></tr>')
        .append('<tr><th>Overall result</th><td>' + result + '</td></tr>');
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

        jQuery('div#results').append("<div class='feedback'></div>");
        jQuery('div.feedback')
            .append("<h2>Feedback</h2><hr>")
            .append("<select name='rating' id='rating'></select>")
            .append("<label for='rating'>How satisfied are you with this training unit?</label>")
            .append("<input type='text' name='comments' id='comments'>")
            .append("<label for='comments'>Additional Comments</label>")
            .append("<button class='btn btn-block elegant-color white-text' onclick='saveUserFeedback()'>Submit Feedback</button>");
        
        jQuery('div.feedback select')
            .append("<option selected disabled>Select rating</option>")    
            .append("<option value='1'>1 - Very unsatisfied</option>")
            .append("<option value='2'>2 - Unsatisfied</option>")
            .append("<option value='3'>3 - No opinion either way</option>")
            .append("<option value='4'>4 - Satisfied</option>")
            .append("<option value='5'>5 - Very satisfied</option>");
        
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

// This function saves the user's quiz results to their user meta data
function saveResults() {

    // Save the user's grade to user meta

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

    // Save the user's current courses completed number to user meta

    var courses_completed = getCoursesCompleted();

    jQuery.ajax({
        type: "POST",
        url: "http://www.webhq.ie/api/user/update_user_meta/?",
        data: "cookie=" + document.cookie + "&meta_key=courses_completed&meta_value=" + courses_completed + "&insecure=cool",
        crossDomain: true,
        cache: false,
        success: function (data) {
            console.log(JSON.stringify(data));
        },
        error: function (x, e) {
            if (x.status == 0) {
                alert('You are offline!!\n Please Check Your Network.');
            } else if (x.status == 404) {
                alert('Requested URL not found.');
            } else if (x.status == 500) {
                alert('Internel Server Error.');
            } else if (e == 'parsererror') {
                alert('Error.\nParsing JSON Request failed.');
            } else if (e == 'timeout') {
                alert('Request Time out.');
            } else {
                alert('Unknown Error.\n' + x.responseText);
            }
        }
    });
}

// This function gets the data for the logged in user's profile
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

// This function updates the logged in user's profile details
function updateUserProfile() {

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

// This function saves the user's feedback
function saveUserFeedback(){
    // Save the user's feedback
    var current_user_id = localStorage.getItem("user_id");
    var unit = localStorage.getItem("course_to_view");
    var user_rating = jQuery("div.feedback select").val();
    var additional_comments = jQuery("div.feedback #comments").val();

    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_save_feedback',
            dataType: 'json',
            crossDomain: true
        },
        success: function (response) {
            jQuery('div.feedback').hide();
            jQuery("div#results").append("<div class='alert alert-success'>Feedback submitted</div>");
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

// This function gets members
function getMembers() {

    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_get_members',
            dataType: 'jsonp',
            crossDomain: true
        },
        success: function (data) {
            data = JSON.parse(data);
            jQuery.each(data, function (user, user_data) {
                console.log("----- USER: " + user + " -----");

                var user_id = user_data.data.ID; // ID
                var user_email = user_data.data.user_email; // USER_EMAIL
                var display_name = user_data.data.display_name; // DISPLAY_NAME

                console.log("ID: "+user_id);
                console.log("Email: "+user_email);
                console.log("Display Name: " + display_name);
                
                var url = 'http://www.webhq.ie/api/user/get_user_meta/?cookie=' + document.cookie + '&user_id=' + user_id + '&insecure=cool';
                console.log("User Meta URL: " + url);
                
                // //////////////////////////
                // BELOW DOESN'T GET WHAT WE WANT BECAUSE OF THE COOKIE
                // SO WE NEED TO CREATE AN AJAX REQUEST LIKE THE ONE ABOVE
                // TO RETRIEVE EACH USER'S META DATA
                // //////////////////////////

                // jQuery.ajax({
                //     url: url,
                //     type: 'GET',
                //     dataType: 'jsonp',
                //     crossDomain: true,
                //     success: function (data) {
                //         console.log(data);
                //     },
                //     error: function (jqXHR, textStatus, errorThrown) {
                //         if (textStatus === "timeout") {
                //             alert("Call has timed out"); //Handle the timeout
                //         } else {
                //             alert("Another error was returned" + errorThrown); //Handle other error type
                //         }
                //     }
                // });
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

// This function opens the sidebar menu
function openNav() {
    document.getElementById("mySidenav").style.width = "50%";
}

// This function closes the sidebar menu
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

jQuery("a#logout").on("click", function () {
    document.cookie += ";expires=Thu, 01 Jan 1970 00:00:00 UTC;";
});