import React, { Component, useEffect, useState, createContext, useContext } from "react";
import "../css/filter.scss";
import Publicacao from "./publicacao";
import api from "../api";
import { FiltroContext } from "./contexts/filtro";

const Publicacoes = () => {

  
  let id = window.sessionStorage.id;
  let acesso = window.sessionStorage.acesso;

  const [publicacoess, setPublicacoess] = useState(new Array());
  const [ordenadoss, setOrdenadoss] = useState(new Array());
  const [colaboracoess, setColaboracoess] = useState(new Array());
  const [perguntass, setPerguntass] = useState(new Array());

  let usuario = acesso == 2 ? 'pergunta' : 'publicacoes'
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(usuario);
  // const [filter, setFilter] = useState("inicio");

  const [publicacoes, setPublicacoes] = useState(false);
  const [ordenados, setOrdenados] = useState(false);
  const [colaboracoes, setColaboracoes] = useState(false);
  const [perguntas, setPerguntas]= useState(false);




  //FILTRANDO CATEGORIA
  const { filtroCategoria } = useContext(FiltroContext);
  const { isFilterVisible } = useContext(FiltroContext);
  const { setFilterVisible } = useContext(FiltroContext);


console.log('filtro ativado?', isFilterVisible)
// console.log('eita', filtrei);



  useEffect(() => {
    console.log("Buscar dados de publicacoes!");
    carregarDados();
  },[]);

  function carregarDados(){
    
    if (loading) {
      buscarDados();
      return <div className="loading">Caregando...</div>;
    }
  }

  function buscarDados() {
   
    if (acesso == 1) {
      api
        .get("/publicacoes")
        .then((respostaObtida) => {
          console.log("FEED NORMAL: ");
          console.log(respostaObtida.data);

          setPublicacoess(respostaObtida.data);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

      api
        .get(`/publicacoes/minha-colaboracao?id=${id}`)
        .then((respostaObtida) => {
          console.log("FEED COLABORACOES: ");
          console.log(respostaObtida.data);

          setColaboracoess(respostaObtida.data);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

      api
        .get("/publicacoes/ordenado")
        .then((respostaObtida) => {
          console.log("FEED ORDENADOS: ");
          console.log(respostaObtida.data);

          setOrdenadoss(respostaObtida.data);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });
    } else if (acesso == 2) {
      api
        .get("/publicacoes/perguntas")
        .then((respostaObtida) => {
          console.log("FEED PERGUNTAS: ");
          console.log(respostaObtida.data);

          setPerguntass(respostaObtida.data);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

      api
        .get("/publicacoes")
        .then((respostaObtida) => {
          console.log("FEED NORMAL: ");
          console.log(respostaObtida.data);

          setPublicacoess(respostaObtida.data);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

      api
        .get(`/publicacoes/minha-colaboracao?id=${id}`)
        .then((respostaObtida) => {
          console.log("FEED COLABORACOES: ");
          console.log(respostaObtida.data);

          setColaboracoess(respostaObtida.data);
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

      // setFilter("inicio");
      // setValue("inicio");
    } else {
      api
        .get("/publicacoes")
        .then((respostaObtida) => {
          console.log("FEED NORMAL: ");
          console.log(respostaObtida.data);

          setPublicacoess(respostaObtida.data);
        document.getElementById('contador').innerHTML  = document.getElementsByClassName('container-publicacao').length
        })
        .catch(function (erroOcorrido) {
          console.log(erroOcorrido);
        });

        
        setLoading(false);

    }

    console.log("length", publicacoess.length);

    for (let index = 0; index < publicacoess.length; index++) {
      const element = publicacoess[index];
      
    }
  }

  let testando =  isFilterVisible ? true : false;
  const[teste, setTeste] = useState(false);

  console.log('teste', teste);

    
const[fvet1, setFvet1] = useState('filter-one');
const bacgroundv = fvet1 == 'filter-one2' ? 'filter-one2' : 'filter-one';

const[fvet2, setFvet2] = useState('filter-two');
const bacgroundv2 = fvet2 =='filter-two2' ? 'filter-two2' : 'filter-two';

const[fcal, setFcal] = useState('filter-two');
const bacgroundc = fcal == 'filter-two2' ? 'filter-two2' : 'filter-two';

  function filtroFeed(valor){
      if(valor == 'feedv' ){
        setValue('feed')
        setFvet1('filter-one2')
        setFvet2('filter-two')
      }else if(valor == 'colaboracoesv'){
        setValue('colaboracoes')
         setFvet1('filter-one')
        setFvet2('filter-two2')
      }else if(valor == 'feedc' ){
        setValue('relevancia')
        setFvet1('filter-one2')
        setFvet2('filter-two')
      }else if(valor == 'colaboracoesc'){
        setValue('colaboracoes')
         setFvet1('filter-one')
        setFvet2('filter-two2')
      }
  }

  let criarpp = acesso == 2 ? 'publicação' : 'pergunta';

  console.log("TESTANDO FILTRO DE CATEGORIAS: ", filtroCategoria);

  return (
    <>
      {acesso == 3 ? (
        <>
          {/* filtro do moderador */}
          <div className="box-filter-moderador">
            {/* filtro do feed */}
            <div className="container-filter">
              <div className={"item-filter "}>
                <span id="contador" className="cont-moderador"> 0</span>
                <span className="cont-moderador-top">
                  Postagens aguardando análise
                </span>
                <span> </span>
              </div>
            </div>
            {/* fim do filtro */}
          </div>
        </>
      ) : (
        <>
         {acesso == 2 ? 
         <>
          <div className="box-filter2">
            <div onClick={() => filtroFeed("feedv")} className={bacgroundv}>
           
              <p>Feed </p>   
           
            </div>
            <div onClick={() => filtroFeed("colaboracoesv")} className={bacgroundv2} >
           
              <p>  Minhas Colaborações </p>
             
            </div>
          </div>
         </> :
         
         <>
          <div className="box-filter2">
            <div onClick={() => filtroFeed("feedc")} className={bacgroundv}>
           
              <p>Mais Relevantes </p>   
           
            </div>
            <div onClick={() => filtroFeed("colaboracoesc")} className={bacgroundv2} >
           
              <p>  Minhas Colaborações </p>
             
            </div>
          </div>
         </>}
        </>
      )}
      {isFilterVisible ?  (filtroCategoria ? (

<div className="publicacoes">
{filtroCategoria.map((publicacao, index) => (
  <Publicacao publicacao={publicacao} key={index} />
))}
</div> 
      ) : <><div  className="container-publicacao3">
         
          <div className="frase-respostacat"> <p className="resposta-pgt">
        `OPSsssss, ainda não temos publicações com essa categoria no feed. Que tal fazer uma {criarpp} sobre isso?
        </p></div></div>
      </>) : 
     
     (
      acesso == 2 ? (
        //feed perguntas
        value == "perguntas" ? (
          <div className="publicacoes">
            {perguntass.map((publicacao, index) => (
              <Publicacao publicacao={publicacao} key={index} />
            ))}
          </div>
        ) : value == "feed" ? (
          //publicações de todos
          <div className="publicacoes">
            {publicacoess.map((publicacao, index) => (
              <Publicacao publicacao={publicacao} key={index} />
            ))}
          </div>
        ) : value == "colaboracoes" ? (
          //minhas colaboracoes
         colaboracoess.length > 0 ? (
          <div className="publicacoes">
          {colaboracoess.map((publicacao, index) => (
            <Publicacao publicacao={publicacao} key={index} />
          ))}
        </div>
         ) : 'Você ainda não possui colaborações aprovadas'
        ) : (
          //feed perguntas
          <div className="publicacoes">
            {perguntass.map((publicacao, index) => (
              <Publicacao publicacao={publicacao} key={index} />
            ))}
          </div>
        )
      ) : //calouro
      value == "publicacao" ? (
        <div className="publicacoes">
          {publicacoess.map((publicacao, index) => (
            <Publicacao publicacao={publicacao} key={index} />
          ))}
        </div>
      ) : value == "relevancia" ? (
        <div className="publicacoes">
          {ordenadoss.map((publicacao, index) => (
            <Publicacao publicacao={publicacao} key={index} />
          ))}
        </div>
      ) : value == "colaboracoes" ? (
        <div className="publicacoes">
          {colaboracoess.map((publicacao, index) => (
            <Publicacao publicacao={publicacao} key={index} />
          ))}
        </div>
      ) : (
        <div className="publicacao">
          {publicacoess.map((publicacao, index) => (
            <Publicacao publicacao={publicacao} key={index} />
          ))}
        </div>
      )
     )}   
    </>
  );
};

export default Publicacoes;
