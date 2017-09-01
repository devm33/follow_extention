(function ($) {
  'use strict';

  var friends = {};
  var interval;
  const regex = /facebook.com\/(\S+)\?.*/g;

  function send_new_friends() {
    var new_friends = {};
    $('[data-testid="friend_list_item"] > a').each(function() {
      let m = regex.exec(this.href);
      if(m !== null && !friends.hasOwnProperty(m[1])) {
        let user = m[1];
        new_friends[user] = this.href;
        friends[user] = this.href;
      }
    });
    if(Object.keys(new_friends).length === 0) {
      return false;
    }
    chrome.runtime.sendMessage({friends: new_friends}, function() {});
    return true;
  }


  function scroll_bottom() {
    if(!send_new_friends()) {
      clearInterval(interval);
    }
    $(body).scrollTop(Number.MAX_SAFE_INTEGER);
  }

  interval = setInterval(scroll_bottom, 1000);

}(jQuery$));
