import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Checkbox, Fade, CircularProgress, Grid, ListItemText } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import moment from "moment";
import { GridWordItemWrapper, Description, LinkToWords, WordTime } from "./component";
import { joinRoute } from "../../helpers/join-url";
import routes from "../../routes";
import { ButtonWithRouter } from "..";

const EMPTY_VALUE = "-";

const WordItemInList = props => {
  const { isChecked, onWordCheck, word, linkToWord, loading } = props;
  const { _id, en, ua, transcription, dateCreated, dateLastLearnt, timesLearnt } = word;
  const lastLearnt =
    dateLastLearnt && dateLastLearnt === new Date(0).toISOString()
      ? "Never"
      : moment(dateLastLearnt).fromNow();

  return (
    <GridWordItemWrapper
      container
      spacing={16}
      alignItems="center"
      isChecked={isChecked}
      isLoading={loading}
    >
      <Grid item xs={1}>
        <Checkbox
          onChange={() => onWordCheck(_id)}
          checked={isChecked}
          disabled={loading}
        />
      </Grid>
      <Description item xs={7}>
        <ListItemText
          primary={loading 
            ? (
              <Fade in={loading}>
                <CircularProgress color="secondary" size={20} />
              </Fade>
            ) : (
              <Fragment>
                {en && <LinkToWords to={linkToWord}>{en}</LinkToWords>}
                {[en && " ", transcription && `[${transcription}]`, ua]
                  .filter(Boolean)
                  .join(" - ")}
              </Fragment>
            )
          }
          secondary={[
            timesLearnt != null && `Times learnt: ${timesLearnt}`,
            lastLearnt && `Last learnt: ${lastLearnt}`
          ]
            .filter(Boolean)
            .join(` · `)}
        />
      </Description>
      <Grid item xs={3}>
        <WordTime>
          {(dateCreated && moment(dateCreated).fromNow()) || EMPTY_VALUE}
        </WordTime>
      </Grid>
      <Grid item xs={1}>
        <ButtonWithRouter
          to={joinRoute({
            pathname: routes.words.list.root,
            paths: [_id, "edit"]
          })}
          disabled={loading}
          title="Edit"
        >
          <Edit />
        </ButtonWithRouter>
      </Grid>
    </GridWordItemWrapper>
  );
};

WordItemInList.propTypes = {
  word: PropTypes.shape({
    _id: PropTypes.string,
    en: PropTypes.string,
    ua: PropTypes.string,
    transcription: PropTypes.string,
    dateCreated: PropTypes.string
  }),
  linkToWord: PropTypes.string,
  onWordCheck: PropTypes.func,
  isChecked: PropTypes.bool,
  loading: PropTypes.bool
};

WordItemInList.defaultProps = {
  word: {
    _id: "",
    en: "",
    ua: "",
    transcription: "",
    dateCreated: ""
  },
  onWordCheck: () => {},
  linkToWord: "",
  isChecked: false,
  loading: false
};

export default WordItemInList;
