import React, { Component, useEffect, useState } from "react";
import { ReactDOM } from "react";
import "../../css/comentarios.scss";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import imagemUsuario from "../img/foto-nav.png";

const Comentario = (publicacoes) => {
  //Exibir comentário
  const [exibe, setExibe] = useState(false);
  const [comentarios, setComentarios] = useState(
    publicacoes.publicacao.publicacao.respostasByIdPublicacao
  );

  console.log("entrando na publi e nas respostas dela");
  console.log(publicacoes.publicacao.publicacao.respostasByIdPublicacao);

  useEffect(() => {
    console.log("comentarios", comentarios);
  });


  
  // let tituloCompleto = statuspergunta.titulo;
  // let titulo = tituloCompleto.substring(0, 25);
  // let data = statuspergunta.dataHora.substring(0, 13) + "h";
  // let tituloMobile = tituloCompleto.substring(0, 23) + "...";

  //  "dataHora": "2022-05-30 01:00:24.11",
  //   "diasAtras": 7,
  //   "cursoSemestre": "3º ADS"
//  let dataa = comentarios.dataHora;
//  let hora = dataa.substring(11,13)
//  let dia = dataa.substring(9, 10)
//  let mes = dataa.substring(6, 7)
//  let ano = dataa.substring(0, 3)

//  let mesFormat = mes == '01' ? 'JANEIRO' : (mes == '02' ? 'FEVEREIRO' : (mes == '05' ? 'MAIO' : (mes == '06' ? 'JUNHO' : 'DEPOIS DE JUNHO')))


//   let date = comentarios.diasAtras == 0 ? `hoje ás ${hora}h` : (comentarios.diasAtras > 0 && comentarios.diasAtras < 7 ? `á ${comentarios.diasAtras} dias atrás` : `${dia} de ${mesFormat} de ${ano}`)

  return (
    <div disabled={!exibe} className="Comentario">
      <div>
        <div>

          {comentarios.map((item) => {
            return (
              <>
              <div key={item.idResposta}>
                <div className="categoria-informacao2">
                  <div className="cont-top-foto">
                    <img className="fotocoments" src={item.fotoUsuario} />

                    <div className="aa">
                      <div className="ateste">{item.nomeUsuario} </div>
                      
                      <span className="data2">
                        {item.dataHora} </span>{" "}
                    </div>
                  </div>

                  <div>
                    <span className="categoria-tag-curso">
                      {item.cursoSemestre}
                    </span>
                  </div>
                </div>
                <div className="dados-frase-comentario">{item.texto}</div> 
              </div>
            </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comentario;

