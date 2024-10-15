import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import './styles/index.scss'
import Home from './components/pages/Home.tsx';
import Syllogismes from './components/pages/Syllogismes.tsx';
import Polysyllogismes from './components/pages/Polysyllogismes.tsx';

// import i18n (needs to be bundled ;))
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/syllogismes" element={<Syllogismes />} />
        <Route path="/polysyllogismes" element={<Polysyllogismes/>} />
      </Route>
    </Routes>
  </BrowserRouter>
)