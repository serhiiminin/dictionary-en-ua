import React from 'react';
import { compose } from 'recompose';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';

type Props = LI & WI;

const AddWord = (): JSX.Element => <div>Add word</div>;

export default compose<Props, {}>(
  withLoading,
  withWords
)(AddWord);
