import { GithubCorner } from '../github-corner/github-corner'
import { WrapperDiv, Content } from './styles'
import { Header } from '../header/header'
import { Panel } from '../panel/panel'

export const Wrapper: React.FC = () => {
  return (
    <div>
      <WrapperDiv>
        <Content>
          <Header />
          <Panel />
        </Content>
        <div></div>
      </WrapperDiv>

      {/* Github flag link */}
      <GithubCorner projectUrl="https://github.com/gabriellopes00/surfforecast" />
    </div>
  )
}
