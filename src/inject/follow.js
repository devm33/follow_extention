(function ($) {
  'use strict';

  function follow() {
    // click the follow button if it's there
    var follows = $('.fbTimelineTopSection a:contains("Follow")');
    if(follows.length > 0) {
      follows[0].click();
      confirm();
    } else {
      markFollowed(0);
    }
  }

  function confirm() {
    // there might be a confirm popup, wait a few and check
    setTimeout(function() {
      var confirm = $('button:contains("Confirm")');
      if(confirm.length > 0) {
        confirm[0].click();
      }
      markFollowed(10);
    }, 2000);
  }

  function markFollowed(wait) {
    // wait a few seconds then tell bg to follow the next friend
    setTimeout(function() {
      chrome.runtime.sendMessage({followed: true}, function() {});
    }, 1000 * wait);
  }

  // wait a second then click follow
  setTimeout(follow, 1000);
}(jQuery));

/* clear all timeouts:
var Id = window.setTimout(function(){}, 0); while(id—) { clearTimeout(id); }
*/
