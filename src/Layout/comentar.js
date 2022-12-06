import React, { useEffect, useState } from "react";
import Comentario from "../components/comentario";
import "../css/comentarios.scss";
import api from "../api";
import { textSpanEnd } from "typescript";
import Button from "../components/button";
import Comentarios from "../components/comentarioss";

const Comentar = (publicacaoInt) => {
  const [textoInput, setTextoInput] = useState(new Array());
  let id = window.sessionStorage.id;
  let id2 = parseInt(id);
  let publiId = publicacaoInt.publicacaoInt

//   useEffect(console.log("awe", publicacao));

  function enviarComentario(evento) {
    evento.preventDefault();
    console.log("Enviando dados de create de Comentário!");
    console.log("Texto: ", textoInput);

    const objetoFormatado = {
      texto: textoInput,
      fkUsuario: parseInt(id2),
    };

    console.log("FORMATAÇÃO para o ENVIO: ", objetoFormatado);
    console.log("props recebida ", publicacaoInt);

    api
      .post(
        `/respostas?idPublicacao=${publiId}`,
        objetoFormatado
      )
      .then((respostaObtida) => {
        console.log("resposta obtida ao tentar publicar: ", respostaObtida);
        
        window.location.reload();
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  return (
    <div>
      <form
        method="post"
        onSubmit={enviarComentario}
        className="Novo-Comentario"
      >
        <div>
          <textarea
            name="mensagem"
            onInput={(evento) => setTextoInput(evento.target.value)}
            required
            rows="4"
            placeholder=" Escreva um comentario"
          />
        </div>
        <div className="addcomentario">
          {" "}
          <Button type="submit">Adicionar Comentário</Button>
        </div>
      </form>
    </div>
  );
};

export default Comentar;
