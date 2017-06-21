import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Regions from '../../containers/Regions';
import Mors from '../../containers/Mors';
import SearchBar from '../modules/search-bar';

import './home.styl';

class Home extends Component {

	render(){
		const { match } = this.props;
		return (
			<div className='home'>
				<div className='home__body'>
					<SearchBar />

					<ul className='home__menu'>
						<li className='home__menu-item'>
							<NavLink
								className='home__link'
								activeClassName='home__link--active'
								to={`${match.url}/regions`}
							>Регионы</NavLink>
						</li>
						<li className='home__menu-item'>
							<NavLink
								className='home__link'
								activeClassName='home__link--active'
								to={`${match.url}/mors`}
							>Моры</NavLink>
						</li>
					</ul>

					<Route path={`${match.url}/regions`} component={Regions} />
					<Route path={`${match.url}/mors`} component={Mors} />
				</div>
			</div>
		);
	}
}


export default Home;
