import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Fade, CircularProgress } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import moment from "moment";
import {
  WordItemWrapper,
  Description,
  LinkToWords,
  WordTitleWrapper,
  WordTime,
  LastLearntWrapper
} from "./component";
import { joinRoute } from "../../helpers/join-url";
import routes from "../../routes";
import { ButtonWithRouter } from "..";

const EMPTY_VALUE = "-";

const WordItemInList = props => {
  const { isChecked, onWordCheck, word, linkToWord, loading } = props;
  const {
    _id,
    en,
    ua,
    transcription,
    dateCreated,
    dateLastLearnt,
    timesLearnt
  } = word;
  const lastLearnt =
    dateLastLearnt &&
    (dateLastLearnt === new Date(0).toISOString()
      ? "Never"
      : moment(dateLastLearnt).fromNow());

  return (
    <WordItemWrapper>
      <Checkbox
        onChange={() => onWordCheck(_id)}
        checked={isChecked}
        disabled={loading}
      />
      <Description>
        <WordTitleWrapper>
          {en && <LinkToWords to={linkToWord}>{en}</LinkToWords>}
          {[en && " ", transcription && `[${transcription}]`, ua]
            .filter(Boolean)
            .join(" - ")}
          {loading && (
            <Fade in={loading}>
              <CircularProgress color="secondary" size={20} />
            </Fade>
          )}
        </WordTitleWrapper>
        <LastLearntWrapper>
          {[
            timesLearnt != null && `Times learnt: ${timesLearnt}`,
            lastLearnt && `Last learnt: ${lastLearnt}`
          ]
            .filter(Boolean)
            .join(` · `)}
        </LastLearntWrapper>
      </Description>
      <WordTime>
        {(dateCreated && moment(dateCreated).fromNow()) || EMPTY_VALUE}
      </WordTime>
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
    </WordItemWrapper>
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
