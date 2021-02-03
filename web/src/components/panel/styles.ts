import styled from 'styled-components'

export const PanelDiv = styled.div`
  width: 100%;
  height: 350px;
  background-color: #f00;

  display: flex;
  align-items: center;
  justify-content: center;

  .table {
    width: 70%;
    height: 100%;
    background-color: #676767;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .beach-form {
    width: 30%;
    height: 100%;
    background-color: #232323;
  }
`

export const CustomTable = styled.table`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`
