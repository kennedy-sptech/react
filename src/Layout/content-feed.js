import React, { useState } from "react";
import "../css/content.scss";
import Publicacoes from "../components/publicacoes";

const ContentFeed = () => {

  return (
    <div className="item content-feed">
      <Publicacoes/>
    </div>
  );
};

export default ContentFeed;
