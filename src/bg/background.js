
function followNextFriend(friends) {
  for(user in friends) {
    if(!friends[user].follow) {
      console.log('following ' + user, friends[user]);
      chrome.tabs.create({active: false, url: friends[user].href});
      return;
    }
  }
  console.log('no one left to follow, quitting');
  chrome.storage.local.remove('friends');
}

function saveFriends(new_friends, friends) {
  var callback = function() {};
  if(!friends) {
    // If these are the first friends need to start following process.
    friends = {};
    callback = function() {
      followNextFriend(friends);
    };
  }
  for(var user in new_friends) {
    if(!friends.hasOwnProperty(user)) {
      friends[user] = { href: new_friends[user], follow: false };
    }
  }
  chrome.storage.local.set({friends: friends}, callback);
}

function saveFollow(tab, friends) {
  const regex = /facebook\.com\/([^/?]+)/g;
  let m = regex.exec(tab.url);
  let username = m[1];
  friends[username].follow = true;
  chrome.tabs.remove(tab.id);
  chrome.storage.local.set({friends: friends}, function() {
    followNextFriend(friends);
  });
}

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  console.log('received message', req);
  chrome.storage.local.get(null, function(data) {
    if(req.hasOwnProperty("friends")) {
      saveFriends(req.friends, data.friends);
    } else {
      saveFollow(sender.tab, data.friends);
    }
    sendResponse();
  });
});
