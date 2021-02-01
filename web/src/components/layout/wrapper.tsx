import { GithubCorner } from '../github-corner/github-corner'
import { WrapperDiv } from './styles'
import { Header } from '../header/header'
import { Panel } from '../panel/panel'

export const Wrapper: React.FC = () => {
  return (
    <div>
      <WrapperDiv>
        <Header />
        <Panel />
        <div></div>
      </WrapperDiv>

      {/* Github flag link */}
      <GithubCorner projectUrl="https://github.com/gabriellopes00/surfforecast" />
    </div>
  )
}
