import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as History from 'history';

import rootReducer from './reducers';

export const history = History.createBrowserHistory();

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers,
);

export default createStore(rootReducer(), initialState, composedEnhancers);
