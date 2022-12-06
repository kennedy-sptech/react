import React, { useContext } from 'react';
import Categoria from './categoria';

const Categorias = ({ categorias }) => {

    return (
        <>
            <div className='categorias'>
                {categorias.map((categoria, index) => (
                    <Categoria categoria={categoria}
                        key={index}
                    />
                ))}
            </div>
        </>

    );
}

export default Categorias;