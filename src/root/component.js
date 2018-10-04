import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { stylesVariables } from '../constants/styles-variables';
import { Header, BlocksContainer, Notifications } from '../components';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: stylesVariables.colors.block,
      main: stylesVariables.colors.text,
      dark: stylesVariables.colors.button,
      contrastText: stylesVariables.colors.block,
    },
    secondary: {
      light: stylesVariables.colors.block,
      main: stylesVariables.colors.button,
      dark: stylesVariables.colors.button,
      contrastText: stylesVariables.colors.block,
    }
  },
});

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <StateProvider>
        <Notifications>
          <BlocksContainer>
            <Header/>
            <Switch>
              <Route exact path={routes.root} component={MainContainer}/>
              <Route exact path={routes.login} render={() => 'login'}/>
              <Route exact path={routes.words.add} component={WordsAddContainer}/>
              <Route exact path={routes.words.learn} component={WordsLearnContainer}/>
              <Switch>
                <Route exact path={routes.words.list.all} component={WordsListContainer}/>
                <Route exact path={routes.words.list.preview} render={() => 'Preview'}/>
                <Route exact path={routes.words.list.edit} component={WordsEditContainer}/>
              </Switch>
              <Route exact path={routes.words.search} component={WordsSearchContainer}/>
              <Route component={PageNotFoundContainer}/>
            </Switch>
          </BlocksContainer>
        </Notifications>
      </StateProvider>
    </Router>
  </MuiThemeProvider>
);

export default Root;
