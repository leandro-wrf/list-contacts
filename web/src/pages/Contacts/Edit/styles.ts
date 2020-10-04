import styled from 'styled-components';

export const Container = styled.div`
  height: 97%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  width: 100%;

  display: block;
  box-sizing: border-box; 
`

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Input = styled.input`
  &:nth-child(1) {
    margin-right: 8px;
    margin-left: 8px;
  }

  &:nth-child(2) {
    margin-right: 8px;
  }

  background-color: #f2f2f2;

  height: 50px;
  width: 100%;

  padding-left: 16px;

  border: none;
  border-radius: 8px;
  outline: none;

  color: #000000;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
`

export const InputEmail = styled.input`
  background-color: #f2f2f4;

  height: 50px;
  width: 92%;

  padding-left: 16px;
  margin: 16px 8px 16px 8px;

  border: none;
  border-radius: 8px;
  outline: none;

  color: #000000;
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
`

export const Select = styled.select`
  appearance: none;
  flex: 1;

  background-color: #f2f2f4;

  height: 50px;
  width: 100%;

  padding: 16px;
  margin: 0px 8px 16px 8px;

  cursor: pointer;
  border: none;
  border-radius: 8px;
  outline: none;

  color: #6c6c80;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
`

export const ButtonEnabled = styled.button`
  background-color: #46ee89;

  height: 50px;

  padding: 16px;
  margin-right: 8px;

  cursor: pointer;
  border: none;
  border-radius: 8px;
  outline: none;

  color: #fff;
  font-size: 20px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonDisabled = styled(ButtonEnabled)`
  background-color: #f2f2f2;
  color: #a7a7a7;
`;
