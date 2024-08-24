import styled from "styled-components";

export const Content = styled.div`
    width: 100%; 
    height: 100vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #132e63;
`

export const ButtonSend = styled.button`
    margin-top: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    padding: 20px 10px 20px 20px;
    border-radius: 10px;
    transition: transform 0.6s ease;
    background-color: #EC7000;
    width: 200px; 
    outline: none; 
    cursor: pointer;
    border: none;
    color: #fff;

    
    @media (max-width: 600px) {
      max-width: 100%;  
    }

       &:hover{
      transform: translateY(-10px);
    }
`