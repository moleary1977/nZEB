document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {

    alert("Ready to load language");

    // if the cookie exists, the user is logged in
    if (document.cookie) {
        lang = getLanguage();
        url = 'language.json';
        alert("Cookie found - user is logged");
        // get the json data from the url
        jQuery.getJSON(url, function (json) {
            alert("Loading JSON");
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

                        // If profile page

                        // If search page

                        // If training page
                    });
                }
            })
        });
    }

};