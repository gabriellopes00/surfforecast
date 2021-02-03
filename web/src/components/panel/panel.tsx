import { PanelDiv, CustomTable } from './styles'

export const Panel: React.FC = () => {
  return (
    <PanelDiv>
      <div className="table">
        <CustomTable>
          <tr>
            <th>Beach</th>
            <th>Rating</th>
            <th>Sell</th>
            <th>Wave</th>
            <th>Wind</th>
          </tr>
          <hr />
          <tr>
            <td>Manly Beach</td>
            <td>5 starts</td>
            <td>10m/s</td>
            <td>10m/s</td>
            <td>W</td>
          </tr>
        </CustomTable>
      </div>
      <div className="beach-form"></div>
    </PanelDiv>
  )
}
