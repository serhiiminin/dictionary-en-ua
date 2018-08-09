import React from 'react';
import { ButtonWithRouter } from '../../components';
import routes from '../../routes';

const Main = () => (
  <ButtonWithRouter to={routes.myWords}>List of my words</ButtonWithRouter>
);

export default Main;
