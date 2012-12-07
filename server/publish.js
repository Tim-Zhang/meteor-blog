Meteor.publish('admin', function() {
  return Meteor.users.find({});
});
Articles = new Meteor.Collection('articles');
Meteor.publish('articles', function () {
  return Articles.find({});
});
