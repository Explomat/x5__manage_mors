import React from 'react';
//import { Link } from 'react-router-dom';
import './header.styl';

const Header = ({ location }) => {
	const { pathname } = location;
	const back = e => e.preventDefault();
	return (
		<div className='header'>
			{pathname !== '/regions' && <a onClick={back}>Back</a>}
			<strong>Управление</strong>
		</div>
	);
};

export default Header;
