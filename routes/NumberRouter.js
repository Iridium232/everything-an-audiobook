var express = require('express');
var router = express.Router();
var PersistentNumber = require('../models/Number');

// Routes are relative - comes from app.use('/number')
router.get('/', function(req, res) {
    PersistentNumber.findOne(function(err, number) {
        console.log(number)

        if (number) {
            res.send({
                number: number.value
            })
        } else {
            res.send({
                number: 'Does not exist.'
            })
        }
    });
});

router.post('/', incrementNumber);

function incrementNumber (req, res) {
    PersistentNumber.findOne(function(err, number) {
        if (number) {
            var newNumber = number.value + 1;
            PersistentNumber.findByIdAndUpdate(number._id, {
                value: newNumber
            }, function(){
                res.send("Number updated.")
            });
        } else {
            var firstNumber = new PersistentNumber({value: 0});
            firstNumber.save(function(){
                res.send("New number saved.")
            })
        }
    });
}

module.exports = router;
