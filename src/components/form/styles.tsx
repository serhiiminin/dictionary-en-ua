import { Form as FormFormik } from 'formik';
import styled from 'styled-components';
import { ThemeProps } from '../../types';

const Form = styled(FormFormik)`
  display: grid;
  gap: ${(props: ThemeProps): string => props.theme.main.space.sm};
`;

export default { Form };
