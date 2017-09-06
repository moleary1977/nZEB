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
    jQuery('div#results')
        .append("<table class='table'><tbody></tbody></table>")
    // add continue btn
        .append("<a onclick='setContentView(\"Material\")' class='btn btn-block elegant-color white-text' href='./training-content.html'>Continue to next course</a>");

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

        jQuery('div.tab-content')
            .append("<div class='alert alert-info'><a onclick='feedback()'>&#9660; Give feedback?</a></div>")    
            .append("<div class='feedback'></div>");
        jQuery('div.feedback')
            .append("<h2><span id='feedback'>Feedback</span></h2><hr>")    
            .append("<select name='rating' id='rating'></select>")
            .append("<label for='rating'>How satisfied are you with this training unit?</label>")
            .append("<input type='text' name='comments' id='comments'>")
            .append("<label for='comments'>Additional Comments</label>")
            .append("<button id='submit-feedback' class='btn btn-block elegant-color white-text' onclick='saveUserFeedback()'>Submit Feedback</button>")
            .hide();
        
        jQuery('div.feedback select')
            .append("<option selected disabled>Select rating</option>")    
            .append("<option value='1'>1 - Very unsatisfied</option>")
            .append("<option value='2'>2 - Unsatisfied</option>")
            .append("<option value='3'>3 - No opinion either way</option>")
            .append("<option value='4'>4 - Satisfied</option>")
            .append("<option value='5'>5 - Very satisfied</option>");
        
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

    saveResults();
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
            console.log(response);
            console.log("Getting a response, server success");
            jQuery.ajax({
                url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'iwhq_get_courses_completed',
                    user_id: current_user_id,
                    type: 'POST',
                    dataType: 'json',
                    crossDomain: true
                },
                success: function (data) {
                    setCoursesCompleted(data)
                }
            })

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
            //console.log(JSON.stringify(data));
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
            jQuery("#phone").val(data.phone);
            jQuery("#language > option").each(function () {
                if (jQuery(this).val() === lang) {
                    jQuery(this).attr("selected", "selected");
                }
            });
            jQuery("#country > option").each(function () {
                if (jQuery(this).val() === data.country) {
                    jQuery(this).attr("selected", "selected");
                }
            });
            jQuery("#interest > option").each(function () {
                if (jQuery(this).val() === data.interest) {
                    jQuery(this).attr("selected", "selected");
                }
            });
            jQuery("#expertise > option").each(function () {
                if (jQuery(this).val() === data.expertise) {
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
    // var new_email = jQuery("#email").val();
    var new_phone = jQuery("#phone").val();
    var lang = jQuery("#language").val();
    var new_country = jQuery("#country").val();
    var new_interest = jQuery('#interest').val();
    var new_expertise = jQuery('#expertise').val();

    setLanguage(lang);

    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_update_user_profile',
            user_id: current_user_id,
            first_name: new_first_name,
            last_name: new_last_name,
            // email: new_email,
            phone: new_phone,
            language: lang,
            country: new_country,
            interest: new_interest,
            expertise: new_expertise,
            dataType: 'json',
            crossDomain: true
        },
        success: function (response) {
            console.log("Getting a response, server success");
            jQuery("div.alert-success").detach();
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
    
    // if we have values    
    if (jQuery("div.feedback select").val() && jQuery("div.feedback #comments").val()) {

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
    } else {
        jQuery("div.alert-warning").detach();
        jQuery("div.feedback hr").after("<div class='alert alert-danger'>Please fill in the fields</div>");
    }

   
}

// This function gets members 
function getMembers() {

    jQuery(".search").hide();
        jQuery(".content").append("<div class='results'></div>");
        jQuery(".results")
            .append("<h1>Results</h1><hr>")
            .append("<table class='table'><thead></thead><tbody></tbody></table>")
            .append("<button class='btn btn-block elegant-color white-text' onclick='searchAgain()' id='search'>Search Again</button>");
        jQuery(".results table thead")
            .append("<tr></tr>");
        jQuery(".results table thead tr")
            .append("<th>Name</th>")
            .append("<th>Area of Interest</th>")
            .append("<th>Service</th>")
            .append("<th>Country</th>");

    // This ajax request gets data belonging to each user subscriber
    // such as id, email and display name
    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_get_members_data',
            dataType: 'jsonp',
            crossDomain: true
        },
        // on successful reqest
        success: function (data) {

            data = JSON.parse(data);
            // Loop through the data so we can get the individual items
            jQuery.each(data, function (user, user_data) {

                jQuery(".results table tbody")
            
                var id = user_data.data.ID; // ID
                var user_email = user_data.data.user_email; // USER_EMAIL
                var display_name = user_data.data.display_name; // DISPLAY_NAME
                
                // We have the user's ID, with this we want to get each user's meta data
                // which will have the information to search through
                jQuery.ajax({
                    url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
                    type: 'POST',
                    data: {
                        action: 'iwhq_get_members_meta',
                        user_id: id,
                        dataType: 'jsonp',
                        crossDomain: true
                    },
                    success: function (meta_data) {

                        meta_data = JSON.parse(meta_data);
                        var nickname = meta_data.nickname[0];
                        var name = meta_data.first_name[0] + " " + meta_data.last_name[0];
                        console.log(name);

                        jQuery(".results table tbody")
                            .append("<tr> <td>"+display_name+"</td> <td>Area of Interest</td> <td>Service</td> <td>Country</td> </tr>");

                    },        
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (textStatus === "timeout") {
                            alert("Call has timed out"); //Handle the timeout
                        } else {
                            alert("Another error was returned" + errorThrown); //Handle other error type
                        }
                    }
                });
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

// this function gets the users achievement medals
function getMedals() {
    var $silver = jQuery("#silver");
    var $gold = jQuery("#gold");
    var user = localStorage.getItem("user_id");

    jQuery.ajax({
        url: 'http://www.webhq.ie/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
            action: 'iwhq_get_quiz_results',
            user_id: user,
            dataType: 'jsonp',
            crossDomain: true
        },
        success: function (results) {

            var silver = 0;
            var gold = 0;

            if (results == "No results") {
                jQuery(".content").append("<div class='alert alert-info'>You have not attempted any quizzes. Take your <a href='./training-content.html'>first quiz</a> now.</div>");
            } else {
                results = JSON.parse(results);

                for (i in results) {
                    console.log(results[i].grade + "% in Quiz " + results[i].quiz_no);
                    if (results[i].grade == 80) {
                        silver++;
                    } else if (results[i].grade == 100) {
                        gold++;
                    }
                }
            }

            if (silver == 0) {
                $silver.css('opacity', 0.2);
            }

            if (gold == 0) {
                $gold.css('opacity', 0.2);
            }

            $silver.after("<p>You have an 80% grade in " + silver + "/7 quizzes</p>");
            $gold.after("<p>You have 100% grade in " + gold + "/7 quizzes</p>");

            console.log("Silver: " + silver);
            console.log("Gold: " + gold);
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
    document.getElementById("mySidenav").style.width = "80%";
}

// This function closes the sidebar menu
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function searchAgain() {
    jQuery(".results").detach();
    jQuery(".search").show();
}

function feedback() {
    jQuery("div.feedback").toggle("slow");
    jQuery("div.feedback button").trigger('focus');
}

jQuery("a#logout").on("click", function () {
    document.cookie += ";expires=Thu, 01 Jan 1970 00:00:00 UTC;";
});