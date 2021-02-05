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
                <td>5 stars</td>
                <td>25km/h</td>
                <td>3m</td>
                <td>20km/h</td>
                <td>{beach.position}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TableContainer>
  )
}
