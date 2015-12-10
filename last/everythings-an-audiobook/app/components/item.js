var React = require("react");

require("jquery");
var readerform = require("./readerform.js");
var api = require("./api.js");

// Item shown in the todo list
var Item = React.createClass({
  // initial state
  getInitialState: function () {
    return {
      // editing this item
      editing: false,
      content: this.props.item.text,
      // text saved before editing started
      editText: this.props.item.title
    };
  },
  // set the focus and selection range when this item is updated
  componentDidUpdate: function (prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      var node = this.refs.editField.getDOMNode();
      node.focus();
      node.setSelectionRange(0, node.value.length);
    }
  },

  // called when the delete button is clicked for this saved text
  deleteItem: function() {
    var really = confirm("Do you really want to delete " + this.props.item.title + "?\n(This cannot be undone)");
    if (really)
    {
       api.deleteItem(this.props.item, this.props.reload);
    }
  },
  // called when the text file is double-clicked
  putInReader: function() {
    var readerbox = $("html").find("textarea");
    readerbox[0].value = this.props.item.text;
  },

  // render the Item
  render: function() {
    // construct a list of classes for the item CSS
    var classes = "";
    return (
      <li className={classes}>
        <div className="view">
          <label onDoubleClick={this.putInReader}>{this.props.item.title}</label>
          <button className="destroy" onClick={this.deleteItem}></button>
        </div>
      </li>
    );
  }
});

module.exports = Item;
