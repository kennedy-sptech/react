import React from 'react';



import Active from "../Layout/active";
import Nav from "../components/nav";
import Search from "../Layout/search";
import Sidenav from "../Layout/sidenav";
import ContentMinhasPerguntas from '../Layout/contentminhasperguntas';


const PagePerguntas = () => {
  
    return ( 
      <>
      <Nav/>
    <div className="container">
      <Search />
      <Sidenav />
      <ContentMinhasPerguntas />
      <Active />
    </div>
    </>

     );
}
 
export default PagePerguntas;