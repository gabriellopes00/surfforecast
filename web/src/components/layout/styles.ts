import styled from 'styled-components'

export const WrapperDiv = styled.div`
  width: 100vw !important;
  height: 100% !important;
  background-color: #e5e5e5;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`
