(function ($) {
  'use strict';

  // click the follow button
  var follows = $('.fbTimelineTopSection a:contains("Follow")');
  if(follows.length > 0) {
    follows[0].click();

    // there might be a confirm popup, wait a tic and check
    setTimeout(function() {
      var confirm = $('button:contains("Confirm")');
      if(confirm.length > 0) {
        confirm[0].click();
      }
      markFollowed();
    }, 200);
  } else {
    markFollowed();
  }

  function markFollowed() {
    setTimeout(function() {
      chrome.runtime.sendMessage({followed: true}, function() {});
    }, 1000);
  }
}(jQuery));
