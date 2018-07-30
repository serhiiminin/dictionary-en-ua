import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { compose } from 'recompose';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import styles from './styles';

let id = 0;
const createData = data => {
  id += 1;
  return { id, ...data };
};

class Content extends Component {
  state = {
    words: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.words.length !== prevState.words.length) {
      return {
        words: nextProps.words.map(word => createData(word))
      };
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const { words } = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Russian</TableCell>
              <TableCell>English</TableCell>
              <TableCell>Transcription</TableCell>
              <TableCell>Example</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {words.map(word => {
              return (
                <TableRow key={word.id}>
                  <TableCell component="th" scope="row">{word.ru || '-'}</TableCell>
                  <TableCell>{word.en || '-'}</TableCell>
                  <TableCell>{word.transcription || '-'}</TableCell>
                  <TableCell>{word.example || '-'}</TableCell>
                  <TableCell>{moment(word.date).format('DD.MM.YY hh:mm a') || '-'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles)
);

export default enhance(Content);
