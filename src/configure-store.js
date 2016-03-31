import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

export default (reducers, initialState = {}) => {
  const logger = createLogger();
  const router = routerMiddleware(browserHistory);
  const rootReducer = combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
  }));

  return compose(
      applyMiddleware(thunkMiddleware, logger, router)
    )(createStore)(rootReducer, initialState);
};
