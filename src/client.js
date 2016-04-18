import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from './configure-store';
import { syncHistoryWithStore } from 'react-router-redux';

export default ({ createRoutes, reducers }) => {
  const store = configureStore(reducers);
  const history = syncHistoryWithStore(browserHistory, store);
  const routes = createRoutes(history);

  const app = render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById('root')
  );

  if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
      getRootInstances() {
        return [app];
      },
    });
  }

  return { store, app };
};
