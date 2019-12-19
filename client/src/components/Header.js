import React from 'react';
import logo from '../img/logo.png'
import icon from '../img/icon.jpg'

const Header = props => {
    return (
        <div className='header'>
			<div className='logo-container'>
                <img src={logo} alt='netflix logo'/>
                <h2 style={{cursor: 'pointer'}} onClick={() => props.history.push('/')}>Movies</h2>
            </div>
			<img className='icon' src={icon} alt='user profile icon'/>
		</div>
    );
}

export default Header;