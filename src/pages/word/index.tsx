import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';
import WordPreviewPage from './preview';
import WordsAddPage from './add';
import WordSearchPage from './search';
import WordsEditPage from './edit';
import WordsListPage from './list';

const WordsWrapper = styled.div`
  margin-top: 7rem;
`;

const WordsPage = (): JSX.Element => (
  <WordsWrapper>
    <Switch>
      <Route exact path={routes.words.add} component={WordsAddPage} />
      <Route exact path={routes.words.list} component={WordsListPage} />
      <Route exact path={routes.words.search} component={WordSearchPage} />
      <Route exact path={routes.words.preview} component={WordPreviewPage} />
      <Route exact path={routes.words.edit} component={WordsEditPage} />
    </Switch>
  </WordsWrapper>
);

export default WordsPage;
