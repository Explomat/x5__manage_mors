import React from 'react';
import cx from 'classnames';
import './header.styl';

const Header = ({ location, history }) => {
	const { pathname } = location;
	const isRoot = pathname === '/home/regions';
	const back = e => {
		e.preventDefault();
		history.goBack();
	};
	const classes = cx({
		'app-container__header': true,
		'app-container__header--no-pad-left': !isRoot
	});
	return (
		<div className={classes}>
			{!isRoot &&
				<a href='#' className='app-container__header-back-icon icon-left-open-big' onClick={back} />
			}
			<strong>Управление регионами</strong>
		</div>
	);
};

export default Header;
