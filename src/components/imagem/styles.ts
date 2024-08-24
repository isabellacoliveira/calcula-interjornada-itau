import styled from "styled-components";

export const Logo = styled.img`
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1); 
    }
    100% {
      transform: scale(1);
    }
  }

  animation: pulse 2s infinite; 
  height: 30vmin;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 20px;
`