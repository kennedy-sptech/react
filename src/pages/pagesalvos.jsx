import React, { useEffect, useState } from "react";
import Active from "../Layout/active";
import Nav from "../components/nav";
import Search from "../Layout/search";
import Sidenav from "../Layout/sidenav";
import ContentSalvos from "../Layout/content-salvos";
import api from "../api";
import SalvoItem from "../components/salvoitem";
import '../css/salvos.scss';

const PageSalvos = () => {

  const[salvos, setSalvos] = useState(new Array())
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
   }, []);

   function carregarDados(){
    
    if (loading) {
      mostrarSalvos();
      return <div className="loading">Caregando...</div>;
    }
  }

  let id = window.sessionStorage.id

  function mostrarSalvos(){
    api.get(`/favoritos/filtro-favoritos?idUsuario=${id}`)
        .then((respostaObtida) => {
          console.log("RES SALVOS: ");
          console.log(respostaObtida.data);
          setSalvos(respostaObtida.data);
          // console.log('salvei NO SET?', salvos);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

  }
  return (
    <>
      <Nav />
      <div className="container">
        <Search />
        <Sidenav />
        <Active />
        {/* <ContentSalvos salvos={salvos}/> */}
        <div className="content-feed">
        <div className="publicacoes">
        
        <div className="container-perfil">
          <h1 className="titulo-salvos">Publicações Salvas</h1>
            {salvos  ?
            (
              <>
               {salvos.map((publicacao, index) => (
              <SalvoItem publicacao={publicacao} key={index} />
            ))}
              </>
            ) : ''}
        </div>
     
        <div className="publicacoes">
            
          </div>
        {/* <SalvoItem favoritos={favoritos} /> */}
      </div>
           
          </div>
      </div>
    </>
  );
};

export default PageSalvos;
