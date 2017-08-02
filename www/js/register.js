$(document).ready(function(){
    $("#register").click(function(){
    alert("click");

      var display_name = $("#display_name").val();
      var email = $("#email").val();
      var username = $("#username").val();
      var password = $("#password").val();
      $.ajax({
        type: "POST",
        url:"http://www.webhq.ie/api/get_nonce/?controller=user&method=register",
        crossDomain: true,
        cache: false,
        success: function(data){
          var nonce = data.nonce;
          var dataString = "display_name="+display_name+"&email="+email+"&username="+username+"&password="+password+"&nonce="+nonce+"&insecure=cool";
          $.ajax({
            type: "POST",
            url:"http://www.webhq.ie/api/user/register",
            data: dataString,
            crossDomain: true,
            cache: false,
            success: function(data){
              alert(JSON.stringify(data));
            }
          });
         }
       });
     });
 });