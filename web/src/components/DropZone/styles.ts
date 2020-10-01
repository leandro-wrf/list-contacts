import styled from 'styled-components';

export const Container = styled.div`
  height: 150px;
  width: 150px;
  background: #e1faec;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  outline: 0;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  object-fit: cover;
`

export const Input = styled.input``

export const NoContent = styled.p`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border-radius: 50%;
  border: 1px dashed #4ecb79;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;

  cursor: pointer;
`


// estudar um pouco sobre styled-components
export const IconSvg = styled.div`
  color: #0585a0;  /*#4ecb79;*/  
  width: 68px;
  height: 68px;
  margin-bottom: 8px;
`