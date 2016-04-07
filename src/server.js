import { match } from 'react-router';
import render from './render';
import renderLayout from './render-layout';
import configureStore from './configure-store';

export default ({ routes, reducers, app, layout }) => {
  const store = configureStore(reducers);
  const initialState = store.getState();
  const createLayout = layout || renderLayout;

  app.use('/', (req, res) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const rootMarkup = render(renderProps, store);
        res.status(200).send(createLayout({ rootMarkup, initialState }));
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  return app;
};
