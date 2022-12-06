import React, { useEffect, useState } from "react";
import StatusPergunta from "./statuspergunta";
import api from "../../api";

const StatusPerguntas = () => {
  const [statusPerguntas, setPerguntas] = useState(new Array());
  const [statusPublis, setStatusPublis] = useState(new Array());

  let acesso = window.sessionStorage.acesso;
  let id = window.sessionStorage.id;
  let id2 =  parseInt(id)
  useEffect(() => {
    console.log("Statusperguntas ok!");
    buscarDados();
  }, []);

  function buscarDados() {
    console.log("promessa");
    console.log("id teste",id);
    // console.log(api.get(`publicacoes/minhas-duvidas?id=${id2}`));

    api
      .get(`/publicacoes/minhas-duvidas?id=${id2}`)
      .then((respostaObtida) => {
        console.log("RespostaObtida minhas duvidas: ");
        console.log(respostaObtida);

        console.log("Dados minhas duvidas ");
        console.log(respostaObtida.data);

        setPerguntas(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

      api
      .get(`/publicacoes/minha-colaboracao?id=${id2}`)
      .then((respostaObtida) => {
        console.log("RespostaObtida minhas duvidas: ");
        console.log(respostaObtida);

        console.log("Dados minhas duvidas ");
        console.log(respostaObtida.data);

        setStatusPublis(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

  }

  function deletar(){

  }

  return (
    <>
    {acesso == 1 ? 
    (
      <>
       {statusPerguntas?.map((statuspergunta, index) => (
        <StatusPergunta
          funcdelet={deletar}
          //   key={statuspergunta.id}
          statuspergunta={statuspergunta}
          key={index}
        />
      ))}
      </>

    ) : (
      <>
       {statusPublis?.map((statuspergunta, index) => (
        <StatusPergunta
          //   key={statuspergunta.id}
          statuspergunta={statuspergunta}
          key={index}
        />
      ))}
      </>
    )}
     
    </>
  );
};

export default StatusPerguntas;
