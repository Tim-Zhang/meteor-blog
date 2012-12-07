Meteor.publish('admin', function() {
  return Meteor.users.find({});
});
Articles = new Meteor.Collection('articles');
Meteor.publish('test', function () {
  return Articles.find({});
});
