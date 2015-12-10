var mongoose = require('mongoose')

var NumberSchema = mongoose.Schema({
    value: Number
})

var PersistentNumber = mongoose.model('PersistentNumber', NumberSchema);


module.exports = PersistentNumber;
