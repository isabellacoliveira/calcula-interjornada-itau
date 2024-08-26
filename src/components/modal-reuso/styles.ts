import styled from "styled-components";

export const HelpButton = styled.button`
    margin-bottom: 15px;
    padding: 20px 10px 20px 20px;
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
    background: transparent;
    border: 1px solid #0d1733;
    color: #0d1733;
    text-align: center; 

    &_hover{
      transform: translateY(-10px);
    }

    @media (max-width: 600px) {
      max-width: 100%;  
   }
`;
