import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import Pesquisar from "../components/pesquisar";
import Button from "../components/button";
import Categorias from "../components/categorias";
import ModalPerguntar from "../components/ModalPerguntar";
import ModalEnviada from "../components/ModalEnviada";
import ModalRespostaEnviada from "../components/ModalRespostaEnviada";
import ModalErro from "../components/ModalErro";
import "../css/button.scss";
import "../css/statusPerguntas.scss";
import "../css/createPergunta.scss";
import "../css/search.scss";
import ModalPublicar from "../components/ModalPublicar";
import Analitcs from "./analitcs-moderador";
import ButtonOutline from "../components/buttonoutline";
import { FiltroContext } from "../components/publicacoes";
const Search = () => {
  const [textoInput, setTextoInput] = useState("");
  const [tituloInput, setTituloInput] = useState("");
  const [selectCategoria, setSelectCategoria] = useState("");
  const [selectValue, setSelectValue] = useState(1);
  const [autenticados, setAutenticados] = useState("");
  //const { filtro_categorias } = useContext(FiltroContext);


  let acesso = window.sessionStorage.acesso;
  let status = acesso == 1 ? 1 : 2;
  let fk = window.sessionStorage.fk;
  let id = window.sessionStorage.id;
  //Modais
  const [isModalVisibleErro, setModalVisibleErro] = useState(false);
  const [isModalVisibleRespostaEnviada, setModalVisibleRespostaEnviada] = useState(false);
  useEffect(() => {
    selecionarCategoria();
  }, []);
  
  function selecionarCategoria() {
    console.log("select categoria");
    console.log(selectCategoria);
    api
      .get("/categorias")
      .then((respostaObtida) => {
        console.log("resposta categorias criar pergunta: ", respostaObtida);
        setSelectCategoria(respostaObtida.data);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
    // api
    //   .get("/usuarios/autenticados")
    //   .then((respostaObtida) => {
    //     console.log("autenticados: ", respostaObtida);
    //     setAutenticados(respostaObtida.data.length);
    //   })
    //   .catch((erroOcorrido) => {
    //     console.log("erro ocorrido: ", erroOcorrido);
    //   });
  }

  function enviarPergunta() {
    console.log("Enviando dados de create pergunta!");
    console.log("Texto: ", textoInput);
    console.log("Titulo: ", tituloInput);

    console.log("Categoria: ", selectValue);
    console.log("fkUsuario: ", fk);
    const objetoFormatado = {
      texto: `${textoInput}`,
      titulo: `${tituloInput}`,
      fkCategoria: parseInt(selectValue),
      tipoPublicacao: 2,
      fkUsuario: parseInt(id),
      dataHora: "2022-04-07 15:15:15.0",
      status: status,
    };
    console.log("FORMATAÇÂO para enviar: ", objetoFormatado);
    api
      .post("/publicacoes/publicar", objetoFormatado)
      .then((respostaObtida) => {
        console.log("resposta obtida ao tentar publicar: ", respostaObtida);
        sucessoEnviadaPergunta();
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleErro(true);
      });
  }
  function enviarInformacao() {
    // evento.preventDefault();
    console.log("Enviando dados de create pergunta!");
    console.log("Texto: ", textoInput);
    console.log("Titulo: ", tituloInput);
    console.log("Categoria: ", selectValue);
    console.log("fkUsuario: ", fk);
    const objetoFormatado = {
      texto: `${textoInput}`,
      titulo: `${tituloInput}`,
      fkCategoria: parseInt(selectValue),
      tipoPublicacao: 1,
      fkUsuario: parseInt(id),
      dataHora: "2022-04-07 15:15:15.0",
      status: status,
    };
    console.log("FORMATAÇÂO para enviar: ", objetoFormatado);
    api
      .post("/publicacoes/publicar", objetoFormatado)
      .then((respostaObtida) => {
        console.log("resposta obtida ao tentar publicar: ", respostaObtida);
        sucessoEnviadaPublicacao();
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleErro(true);
      });
  }
  // function handleCreate(e) {
  //   e.preventDefault();
  //   alert(selectValue);
  // }

  const [categorias] = useState([
    {
      id: "1",
      nome: "SPTRANS",
    },
    {
      id: "5",
      nome: "ESTAGIO",
    },
    {
      id: "3",
      nome: "SECRETARIA",
    },
    {
      id: "8",
      nome: "BIBLIOTECA",
    },
    {
      id: "4",
      nome: "AULA",
    }
   
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVisibleModal, setVisibleModal] = useState(false);
  function txt() {
    var input = document.querySelector('input[type="file"]');
    var data = new FormData();
    data.append("txt", input.files[0]);
    fetch("http://localhost:8080/usuarios/gravar-txt", {
      method: "POST",
      body: data,
    })
      .then((respostaObtida) => {
        console.log("resposta obtida ao tentar publicar: ", respostaObtida);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }
  function downloadcsv() {
    window.open("http://localhost:8080/usuarios/relatorio");
  }
  function sucessoEnviadaPergunta() {
    setModalVisible(false);
    setVisibleModal(true);
  }
  function sucessoEnviadaPublicacao() {
    setModalVisible(false);
    setModalVisibleRespostaEnviada(true);
  }

  //Função de VALIDAR
  function validarPergunta() {
    console.log("entrei em validar pergunta");
    var tituloPergunta = document.getElementById("pergunta-calouro");
    var descricaoPergunta = document.getElementById("descricao-calouro");

    document.getElementById('p-caracters-pergunta-calouro').style.display = 'none';
    document.getElementById('p-caracters-calouro').style.display = 'none';
    document.getElementById('p-validando-descricao').style.display = 'block';
    document.getElementById('p-validando').style.display = 'block';

    if (tituloPergunta.value.length < 10) {
      document.getElementById('p-caracters-pergunta-calouro').style.display = 'block';
      document.getElementById('p-validando').style.display = 'none';
      tituloPergunta.focus();
    }

    if (descricaoPergunta.value.length < 10) {
      document.getElementById('p-caracters-calouro').style.display = 'block';
      document.getElementById('p-validando-descricao').style.display = 'none';
      tituloPergunta.focus();
    }

    else {
      enviarPergunta();
    }
  }

  //Função de VALIDAR
  function validarPostagem() {
    console.log("entrei em validar pergunta");
    var tituloPostagem = document.getElementById("titulo-postagem");
    var descricaoPostagem = document.getElementById("descricao-postagem");

    document.getElementById('p-titulo-postagem').style.display = 'none';
    document.getElementById('p-descricao-postagem').style.display = 'none';
    document.getElementById('p-validando-descricao').style.display = 'block';
    document.getElementById('p-validando').style.display = 'block';

    if (tituloPostagem.value.length < 10) {
      document.getElementById('p-titulo-postagem').style.display = 'block';
      document.getElementById('p-validando').style.display = 'none';
      tituloPostagem.focus();
    }

    if (descricaoPostagem.value.length < 10) {
      document.getElementById('p-descricao-postagem').style.display = 'block';
      document.getElementById('p-validando-descricao').style.display = 'none';
      descricaoPostagem.focus();
    }

    else {
      enviarInformacao();
    }
  }

  const placeholderr =
    "Descreva com detalhes a sua dúvida sobre algo relacionado ao ecossistema da sua formação";

  const $ = function () {
    $("#fupload").change(function () {
      $(".nomeArquivo").html("<b>Arquivo Selecionado:</b>" + $(this).val());
    });
  };

  return (
    <>
      {acesso == 3 ? (
        <>
          <div className="item search2">
            <div className="flex">
              <div className="bloco22">
                <div className="relatorio">
                  <p className="txt-p2">Relatório </p>
                  <Button onClick={downloadcsv} className="ButtonOutline">
                    BAIXAR{" "}
                  </Button>
                </div>
                {/* Usuarios online
                 <br/>
                  {autenticados} */}
              </div>
              <div className="bloco3">
                <div className="csv">
                  {/* <h5>ENVIAR ARQUIVO TXT ???</h5> */}
                  <p className="txt-p">Fazer upload de arquivo txt</p>
                  <form action="/">
                    <div className="botoes">
                      <label for="myFile">
                        {" "}
                        <input type="file" id="myFile" name="filename" />
                      </label>
                      <Button onClick={txt}>ENVIAR</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="item search">
            <div className="flex">
              <Pesquisar className="input-buscar" />
              {acesso == 1 ? (
                <Button
                  onClick={() => setModalVisible(true)}
                  className="click-button"
                >
                  PERGUNTAR
                </Button>
              ) : (
                <Button
                  onClick={() => setModalVisible(true)}
                  className="click-button"
                >
                  PUBLICAR
                </Button>
              )}
            </div>
            <div>
              <Categorias categorias={categorias} />
            </div>
            <div>
              {isModalVisible == true ? (
                acesso == 1 ? (
                  <ModalPerguntar
                    className="perguntar"
                    onClose={() => setModalVisible(false)}
                  >
                    <div className="container-cadastro-pergunta">
                      <label>
                        <div className="input-titulo">
                          <p className="sub-titulo">Título da pergunta</p>
                          <div className="p-pergunta">
                            <p id="p-caracters-pergunta-calouro">
                              Precisa ao menos de 10 caracteres
                            </p>
                          </div>
                          <div className="p-valida">
                            <p id="p-validando">
                              Para a pergunta ser enviada, é necessário pelo menos 10 caracteres
                            </p>
                          </div>

                          <input
                            onChange={(evento) => {
                              setTituloInput(evento.target.value);
                            }}
                            className="estilo-input-first"
                            type="text"
                            placeholder="Digite o título aqui..."
                            id="pergunta-calouro"
                          />
                        </div>
                      </label>
                      <label>
                        <div className="input-descricao">
                          <p className="sub-titulo">Descrição da pergunta</p>
                          {/* <input className='estilo-input-second' type="text"  /> */}
                          <div className="p-pergunta">
                            <p id="p-caracters-calouro">
                              Precisa ao menos de 10 caracteres
                            </p>
                          </div>
                          <div className="p-valida">
                            <p id="p-validando-descricao">
                              Para a pergunta ser enviada, é necessário pelo menos 10 caracteres
                            </p>
                          </div>
                          <textarea
                            className="estilo-input-second"
                            onInput={(evento) => {
                              setTextoInput(evento.target.value);
                            }}
                            placeholder={placeholderr}
                            id="descricao-calouro"
                          ></textarea>
                        </div>
                      </label>
                      <div className="box-btn">
                        <p className="sub-titulo">Categoria</p>
                        <div className="categoria-pergunta">
                          {/* <select  onInput={(evento) => {
                         setSelectInput(evento.target.value);
                       }}
                       className="estilo-input-three"
                       value={selectValue}
                       onChange={(e) => setSelectValue(e.target.name)}
                     >
                       {list.map((item, index) => (
                         <option value={item.id}>{item.name}</option>
                       ))}
                     </select> */}
                          <select
                            onChange={(evento) => {
                              setSelectValue(evento.target.value);
                            }}
                            name="categorias"
                            className="estilo-input-three"
                          >
                            {selectCategoria.map((elemento) => (
                              // <option key={elemento.idCategoria} value={elemento.idCategoria}>{elemento.categoria} </option>
                              <option
                                key={elemento.idCategoria}
                                value={elemento.idCategoria}
                              >
                                {elemento.categoria}{" "}
                              </option>
                            ))}
                          </select>
                          <div className="tamanho">
                            <Button
                              onClick={() => validarPergunta()}
                              className="click-button"
                            >
                              ENVIAR PERGUNTA AOS VETERANOS
                            </Button>
                            <div>
                              {isModalVisibleErro ? (
                                <ModalErro onClose={() => setModalVisibleErro(false)} />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalPerguntar>
                ) : (
                  <ModalPublicar
                    className="perguntar"
                    onClose={() => setModalVisible(false)}
                  >
                    <div className="container-cadastro-pergunta">

                      <label>
                        <div className="input-titulo">
                          <p className="sub-titulo">Título da publicação</p>
                          <div className="p-status">
                            <p id="p-titulo-postagem">
                              Precisa ao menos de 10 caracteres
                            </p>
                          </div>
                          <div className="p-valida">
                            <p id="p-validando">
                              Para a postagem ser enviada, é necessário pelo menos 10 caracteres
                            </p>
                          </div>

                          <input
                            onChange={(evento) => {
                              setTituloInput(evento.target.value);
                            }}
                            className="estilo-input-first"
                            type="text"
                            placeholder="Digite o título aqui..."
                            id="titulo-postagem"
                          />
                        </div>
                      </label>










                      <label>
                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Descrição da publicação
                          </p>
                          <div className="p-valida">
                            <p id="p-validando-descricao">
                              Para a postagem ser enviada, é necessário pelo menos 10 caracteres
                            </p>
                          </div>
                          <div className="p-status">
                            <p id="p-descricao-postagem">
                              Precisa ao menos de 10 caracteres
                            </p>
                          </div>
                          <textarea
                            className="estilo-input-second"
                            onInput={(evento) => {
                              setTextoInput(evento.target.value);
                            }}
                            placeholder="Detalhe a informação que você quer compartilhar"
                            id="descricao-postagem"
                          ></textarea>
                        </div>
                      </label>










                      <div className="box-btn">
                        <p className="sub-titulo">Categoria</p>
                        <div className="categoria-pergunta">
                          {/* <select  onInput={(evento) => {
                          setSelectInput(evento.target.value);
                        }}
                        className="estilo-input-three"
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.name)}
                      >
                        {list.map((item, index) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select> */}
                          <select
                            onChange={(evento) => {
                              setSelectValue(evento.target.value);
                            }}
                            name="categorias"
                            className="estilo-input-three"
                          >
                            {selectCategoria.map((elemento) => (
                              // <option key={elemento.idCategoria} value={elemento.idCategoria}>{elemento.categoria} </option>
                              <option
                                key={elemento.idCategoria}
                                value={elemento.idCategoria}
                              >
                                {elemento.categoria}{" "}
                              </option>
                            ))}
                          </select>
                          <div className="tamanho">
                            <Button
                              onClick={validarPostagem}
                              className="click-button"
                            >
                              PUBLICAR POSTAGEM INFORMATIVA
                            </Button>

                          </div>
                        </div>
                      </div>

                    </div>
                  </ModalPublicar>
                )
              ) : null}
            </div>
          </div>
        </>
      )}
      <div>
        {isVisibleModal ? (
          <ModalEnviada onClose={() => setVisibleModal(false)} />
        ) : null}
      </div>
      <div>
        {isModalVisibleRespostaEnviada ? (
          <ModalRespostaEnviada onClose={() => setModalVisibleRespostaEnviada(false)} />
        ) : null}
      </div>
    </>
  );
};
export default Search;