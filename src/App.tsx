import {Home, CharacterDetail} from "./view/index"
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/character/:id' element={<CharacterDetail />} />
    </Routes>
  )
}

export default App
