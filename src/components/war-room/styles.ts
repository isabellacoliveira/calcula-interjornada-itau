import styled from "styled-components";

export const HelpContent = styled.div`
  text-align: left; 
  font-size: 16px;  
  border: none; 
  background-color: #fff; 
`;

export const ButtonContinue = styled.button`
    margin-bottom: 15px;
    padding: 20px 20px 20px 20px;
    margin-left: 10px;
    border-radius: 10px;
    transition: transform 0.6s ease;
    background-color: #EC7000;
    width: 100%; 
    outline: none; 
    cursor: pointer;
    border: none;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    color: #0d1733;
    color: #ffffff;
    margin: 0 auto; 
    align-items: center;

    &:hover{
      transform: translateY(-5px);
    }

    @media (max-width: 600px) {
      max-width: 100%;  
   }
`