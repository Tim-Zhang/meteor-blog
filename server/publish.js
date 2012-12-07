Meteor.publish('admin', function() {
  return Meteor.users.findOne({}, {sort: {createdAt: 1}, fields: {'_id': 1, 'profile': 1, 'createdAt': 1}});
});
Articles = new Meteor.Collection('articles');
Meteor.publish('articles', function () {
  return Articles.find({});
});
