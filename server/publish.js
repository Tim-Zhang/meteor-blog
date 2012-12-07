Meteor.publish('admin', function() {
  return Metero.user.findOne({}, {sort: {createdAt: -1}});
});
