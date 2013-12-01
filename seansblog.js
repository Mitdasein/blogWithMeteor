Posts = new Meteor.Collection('posts');


if (Meteor.isClient) {
  //Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_EMAIL' });
  Template.posts.posts = function () {
    return Posts.find({}, {sort: {postDate: -1}}); // This is a Mongo command
    // others: remove(), insert()
    // find() returns all the objects
  };

/*
 Template.newPost.isAdmin = function () {
  if (Meteor.user (currentUser.isAdmin));
  return currentUser.isAdmin;
   Meteor.user()
 };
*/



Template.newPost.isAdmin = function () {
    //var currentUser = Meteor.user();
 //   if (null !== currentUser) {
 //       if ('admin' === currentUser.username) {
    if (null !== Meteor.user()) {
        if ('admin' === Meteor.user().username) {
            return true;
        }
    }
};


// stuff that happens in the newPost template
Template.newPost.events = {

  'click input': function () {
    var post = {
      postDate: new Date(), 
      title: document.getElementById('postTitle').value,
      body: document.getElementById('postBody').value
    };  
    Posts.insert(post);
    document.getElementById('postTitle').value = '';
    document.getElementById('postBody').value = '';
    console.log("insert: " + post);
    }
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


// Accounts.ui.config({
//    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
//  });


/*checks to see if the current user making the request to update is the admin user */

function adminUser(userId) {
  var adminUser = Meteor.users.findOne({username:"admin"});
  return (userId && adminUser && userId === adminUser._id);
}

/*
lists.allow({
  insert: function(userId, doc) {
    return adminUser(userId);
  },
  update: function(userId, docs, fields, modifier) {
    return adminUser(userId);
  },
  remove: function (userId, docs) {
    return adminUser(userId);
  }
});
*/

// From JLowe

/*
Meteor.render(function () {
  return Template.displayPostForm({});
});
*/

var fragment = Meteor.render(
  function() {
    return Template.postForm({});
  }
);
document.getElementById("postForm").appendChild(fragment);
