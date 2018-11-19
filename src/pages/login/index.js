import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withTokens } from "../../context/tokens";
import { withNotifications } from "../../context/notifications";
import LoginCmp from "./container";

const Login = compose(
  withRouter,
  withTokens,
  withNotifications,
)(LoginCmp);

export default Login;
