import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../api";

export const FiltroContext = createContext();

export const FiltroCategoriasProvider = ({ children }) => {
  const [filtroCategoria, setFiltroCategoria] = useState(new Array());
  const [isFilterVisible, setFilterVisile] = useState(false)

function filtroCategorias(fkCategoria) {
    api
      .get(`/publicacoes/filtro-categoria?idCategoria=${fkCategoria}`)
      .then((respostaObtida) => {
        setFiltroCategoria(respostaObtida.data);
        setFilterVisile(true);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        console.log("Esse aqui é a categoria: ", fkCategoria);
      })
  }

  return (
    <FiltroContext.Provider value={{
      filtroCategorias, filtroCategoria, isFilterVisible, setFilterVisile
    }}>
      {children}
    </FiltroContext.Provider>
  );

}


