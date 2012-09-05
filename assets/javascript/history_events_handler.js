should_track = function() {
  return localStorage["track"] == "true" && localStorage["signed_in"] == "true";
}

handle_get_window_events_sampling_rate = function(request, sender, sendResponse) {
  sendResponse({window_events_sampling_rate: config.historyse.window_events_sampling_rate});
}

handle_window_event = function(request, sender, sendResponse) {
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
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  if (request.type == 'get_window_events_sampling_rate')
    handle_get_window_events_sampling_rate(request, sender, sendResponse);
  else if (request.type == 'window_event')
    handle_window_event(request, sender, sendResponse);
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

last_tab_id = null;
chrome.tabs.onActivated.addListener(function(activeInfo){
  if (should_track()) {
    request_params = {
      client_created_at: new Date().getTime(),
      tab_id: activeInfo.tabId
    }
    if (last_tab_id != null)
      request_params["last_tab_id"] = last_tab_id;
    console.log(request_params);
  }
  last_tab_id = activeInfo.tabId;
});