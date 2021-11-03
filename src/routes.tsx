import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Albums from './pages/Albums';
import Todos from './pages/Todos';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/posts" component={Posts} />
      <Route path="/albums" component={Albums} />
      <Route path="/todos" component={Todos} />
    </Switch>
  );
};

export default Routes;
