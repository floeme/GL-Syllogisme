import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Syllogismes from "./pages/Syllogismes";
import Polysyllogismes from "./pages/Polysyllogismes";

const App = () => {
  return (
    <div className="page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />

          {/* si c'est une url qui mene a rien cela ramene a la page home */}
          <Route path="*" element={<Home></Home>} />

          <Route path="/syllogismes" element={<Syllogismes></Syllogismes>} />
          <Route
            path="/polysyllogismes"
            element={<Polysyllogismes></Polysyllogismes>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
