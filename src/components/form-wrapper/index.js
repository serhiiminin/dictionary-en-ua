import styled from 'styled-components';

const FormWrapper = styled.div`
  width: ${props => props.width || 35}rem;
  margin-top: ${props => props.marginTop || 0}rem;
  margin-right: ${props => props.marginRight || 0}rem;
  margin-bottom: ${props => props.marginBottom || 0}rem;
  margin-left: ${props => props.marginLeft || 0}rem;
`;

export default FormWrapper;
