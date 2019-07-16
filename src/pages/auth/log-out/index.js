import { withAuth } from '../../../context/auth';
import LoginCmp from './component';

const Login = withAuth(LoginCmp);

export default Login;
