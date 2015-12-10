webpackJsonp([1],{

/***/ 0:
/*!****************************!*\
  !*** ./components/main.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactDOM = __webpack_require__(/*! react-dom */ 158);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	
	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var IndexRoute = ReactRouter.IndexRoute;
	
	var App = __webpack_require__(/*! ./app.js */ 208);
	var Home = __webpack_require__(/*! ./home.js */ 211);
	var List = __webpack_require__(/*! ./list.js */ 212);
	var Login = __webpack_require__(/*! ./login.js */ 218);
	var Register = __webpack_require__(/*! ./register.js */ 219);
	var About = __webpack_require__(/*! ./about.js */ 220);
	
	__webpack_require__(/*! ../css/app.css */ 221);
	__webpack_require__(/*! ../../~/bootstrap/dist/css/bootstrap.min.css */ 225);
	
	var routes = React.createElement(
	  Router,
	  null,
	  React.createElement(
	    Route,
	    { name: "app", path: "/", component: App },
	    React.createElement(IndexRoute, { component: Home }),
	    React.createElement(Route, { name: "reader", path: "/reader", component: List }),
	    React.createElement(Route, { name: "about", path: "/about", component: About }),
	    React.createElement(Route, { name: "login", path: "/login", component: Login }),
	    React.createElement(Route, { name: "register", path: "/register", component: Register })
	  )
	);
	
	ReactDOM.render(routes, document.getElementById('content'));

/***/ },

/***/ 158:
/*!*******************************!*\
  !*** ../~/react-dom/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! react/lib/ReactDOM */ 3);


/***/ },

/***/ 208:
/*!***************************!*\
  !*** ./components/app.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	var History = ReactRouter.History;
	
	var auth = __webpack_require__(/*! ./auth.js */ 209);
	
	// Top-level component for the app
	var App = React.createClass({
	  displayName: "App",
	
	  // mixin for navigation
	  mixins: [History],
	
	  // initial state
	  getInitialState: function () {
	    return {
	      // the user is logged in
	      loggedIn: auth.loggedIn()
	    };
	  },
	
	  // callback when user is logged in
	  setStateOnAuth: function (loggedIn) {
	    this.setState({ loggedIn: loggedIn });
	  },
	
	  // when the component loads, setup the callback
	  componentWillMount: function () {
	    auth.onChange = this.setStateOnAuth;
	  },
	
	  // logout the user and redirect to home page
	  logout: function (event) {
	    auth.logout();
	    this.history.pushState(null, '/');
	  },
	
	  // show the navigation bar
	  // the route handler replaces the RouteHandler element with the current page
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "nav",
	        { className: "navbar navbar-default", role: "navigation" },
	        React.createElement(
	          "div",
	          { className: "container" },
	          React.createElement(
	            "div",
	            { className: "navbar-header" },
	            React.createElement(
	              "button",
	              { type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" },
	              React.createElement(
	                "span",
	                { className: "sr-only" },
	                "Toggle navigation"
	              ),
	              React.createElement("span", { className: "icon-bar" }),
	              React.createElement("span", { className: "icon-bar" }),
	              React.createElement("span", { className: "icon-bar" })
	            ),
	            React.createElement(
	              "a",
	              { className: "navbar-brand", href: "/" },
	              "Everything's an Audiobook"
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
	            this.state.loggedIn ? React.createElement(
	              "ul",
	              { className: "nav navbar-nav" },
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#/reader" },
	                  "Reader"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#/about" },
	                  "About"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#", onClick: this.logout },
	                  "Sign Out"
	                )
	              )
	            ) : React.createElement("div", null)
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "container" },
	        this.props.children
	      )
	    );
	  }
	});
	
	module.exports = App;

/***/ },

