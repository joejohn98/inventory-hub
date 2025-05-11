import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { InventoryProvider } from './context/InventoryContext'

import './App.css'
import Sidebar from './components/Sidebar'
function App() {

  return (
    <>
      <InventoryProvider>
         <Router>
          <div>
            <Sidebar />
          </div>
         </Router>
        </InventoryProvider>
    </>
  )
}

export default App
