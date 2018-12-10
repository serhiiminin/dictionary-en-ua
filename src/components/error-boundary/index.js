import { compose } from "recompose";
import { withNotifications } from "../../context/notifications";
import ErrorBoundary from "./component";

const enhance = compose(withNotifications);

export default enhance(ErrorBoundary);
