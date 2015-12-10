- Recommendations - browse the entirety of the Express documentation. Just get a feel for what is there.
- Prereqs
    + install node 
    + just do everything with sudo, IMO
- Create a repo on Github
- clone the repo
- `express init`
- `cd init && npm install`
- remove junk I don't want
    + jade - no need for server-side rendering
- `sudo npm install -g mongodb`
- mongod to start it up
- `npm start`
- load up in browser at localhost:3000
- `sudo npm install -g webpack`
- copy webpack file from https://raw.githubusercontent.com/byu-osl/cityvoice/master/client-side/webpack.config.js
- npm install react
- javascript babel syntax highlighting for sublime
- create App.js
- install jsx-loader
- install supervisor
- modify package.json to use start script (line 8 from https://github.com/byu-osl/cityvoice/blob/master/package.json)
- save start script
- move bin/www to server.js
- use npm start to start supervisor
- had some trouble with mongo - had to google how to run it in the background.
    + something like `mongod --fork --logpath ./mongo.log`