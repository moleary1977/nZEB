document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    
    checkConnection();

    var url="http://www.webhq.ie/?json=get_recent_posts";
    $.getJSON(url,function(result){
        $.each(result.posts, function(i, response){
        var title = response.title;
        var content = response.content;
        var date = response.date;
        $("#listview").append("<li><h3>"+title+"</h3><div>"+content+date+"</div></li>");
        });
    });
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}
