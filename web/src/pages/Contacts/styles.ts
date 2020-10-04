import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f2f2f2;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
`;

export const Painel = styled.div`
  background-color: #fff;
  
  height: 100vh;
  width: 60px;

  box-shadow: 2px 0px 4px rgba(0,0,0,0.3);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = styled.div`
  margin-top: 16px;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const ButtonAdd = styled.button`
  margin-top: 8px;
  padding: 8px;

  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
`;

export const ButtonDelete = styled.button`
  margin-bottom: 16px;
  padding: 8px;

  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
`;

export const ListContacts = styled.main`
  margin-top: 40px;
  margin-left: 40px;

  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  grid-column-gap: 30px;
`;