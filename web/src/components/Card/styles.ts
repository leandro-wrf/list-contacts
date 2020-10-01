import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;

  height: 130px;
  width: 365px;

  padding-left: 16px;

  border: none;
  outline: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; 
`

export const AvatarSelect = styled.button`
  background-color: transparent;

  height: 100px;
  width: 100px;

  cursor: pointer;
  border-radius: 50%;
  border: none;
  outline: none;

  margin-right: 32px;
`

export const OpenInfo = styled.button`
  background-color: transparent;

  cursor: pointer;
  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
`

export const Fullname = styled.span`
  margin-bottom: 16px;

  font-size: 18px;
  font-family: 'Ubuntu', sans-serif;
`

export const Phone = styled.span`
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
`


/// Aprender a mexer com styled-components
export const SVGavatar = styled.div`
  color: #0585a0;
  width: 100%;
  height: 100%;
`
export const SVGcontact = styled.div`
  color: #46ee89;
  width: 100%;
  height: 100%;
  opacity: 0.7;
`
