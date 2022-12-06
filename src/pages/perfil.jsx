import React from "react";
import Active from "../Layout/active";
import ContentPerfil from "../Layout/content-perfil";
import Nav from "../components/nav";
import Search from "../Layout/search";
import Sidenav from "../Layout/sidenav";

let acesso = window.sessionStorage.acesso;
const Perfil = () => {
  
    return ( 
      <>
        {acesso == 3 ? (
        <>
          <Nav />
          <div className="container-moderador">         
          <Sidenav />
           <Active />
            <ContentPerfil />
          </div>
        </>
      ) : (
        <>
     
          <Nav />
          <div className="container">
            <Search />
            <Sidenav />
            {/* <Active /> */}
            <ContentPerfil />
          </div>
  
        </>
      )}
    </>

     );
}
 
export default Perfil;

{/* <Nav/>
    <div className="container">
      <Search />
      <Sidenav />
      <ContentPerfil />
      <Active />
    </div> */}