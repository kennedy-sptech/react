import React, { useState } from "react";
import imagemUsuario from "./img/foto-nav.png";
import "../css/atividade.scss";
import StatusPerguntas from "./statusperguntas";

const Atividade = ({ publicacao }) => {

  const [statusPerguntas, setPerguntas] = useState();
  return (
    //     <div className="container-atividade">
    //       <div className="conteudo-dados">
    //         <img className="avatar" src={imagemUsuario} alt={atividade.mensagem} />
    //         <div>
    //           <p className="nome">{atividade.respondeu} respondeu a sua pergunta </p>
    //           <p className="mensagem" >{atividade.mensagem}</p>
    //           <p className="hora-atividade">{atividade.hora}</p>
    //         </div>
    //       </div>
    //     </div>

    // <div className="detalhes-pub">
    // <div>
    //   <img className="avatar" src={userFoto} alt={publicacao.nome} />
    // </div>
    <>
    <StatusPerguntas statusperguntas={statusPerguntas} />
      {/* <div className="conteudo-titulo">
        <div className="frase-resposta">
          <p className="resposta-pgt">
            <span className="nome">
              {" "}
              {publicacao.respostasByIdPublicacao[0]
                ? publicacao.respostasByIdPublicacao[0].nomeUsuario
                : ""}{" "}
            </span>
            respondeu a pergunta de
            <span className="nome"> {publicacao.nomeUsuario}</span>
          </p>
        </div>

        <div className="dados-frase-resposta">
          <div classNme="data">
            <span> {publicacao.dataHora} </span>

            <span className="p-destaque"> {publicacao.categoria} |</span>
            <span className="p-destaque"> {publicacao.titulo} </span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Atividade;
