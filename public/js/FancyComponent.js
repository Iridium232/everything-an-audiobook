'use strict';

var React  = require('react');

var FancyComponent = React.createClass({
    getDefaultProps: function(){
        return {
            fancyColor: "white",
            name: "no name defined"
        }
    },

    render: function() {
        // You can keep your styles here instead of in a CSS sheet - nice to bundle
        // HTML, CSS, and JS in one file for each component.
        var containerStyle = {
            backgroundColor: this.props.fancyColor
        }

        return (
            <div className="col-md-6 button" style={containerStyle}>
                I am a fancy component. My name is {this.props.name}.
            </div>

        );
    }
});

module.exports = FancyComponent;