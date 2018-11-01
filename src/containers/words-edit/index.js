import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withWords } from "../../context/words";
import WordEdit from "./container";

const enhance = compose(
  withRouter,
  withWords
);

export default enhance(WordEdit);
