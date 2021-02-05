import { WrapperDiv } from './styles'
import { MapComponent } from '../map/map'
import { Panel } from '../panel/panel'
import { Position } from '../interfaces/beach'
// import axios from 'axios'

const beaches = [
  {
    name: 'Beach 1 asdf asdf asdf',
    position: Position.N,
    lat: -24.014985,
    lng: -46.416246
  },
  {
    name: 'Beach 2',
    position: Position.N,
    lat: -23.99884,
    lng: -46.259506
  },
  {
    name: 'Beach 3',
    position: Position.N,
    lat: -23.970462,
    lng: -46.336828
  },
  {
    name: 'Beach 4',
    position: Position.N,
    lat: -23.965266,
    lng: -46.184412
  },
  {
    name: 'Beach 5',
    position: Position.N,
    lat: -23.835567,
    lng: -46.117809
  },
  {
    name: 'Beach 6',
    position: Position.N,
    lat: -23.756509,
    lng: -45.834832
  },
  {
    name: 'Beach 7',
    position: Position.N,
    lat: -24.184869,
    lng: -46.784054
  }
]
export const Wrapper: React.FC = () => {
  // ;(async () => {
  //   const response = await axios.get<Beach[]>(
  //     'https://surfforecast-api.herokuapp.com/api/beaches',
  //     {
  //       headers: {
  //         accessToken:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWQ0N2RlYzJhYzQ5MDAxNTIwYmM3OSIsImlhdCI6MTYxMjUzMTY4MywiZXhwIjoxNjEyNTMyNTgzfQ.KEPW8iLLV5adzKrjx4967CI1gaUpdTYSlbzSfjT9JcQ'
  //       }
  //     }
  //   )
  //   console.log(response)
  // })()
  return (
    <WrapperDiv>
      <Panel beaches={beaches} />
      <MapComponent beaches={beaches} />
    </WrapperDiv>
  )
}
