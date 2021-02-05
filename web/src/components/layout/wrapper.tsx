import { WrapperDiv } from './styles'
import { MapComponent } from '../map/map'
import { Panel } from '../panel/panel'
import { Position } from '../interfaces/beach'

const beaches = [
  {
    lat: -23.99884,
    lng: -46.259506,
    name: 'P.Pitangueiras',
    position: Position.W
  },
  {
    name: 'P.Praia Grande',
    position: Position.W,
    lat: -24.014985,
    lng: -46.416246
  },
  {
    name: 'P.Santos',
    position: Position.W,
    lat: -23.970462,
    lng: -46.336828
  },
  {
    name: 'P.Pernambuco',
    position: Position.W,
    lat: -23.965266,
    lng: -46.184412
  },
  {
    name: 'P.Bertioga',
    position: Position.W,
    lat: -23.835567,
    lng: -46.117809
  },
  {
    name: 'P.Bertioga',
    position: Position.W,
    lat: -23.756509,
    lng: -45.834832
  }
]
export const Wrapper: React.FC = () => {
  return (
    <WrapperDiv>
      <Panel beaches={beaches} />
      <MapComponent beaches={beaches} />
    </WrapperDiv>
  )
}