/***/ 209:
/*!****************************!*\
  !*** ./components/auth.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! jquery */ 210);
	
	// authentication object
	var auth = {
	  register: function (name, username, password, cb) {
	    // submit request to server, call the callback when complete
	    var url = "/api/users/register";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        name: name,
	        username: username,
	        password: password
	      },
	      // on success, store a login token
	      success: (function (res) {
	        localStorage.token = res.token;
	        localStorage.name = res.name;
	        this.onChange(true);
	        if (cb) cb(true);
	      }).bind(this),
	      error: (function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        this.onChange(false);
	        if (cb) cb(false);
	      }).bind(this)
	    });
	  },
	  // login the user
	  login: function (username, password, cb) {
	    // submit login request to server, call callback when complete
	    cb = arguments[arguments.length - 1];
	    // check if token in local storage
	    if (localStorage.token) {
	      this.onChange(true);
	      if (cb) cb(true);
	      return;
	    }
	
	    // submit request to server
	    var url = "/api/users/login";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        username: username,
	        password: password
	      },
	      success: (function (res) {
	        // on success, store a login token
	        localStorage.token = res.token;
	        localStorage.name = res.name;
	        this.onChange(true);
	        if (cb) cb(true);
	      }).bind(this),
	      error: (function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        this.onChange(false);
	        if (cb) cb(false);
	      }).bind(this)
	    });
	  },
	  // get the token from local storage
	  getToken: function () {
	    return localStorage.token;
	  },
	  // get the name from local storage
	  getName: function () {
	    return localStorage.name;
	  },
	  // logout the user, call the callback when complete
	  logout: function (cb) {
	    delete localStorage.token;
	    this.onChange(false);
	    if (cb) cb();
	  },
	  // check if user is logged in
	  loggedIn: function () {
	    return !!localStorage.token;
	  },
	  // default onChange function
	  onChange: function () {}
	};
	
	module.exports = auth;

/***/ },

/***/ 211:
/*!****************************!*\
  !*** ./components/home.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	
	var View = ReactRouter.View;
	var Link = ReactRouter.Link;
	var Image = ReactRouter.Image;
	//<Image source="http://www.freeimages.com/photo/old-and-new-1426293" />
	// Home page, which shows Login and Register buttons
	var Home = React.createClass({
			displayName: "Home",
	
			render: function () {
					return React.createElement(
							"div",
							{ className: "container center" },
							React.createElement(
									"h2",
									null,
									"Welcome to the site that will read aloud",
									React.createElement("br", null),
									" anything with NO ads!"
							),
							React.createElement(
									"p",
									null,
									"Sign in to be able to copy and paste text, hear them read aloud, and save them for later:"
							),
							React.createElement(
									Link,
									{ className: "btn btn-success center", to: "login" },
									"Sign in"
							),
							React.createElement("p", null),
							React.createElement(
									"span",
									null,
									"OR"
							),
							React.createElement("p", null),
							React.createElement(
									Link,
									{ className: "btn btn-warning", to: "register" },
									"Create an Account"
							),
							React.createElement("p", null),
							React.createElement("img", { src: "http://images.freeimages.com/images/previews/54f/old-and-new-1426293.jpg", alt: "Book with Headphones", length: "500", width: "500" })
					);
			}
	});
	
	module.exports = Home;

/***/ },

/***/ 212:
/*!****************************!*\
  !*** ./components/list.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	
	var Reader = __webpack_require__(/*! ./reader.js */ 213);
	var ListEntry = __webpack_require__(/*! ./readerform.js */ 215);
	var ListItems = __webpack_require__(/*! ./listitems.js */ 216);
	
	var api = __webpack_require__(/*! ./api.js */ 214);
	var auth = __webpack_require__(/*! ./auth.js */ 209);
	
	// List page, shows the todo list of items
	var ReaderBox = React.createClass({
	  displayName: "ReaderBox",
	
	  // context so the component can access the router
	  contextTypes: {
	    location: React.PropTypes.object
	  },
	
	  // initial state
	  getInitialState: function () {
	    return {
	      // list of items in the todo list
	      items: []
	    };
	  },
	
	  // when the component loads, get the list items
	  componentDidMount: function () {
	    api.getItems(this.listSet);
	  },
	
	  // reload the list of items
	  reload: function () {
	    api.getItems(this.listSet);
	  },
	
	  // callback for getting the list of items, sets the list state
	  listSet: function (status, data) {
	    if (status) {
	      // set the state for the list of items
	      this.setState({
	        items: data.items
	      });
	    } else {
	      // if the API call fails, redirect to the login page
	      this.context.router.transitionTo('/login');
	    }
	  },
	
	  // Show the list of items. This component has the following children: ListHeader, ListEntry and ListItems
	  render: function () {
	    var name = auth.getName();
	    return React.createElement(
	      "section",
	      { id: "todoapp" },
	      React.createElement(Reader, { name: name, items: this.state.items, reload: this.reload }),
	      React.createElement(
	        "section",
	        { id: "main" },
	        React.createElement(ListEntry, { reload: this.reload }),
	        React.createElement(ListItems, { items: this.state.items, reload: this.reload })
	      )
	    );
	  }
	});
	
	module.exports = ReaderBox;

