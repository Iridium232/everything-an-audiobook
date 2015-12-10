'use strict';
var React  = require('react');

var RandomNumber = React.createClass({
    getInitialState: function() {
        return  {
            number: 'No number generated yet.'
        }
    },

    setNewNumber: function() {
        this.setState({
            number: Math.random()
        })
    },

    render: function() {
        return (
            // Don't forget "this.". Otherwise it will be looking for
            // a free function like the one below.
            <div onClick={this.setNewNumber}>
                {this.state.number}
            </div>

        );
    }
});

// function setNewNumber(){

// }
module.exports = RandomNumber;