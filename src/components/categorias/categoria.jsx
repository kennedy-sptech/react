import "../../css/categoria.scss";
import React, { useContext } from "react";
import { FiltroContext } from "../contexts/filtro";


const Categoria = ({ categoria }) => {

  const { filtroCategorias } = useContext(FiltroContext);

  return (

    <div className="categoria"
      defaultValue={categoria.id}
      onClick={() => filtroCategorias(categoria.id)}
    >
      <p>{categoria.nome}</p>
    </div>

  );
};

export default Categoria;
