import React, { useState } from "react";
import "../css/active.scss";
import Atividades from "../components/atividades";
import StatusPerguntasAtividades from "../components/statusperguntasAtividades";

const Active = (props) => {
  const [statusPerguntas, setPerguntas] = useState();
  let acesso = window.localStorage.acesso;

  return (
    <>
      {acesso == 3 ? (
        ""
      ) : (
        <>
          {/* <div className="item actives">
            <StatusPerguntasAtividades
              statusPerguntas={statusPerguntas}
            ></StatusPerguntasAtividades>
          </div> */}
        </>
      )}
    </>
  );
};

export default Active;
