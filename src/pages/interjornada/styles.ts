import styled from 'styled-components'; 
import Fire from "../../assets/b72134112b54864e4948865375ecbb11.gif"

export const Container = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
`
export const Content = styled.header`
    overflow-y: auto;
`
export const Header = styled.div<{ $warroommode: boolean }>` 
  flex: 1;
  background-color: #132e63;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding-bottom: 30px;

  ${({ $warroommode }) => $warroommode && `
    background-image: url(${Fire});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #000;
  `}
`;


export const Time = styled.input`
   margin-bottom: 15px;
    padding: 20px 10px 20px 20px;
    border-radius: 10px;
    transition: transform 0.6s ease;
    background-color: #EC7000;
    max-width: 100%; 
    outline: none; 
    cursor: pointer;
    border: none;
    color: #fff;

    
    @media (max-width: 600px) {
      max-width: 100%;  
   }
`
export const ButtonSend = styled.div`
    margin-bottom: 15px;
    padding: 20px 10px 20px 20px;
    border-radius: 10px;
    transition: transform 0.6s ease;
    background-color: #EC7000;
    max-width: 100%; 
    outline: none; 
    cursor: pointer;
    border: none;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    background: transparent;
    border: 1px solid #0d1733;
    color: #0d1733;

    &_hover{
      transform: translateY(-10px);
    }

    @media (max-width: 600px) {
      max-width: 100%;  
   }
`

export const ButtonBack = styled.button`
    margin-bottom: 15px;
    padding: 20px 20px 20px 20px;
    margin-left: 10px;
    border-radius: 10px;
    transition: transform 0.6s ease;
    background-color: #EC7000;
    max-width: 100%; 
    outline: none; 
    cursor: pointer;
    border: none;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    color: #0d1733;
    color: #ffffff;
    align-self: flex-start;

    &:hover{
      transform: translateY(-5px);
    }

    @media (max-width: 600px) {
      max-width: 100%;  
   }
`

export const ContentButton = styled.div`
    justify-content: flex-start; 
    display: flex;
    padding: 10px 5px 5px 5px;
    background-color: #132e63;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  box-sizing: border-box; 
  padding-top: 30px;
  
  @media (max-width: 600px) {
      margin-top: 40px!important;
      padding: 20px;
      width: 90%; 
   }
`

export const WarRoomButton = styled.button`
  position: fixed;
  bottom: 20px; /* Distância do fundo da tela */
  right: 20px;  /* Distância da lateral direita da tela */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #EC7000;
  border: none;
  outline: none;
  color: #fff;
  font-weight: bold; /* Corrigido de 'font-weigth' para 'font-weight' */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-10px);
    background-color: #d95a00; /* Alterar a cor de fundo ao passar o mouse */
  }
`;
  
  // input.time::-webkit-calendar-picker-indicator {
  //   filter: invert(1); 
  // }
  
  