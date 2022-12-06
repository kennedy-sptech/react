import React, { useContext } from 'react';
import Comentar from '../Layout/comentar';
import Categoria from './categoria';
import Comentario from './comentario';
import Comentarioteste from './comentarioteste';

const Comentarios = ({ publicacao, publicacaoInt }) => {
    
console.log('abc', publicacao)
    return (
        <>
            <div >
                {publicacao.respostasByIdPublicacao.map((comentario, index) => (
                    <Comentarioteste comentario={comentario}
                        key={index}
                    />
                ))}                
            </div>
            <Comentar publicacaoInt={publicacaoInt}></Comentar>
        </>

    );
}

export default Comentarios;