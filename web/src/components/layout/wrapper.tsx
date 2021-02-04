import { WrapperDiv } from './styles'
import { MapComponent } from '../map/map'
import { Panel } from '../panel/panel'

export const Wrapper: React.FC = () => {
  return (
    <WrapperDiv>
      <Panel />
      <MapComponent />
    </WrapperDiv>
  )
}
