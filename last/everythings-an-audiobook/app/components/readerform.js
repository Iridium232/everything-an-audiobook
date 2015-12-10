var React = require("react");

var api = require("./api.js");

// Component with the Reader form
var readerform = React.createClass({

  //Reads the text in the box
  readText: function() {
    var thetext = this.refs.thetext.value;
    if (!thetext){
      alert("Please enter some text.");
      return;
    }
    this.readWithVozme(thetext)
    return;
  },
  //Save the text under the name from the user
  saveText: function() {
  var textstuff = this.refs.thetext.value;
  if (!textstuff){
    alert("Please enter some text.");
    return;
  }
  var textname = prompt("Please give a name for this text", "Unnamed Text");
  api.addItem(textname, textstuff, this.props.reload)
},
  //Fetch mp3 from Vozme service
  readWithVozme: function(text){
  var lang = 'en';
  var gn = 'ml';
  var tgt = 'voice_'+parseInt(Math.random()*100000);
  console.log(tgt);
  var d = window.document;
  var txt = text;
  create_form(d,txt,lang,gn,tgt);
  return false;
},

  // render the item entry area
  render: function() {
    return (
   <div>
      <header id="input">
        <form id="item-form" name="itemForm">
          <textarea type="text" rows="5" className="input-large" id="new-text" ref="thetext" placeholder="Paste text to read here" autoFocus={true} />
	<p></p>
	<button className="btn btn-primary" onClick={this.readText}>READ!</button>
	<span> </span>
        <button className="btn btn-primary" onClick={this.saveText}>Save this text for later</button>
        </form>
      </header>
        <p>
		There is a 10,000 character cutoff in the reader. To read a long text, save the chapters separately.
        </p>
        <p>
 		Double click a saved text from the list below the reader to open it:
        </p>
   </div>
    );

  }
});



module.exports = readerform;
