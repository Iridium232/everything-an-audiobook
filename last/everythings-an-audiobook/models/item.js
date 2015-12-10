// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

  var User = require('./user.js');

// Item schema
var textSchema = new Schema({
  user: {type: ObjectId, ref: 'users'},
  title: String,
  text: String,
  created: {type: Date, default: Date.now},
  due: {type: Date, default: Date.now},
  completed: Boolean,
});

// ensure schemas use virtual IDs
textSchema.set('toJSON', {
  virtuals: true
});

// add findorCreate
textSchema.plugin(findOrCreate);

// create item
var Item = mongoose.model('texts', textSchema);

module.exports = Item;


