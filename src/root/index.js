import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import injectSheet from 'react-jss';
import normalize from 'normalize-jss';
import { compose } from 'recompose';
import { variables } from '../styles/variables';
import { Header, BlocksContainer, Notifications } from '../components';
import { WordsProvider } from '../context/words';
import { NotificationsProvider } from '../context/notifications';
import { MyWords, AddWord } from '../pages';
import styles from './styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: variables.colors.block,
      main: variables.colors.background,
      dark: variables.colors.button,
      contrastText: variables.colors.block,
    },
  },
});

const RootCmp = () => (
  <MuiThemeProvider theme={theme}>
    <NotificationsProvider>
      <WordsProvider>
        <Router>
          <Notifications>
            <BlocksContainer>
              <Header/>
              <Switch>
                <Route exact path="/login" render={() => 'login'}/>
                <Route exact path="/add-word" component={AddWord}/>
                <Route exact path="/my-words" component={MyWords}/>
              </Switch>
            </BlocksContainer>
          </Notifications>
        </Router>
      </WordsProvider>
    </NotificationsProvider>
  </MuiThemeProvider>
);

const Root = compose(
  injectSheet({
    ...normalize,
    ...styles
  }),
)(RootCmp);

export { Root };
