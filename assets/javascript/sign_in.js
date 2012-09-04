// session_login = function () {
//   // $.ajax({
//   //   "async": true,
//   //   "cache": false,
//   //   "contentType": "application/x-www-form-urlencoded",
//   //   "data": {
//   //     'username': 'zeta@groupon.com',
//   //     'password': '>password',
//   //     'client_id': config.client_id
//   //   },
//   //   "timeout": config.auth.request_timeout,
//   //   "type": "POST",
//   //   "url": config.auth.endpoint_login
//   // });
// };

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
  $("#sign_in_form").text(localStorage["username"]);
  $("#sign_in").attr("class", "signed_in");
  $("#sign_in").bind("click", sign_out);
};

sign_in = function() {
  disable_sign_in_form();
  $("#feedback").text("");
  $("#loader").html("<img src=\"assets/images/loader.gif\"/>");

  username = $("#username").val();
  password = $("#password").val();
  if (username != "" && password != "") {
    localStorage["signed_in"] = "true";
    localStorage["username"] = username;
    $("#loader").html("");
    display_sign_out_form();
  } else {
    $("#loader").html("");
    $("#feedback").text("Wrong username name or password");
    enable_sign_in_form();
  }
};

sign_out = function() {
  $("#sign_in").unbind("click");
  display_sign_in_form();
  localStorage["signed_in"] = "false";
  localStorage["username"] = null;
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
