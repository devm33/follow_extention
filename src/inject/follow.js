(function ($) {
  'use strict';

  var follows = $('a:contains("Follow")');

  if(follows.length > 0) {
    follows[0].click();
  }

  chrome.runtime.sendMessage({followed: true}, function() {});

}(jQuery));
