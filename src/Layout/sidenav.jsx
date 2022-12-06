import React from "react";
import "../css/sidenav.scss";
import ButtonSideNav from "../components/button-sidenav";
import { NavLink, useLocation } from "react-router-dom";

import perguntas from "..//img/conversa.svg";
import analise from "../img/analitics.svg"
import user from "../img/usersidenav.svg"
import salvosid from "../img/salvossidnav.svg"
import home from "../img/home.svg"
import file from "../img/file.svg"
import file2 from "../img/file2.svg"
import send from "../img/send.svg"
import { useNavigate } from "react-router-dom";

const Sidenav = () => {
  let acesso = window.sessionStorage.acesso;

  const active = useLocation().pathname;
function reload(){
  window.location.reload();
}
  return (
    <>
      {acesso == 3 ? 
      (
        <>
        <div className={acesso == 3 ? "item-moderador sidenav-mderador" : "item sidenav"}>
          <NavLink  to="/home" style={{ textDecoration: 'none' } }>
            <div className={active == "/home" ? "isActive" : "hover"}>
              <ButtonSideNav  onClick={reload}  icon={home}>
                {" "}
                <span>Publicacoes</span>{" "}
              </ButtonSideNav>{" "}
            </div>
          </NavLink>

          <NavLink to="/perfil" style={{ textDecoration: 'none' }}>
            <div className={active == "/perfil" ? "isActive" : "hover"}>
              <ButtonSideNav icon={user}>
                {" "}
                <span> Perfil </span>{" "}
              </ButtonSideNav>
            </div>
          </NavLink>

          <NavLink to="/analitcs" style={{ textDecoration: 'none' }}>
            <div className={active == "/analitcs" ? "isActive" : "hover"}>
              <ButtonSideNav icon={file2} >
                {" "}
                <span> Arquivos </span>{" "}
              </ButtonSideNav>
            </div>
          </NavLink>

          <NavLink to="/analitcs2" style={{ textDecoration: 'none' }}>
            <div className={active == "/analitcs2" ? "isActive" : "hover"}>
              <ButtonSideNav icon={analise} >
                {" "}
                <span> Analises </span>{" "}
              </ButtonSideNav>
            </div>
          </NavLink>

        
        </div>
      </>
      ) : (
        <>
          <div className="item sidenav">
            <NavLink to="/home" style={{ textDecoration: 'none' }}>
              <div className={active == "/home" ? "isActive" : "hover"}>
              {acesso == 2 ? (
                  <ButtonSideNav icon={perguntas}>
                
                  <span>Perguntas</span>
                </ButtonSideNav>
              ): (  <ButtonSideNav icon={home}>
             
                <span>Feed</span>
              </ButtonSideNav>)}
              </div>
            </NavLink>

            <NavLink to="/perfil" style={{ textDecoration: 'none' }}>
              <div className={active == "/perfil" ? "isActive" : "hover"}>
                <ButtonSideNav icon={user}>
                  {" "}
                  <span>Perfil</span>{" "}
                </ButtonSideNav>
              </div>
            </NavLink>

            <NavLink to="/publicacao" style={{ textDecoration: 'none' }}>
              <div className={active == "/publicacao" ? "isActive" : "hover"}>
                <ButtonSideNav icon={send}>
                  {" "}
                  <span> {acesso == 2 ? "Postagens" : "Perguntas"}</span>{" "}
                </ButtonSideNav>
              </div>
            </NavLink>

            <NavLink to="/salvos" style={{ textDecoration: 'none' }}>
              <div className={active == "/salvos" ? "isActive" : "hover"}>
                <ButtonSideNav icon={salvosid}>
                  {" "}
                  <span>Salvos</span>{" "}
                </ButtonSideNav>
              </div>
            </NavLink>
          </div>
        </>
      )}
    </>
  );
};

export default Sidenav;
