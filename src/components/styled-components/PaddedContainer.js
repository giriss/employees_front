import styled from "@emotion/styled";
import { Container } from "semantic-ui-react";

const PaddedContainer = styled(Container)`
  ${({ size, all, top }) => (all || top) && `padding-top: ${size || '10px'};`}
  ${({ size, all, right }) => (all || right) && `padding-right: ${size || '10px'};`}
  ${({ size, all, bottom }) => (all || bottom) && `padding-bottom: ${size || '10px'};`}
  ${({ size, all, left }) => (all || left) && `padding-left: ${size || '10px'};`}
`;

export default PaddedContainer;
