import { Table, TableContainer } from './styles'

const beaches = [
  {
    name: 'Beach 1',
    lat: -24.014985,
    lng: -46.416246
  },
  {
    name: 'Beach 2',
    lat: -23.99884,
    lng: -46.259506
  },
  {
    name: 'Beach 3',
    lat: -23.970462,
    lng: -46.336828
  },
  {
    name: 'Beach 4',
    lat: -23.965266,
    lng: -46.184412
  },
  {
    name: 'Beach 5',
    lat: -23.835567,
    lng: -46.117809
  },
  {
    name: 'Beach 6',
    lat: -23.756509,
    lng: -45.834832
  },
  {
    name: 'Beach 7',
    lat: -24.184869,
    lng: -46.784054
  }
]

export const TableComponent: React.FC = () => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Beach</th>
            <th>Rating</th>
            <th>Swell</th>
            <th>Wave</th>
            <th>Wind</th>
          </tr>
        </thead>
        <tbody>
          {beaches.map(beach => {
            return (
              <tr>
                <td>{beach.name}</td>
                <td>5 stars</td>
                <td>25km/h</td>
                <td>3m</td>
                <td>20km/h</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TableContainer>
  )
}
