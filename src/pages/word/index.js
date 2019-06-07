import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import WordPreviewPage from './preview';
import WordsAddPage from './add';
import WordSearchPage from './search';
import WordsEditPage from './edit';
import WordsListPage from './list';
import SC from './styles';

const WordsPage = () => (
  <SC.WordsWrapper>
    <Switch>
      <Route exact path={routes.words.add} component={WordsAddPage} />
      <Route exact path={routes.words.list} component={WordsListPage} />
      <Route exact path={routes.words.search} component={WordSearchPage} />
      <Route exact path={routes.words.preview} component={WordPreviewPage} />
      <Route exact path={routes.words.edit} component={WordsEditPage} />
    </Switch>
  </SC.WordsWrapper>
);

export default WordsPage;
