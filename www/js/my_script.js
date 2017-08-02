document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    var url = "https://webhq.ie/wp-json/wp/v2/posts";

    jQuery.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        crossDomain: true,
        success: function(data){
            jQuery.each(data, function(index, value) {
                console.log(value);
                jQuery('#listview').append('<li>' +
                    '<h3>Post Title: '+ value.title.rendered +'</h3>' +
                    '<p>Post Content: '+ value.content.rendered +'</p></li>');

            });
        }
    });
}

// $.getJSON(url, function (result) {
    //     alert(result)
    //     $.each(result.posts, function (i, response) {    
    //         $("#listview").append("<li>" + response + "</li>");
    //     });
    // });