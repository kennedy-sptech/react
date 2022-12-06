import React from 'react';
import '../css/pesquisar.scss'
import search from './img/search.svg'


const Pesquisar = () => {
    return ( 
        <div className='btn-pesquisar'>
            <input type="text" />
            <button><img src={search} alt="" /></button>
        </div>
     );
}
 
export default Pesquisar;