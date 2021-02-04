import styled from 'styled-components'

export const FormContainer = styled.div`
  height: 50vh;
  width: 100%;
  background-color: transparent;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Form = styled.div`
  width: 90%;
  height: 90%;
  background-color: #d1d1d1;
  border-radius: 5px;

  .name {
    width: 100%;
    height: 30%;
    padding: 6%;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    label {
      text-transform: uppercase;
      color: #499251;
      left: 0;
      margin-bottom: 5px;
    }

    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 5px;
      font-size: 12pt;
      border-radius: 5px;
    }
  }

  .info {
    width: 100%;
    height: 30%;
    padding: 5%;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;

    div {
      margin: 0 1%;
    }

    label {
      text-transform: uppercase;
      color: #499251;
      left: 0;
      margin-bottom: 5px;
    }

    input,
    select {
      border: none;
      outline: none;
      width: 100%;
      padding: 5px;
      font-size: 12pt;
      border-radius: 5px;
      background-color: #fff;
    }
  }

  .btn {
    width: 100%;
    height: 30%;
    padding: 6%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      width: 100%;
      text-transform: uppercase;
      color: #499251;
      left: 0;
      margin-bottom: 5px;
      font-size: 12pt;
      border-radius: 5px;
      padding: 5px;
      font-size: 12pt;
      border: none;
      outline: none;
      transition: 0.2s;

      &:hover {
        box-shadow: 5px 5px 5px #b5b5b5;
        transition: 0.2s;
      }
    }
  }
`
