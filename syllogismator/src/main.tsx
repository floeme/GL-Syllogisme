import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import './styles/index.scss'
import Home from './components/pages/Home.tsx';
import Syllogism from './components/pages/Syllogism.tsx';
import Polysyllogismes from './components/pages/Polysyllogism.tsx';
import Quantifier from './components/pages/QuantifierAliases.tsx';
import { QuantifierProvider } from './contexts/QuantifierContext.tsx';
import SyllogismTable from './components/pages/SyllogismTable.tsx';
import {ROUTES} from './constants/routes.ts';

// import i18n (needs to be bundled ;))
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QuantifierProvider>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<App />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.syllogism} element={<Syllogism />} />
          <Route path={ROUTES.polysyllogisms} element={<Polysyllogismes />} />
          <Route path={ROUTES.quantifiers} element={<Quantifier />} />
          <Route path={ROUTES.table} element={<SyllogismTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QuantifierProvider>
)