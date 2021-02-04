import styled from 'styled-components'

export const PanelDiv = styled.div`
  width: 50vw;
  height: 100vh;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 100vw;
  }
`
