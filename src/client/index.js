import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../configure-store';

export default ({ routes, reducers }) => {
  const store = configureStore(reducers);

  ReactDOM.render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById('root')
  );

  return store;
};
