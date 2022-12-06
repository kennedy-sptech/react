import React, { useContext } from "react";
import "../css/nav.scss";

import userPadrao from "../img/userpadrao.svg";
import logoForum from "../components/img/logoforum.svg";
import logoSptech from "../components/img/logosptech.svg";
import fotoNav from "../components/img/foto-nav.png";
import notification from "../components/img/onnotifications.svg";
import logoutt from "../components/img/logout.svg";
import seta from "../components/img/arrowdown.svg";
import linha from "../components/img/Line.png";
import api from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/auth";

const Nav = (props) => {
  const navegador = useNavigate();
  const { logout } = useContext(AuthContext);

  let nome = window.sessionStorage.nome;
  let curso = window.sessionStorage.curso;
  let semestre = window.sessionStorage.semestre;
  let foto = window.sessionStorage.foto_perfil;
  let acesso = window.sessionStorage.acesso;

  const handleLogout = () => {
    logout();
  }

  let tipoacesso = acesso == 3 ? "" :" ° SEMESTRE";
  let tiposemestre = acesso == 3 ? "" :semestre;

  return (
    <div className="nav-container">
      <div className="item nav">
        <div className="logos">
          <img className="forum" src={logoForum} alt="logo-forum" />
          <img className="logosptec" src={logoSptech} alt="logo-sptech" />
        </div>

        <div className="nav-rigth">
          <div className="max">
            <span className="dados-usuario">
              <p> {nome}</p>
              <p className="p-sub">{curso + " " +   tiposemestre + tipoacesso }</p>
            </span>

            <div>
              <img className="fotousuario" src={foto} alt="foto-usuario" />
            </div>
          </div>
          <div className="mobile">
            <img className="fotousuario" src={foto} alt="foto-usuario" />
            <span className="dados-usuario">
              <p> {nome}</p>
              <p className="p-sub">{curso + " - " + semestre + "° SEMESTRE"}</p>
            </span>
          </div>

          <span className="icons">
            {/* <img src={seta} alt="seta" /> */}
            {/* <img src={linha} alt="linha" /> */}
            <img onClick={handleLogout} src={logoutt} alt="logout" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
