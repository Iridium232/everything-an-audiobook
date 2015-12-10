var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./app.js");
var Home = require("./home.js");
var List = require("./list.js");
var Login = require("./login.js");
var Register = require("./register.js");
var About = require("./about.js");

require("../css/app.css");
require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");

var routes = (
  <Router>
    <Route name="app" path="/" component ={App}>
      <IndexRoute component = {Home} />
      <Route name="reader" path="/reader" component={List} />
      <Route name="about" path="/about" component={About} />
      <Route name="login" path="/login" component={Login} />
      <Route name="register" path="/register" component={Register} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
