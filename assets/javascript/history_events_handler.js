should_track = function() {
  return localStorage["track"] == "true" && localStorage["signed_in"] == "true";
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  if (should_track()) {
    request_params = {
      client_created_at: request.timestamp,
      action_type: request.action,
      tab_id: sender.tab.id,
      user_id: localStorage["user_id"],
      token: localStorage["user_access_token.token"]
    }
    console.log(request_params);
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  if (should_track()) {
    request_params = {
      client_created_at: Math.floor(details.timeStamp/1000),
      request_type: details.type,
      tab_id: details.tabId,
      url: details.url,
      user_id: localStorage["user_id"],
      token: localStorage["user_access_token.token"]
    }
    referer = null;
    for(var key in details.requestHeaders) {
      if(details.requestHeaders[key].name == "Referer"){
        referer = details.requestHeaders[key].value;
        break;
      }
    }
    if(referer)
      request_params["referer"] = referer
    console.log(request_params);
  }
}, {urls: [], types: ["main_frame", "xmlhttprequest"]}, ["requestHeaders"]);
