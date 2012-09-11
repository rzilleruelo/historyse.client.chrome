events_sampling_rate = 0;
chrome.extension.sendMessage({type: 'get_window_events_sampling_rate'}, function(response){
  events_sampling_rate = response.window_events_sampling_rate;
});

click_last_timestamp_notification = 0;
$(window).click(function(event){
  if (event.timeStamp-click_last_timestamp_notification > events_sampling_rate) {
    click_last_timestamp_notification = event.timeStamp;
    chrome.extension.sendMessage({type: 'window_event', action: "click"});
  }
});

scroll_last_timestamp_notification = 0;
$(window).scroll(function(event){
  if (event.timeStamp-scroll_last_timestamp_notification > events_sampling_rate) {
    scroll_last_timestamp_notification = event.timeStamp;
    chrome.extension.sendMessage({type: 'window_event', action: "scroll"});
  }
});

$(window).focus(function(event){
  chrome.extension.sendMessage({type: 'window_event', action: "focus"});
});

$(window).blur(function(event){
  chrome.extension.sendMessage({type: 'window_event', action: "blur"});
});