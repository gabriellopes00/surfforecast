import { FormComponent } from './form/form'
import { PanelDiv } from './styles'
import { TableComponent } from './table/table'

import { Props } from '../interfaces/beach'

export const Panel: React.FC<Props> = ({ beaches }) => {
  return (
    <PanelDiv>
      return <TableComponent beaches={beaches} />
      <FormComponent />
    </PanelDiv>
  )
}
