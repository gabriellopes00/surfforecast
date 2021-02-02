import styled from 'styled-components'

export const UserFieldDiv = styled.div`
  max-width: 70%;
  width: 70%;
  height: 100%;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    border-radius: 50%;
    background: url('https://avatars.githubusercontent.com/u/69465943?s=460&u=102289e2130c2a3b97004f3f73a8a7c67c36907e&v=4');
    background-position: center;
    background-size: cover;
    height: 65px;
    width: 65px;
  }

  .info {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    color: #e5e5e5;
  }
`
