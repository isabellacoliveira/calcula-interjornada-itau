import styled from 'styled-components'; 


export const Container = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    `

export const Titulo = styled.h4`
    color: #fff;
    `
    
export const Content = styled.header`
    overflow-y: auto;
    background-color: #132e63; 
`

export const Header = styled.div`
    flex: 1;
    background-color: #132e63;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    height: 100%;
    padding-bottom: 30px
`

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
`
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
    margin: 20px 20px 20px 20px;
    
    @media (max-width: 600px) {
      max-width: 100%;  
   }
`

export const ContentInput = styled.div`
  display: flex!important; 
  flex-direction: column; 
  align-items: center; 

`

export const LabelInput = styled.div`
  color: #fff; 
  font-weight: bold; 
`

export const Hours = styled.div`
  display: flex; 
  flex-direction: row; 
  width: 100%;
`

export const Calcular = styled.button`
    margin-bottom: 15px;
    padding: 20px 10px 20px 20px;
    border-radius: 10px;
    transition: transform 0.6s ease;
    background-color: #EC7000;
    outline: none; 
    cursor: pointer;
    border: none;
    color: #fff;
    width: 190px;
    
    @media (max-width: 600px) {
     width: 190px;
     text-align: center; 

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
  
  // input.time::-webkit-calendar-picker-indicator {
  //   filter: invert(1); 
  // }
  
  