'use strict';
var React  = require('react');

var ServerInteractionComponent = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: function(){}
        }
    },
    getInitialState: function () {
        return {
            numberFromServer: 'Haven\'t got a number yet.'
        }
    },

    componentDidMount: function () {
        this.loadNumber()
    },

    incrementNumber: function () {
        // Using jQuery... never actually done server communication without it.
        $.post('/number', this.loadNumber.bind(this, this.props.onChange));
    },

    loadNumber: function(callback) {
        callback = callback || function(){}
        // Using an arrow function here, because otherwise "this" becomes the window.
        $.getJSON('/number', (serverResponse) => {
            this.setState({
                numberFromServer: serverResponse.number
            })

            callback(serverResponse.number)
        })
    },

    render: function() {
        return (
            <div>
                <h1>Number from server</h1>
                <div>Number: {this.state.numberFromServer}</div>
                <button onClick={this.incrementNumber}>increment</button>
            </div>

        );
    }
});

module.exports = ServerInteractionComponent;