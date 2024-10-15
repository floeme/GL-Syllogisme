import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import './styles/index.scss'
import Home from './components/pages/Home.tsx';
import Syllogism from './components/pages/Syllogism.tsx';
import Polysyllogismes from './components/pages/Polysyllogism.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/syllogism" element={<Syllogism />} />
        <Route path="/polysyllogismes" element={<Polysyllogismes />} />
      </Route>
    </Routes>
  </BrowserRouter>
)