var React = require("react");
var ReactRouter = require("react-router");

var View = ReactRouter.View;
var Link = ReactRouter.Link;
var Image = ReactRouter.Image;
//<Image source="http://www.freeimages.com/photo/old-and-new-1426293" />
// Home page, which shows Login and Register buttons
var Home = React.createClass({
  render: function() {
    return (
      <div className="container center">
	
	<h2>Welcome to the site that will read aloud<br/> anything with NO ads!</h2>
	<p>Sign in to be able to copy and paste text, hear them read aloud, and save them for later:</p>
        
        <Link className="btn btn-success center" to="login">Sign in</Link>
		<p></p>
		<span>
		OR
		</span>
		<p></p>	
	<Link className="btn btn-warning" to="register">Create an Account</Link>

	<p></p>
	<img  src="http://images.freeimages.com/images/previews/54f/old-and-new-1426293.jpg" alt="Book with Headphones" length="500" width="500"/>
      </div>
    );
  }
});

module.exports = Home;
