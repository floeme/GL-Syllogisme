import './App.css'
import { Message } from './message'
import { Todos } from './Todos'

import {Home } from './components/pages/Homes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />

          {/* si c'est une url qui mene a rien cela ramene a la page home */}
          <Route path="*" element={<Home></Home>} />

          {/* <Route path="/syllogismes" element={<Syllogismes></Syllogismes>} /> */}
          {/* <Route */}
            {/* path="/polysyllogismes" */}
            {/* element={<Polysyllogismes></Polysyllogismes>} */}
          {/* /> */}
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
