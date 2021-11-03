/* eslint-disable camelcase */
import React from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdSend, MdDiscFull, MdDone } from 'react-icons/md';

import { Container, HeroImg } from './Home.styles';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

import heroImg from '../../assets/images/undraw_searching_p5ux.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ fontSize: '1.5rem', marginBottom: '15px' }}
          >
            O que deseja ver hoje?
          </ListSubheader>
        }
      >
        <Link to="/posts">
          <ListItemButton>
            <ListItemIcon>
              <MdSend size={30} color="#f95358" />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
        </Link>
        <Divider />
        <Link to="/albums">
          <ListItemButton>
            <ListItemIcon>
              <MdDiscFull size={30} color="#77ccc2" />
            </ListItemIcon>
            <ListItemText primary="Albums" />
          </ListItemButton>
        </Link>
        <Divider />
        <Link to="/todos">
          <ListItemButton>
            <ListItemIcon>
              <MdDone size={30} color="#5063f8" />
            </ListItemIcon>
            <ListItemText primary="TO-DOs" />
          </ListItemButton>
        </Link>
      </List>
      <HeroImg src={heroImg} />
    </Container>
  );
};

export default Home;
