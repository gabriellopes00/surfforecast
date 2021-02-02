import { Logo, HeaderDiv } from './styles'
import { UserField } from './user-field/user-field'
import logoImage from '../../assets/images/logo.svg'

export const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <Logo>
        <img src={logoImage} alt="logo" />
      </Logo>
      <UserField />
    </HeaderDiv>
  )
}
