import React, { useContext, useEffect, useState } from "react";
import fotoPadrao from "../img/fotoquadrada.png";
import "../css/perfil.scss";
import edit from "../img/editpencil.svg";
import editon from "../img/editon.svg";
import receberEmail from "../img/emailtruepng.png";
import naoReceberEmail from "../img/emailfalse.png";
import api from "../api";
import Button from "../components/button";
import ModalAlterarSenha from "../components/ModalAlterarSenha";
import Modal from "../components/ModalErro";
import { isVisible } from "@testing-library/user-event/dist/utils";
import ModalAlterarFoto from "../components/ModalAlterarFoto";
import ModalErro2 from "../components/ModalErro2";
import ModalSenhaalterada from "../components/ModalSenhaalterada";
import { set } from "date-fns";
import ButtonOutline from "../components/buttonoutline";
import ModalFotoalterada from "../components/Modalfotoalterada";
import { FiltroContext } from "../components/contexts/filtro";

const ContentPerfil = (dados) => {
  const [isModalSenhaVisible, setModalSenhaVisible] = useState(false);
  const [isModalSenhaAlteradaVisible, setModalSenhaAlteradaVisible] =
    useState(false);
  const [isModalSenhaErroVisible, setModalSenhaErroVisible] = useState(false);
  const [isModalFotoSucesso, setModalFotoSucesso] = useState(false);
  const [isModalFotoVisible, setModalFotoVisible] = useState(false);
  const [senhaAntigaInput, setSenhaAntigaInput] = useState("");
  const [senhaNovaInput, setSenhaNovaInput] = useState("");
  const [confirmaSenhaNovaInput, setConfirmaSenhaNovaInput] = useState("");

  const [visibleFalha, setVisibleFalha] = useState("naomostra");
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    console.log("Buscar dados de publicacoes!");
    usuarios();
    setVisibleFalha("naomostra");
  }, []);

  let ra = window.sessionStorage.ra_usuario;
  let nome = window.sessionStorage.nome;
  let email = window.sessionStorage.email;
  let foto = window.sessionStorage.foto_perfil;
  let id = window.sessionStorage.id;
  const [usuario, setUsuario] = useState(new Array());
  const [ccheck, setCheck] = useState(new Array());

  function usuarios() {
    api
      .get(`/usuarios/{id}?id=${id}`)
      .then((respostaObtida) => {
        console.log("USUARIO: ", respostaObtida);
        console.log(respostaObtida.data);

        setUsuario(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });
  }

  function check() {
    api
      .patch(`/usuarios/mudar-check?id=${id}`)
      .then((respostaObtida) => {
        console.log(respostaObtida.data);

        setCheck(respostaObtida.data);
        console.log("checkando: ", respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });
  }

  function alterarSenha() {
    if (confirmaSenhaNovaInput == senhaNovaInput) {
      const objetoFormatado = {
        senhaAntiga: senhaAntigaInput,
        senhaNova: senhaNovaInput,
      };

      api
        .patch(`/usuarios/mudar-senha?id=${id}`, objetoFormatado)
        .then((respostaObtida) => {
          console.log(respostaObtida.data);

          setCheck(respostaObtida.data);
          console.log("senha alterada: ", respostaObtida.data);
          senhaalterada();
        })
        .catch(function (erroOcorrido) {
          if (erroOcorrido) {
            document.getElementById("p-erro-senha").style.display = "block";
          } else {
            console.log(erroOcorrido);
            console.log("senha não alterada: ", erroOcorrido);
            // setVisibleFalha("mostra");
            senhanaoalterada();
          }
        });
    }
  }

  function alterarFoto() {
    const url = urlInput;
    api
      .patch(`usuarios/mudar-perfil?id=${id}&perfil=${url}`)
      .then((respostaObtida) => {
        console.log(respostaObtida.data);
        sessionStorage.foto_perfil = url;
        console.log("foto alterada: ", respostaObtida.data);
        fotoalterada();
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
        console.log("senha não alterada: ", erroOcorrido);
        // setVisibleFalha("mostra");
        fotonaoalterada();
      });
  }

  function validaFoto() {
    const url = urlInput;
    if (url != "" && url != null) {
      console.log("não nulo, nem vazio");
      alterarFoto();
    } else {
      console.log("nulo, ou vazio");
      document.getElementById("p-url-foto").style.display = "block";
    }
  }

  function fecharModalReload() {
    setModalFotoSucesso(false);
    window.location.reload();
  }

  function senhaalterada() {
    setModalSenhaVisible(false);
    setModalSenhaAlteradaVisible(true);
  }

  function senhanaoalterada() {
    setModalSenhaErroVisible(true);
  }

  function fotoalterada() {
    setModalFotoVisible(false);
    setModalSenhaErroVisible(false);
    setModalFotoSucesso(true);
  }

  function fotonaoalterada() {
    setModalSenhaErroVisible(true);
    setModalFotoSucesso(false);
  }

  const backgroundImage = {
    backgroundImage: `url(${foto ? foto : fotoPadrao})`,
  };

  //Função de VALIDAR
  function validarSenha() {
    var senhaAntiga = document.getElementById("input-senha-antiga");
    var senhaNova = document.getElementById("input-senha-nova");
    var confirmaSenha = document.getElementById("input-confirma-senha");

    document.getElementById("p-senha-nova").style.display = "none";
    document.getElementById("p-validando").style.display = "block";

    //verificando se o ra está vazio
    if (senhaNova.value.length < 8) {
      document.getElementById("p-senha-nova").style.display = "block";
      document.getElementById("p-validando").style.display = "none";
      senhaNova.focus();
    } else if (senhaNova.value != confirmaSenha.value) {
      document.getElementById("p-confirma-senha-nova").style.display = "block";
      senhaNova.focus();
      confirmaSenha.focus();
    } else {
      alterarSenha();
    }
  }

  //FILTRANDO CATEGORIA
  const { filtroCategoria } = useContext(FiltroContext);
  const { isFilterVisible } = useContext(FiltroContext);
  const { setFilterVisible } = useContext(FiltroContext);

  return (
    <>
      <div className="content-feed">
        <div className="container-perfil">
          <h3>Configurações do Perfil</h3>
          <div className="container-dados">
            <div className="foto-btn">
              <div className="foto-usuario" style={backgroundImage}>
                <div
                  onClick={() => setModalFotoVisible(true)}
                  className="btn-12"
                >
                  {/* <img src={edit} alt="" /> */}
                </div>
              </div>
              <ButtonOutline
                className="click-button-editar5"
                onClick={() => setModalSenhaVisible(true)}
              >
                Alterar Senha
              </ButtonOutline>
            </div>
            <div className="list-dados">
              <div>
                <p>RA : </p> <p>{ra}</p>
              </div>
              <div>
                <p>Nome : </p> <p>{nome} </p>
              </div>
              <div>
                <p>E-mail : </p> <p>{email}</p>
              </div>
              <div>
                <p>Receber e-mails : </p>{" "}
                <img
                  className="check"
                  onClick={check}
                  src={ccheck == false ? naoReceberEmail : receberEmail}
                  alt=""
                />
              </div>

              <div>{/* <p> </p> <p>{dados.receberEmails}</p> */}</div>
            </div>
          </div>
        </div>

        {isModalSenhaVisible ? (
          <>
            <div className="modalalterarsenha">
              <ModalAlterarSenha onClose={() => setModalSenhaVisible(false)}>
                <div className="container-cadastro-editar">
                  <div className="input-titulo">
                    <p className="sub-titulo">Senha atual </p>
                    <div className="p-status">
                      <p id="p-erro-senha">Senha incorreta!</p>
                    </div>
                    <input
                      defaultValue={usuario.senha}
                      className="estilo-input-first"
                      onInput={(evento) =>
                        setSenhaAntigaInput(evento.target.value)
                      }
                      type="text"
                      placeholder={
                        "Digita a senha que você está ultilizando no momento"
                      }
                      id="input-senha-antiga"
                    />
                  </div>
                  <div className="input-titulo">
                    <p className="sub-titulo">Nova senha </p>
                    <div className="p-valida">
                      <p id="p-validando">
                        Sua nova senha deve conter no mínimo 8 caracteres
                      </p>
                    </div>

                    <div className="p-status">
                      <p id="p-senha-nova">
                        A senha precisa ao menos de 8 caracteres
                      </p>
                    </div>
                    <input
                      className="estilo-input-first"
                      onInput={(evento) =>
                        setSenhaNovaInput(evento.target.value)
                      }
                      type="text"
                      placeholder="Digite aqui sua nova senha"
                      id="input-senha-nova"
                    />
                  </div>
                  <div className="input-titulo">
                    <p className="sub-titulo">Confirmar nova senha </p>
                    <div className="p-status">
                      <p id="p-confirma-senha-nova">As senhas não conferem!</p>
                    </div>
                    <input
                      className="estilo-input-first"
                      onInput={(evento) =>
                        setConfirmaSenhaNovaInput(evento.target.value)
                      }
                      type="text"
                      placeholder="Digite para confirmar a sua nova senha"
                      id="input-confirma-senha"
                    />
                  </div>
                  <br />

                  <div className="box-btn">
                    <div className="categoria-pergunta">
                      <ButtonOutline>CANCELAR</ButtonOutline>
                      <div>
                        <Button
                          onClick={validarSenha}
                          className="click-button-editar"
                        >
                          {" "}
                          ATUALIZAR{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalAlterarSenha>
            </div>
          </>
        ) : (
          <></>
        )}

        {isModalFotoVisible ? (
          <>
            <div className="modalalterarsenha">
              <ModalAlterarFoto onClose={() => setModalFotoVisible(false)}>
                <div className="container-cadastro-editar">
                  <div className="input-titulo">
                    <p className="sub-titulo">Adicione a URL da foto</p>
                    <div className="p-status">
                      <p id="p-url-foto">
                        É preciso adicionar uma URL para alterar sua foto
                      </p>
                    </div>
                    <input
                      defaultValue={usuario.senha}
                      className="estilo-input-first"
                      onInput={(evento) => setUrlInput(evento.target.value)}
                      type="text"
                      placeholder={
                        "Cole aqui a url da foto que você deseja usar"
                      }
                    />
                  </div>
                  <br />

                  <div className="box-btn">
                    <div className="categoria-pergunta">
                      <ButtonOutline>CANCELAR</ButtonOutline>
                      <div>
                        <Button
                          onClick={validaFoto}
                          className="click-button-editar"
                        >
                          {" "}
                          ALTERAR{" "}
                        </Button>
                        <div>
                          {/* {isModalVisibleEditada
                          ? // <ModalEditada
                            //   onClose={reload
                            //   }
                            // />
                            ""
                          : null} */}
                        </div>
                        <div>
                          {/* {isModalVisibleFalha
                          ? // <ModalErro
                            //   onClose={() => setModalVisibleFalha(false)}
                            // />
                            ""
                          : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalAlterarFoto>
            </div>
          </>
        ) : (
          <></>
        )}
        <>
          {isModalSenhaAlteradaVisible ? (
            <>
              <ModalSenhaalterada
                onClose={() => setModalSenhaAlteradaVisible(false)}
              ></ModalSenhaalterada>
            </>
          ) : (
            ""
          )}

          {isModalSenhaErroVisible ? (
            <>
              <ModalErro2
                onClose={() => setModalSenhaErroVisible(false)}
              ></ModalErro2>
            </>
          ) : (
            ""
          )}

          {isModalFotoSucesso ? (
            <>
              <ModalFotoalterada
                onClose={fecharModalReload}
              ></ModalFotoalterada>
            </>
          ) : (
            ""
          )}
        </>
      </div>
    </>
  );
};

export default ContentPerfil;
