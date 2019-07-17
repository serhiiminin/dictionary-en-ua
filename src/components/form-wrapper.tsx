import styled from 'styled-components';

interface Props {
  width?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const FormWrapper = styled.div`
  width: ${(props: Props): number => props.width || 35}rem;
  margin-top: ${(props: Props): number => props.marginTop || 0}rem;
  margin-right: ${(props: Props): number => props.marginRight || 0}rem;
  margin-bottom: ${(props: Props): number => props.marginBottom || 0}rem;
  margin-left: ${(props: Props): number => props.marginLeft || 0}rem;
`;

export default FormWrapper;
