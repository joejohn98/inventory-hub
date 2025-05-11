import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { InventoryProvider } from './context/InventoryContext'

import './App.css'
import Sidebar from './components/Sidebar'
function App() {

  return (
    <>
      <InventoryProvider>
         <Router>
          <div className="flex">
            <Sidebar />
            <div className='flex-1 min-h-screen'>
              <Routes>
                <Route path="/" element={} />
              </Routes>
            </div>
          </div>
         </Router>
        </InventoryProvider>
    </>
  )
}

export default App
