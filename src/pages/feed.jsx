import React from "react";

import Active from "../Layout/active";
import ContentFeed from "../Layout/content-feed";
import Nav from "../components/nav";
import Search from "../Layout/search";
import Sidenav from "../Layout/sidenav";

let acesso = window.sessionStorage.acesso;

const Feed = () => {
  return (
    <>
      {acesso == 3 ? (
        <>
          <Nav />
          <div className="container-moderador">
            <Sidenav />
            <Active />
            <ContentFeed />
          </div>
        </>
      ) : (
        <>
          <Nav />
          <div className="container">
            <Search />
            <Sidenav />
            <Active />
            <ContentFeed />
          </div>
        </>
      )}
    </>
  );
};

export default Feed;
