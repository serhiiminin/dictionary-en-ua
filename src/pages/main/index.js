import React from 'react';
import { ButtonWithRouter } from '../../components';
import routes from '../../routes';

const Main = () => (
  <ButtonWithRouter to={routes.words.list}>List of my words</ButtonWithRouter>
);

export default Main;
