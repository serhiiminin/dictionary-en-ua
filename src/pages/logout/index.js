import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withTokens } from "../../context/tokens";
import LogoutCmp from "./container";

const Logout = compose(
  withRouter,
  withTokens,
)(LogoutCmp);

export default Logout;
