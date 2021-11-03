/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Title, MainContent } from './Layout.styles';

import Routes from '../../routes';

const Layout: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <Title>Framework Challenge</Title>
      </Link>
      <MainContent>
        <Routes />
      </MainContent>
    </Container>
  );
};

export default Layout;
