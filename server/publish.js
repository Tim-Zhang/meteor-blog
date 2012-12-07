Meteor.publish('admin', function() {
  return Meteor.users.findOne({}, {fields: {'_id': 1, 'username': 1}});
});
Articles = new Meteor.Collection('articles');
Meteor.publish('articles', function () {
  return Articles.find({});
});
