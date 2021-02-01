import { Wrapper } from './components/layout/wrapper'
import GlobalStyles from './styles/global'

export const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Wrapper />
    </div>
  )
}
