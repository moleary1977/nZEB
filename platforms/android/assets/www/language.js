document.addEventListener("deviceready", loadLanguagePack, false);


function loadLanguagePack() {

    // if the cookie exists, the user is logged in
    if (document.cookie) {
        lang = getLanguage();
        url = 'language.json';

        // get the json data from the url
        jQuery.getJSON(url, function (json) {
            // loop through the json
            jQuery.each(json, function (language_pack, pack) {
                // If the user's language matches a language package
                if (language_pack === lang) {
                    // loop through pack
                    jQuery.each(pack, function(element, text){

                        // These menu items will always exist
                        jQuery("#menu_home").html("").append('<img src="./res/icons/home.png">'+pack[element].menu_home);
                        jQuery("#logout").text("").append('<img src="./res/icons/logout.png">'+pack[element].menu_logout);
                        jQuery('#menu_about').text("").append('<img src="./res/icons/info.png">'+pack[element].menu_about);
                        jQuery('#menu_training').text("").append('<img src="./res/icons/blackboard.png">'+pack[element].menu_training);
                        jQuery('#menu_search').text("").append('<img src="./res/icons/group.png">'+pack[element].menu_search);
                        jQuery('#menu_links').text("").append('<img src="./res/icons/link.png">'+pack[element].menu_links);
                        
                        // If homepage with menu subtitles
                        if (jQuery('#subtitles_on_page').length) {                   
                            jQuery('#front_menu_about').text("").append(pack[element].menu_about);
                            jQuery('#front_menu_training').text("").append(pack[element].menu_training);
                            jQuery('#front_menu_search').text("").append(pack[element].menu_search);
                            jQuery('#front_menu_links').text("").append(pack[element].menu_links);
                            jQuery('#subtitle_about').append(pack[element].subtitle_about);
                            jQuery('#subtitle_training').append(pack[element].subtitle_training);
                            jQuery('#subtitle_search').append(pack[element].subtitle_search);
                            jQuery('#subtitle_links').append(pack[element].subtitle_links);
                            if(getCoursesCompleted() == 0){
                                jQuery("#menu_bottom a").append(pack[element].menu_bottom_start);
                            } else {
                                jQuery("#menu_bottom a").append(pack[element].menu_bottom_continue);
                            }
                        }

                        // If profile page
                        if (jQuery('#profile_on_page').length) {
                            jQuery('#profile_heading').append(pack[element].profile_heading);
                            jQuery('#first_name').attr('placeholder', pack[element].input_firstname);
                            jQuery('#label_firstname').append(pack[element].label_firstname);
                            jQuery('#last_name').attr('placeholder', pack[element].input_lastname);
                            jQuery('#label_lastname').append(pack[element].label_lastname);
                            jQuery('#phone').attr('placeholder', pack[element].input_tel);
                            jQuery('#label_tel').append(pack[element].label_tel);
                            jQuery('#lang_disabled').append(pack[element].lang_disabled);
                            jQuery('#lang_en').append(pack[element].lang_en);
                            jQuery('#lang_bg').append(pack[element].lang_bg);
                            jQuery('#lang_cs').append(pack[element].lang_cs);
                            jQuery('#lang_ro').append(pack[element].lang_ro);
                            jQuery('#lang_tr').append(pack[element].lang_tr);
                            jQuery('#lang_uk').append(pack[element].lang_uk);
                            jQuery('#label_lang').append(pack[element].label_lang);
                            
                            jQuery('#update').append(pack[element].update_button);     
                            jQuery('#achievement_heading').append(pack[element].achievement_heading);
                            jQuery('#bronze').after('<p>'+pack[element].eighty+'</p>');
                            jQuery('#silver').after('<p>'+pack[element].hundred+'</p>');
                            jQuery('#gold').after('<p>'+pack[element].overall_pass+'</p>');
                            jQuery('#no_quizzes').append(pack[element].no_quizzes);
                            
                        }     

                        // If interest and expertise selection on page
                        if (jQuery('#ie_on_page').length) {
                            jQuery('#interest_disabled').text("").append(pack[element].interest_disabled);
                            jQuery('#expertise_disabled').text("").append(pack[element].expertise_disabled);
                            jQuery('.ie_a').text("").append(pack[element].ie_a);
                            jQuery('.ie_b').text("").append(pack[element].ie_b);
                            jQuery('.ie_c').text("").append(pack[element].ie_c);
                            jQuery('.ie_d').text("").append(pack[element].ie_d);
                            jQuery('.ie_e').text("").append(pack[element].ie_e);
                            jQuery('.ie_f').text("").append(pack[element].ie_f);
                            jQuery('#label_interest').text("").append(pack[element].label_interest);
                            jQuery('#label_expertise').text("").append(pack[element].label_expertise);
                        }

                        // If country selection is on page                        
                        if (jQuery('#country_on_page').length) {
                            jQuery('#country_disabled').text("").append(pack[element].country_disabled);
                            jQuery('#country_ir').text("").append(pack[element].country_ir);
                            jQuery('#country_en').text("").append(pack[element].country_en);
                            jQuery('#country_bg').text("").append(pack[element].country_bg);
                            jQuery('#country_cs').text("").append(pack[element].country_cs);
                            jQuery('#country_ro').text("").append(pack[element].country_ro);
                            jQuery('#country_tr').text("").append(pack[element].country_tr);
                            jQuery('#country_uk').text("").append(pack[element].country_uk);
                            jQuery('#label_country').text("").append(pack[element].label_country);
                        }

                        // If search page
                        if (jQuery('#search_on_page').length) {
                            jQuery('#search_heading').text("").append(pack[element].search_heading);
                            jQuery('#name').attr('placeholder', '').attr('placeholder', pack[element].input_membername);
                            jQuery('#label_name').text("").append(pack[element].label_membername);
                            jQuery('#search').text("").append(pack[element].search_button);
                        }  

                        // If results are on the page
                        if (jQuery('#results_on_page').length) {
                            jQuery('.results h1').append(pack[element].results_heading);
                            jQuery('.results th#th_name').append(pack[element].th_name);
                            jQuery('.results th#th_interest').append(pack[element].th_interest);
                            jQuery('.results th#th_expertise').append(pack[element].th_expertise);
                            jQuery('.results th#th_country').append(pack[element].th_country);
                            jQuery('.results button').append(pack[element].results_button);
                        }

                        // If training hub page
                        if (jQuery('#training_hub').length) {
                            jQuery('#hub').append(pack[element].training_hub_heading);
                            jQuery('#quiz_info').append(pack[element].quiz_info);
                            jQuery('#take_course').append(pack[element].take_courses_heading);
                            jQuery('#courses_complete').append(pack[element].courses_complete_heading);

                            jQuery("a.course").text(function(index, text) {
                                return text.replace("Course", pack[element].course);
                            });

                            // if all courses completed
                            jQuery('.complete').append(pack[element].complete);
                            // if some courses completed
                            jQuery('.incomplete').text(pack[element].incomplete);
                            // if no courses completed
                            jQuery('.start').append(pack[element].start);

                        }  

                        // If training content page
                        if (jQuery('#training_content').length) {
                            jQuery('.take-now').text(pack[element].take_quiz);
                            jQuery('.completed-courses').text(pack[element].completed_quizzes);
                            jQuery('.submit').text(pack[element].submit_answer);
                            jQuery('#th_total').text(pack[element].th_total);
                            jQuery('#th_correct').text(pack[element].th_correct);
                            jQuery('#th_wrong').text(pack[element].th_wrong);
                            jQuery('#th_score').text(pack[element].th_score);
                            jQuery('#th_overall').text(pack[element].th_overall);
                            jQuery('#result').text(pack[element].result_tab);
                            jQuery('.repeat').text(pack[element].repeat);
                            jQuery('.retry').text(pack[element].retry);
                            jQuery('.review').text(pack[element].review);
                            jQuery('#continue').text(pack[element].continue_next);
                            jQuery('.img-tip').text(pack[element].img_tip);
                        }
                    });
                }
            })
        });
    }

};