/***/ },

/***/ 213:
/*!******************************!*\
  !*** ./components/reader.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	
	var api = __webpack_require__(/*! ./api.js */ 214);
	
	// Reader instructions
	var Reader = React.createClass({
	  displayName: "Reader",
	
	  // render the instructions for the reader
	  render: function () {
	    // true if there are any completed items
	    var completed = this.props.items.filter(function (item) {
	      return item.completed;
	    });
	    return React.createElement(
	      "header",
	      { id: "header" },
	      React.createElement(
	        "div",
	        { className: "row" },
	        React.createElement(
	          "div",
	          { className: "col-md-12" },
	          React.createElement(
	            "p",
	            null,
	            React.createElement(
	              "i",
	              null,
	              "You are signed in as: ",
	              this.props.name
	            )
	          ),
	          React.createElement(
	            "p",
	            null,
	            React.createElement(
	              "span",
	              { id: "list-count", className: "label label-default" },
	              React.createElement(
	                "strong",
	                null,
	                this.props.items.length
	              ),
	              " Saved Texts"
	            )
	          ),
	          React.createElement(
	            "p",
	            null,
	            React.createElement(
	              "i",
	              null,
	              "Copy and paste into the text box to hear it read out loud."
	            )
	          )
	        )
	      )
	    );
	  }
	});
	
	module.exports = Reader;

/***/ },

