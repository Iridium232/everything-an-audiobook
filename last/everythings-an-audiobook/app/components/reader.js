var React = require("react");

var api = require("./api.js");

// Reader instructions
var Reader = React.createClass({

  // render the instructions for the reader
  render: function() {
    // true if there are any completed items
    var completed = this.props.items.filter(function(item) {
      return item.completed;
    });
    return (
      <header id="header">
        <div className="row">
          <div className="col-md-12">
            <p><i>You are signed in as: {this.props.name}</i></p>
            <p>
              <span id="list-count" className="label label-default">
		<strong>{this.props.items.length}</strong> Saved Texts
              </span>
            </p>
            <p><i>Copy and paste into the text box to hear it read out loud.</i></p>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = Reader;
