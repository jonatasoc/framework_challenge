import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';

import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Layout />
    </Router>
  );
};

export default App;
