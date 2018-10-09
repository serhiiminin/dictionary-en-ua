import React from 'react';
import { ThemeProvider } from 'react-jss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Header, BlocksWrapper, Notifications } from '../components';
import {
  MainContainer,
  WordsListContainer,
  WordsAddContainer,
  WordsSearchContainer,
  PageNotFoundContainer,
  WordsLearnContainer,
  WordsEditContainer,
} from '../containers';
import StateProvider from '../context';
import routes from '../routes';
import theme from './themes';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: theme.main.colors.block,
      main: theme.main.colors.text,
      dark: theme.main.colors.button,
      contrastText: theme.main.colors.block,
    },
    secondary: {
      light: theme.main.colors.block,
      main: theme.main.colors.button,
      dark: theme.main.colors.button,
      contrastText: theme.main.colors.block,
    }
  },
});

const Root = () => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <StateProvider>
          <Notifications>
            <BlocksWrapper>
              <Header/>
              <Switch>
                <Route exact path={routes.root} component={MainContainer}/>
                <Route exact path={routes.login} render={() => 'login'}/>
                <Route exact path={routes.words.add} component={WordsAddContainer}/>
                <Route exact path={routes.words.learn} component={WordsLearnContainer}/>
                <Route exact path={routes.words.list.all} component={WordsListContainer}/>
                <Route exact path={routes.words.list.preview} render={() => 'Preview'}/>
                <Route exact path={routes.words.list.edit} component={WordsEditContainer}/>
                <Route exact path={routes.words.search} component={WordsSearchContainer}/>
                <Route component={PageNotFoundContainer}/>
              </Switch>
            </BlocksWrapper>
          </Notifications>
        </StateProvider>
      </Router>
    </MuiThemeProvider>
  </ThemeProvider>
);

export default Root;
