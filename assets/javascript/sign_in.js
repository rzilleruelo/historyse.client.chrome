sign_in_request = function(username, password) {
  if (username == "" || password == "")
    return {success: false, message: "Wrong username or password"};
  var success = false;
  var message = null;
  $.ajax({
    async: false,
    cache: false,
    contentType: "application/x-www-form-urlencoded",
    data: {username: username, password: password, client_id: config.client_id},
    timeout: config.auth.request_timeout,
    type: "POST",
    url: config.auth.endpoint_login,
    complete: function(jqXHR, textStatus) {
      if (jqXHR.status == 201) {
        response = $.parseJSON(jqXHR.responseText);
        localStorage["signed_in"] = "true";
        localStorage["user_name"] = username;
        localStorage["user_id"] = response["user_id"];
        localStorage["user_access_token.token"] = response["access_token"]["token"];
        localStorage["user_access_token.expires_at"] = response["access_token"]["expires_at"];
        localStorage["user_refresh_token.token"] = response["refresh_token"]["token"];
        localStorage["user_refresh_token.expires_at"] = response["refresh_token"]["expires_at"];
        success = true;
      }
      else if (jqXHR.status == 401) {
        message = "Wrong username or password";
      } else {
        message = "The server is down, please try again later";
      }
    }
  });
  return {success: success, message: message};
};

disable_sign_in_form = function() {
  $("#sign_in").unbind("click");
  $("#username").prop("disabled", true);
  $("#password").prop("disabled", true);
  $("#sign_in").attr("class", "signed_out_frozen");
};

enable_sign_in_form = function() {
  $("#sign_in").attr("class", "signed_out");
  $("#password").prop("disabled", false);
  $("#username").prop("disabled", false);
  $("#sign_in").bind("click", sign_in);
};

display_sign_in_form = function() {
  $("#sign_in_form").html(
    "<div>Username</div><div><input id=\"username\" class=\"input\" type=\"text\"/></div><div>Password</div><div><input id=\"password\" class=\"input\" type=\"password\"/></div>"
  ); 
  enable_sign_in_form();
};

display_sign_out_form = function() {
  $("#sign_in_form").text(localStorage["user_name"]);
  $("#sign_in").attr("class", "signed_in");
  $("#sign_in").bind("click", sign_out);
};

sign_in = function() {
  disable_sign_in_form();
  $("#feedback").text("");
  $("#loader").html("<img src=\"assets/images/loader.gif\"/>");
  sign_in_feedback = sign_in_request($("#username").val(), $("#password").val());
  if (sign_in_feedback.success) {
    $("#loader").html("");
    display_sign_out_form();
  } else {
    $("#loader").html("");
    $("#feedback").text(sign_in_feedback.message);
    enable_sign_in_form();
  }
};

sign_out = function() {
  $("#sign_in").unbind("click");
  display_sign_in_form();
  localStorage["signed_in"] = "false";
  localStorage["user_name"] = null;
};

is_signed_in = function() {
  return localStorage["signed_in"] == "true";
};

switch_tracking_status = function() {
  localStorage["track"] = (!(localStorage["track"] == "true")).toString();
};

$(document).ready(function() {
  $("#track_input").bind("change", switch_tracking_status);
  $("#track_input").prop("checked", localStorage["track"] == "true");
  if (is_signed_in())
    display_sign_out_form();
  else
    display_sign_in_form();
});
