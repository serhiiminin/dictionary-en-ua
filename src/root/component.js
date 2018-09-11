import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { stylesVariables } from '../constants/styles-variables';
import { Header, BlocksContainer, Notifications } from '../components';
import { Main, MyWords, AddWord, SearchWord, PageNotFound, LearnWords } from '../pages';
import StateProvider from '../context/index';
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
    <StateProvider>
      <Router>
        <Notifications>
          <BlocksContainer>
            <Header/>
            <Switch>
              <Route exact path={routes.root} component={Main}/>
              <Route exact path={routes.login} render={() => 'login'}/>
              <Route exact path={routes.words.add} component={AddWord}/>
              <Route exact path={routes.words.learn} component={LearnWords}/>
              <Route exact path={routes.words.list} component={MyWords}/>
              <Route exact path={routes.words.search} component={SearchWord}/>
              <Route component={PageNotFound}/>
            </Switch>
          </BlocksContainer>
        </Notifications>
      </Router>
    </StateProvider>
  </MuiThemeProvider>
);

export default Root;
