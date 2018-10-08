import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import stylesVariables from '../constants/styles-variables';
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

const muiTheme = createMuiTheme({
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

const theme = {
  main: {
    colors: {
      background: '#F6F0ED',
      button: '#28536B',
      text: '#333333',
      block: '#66D4CA',
      line: '#BBB193',
      important: '#C2948A',
      notification: {
        success: '#66D4CA',
        error: '#C2948A',
        warning: '#BBB193',
        info: '#CBE5F6',
      }
    },
    opacity: {
      disabled: .7,
    },
    margin: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    padding: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    borderRadius: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    zIndex: {
      notification: 1000,
    },
    timeout: {
      notification: 300,
    },
    transition: '.3s'
  }
};

const Root = () => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={muiTheme}>
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
                <Route exact path={routes.words.list.all} component={WordsListContainer}/>
                <Route exact path={routes.words.list.preview} render={() => 'Preview'}/>
                <Route exact path={routes.words.list.edit} component={WordsEditContainer}/>
                <Route exact path={routes.words.search} component={WordsSearchContainer}/>
                <Route component={PageNotFoundContainer}/>
              </Switch>
            </BlocksContainer>
          </Notifications>
        </StateProvider>
      </Router>
    </MuiThemeProvider>
  </ThemeProvider>
);

export default Root;
