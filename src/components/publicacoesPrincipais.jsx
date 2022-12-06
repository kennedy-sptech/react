import React, { useEffect, useState } from "react";
import Publicacao from "./publicacao";

import api from "../api";

const PublicacoesPrincipais = () => {
  const [ordenadas, setOrdenadas] = useState(new Array());
  // const [respondeu, setRespondeu] = useState(new Array());

  useEffect(() => {
    console.log("Buscor dados!");
    buscarDados();
  }, []);

  function buscarDados() {

      api.get("/publicacoes/ordenado")
      .then((respostaObtida) => {
        console.log("resp ordenadas: ");
        console.log(respostaObtida.data);

        setOrdenadas(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });
  }

  return (
    <div className="publicacoes">
      {ordenadas.map((publicacao, index) => (
        // console.log(publicacao),
        <Publicacao publicacao={publicacao}  
        key={index}
        />
      ))}
    </div>
  );
};

export default PublicacoesPrincipais;
