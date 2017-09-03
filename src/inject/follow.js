(function ($) {
  'use strict';

  function follow() {
    // click the follow button if it's there
    var follows = $('.fbTimelineTopSection a:contains("Follow")');
    if(follows.length > 0) {
      follows[0].click();

      // there might be a confirm popup, wait a tic and check
      setTimeout(function() {
        var confirm = $('button:contains("Confirm")');
        if(confirm.length > 0) {
          confirm[0].click();
        }
        markFollowed(10);
      }, 2000);
    } else {
      markFollowed(0);
    }
  }

  function markFollowed(wait) {
    // wait a few seconds then tell bg to follow the next friend
    setTimeout(function() {
      chrome.runtime.sendMessage({followed: true}, function() {});
    }, 10 * wait);
  }

  // wait a second then click follow
  setTimeout(follow, 1000);
}(jQuery));
