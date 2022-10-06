import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    
    &:focus, &:visited, &:link, &:active {
      text-decoration: none;
    }
  
    &:hover {
      text-decoration: underline;
    }
`;

export default StyledLink