/***/ 214:
/*!***************************!*\
  !*** ./components/api.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! jquery */ 210);
	
	// API object
	var api = {
	  // get the list of items, call the callback when complete
	  getItems: function (cb) {
	    var url = "/api/items";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'GET',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	
	      error: function (xhr, status, err) {
	        // if there is an error, remove the login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	    console.log("Res is");
	    console.log(res);
	  },
	  // add an item, call the callback when complete
	  addItem: function (title, text, cb) {
	    var url = "/api/items";
	    console.log("I am saving: " + text);
	    console.log("wuzup");
	    $.ajax({
	      url: url,
	      contentType: 'application/json',
	      data: JSON.stringify({
	        item: {
	          'title': title,
	          'text': text
	        }
	      }),
	      type: 'POST',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove the login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // update an item, call the callback when complete
	  updateItem: function (item, cb) {
	    var url = "/api/items/" + item.id;
	    $.ajax({
	      url: url,
	      contentType: 'application/json',
	      data: JSON.stringify({
	        item: {
	          title: item.title,
	          completed: item.completed
	        }
	      }),
	      type: 'PUT',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is any error, remove any login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // delete an item, call the callback when complete
	  deleteItem: function (item, cb) {
	    var url = "/api/items/" + item.id;
	    $.ajax({
	      url: url,
	      type: 'DELETE',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  }
	
	};
	
	module.exports = api;

/***/ },

/***/ 215:
/*!**********************************!*\
  !*** ./components/readerform.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	
	var api = __webpack_require__(/*! ./api.js */ 214);
	
	// Component with the Reader form
	var readerform = React.createClass({
	  displayName: "readerform",
	
	  //Reads the text in the box
	  readText: function () {
	    var thetext = this.refs.thetext.value;
	    if (!thetext) {
	      alert("Please enter some text.");
	      return;
	    }
	    this.readWithVozme(thetext);
	    return;
	  },
	  //Save the text under the name from the user
	  saveText: function () {
	    var textstuff = this.refs.thetext.value;
	    if (!textstuff) {
	      alert("Please enter some text.");
	      return;
	    }
	    var textname = prompt("Please give a name for this text", "Unnamed Text");
	    api.addItem(textname, textstuff, this.props.reload);
	  },
	  //Fetch mp3 from Vozme service
	  readWithVozme: function (text) {
	    var lang = 'en';
	    var gn = 'ml';
	    var tgt = 'voice_' + parseInt(Math.random() * 100000);
	    console.log(tgt);
	    var d = window.document;
	    var txt = text;
	    create_form(d, txt, lang, gn, tgt);
	    return false;
	  },
	
	  // render the item entry area
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        { id: "input" },
	        React.createElement(
	          "form",
	          { id: "item-form", name: "itemForm" },
	          React.createElement("textarea", { type: "text", rows: "5", className: "input-large", id: "new-text", ref: "thetext", placeholder: "Paste text to read here", autoFocus: true }),
	          React.createElement("p", null),
	          React.createElement(
	            "button",
	            { className: "btn btn-primary", onClick: this.readText },
	            "READ!"
	          ),
	          React.createElement(
	            "span",
	            null,
	            " "
	          ),
	          React.createElement(
	            "button",
	            { className: "btn btn-primary", onClick: this.saveText },
	            "Save this text for later"
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "There is a 10,000 character cutoff in the reader. To read a long text, save the chapters separately."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Double click a saved text from the list below the reader to open it:"
	      )
	    );
	  }
	});
	
	module.exports = readerform;

/***/ },

/***/ 216:
/*!*********************************!*\
  !*** ./components/listitems.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	
	var Item = __webpack_require__(/*! ./item.js */ 217);
	
	// List items component, shows the list of texts
	var ListItems = React.createClass({
	  displayName: "ListItems",
	
	  // context so the component can access the router
	  contextTypes: {
	    location: React.PropTypes.object
	  },
	  // render the list of items
	  render: function () {
	    // get list of items to show, using the path to the current page
	    var shown = this.props.items.filter(function (item) {
	      switch (this.context.location.pathname) {
	        case '/list/active':
	          return !item.completed;
	        case '/list/completed':
	          return item.completed;
	        default:
	          return true;
	      }
	    }, this);
	
	    // using the list of items, generate an Item element for each one
	    var list = shown.map((function (item) {
	      return React.createElement(Item, { key: item.id, item: item, reload: this.props.reload });
	    }).bind(this));
	
	    // render the list
	    return React.createElement(
	      "ul",
	      { id: "todo-list" },
	      list
	    );
	  }
	});
	
	module.exports = ListItems;

/***/ },

/***/ 217:
/*!****************************!*\
  !*** ./components/item.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	
	__webpack_require__(/*! jquery */ 210);
	var readerform = __webpack_require__(/*! ./readerform.js */ 215);
	var api = __webpack_require__(/*! ./api.js */ 214);
	
	// Item shown in the todo list
	var Item = React.createClass({
	  displayName: "Item",
	
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
	  deleteItem: function () {
	    var really = confirm("Do you really want to delete " + this.props.item.title + "?\n(This cannot be undone)");
	    if (really) {
	      api.deleteItem(this.props.item, this.props.reload);
	    }
	  },
	  // called when the text file is double-clicked
	  putInReader: function () {
	    var readerbox = $("html").find("textarea");
	    readerbox[0].value = this.props.item.text;
	  },
	
	  // render the Item
	  render: function () {
	    // construct a list of classes for the item CSS
	    var classes = "";
	    return React.createElement(
	      "li",
	      { className: classes },
	      React.createElement(
	        "div",
	        { className: "view" },
	        React.createElement(
	          "label",
	          { onDoubleClick: this.putInReader },
	          this.props.item.title
	        ),
	        React.createElement("button", { className: "destroy", onClick: this.deleteItem })
	      )
	    );
	  }
	});
	
	module.exports = Item;

/***/ },

/***/ 218:
/*!*****************************!*\
  !*** ./components/login.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	var History = ReactRouter.History;
	
	var auth = __webpack_require__(/*! ./auth.js */ 209);
	
	// Login page, shows the login form and redirects to the list if login is successful
	var Login = React.createClass({
	  displayName: "Login",
	
	  // mixin for navigation
	  mixins: [History],
	
	  // initial state
	  getInitialState: function () {
	    return {
	      // there was an error on logging in
	      error: false
	    };
	  },
	
	  // handle login button submit
	  login: function (event) {
	    // prevent default browser submit
	    event.preventDefault();
	    // get data from form
	    var username = this.refs.username.value;
	    var password = this.refs.password.value;
	    if (!username || !password) {
	      return;
	    }
	    // login via API
	    auth.login(username, password, (function (loggedIn) {
	      // login callback
	      if (!loggedIn) return this.setState({
	        error: true
	      });
	      this.history.pushState(null, '/reader');
	    }).bind(this));
	  },
	
	  // show the login form
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        "Login"
	      ),
	      React.createElement(
	        "form",
	        { className: "form-vertical centered", onSubmit: this.login },
	        React.createElement("input", { type: "text", placeholder: "Username", ref: "username", autoFocus: true }),
	        React.createElement("input", { type: "password", placeholder: "Password", ref: "password" }),
	        React.createElement("input", { className: "btn btn-warning", type: "submit", value: "Login" }),
	        this.state.error ? React.createElement(
	          "div",
	          { className: "alert" },
	          "Invalid username or password."
	        ) : null
	      )
	    );
	  }
	});
	
	module.exports = Login;

