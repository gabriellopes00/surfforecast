import styled from 'styled-components'

export const TableContainer = styled.div`
  height: 50vh;
  margin-top: 2%;
  max-width: 100%;
  width: 100%;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5%;
  overflow: auto;
`

export const Table = styled.table`
  & {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    overflow-y: auto;
  }
  thead {
    text-transform: uppercase;
  }
  th {
    font-weight: 500;
    color: #499251;
    padding: 0.25em;
    border-bottom: 2px solid #499251;
    text-align: left;
  }
  tr {
    padding: 1em;
  }
  td {
    padding: 0.5em;
    color: #444;
  }
`
