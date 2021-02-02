import { UserFieldDiv } from './styles'

export const UserField: React.FC = () => {
  return (
    <UserFieldDiv>
      <div className="avatar" />
      <div className="info">
        <p>Gabriel Lopes</p>
        <p>gabriellopes@mail.com</p>
      </div>
    </UserFieldDiv>
  )
}
