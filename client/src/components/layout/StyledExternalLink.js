import styled from "styled-components";

const StyledExternalLink = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    
    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }
  
    &:hover {
      text-decoration: none;
    }
`;

export default StyledExternalLink