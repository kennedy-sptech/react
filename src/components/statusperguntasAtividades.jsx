import React, { useEffect, useState } from "react";
import api from "../api";
import StatusPerguntaAtividade from "./statusperguntaAtividade";
import StatusPerguntas from "./statusperguntas";

const StatusPerguntasAtividades = () => {
  const [statusPerguntas, setPerguntas] = useState(new Array());
  let id = window.sessionStorage.id;
  let idUsuario = parseInt(id);

  useEffect(() => {
    console.log(" buscando minhas duvidas em Statusperguntas!");
    buscarDados();
  }, []);

  function buscarDados() {
    console.log("promessa");
    console.log(api.get(`publicacoes/minhas-duvidas?id=${idUsuario}`));

    api
      .get(`/publicacoes/minhas-duvidas?id=${idUsuario}`)
      .then((respostaObtida) => {

        console.log("Dados recebidos de minhas duvidas ");
        console.log(respostaObtida.data);

        setPerguntas(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });
  }


  return (
    <>
      {statusPerguntas?.map((statuspergunta, index) => (
        <StatusPerguntaAtividade
          //   key={statuspergunta.id}
          statuspergunta={statusPerguntas}
          key={index}
        />
      ))}
    </>
  );
};

export default StatusPerguntasAtividades;
