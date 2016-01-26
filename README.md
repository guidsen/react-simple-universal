# React Simple Universal
Creating universal apps with Redux and React is too hard. I want to make it easier.
In this document I'll propose an API to create modern universal apps.

## The Problem
Universal rendering and routing in React combined with Redux is great. For big projects it can really save you ton of time.
I've created a universal React app myself and if you ever tried it yourself, you know it's a PITA. 
When I contributed to `universal-react-boilerplate` which is a boilerplate for creating universal React apps, there was so much code needed to bootstrap the universal React app, it felt like this should be easier.

Below an example from `universal-react-boilerplate` to give you an idea of how complicated configuring this stuff yourself might look like.

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

This is only the universal routing part. There are some other files that need to be configured correctly to have a working app.

## My proposal

I think that we only need three files. 

`create-app.js`:
```javascript
import universalClient from 'react-simple-universal/client';

import routes from 'shared/routes';
import reducers from 'shared/reducers';

const createApp = ({ React }) => universalClient({
  React, // The react instance to make sure we use the same instance throughout application.
  routes,
  reducers,
  elementId, // The element to render the application in. Defaults to 'root'.
  renderLayout, // The layout to render. Defaults to a minimal template.
});

export default createApp;
```
`client.js`:
```javascript
import React from 'react';
import createApp from 'bootstrap/createApp.js';

const renderApp = createApp({ React });

// Invoke this function to trigger the render.
renderApp();
```

`server.js`:
```javascript
import universalServer from 'react-simple-universal/server';
import express from 'express';
import React from 'react';

import renderLayout from 'bootstrap/renderLayout.js';
import createApp from 'bootstrap/createApp.js';

// Wire up the a universal server with express.
// This might be useful if we want to switch out express with other frameworks.
const app = universalServer(express(), createApp({ React }));
const port = process.env.APP_PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${ port }`);
});
```

## Feedback or want to contribute?
Do you have feedback or do you want to contribute to make this proposal reality? Please send me a message on twitter @guidsen [@guidsen](https://twitter.com/guidsen) or make an issue.
