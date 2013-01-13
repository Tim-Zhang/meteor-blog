Meteor.publish('admin', function() {
  return Meteor.users.find({}, {sort: {createdAt: 1}, fields: {'_id': 1, 'profile': 1, 'createdAt': 1}});
});

var adminId = Meteor.users.findOne({}, {sort: {createdAt: 1}, fields: {'_id': 1, 'profile': 1, 'createdAt': 1}})._id;

Articles = new Meteor.Collection('articles');
Articles.allow({
  insert: function (userId, doc) {
    return (userId === adminId);
  },
  update: function (userId, docs, fields, modifier) {
    return (userId === adminId);
  },
  remove: function (userId, docs) {
    return (userId === adminId);
  }
});
Meteor.publish('articles', function () {
  return Articles.find({});
});
