$(document).ready(function(){
    var url="http://www.webhq.ie/?json=get_recent_posts";
    $.getJSON(url,function(result){
        $.each(result.posts, function(i, response){
        var title = response.title;
        var content = response.content;
        var date = response.date;
        $("#listview").append("<li><h3>"+title+"</h3><div>"+content+date+"</div></li>");
        });
    });
});
