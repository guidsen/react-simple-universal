# React Simple Universal
Creating universal apps with Redux and React is too hard. I want to make it easier. Especially for people that are just starting out with creating Universal React Application.

_**This library is not production ready yet, only for development. Will be production ready soon!**_

## The Problem
Universal rendering and routing in React combined with Redux is great. For big projects it can really save you ton of time.
I've created a universal React app myself and if you ever tried it yourself, you know it's a PITA. 
When I contributed to [`universal-react-boilerplate`](https://github.com/cloverfield-tools/universal-react-boilerplate) which is a boilerplate for creating universal React apps, there was so much code needed to bootstrap the universal React app, it felt like this should be easier.

Below an example from [`universal-react-boilerplate`](https://github.com/cloverfield-tools/universal-react-boilerplate) to give you an idea of how complicated configuring this stuff yourself might look like.

```javascript
import React from 'react';
import { match } from 'react-router';

import renderLayout from 'server/render-layout';
import render from 'server/render';
import settings from 'server/settings';

import configureStore from 'shared/configure-store';
import createRoutes from 'shared/routes';

const store = configureStore();
const routes = createRoutes(React);
const initialState = store.getState();

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const rootMarkup = render(React)(renderProps, store);
      res.status(200).send(renderLayout({ settings, rootMarkup, initialState }));
    } else {
      res.status(404).send('Not found');
    }
  });
};
```

This is only the routing part. There are some other files that need to be configured correctly to have a working app.

## So what's included?
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [React Router Redux](https://github.com/rackt/react-router-redux) (former `redux-simple-router`) to sync between React Router and Redux

## Simple example

`npm install --save react-simple-universal react react-dom react-router redux webpack`  
`npm install --save-dev babel-core babel-loader webpack-hot-middleware babel-preset-es2015 babel-preset-react`  
`npm install -g babel-cli` // So we can run `babel-node` globally for now  
`echo '{ "presets": ["es2015", "react"] }' > .babelrc` // Will make sure `babel-node` uses the presets to transpile

`routes/index.js`:
```javascript
// More at https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md

import React from 'react';
import { Router, Route } from 'react-router';
import App from './path/to/my/component';

export default (browserHistory) => {
  return (
    <Router history={ browserHistory }>
      <Route path="/" component={ App } />
    </Router>
  );
};
```

`reducers/index.js`:
```javascript
// More at http://redux.js.org/docs/basics/Reducers.html

const exampleInitialState = {
  books: [
    { id: 1, text: 'Book 1', count: 2 },
    { id: 2, text: 'Book 2', count: 3 },
    { id: 3, text: 'Book 3', count: 4 },
  ],
};

const books = (state = exampleInitialState, action) => {
  return state;
};

const reducers = {
  books
};

export default reducers;
```

`client.js`:
```javascript
import { browserHistory } from 'react-router';
import universal from 'react-simple-universal/client';
import createRoutes from './path/to/my/routes';
import reducers from './path/to/my/reducers';

const store = universal({ createRoutes, reducers });

// You can dispatch actions directly from the server
store.dispatch({ type: 'YOUR_ACTION' });
```

`server.js`:
```javascript
import { expressDevServer } from 'react-simple-universal';
import universal from 'react-simple-universal/server';
import config from './path/to/my/webpack.config.dev';
import createRoutes from './path/to/my/routes';
import reducers from './path/to/my/reducers';

const routes = createRoutes();

// This will contain an express server with webpack hot reloading
// You can just add your own configuration here like: app.use('/', myMiddleware)
const app = universal({ routes, reducers, app: expressDevServer(config) });
```

Run `babel-node --presets es2015 --presets react server.js` to start your application.  
**That's it!** You got a working server-side rendered React application now.

## Feedback or want to contribute?
Do you have feedback or do you want to contribute? Please send me a message on twitter [@guidsen](https://twitter.com/guidsen) or make an issue.
