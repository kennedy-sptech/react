import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Feed from "./pages/feed";
import Create from "./pages/perguntas-create";
import Autentication from "./components/autentication";
import Perfil from "./pages/perfil";
import PagePerguntas from "./pages/perguntas";
import Feed2 from "./pages/perguntas";

import { AuthProvider, AuthContext } from "./components/contexts/auth";
import { FiltroCategoriasProvider, FiltroContext } from "./components/contexts/filtro";
import Analitcs from "./Layout/analitcs-moderador";
import PageAnalitcs from "./pages/pageanalitcs";
import PageSalvos from "./pages/pagesalvos";
import PageAnalitcsContador from "./pages/pageanalitcscontador";

const Rotas = () => {

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    const { filtroCategorias } = useContext(FiltroContext);

    if(loading){
      return <div className="loading">Caregando...</div>
    }

    if (!authenticated) {
      return <Navigate to="/" />
    }

    return children;
  };

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <FiltroCategoriasProvider>
          <Routes>
            <Route path="/" element={<Autentication />} />
            <Route path="/home" element={<Private> <Feed /> </Private>} />
            <Route path="/perfil" element={<Private> <Perfil /> </Private>} />
            <Route path="/publicacao" element={<Private> <PagePerguntas /> </Private>} />
            <Route path="/salvos" element={<Private> <PageSalvos /> </Private>} />
            <Route path="/home/create" element={<Private> <Create /> </Private>} />
            <Route path="/analitcs" element={<Private> <PageAnalitcs /> </Private>} />
            <Route path="/analitcs2" element={<Private> <PageAnalitcsContador /> </Private>} />

          </Routes>
          </FiltroCategoriasProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default Rotas;
