import React from 'react';

import Active from "../Layout/active";
import ContentFeed from "../Layout/content-feed";
import Nav from "../components/nav";
import Search from "../Layout/search";
import Sidenav from "../Layout/sidenav";
import Analitcs from '../Layout/analitcs-moderador';
import AnalitcsCont from '../Layout/analitcs-contagens';


const PageAnalitcsContador = () => {
  
    return ( 
      <>
       <Nav/>
    <div className="container-moderador">
      <Sidenav />
      <AnalitcsCont />
      <Active />
    </div>
    </>

     );
}
 
export default PageAnalitcsContador;