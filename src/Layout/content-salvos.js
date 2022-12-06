import React, { useEffect, useState } from "react";
import SalvoItem from "../components/salvoitem";

const ContentSalvos = (salvos) => {
  const [favoritos, setFavoritos] = useState(salvos.salvos);

  useEffect(() => {
    console.log("const favoritos? ", favoritos);
    console.log("entrando na props salvos em content-salvos");
    console.log(salvos.salvos);
  }, [favoritos]);

  return (
    <>
      {/* <div className="content-feed">
        <div className="container-perfil">
          <h1>Publicações Salvas</h1>
        </div>
        <div className="publicacoes">
              <div className="publicacoes">
            {favoritos.map((salvo, index) => (
              <SalvoItem salvo={salvo} key={index} />
            ))}
            </div>
          </div>
        <SalvoItem favoritos={favoritos} />
      </div> */}
    </>
  );
};

export default ContentSalvos;
