var Articles = new Meteor.Collection('articles');
var ArticleContent; 
var editor, preview;
//Meteor.subscribe('articles', function() {});
var router = Backbone.Router.extend({
  routes: {
    'edit/:id': 'edit'  
  },
  edit:function(id) {
    console.log('id'); 
  }
});
var r = new router();

Meteor.Router.add({
  '': function() {
    Session.set('view', 'read');
    return 'articles' ;
  },
  '/new': function () {
    Session.set('view', 'new');
    Session.set('article_id', 0);
    return 'new';
  },
  '/edit/:id': function (id) {
    Session.set('view', 'edit');
    Session.set('article_id', id);
    return 'new';
  },
  '/admin': function () {
    Session.set('view', 'admin');
    return 'admin';
  }
});

Template.admin.articleItems = function() {
  return Articles.find({}, {sort: {createdAt: -1}});
}
Template.header.helpers({
  is_admin: function(){
        return Session.equals('view', 'admin');
      }
});
Template.articleItem.createdAt = function() {
  return moment(this.createdAt).fromNow();
}

Template.articleItem.events = {
  'click .icon-remove': function () {
    Articles.remove({_id: this._id});
  },
  'click .new-tag': function () {
    Session.set('adding_tag', this._id);
    //Meteor.flush();
    //$('#edittag-input').focus();
  },
  'blur #edittag-input': function () {
    Session.set('adding_tag', null);
    value = event.target.value;
    saveTag(value, this._id);
  },
  'keyup #edittag-input': function (event) {
     if (event.which == 13) {
       Session.set('adding_tag', null);
       value = event.target.value;
       saveTag(value, this._id);
     }
  }
};

function saveTag(value, id) {
  if (!value) return;
  Articles.update(id, {$addToSet: {tags: value}});
     // Docs.update(this._id, {$addToSet: {tags: value}})
}
Template.articleItem.helpers({
  adding_tag: function () {
    return Session.equals('adding_tag', this._id);
  },
  tags: function () {
   var that = this;
   return _.map(this.tags, function(tag){
      return {tag: tag,article_id: that._id};
    });
  }
});

Template.tag.helpers({
});

Template.tag.events = {
  'click .remove-tag': function () {
    Articles.update(this.article_id, {$pull: {tags: this.tag}});
  },
}
Template.header.events = {
  'click #nav-new-blog' : function () {
    Meteor.Router.to('/new');
  }
};
Template.new.events = {
  'keyup .edit_doc_textarea': function(){
    preview.html(converter.makeHtml(editor.val()));
  },
  'click .save': function(){
     var title = editor.val().split("\n")[0];
     var last = Articles.findOne({}, {sort: {id: -1}});
     var id = Session.get('article_id');

     if (id) { //update
       console.log(id);
       console.log(title);
       Articles.update({id: parseInt(id)}, {$set: {title: title, content: editor.val(), lastModify: new Date().getTime()}});

     } else { //insert
       id = (last && last['id'] || 0) + 1;
       Articles.insert({id: id, title: title, content: editor.val(), createdAt: new Date().getTime()});
     
     }
  },
  'click .cancel': function(){
    Meteor.Router.to('/admin');
  }

};
var converter = new Showdown.converter();
Template.new.rendered = function () {
  editor = $('.edit_doc_textarea');
  preview = $('.doc_preview');
}
Template.new.helpers({
  article: function() {
      return Articles.findOne({id: parseInt(Session.get('article_id'))});
  }
});

Template.articles.articles = function () {
  return Articles.find({}, {sort: {createdAt: -1}});
}
Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});

