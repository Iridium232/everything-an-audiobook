var React = require('react')
var ReactDOM = require('react-dom');
// test
var FancyComponent = require('./FancyComponent');
var RandomNumber = require('./RandomNumber');
var ServerInteractionComponent = require('./ServerInteractionComponent');

// The component to be rendered
var App = React.createClass({
    handleServerChange: function (newNumber) {
        console.log(`Wow, looked like the number changed to ${newNumber}!`)
    },

    render: function() {
        return (<div>
            <FancyComponent name="fancy #1"/>
            <FancyComponent name="fancy #2" fancyColor="green"/>
            <RandomNumber />
            <ServerInteractionComponent onChange={this.handleServerChange} />
        </div>)
    }
})

debugger;

// Only needs to be called once.
ReactDOM.render(<App />, document.querySelector('.app-container'))