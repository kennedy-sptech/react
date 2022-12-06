import React from 'react';
import '../../css/sidenav.scss'
import '../../css/button.scss'

const ButtonSideNav = ({children, onClick,icon}) => {

    return ( 
        <button onClick={onclick} className="click-buttonsidenav">
            <img className='imgtroca' src={icon} alt="" />
           <p>{children}</p> 
        </button>
     );
}
 
export default ButtonSideNav;