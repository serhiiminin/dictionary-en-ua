import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withTokens } from "../../context/tokens";
import { withNotifications } from "../../context/notifications";
import LogoutCmp from "./container";

const Logout = compose(
  withRouter,
  withTokens,
  withNotifications,
)(LogoutCmp);

export default Logout;
