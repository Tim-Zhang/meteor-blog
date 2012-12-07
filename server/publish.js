Meteor.publish('admin', function() {
  return Meteor.users.find({}, {sort: {createdAt: 1}});
});
Articles = new Meteor.Collection('articles');
Meteor.publish('articles', function () {
  return Articles.find({});
});
