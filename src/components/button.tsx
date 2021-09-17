
import { prependOnceListener } from 'process';
import styled from 'styled-components'

type ButtonProps = {
  variant: any
}

export const Button = styled.button<ButtonProps>`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #5db5a9;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
  ${({variant = ''}) => variant === 'primary' && `
    background-color: #5db5a9;
    color: #fff;
  `}
  ${({variant = ''}) => variant === 'secondary' && `
    background-color: #fff;
    color: #5db5a9;
  `}
`;