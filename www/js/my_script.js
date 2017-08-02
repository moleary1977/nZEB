document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    var url = "http://webhq.ie/wp-json/wp/v2/posts";
    $.getJSON(url, function (result) {
        $.each(result.posts, function (i, response) {
            var title = response.title;
            var content = response.content;
            var date = response.date;
            $("#listview").append("<li><h3>" + title + "</h3><div>" + content + date + "</div></li>");
        });
    });
}