/***/ },

/***/ 219:
/*!********************************!*\
  !*** ./components/register.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	var History = ReactRouter.History;
	
	var auth = __webpack_require__(/*! ./auth.js */ 209);
	
	// Register page, shows the registration form and redirects to the list if login is successful
	var Register = React.createClass({
	  displayName: "Register",
	
	  // mixin for navigation
	  mixins: [History],
	
	  // initial state
	  getInitialState: function () {
	    return {
	      // there was an error registering
	      error: false
	    };
	  },
	
	  // handle regiser button submit
	  register: function (event) {
	    // prevent default browser submit
	    event.preventDefault();
	    // get data from form
	    var name = this.refs.name.value;
	    var username = this.refs.username.value;
	    var password = this.refs.password.value;
	    if (!name || !username || !password) {
	      return;
	    }
	    // register via the API
	    auth.register(name, username, password, (function (loggedIn) {
	      // register callback
	      if (!loggedIn) return this.setState({
	        error: true
	      });
	      this.history.pushState(null, '/reader');
	    }).bind(this));
	  },
	
	  // show the registration form
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        "Sign Up:"
	      ),
	      React.createElement(
	        "span",
	        null,
	        "Important! Choose a memorable password because we do not yet support password recovery"
	      ),
	      React.createElement(
	        "form",
	        { className: "form-vertical", onSubmit: this.register },
	        React.createElement("input", { type: "text", placeholder: "Name", ref: "name", autoFocus: true }),
	        React.createElement("input", { type: "text", placeholder: "Username", ref: "username" }),
	        React.createElement("input", { type: "password", placeholder: "Password", ref: "password" }),
	        React.createElement("input", { className: "btn-success", type: "submit", value: "Register" }),
	        this.state.error ? React.createElement(
	          "div",
	          { className: "alert" },
	          "Invalid username or password."
	        ) : null
	      )
	    );
	  }
	});
	
	module.exports = Register;

/***/ },

/***/ 220:
/*!*****************************!*\
  !*** ./components/about.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	
	var Link = ReactRouter.Link;
	
	var About = React.createClass({
			displayName: "About",
	
			render: function () {
					return React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
									"h2",
									null,
									"About: Everything's an Audiobook"
							),
							React.createElement(
									"p",
									null,
									"This web app was created as a partial requirement for Dr. Zappala of BYU's CS30 class by Joshua Reynolds."
							),
							React.createElement(
									"p",
									null,
									"He is happy to allow you free access to its use. This web app is committed to not interrupting your listening to play annoying ads or blocking and distracting you with visual advertising. Many people are auditory learners and will gain far more by listening than reading. This app is quite capable of reading quite long"
							),
							React.createElement(
									"p",
									null,
									"The text reading uses the mp3 generation service provided by vozme.com. See their license ",
									React.createElement(
											"a",
											{ href: "http://vozme.com/licenses.php?lang=en" },
											"here"
									),
									". This website is not affiliated with Vozme or its affiliates."
							),
							React.createElement(
									"p",
									null,
									"Please direct all comments and suggestions to ",
									React.createElement(
											"code",
											null,
											"jeyreyjunk@gmail.com"
									)
							)
					);
			}
	});
	
	module.exports = About;

/***/ },

/***/ 221:
/*!*********************!*\
  !*** ./css/app.css ***!
  \*********************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 225:
/*!*************************************************!*\
  !*** ../~/bootstrap/dist/css/bootstrap.min.css ***!
  \*************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.js.map