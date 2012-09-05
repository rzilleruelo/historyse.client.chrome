events_sampling_rate = 0;
chrome.extension.sendMessage({type: 'get_window_events_sampling_rate'}, function(response){
  events_sampling_rate = response.window_events_sampling_rate;
});

click_last_notification = 0;
$(window).click(function(event){
  if (event.timeStamp-click_last_notification > events_sampling_rate) {
    click_last_notification = event.timeStamp;
    chrome.extension.sendMessage({type: 'window_event', action: "click", timestamp: event.timeStamp});
  }
});

scroll_last_notification = 0;
$(window).scroll(function(event){
  if (event.timeStamp-scroll_last_notification > events_sampling_rate) {
    scroll_last_notification = event.timeStamp;
    chrome.extension.sendMessage({type: 'window_event', action: "scroll", timestamp: event.timeStamp});
  }
});