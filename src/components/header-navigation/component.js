import React from "react";
import PropTypes from 'prop-types';
import List from "@material-ui/icons/List";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Rowing from "@material-ui/icons/Rowing";
import Search from "@material-ui/icons/Search";
import Input from "@material-ui/icons/Input";
import ExitToApp from "@material-ui/icons/ExitToApp";
import routes from "../../routes";
import { ButtonWithRouter } from "..";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';
 
const HeaderNavigation = ({ isUserLoggedIn, classes }) => (
  <div className={classes.headerNavigation}>
    <ButtonWithRouter to={routes.words.list.all} title="The list of my words">
      <List />
    </ButtonWithRouter>
    <ButtonWithRouter to={routes.words.add} title="Add a new word">
      <NoteAdd />
    </ButtonWithRouter>
    <ButtonWithRouter to={routes.words.search} title="Search a new word">
      <Search />
    </ButtonWithRouter>
    <ButtonWithRouter to={routes.words.learn} title="Learn saved words">
      <Rowing />
    </ButtonWithRouter>
    {isUserLoggedIn ? (
      <ButtonWithRouter to={routes.logout} title="Logout">
        <ExitToApp />
      </ButtonWithRouter>
    ) : (
      <ButtonWithRouter to={routes.login} title="Login">
        <Input />
      </ButtonWithRouter>
    )}
  </div>
);

HeaderNavigation.propTypes = {
  classes: composeClassesPropTypes(styles),
  isUserLoggedIn: PropTypes.bool,
}

HeaderNavigation.defaultProps = {
  isUserLoggedIn: false,
  classes: {},
}

export default HeaderNavigation;
