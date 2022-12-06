import React from "react";
import coruja from "../../components/img/logocoruja.svg";
import user from "../../components/img/user.svg";
import key from "../../components/img/key.svg";
import logo from "../../components/img/logosptech.svg";
import "../../css/autentication.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import api from "../../api";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const Autentication = () => {
  const navegador = useNavigate();

  const { authenticated, login } = useContext(AuthContext);

  const [ra, setRa] = useState("");
  const [senha, setSenha] = useState("");

  function autenticar() {
    const autenticar = axios
      .post("https://sptechforum-backend.azurewebsites.net/usuarios", {
        ra: document.getElementById("input-ra").value,
        senha: document.getElementById("input-senha").value,
      })
      .then((res) => {
        console.log("autenticacao resposta", res.data);
        sessionStorage.ra_usuario = res.data.ra;
        sessionStorage.nome = res.data.nome;
        sessionStorage.curso = res.data.curso;
        sessionStorage.semestre = res.data.semestre;
        sessionStorage.email = res.data.email;
        sessionStorage.check_email = res.data.checkEmail;
        sessionStorage.foto_perfil = res.data.fotoPerfil;
        sessionStorage.id = res.data.idUsuario;
        sessionStorage.acesso = res.data.fkAcesso;

        login(ra, senha);
        window.location.reload();
        //navegador("/home");
      })
      .catch((err) => {
        console.log(err);
        validar();
      });

  }

  //Função de VALIDAR
  function validar() {
    var ra = document.getElementById("input-ra");
    var senha = document.getElementById("input-senha");

    document.getElementById('p-ra').style.display = 'none';
    document.getElementById('p-senha').style.display = 'none';
    document.getElementById('p-usuario').style.display = 'none';
    document.getElementById('p-ra-caracters').style.display = 'none';
    document.getElementById('p-senha-caracters').style.display = 'none';

    //verificando se o ra está vazio
    if (ra.value == "") {
      document.getElementById('p-ra').style.display = 'block';
      ra.focus();
    }

    else if (ra.value.length < 8) {
      document.getElementById('p-ra-caracters').style.display = 'block';
      ra.focus();
    }

    if (senha.value == "") {
      document.getElementById('p-senha').style.display = 'block';
      senha.focus();
    }

    if (senha.value.length < 8) {
      document.getElementById('p-senha-caracters').style.display = 'block';
      senha.focus();
    }

    else {
      document.getElementById('p-usuario').style.display = 'block';
      ra.focus();
      senha.focus();
    }
  }

  return (
    <div className="container-autentication">
      <div className="container-form">
        <div className="autentication-logos">
          <img className="logo-um" src={coruja} alt="" />
          <img src={logo} alt="" />
        </div>
        <div className="autentication">
        <div className="p-statusss">
            <p id="p-ra">RA não informado</p>
            <p id="p-usuario">Usuário e/ou senha incorretos!</p>
            <p id="p-ra-caracters">O RA informado deve conter 8 caracteres!</p>
          </div>
          <div className="inpts-autentication">
            <img className="icons-autentication" src={user} alt="" />
            <input
              onChange={(e) => setRa(e.target.value)}
              id="input-ra"
              type="text"
              placeholder="Digite seu RA"
              name="ra"
            />
          </div>
          <div className="p-statusss">
            <p id="p-senha">Senha não informada</p>
            <p id="p-senha-caracters">A senha informada deve conter 8 caracteres!</p>

          </div>
          <div className="inpts-autentication">
            <img className="icons-autentication" src={key} alt="" />
            <input
              onInput={(e) => setSenha(e.target.value)}
              id="input-senha"
              type="password"
              placeholder="Digite sua senha"
              name="senha"
            />
          </div>

          <button onClick={() => autenticar()} className="btn-logar">
            ACESSAR
          </button>
          <p>Esqueceu a senha?</p>
        </div>
      </div>
    </div>
  );
};

export default Autentication;
