import React, { useState } from 'react';
import Atividade from './atividade';
import '../css/atividade.scss'
import StatusPerguntasAtividades from './statusperguntasAtividades';

const Atividades = ({atividades}) => {
    const [statusPerguntas, setPerguntas] = useState();

    return ( 
        <div className='atividades'>
            <p className='pAtividade'>Atividades Recentes</p>
            {atividades.map((atividade, index) => (
                <StatusPerguntasAtividades statusperguntas={statusPerguntas} 
                key={index}
                />
            ))}
        </div>
     );
}
 
export default Atividades;