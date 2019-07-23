import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';

type Props = LI & WI;

const WordEdit = (): JSX.Element => <div>Edit</div>;

export default compose<Props, {}>(
  withRouter,
  withWords,
  withLoading
)(WordEdit);
