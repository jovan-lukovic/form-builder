import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { history } from '../store';
import FormBuilder from '../pages/form-builder';
import FormList from "../pages/form-list";

const AppRoutes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/'>
        <Redirect to='/form-list' />
      </Route>
      <Route exact path='/form-list' component={FormList}/>
      <Route exact path='/form-builder' component={FormBuilder}/>
    </Switch>
  </Router>
);

export default AppRoutes;
