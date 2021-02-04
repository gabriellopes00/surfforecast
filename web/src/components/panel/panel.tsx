import { FormComponent } from './form/form'
import { PanelDiv } from './styles'
import { TableComponent } from './table/table'

export const Panel: React.FC = () => {
  return (
    <PanelDiv>
      <TableComponent />
      <FormComponent />
    </PanelDiv>
  )
}
