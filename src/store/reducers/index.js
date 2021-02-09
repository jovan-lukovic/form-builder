import { combineReducers } from 'redux';

import element from './element';
import form from './from';

export default () => combineReducers({
  element,
  form
});
