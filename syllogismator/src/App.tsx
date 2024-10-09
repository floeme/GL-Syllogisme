import './App.css'
import { Home } from './components/pages/Home.tsx'
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
