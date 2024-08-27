import styled from "styled-components";

export const HelpButton = styled.button`
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

export const HelpContent = styled.div`
  text-align: left; 
  font-size: 16px;  
  border: none; 
  background-color: #fff; 
`;
