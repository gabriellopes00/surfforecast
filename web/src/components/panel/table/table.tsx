import { Table, TableContainer } from './styles'

import { Props } from '../../interfaces/beach'

export const TableComponent: React.FC<Props> = ({ beaches }) => {
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
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {beaches.map(beach => {
            return (
              <tr>
                <td>{beach.name}</td>
                <td>4 stars</td>
                <td>1.7m 10.67s</td>
                <td>1.9m</td>
                <td>20km/h</td>
                <td>{beach.position.toUpperCase()}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TableContainer>
  )
}
