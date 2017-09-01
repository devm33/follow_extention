



function followNextFriend() {
  chrome.storage.local.get("friends", function(friends) {
    for(user in friends) {
      if(!friends[user].follow) {
        chrome.tabs.create({active: false, url: friends[user].href});
        return;
      }
    }
  });
}

function saveFriends(new_friends) {
  chrome.storage.local.get("friends", function(friends) {
    var callback = function() {};
    if(!friends) {
      // If these are the first friends need to start following process.
      friends = {};
      callback = followNextFriend;
    }
    for(var user in new_friends) {
      if(!friends.hasOwnProperty(user)) {
        friends[user] = { href: new_friends[user], follow: false };
      }
    }
    chrome.storage.local.set({friends: friends}, callback);
  });
}

function saveFollow(tab) {
  chrome.storage.local.get("friends", function(friends) {
    const regex = /facebook.com\/(\S+)\?.*/g;
    let m = regex.exec(tab.url);
    let username = m[1];
    friends[username].follow = true;
    chrome.tabs.remove(tab.index);
    chrome.storage.local.set({friends: friends}, followNextFriend);
  });
}

chrome.runtime.onMessage.addListener(function(req, sender) {
  if(req.hasOwnProperty("friends")) {
    saveFriends(req.friends);
  } else {
    saveFollow(sender.tab);
  }
});
