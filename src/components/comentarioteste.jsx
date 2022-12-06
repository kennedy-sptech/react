import React, { Component, useEffect, useState } from "react";
import { ReactDOM } from "react";
import "../css/comentarios.scss";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import imagemUsuario from "./img/foto-nav.png";

const Comentarioteste = (comentario) => {
  //Exibir comentário
  const [exibe, setExibe] = useState(false);
  // const [comentarios, setComentarios] = useState(
  //   publicacoes.publicacao.publicacao.respostasByIdPublicacao
  // );

  // console.log("entrando na publi e nas respostas dela");
  // console.log(publicacoes.publicacao.publicacao.respostasByIdPublicacao);

  useEffect(() => {
    // console.log("comentario da vez", comentario);
  });

  console.log("comentario da vez", comentario);
  
  // let tituloCompleto = statuspergunta.titulo;
  // let titulo = tituloCompleto.substring(0, 25);
  // let data = statuspergunta.dataHora.substring(0, 13) + "h";
  // let tituloMobile = tituloCompleto.substring(0, 23) + "...";

  //  "dataHora": "2022-05-30 01:00:24.11",
  //   "diasAtras": 7,
  //   "cursoSemestre": "3º ADS"
 let dataa = comentario.comentario.dataHora;
 let hora = dataa.substring(11,13);
 let dia = dataa.substring(9, 10);
 let mes = dataa.substring(6, 7);
 let ano = dataa.substring(0, 4);

 let mesFormat =
 mes == "01"
   ? "janeiro"
   : mes == "02"
   ? "fevereio"
   : mes == "05"
   ? "maio"
   : mes == "06"
   ? "junho"
   : (mes == '07' ? 'julho' : 
   (mes == '08' ? 'agosto' : (mes == '09' ? 'setembro' : (mes == '10' ?'outubro' : mes == '11' ? 'novembro' : 'dezembro' ))));


  let date3 = comentario.diasAtras == 0 ? `hoje ás ${hora}h` : (comentario.diasAtras > 0 && comentario.diasAtras < 7 ? `á ${comentario.diasAtras} dias atrás` : `${dia} de ${mesFormat} de ${ano}`)

  return (
    <div disabled={!exibe} className="Comentario">
      <div>
        <div>
        <>
              <div key={comentario.comentario.idResposta}>
                <div className="categoria-informacao2">
                  <div className="cont-top-foto">
                    <img className="fotocoments" src={comentario.comentario.fotoUsuario} />

                    <div className="aa">
                      <div className="ateste">{comentario.comentario.nomeUsuario} </div>
                      
                      <span className="data2">
                        {date3} </span>{" "}
                    </div>
                  </div>

                  <div>
                    <span className="categoria-tag-curso">
                      {comentario.comentario.cursoSemestre}
                    </span>
                  </div>
                </div>
                <div className="dados-frase-comentario">{comentario.comentario.texto}</div> 
              </div>
            </>

          {/* {comentarios.map((item) => {
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
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Comentarioteste;

