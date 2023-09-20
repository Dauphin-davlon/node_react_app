import React from 'react';
import {Link} from 'react-router-dom';


function Nav(){
    return(
        <nav>
            <div id = "navMainMenu" class = "navbar-collapse collapse">
                <Link to='/' className='nav-item nav-link active'>Home</Link>
                <Link to='/tweets' className='nav-item nav-link'>Tweets</Link>
            </div>
        </nav>
    );
}

export default Nav;