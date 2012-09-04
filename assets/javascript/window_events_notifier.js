$(window).click(function(event){
  chrome.extension.sendMessage({action: "click", timestamp: event.timeStamp});
});

$(window).scroll(function(event){
  chrome.extension.sendMessage({action: "scroll", timestamp: event.timeStamp});
});