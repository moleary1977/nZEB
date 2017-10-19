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
                        jQuery("#menu_home").append(pack[element].menu_home);
                        jQuery("#logout").append(pack[element].menu_logout);
                        jQuery('.menu_about').append(pack[element].menu_about);
                        jQuery('.menu_training').append(pack[element].menu_training);
                        jQuery('.menu_search').append(pack[element].menu_search);
                        jQuery('.menu_links').append(pack[element].menu_links);
                        
                        // If homepage with menu subtitles
                        if (jQuery('#subtitles_on_page').length) {                            
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

                        // If profile page .append(pack[element].)
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
                            jQuery('#country_disabled').append(pack[element].country_disabled);
                            jQuery('#country_ir').append(pack[element].country_ir);
                            jQuery('#country_en').append(pack[element].country_en);
                            jQuery('#country_bg').append(pack[element].country_bg);
                            jQuery('#country_cs').append(pack[element].country_cs);
                            jQuery('#country_ro').append(pack[element].country_ro);
                            jQuery('#country_tr').append(pack[element].country_tr);
                            jQuery('#country_uk').append(pack[element].country_uk);
                            jQuery('#label_country').append(pack[element].label_country);
                            jQuery('#interest_disabled').append(pack[element].interest_disabled);
                            jQuery('#expertise_disabled').append(pack[element].expertise_disabled);
                            jQuery('.ie_a').append(pack[element].ie_a);
                            jQuery('.ie_b').append(pack[element].ie_b);
                            jQuery('.ie_c').append(pack[element].ie_c);
                            jQuery('.ie_d').append(pack[element].ie_d);
                            jQuery('.ie_e').append(pack[element].ie_e);
                            jQuery('.ie_f').append(pack[element].ie_f);
                            jQuery('#label_interest').append(pack[element].label_interest);
                            jQuery('#label_expertise').append(pack[element].label_expertise);
                            jQuery('#update').append(pack[element].update_button);     
                            jQuery('#achievement_heading').append(pack[element].achievement_heading);
                            jQuery('#silver').after('<p>'+pack[element].eighty+'</p>');
                            jQuery('#gold').after('<p>'+pack[element].hundred+'</p>');
                            jQuery('#no_quizzes').append(pack[element].no_quizzes);
                            
                        }                        
                        // If search page
                        if (jQuery('#search_on_page').length) {
                            
                        }  
                        // If training page
                        if (jQuery('#training_on_page').length) {
                            
                        }  
                    });
                }
            })
        });
    }

};