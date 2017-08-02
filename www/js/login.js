$(document).ready(function(){
   $("#login").click(function(){
       alert("click");
     var username = $("#username").val();
     var password = $("#password").val();
     var dataString = "username="+username+"&password="+password+"&insecure=cool";
     $.ajax({
       type: "POST",
       url:"http://www.webhq.ie/api/user/generate_auth_cookie/?",
       data: dataString,
       crossDomain: true,
       cache: false,
       success: function(data){
        alert(JSON.stringify(data));
       }
      });
    });
  });