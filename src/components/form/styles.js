import { Form as FormFormik } from 'formik';
import styled from 'styled-components';

const Form = styled(FormFormik)`
  display: grid;
  gap: ${props => props.theme.main.space.sm};
`;

export default { Form };
