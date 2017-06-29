import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Regions from '../Regions';
import Mors from '../Mors';
import SearchBar from '../../components/modules/search-bar';

import { regionsCreators } from '../../actions';
import { connect } from 'react-redux';

import './home.styl';

class HomeContainer extends Component {

	constructor(props){
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(val){
		this.props.setRegionsSearchValue(val);
		this.props.getRegions(val);
	}

	render(){
		const { match } = this.props;
		return (
			<div className='home'>
				<div className='home__body'>
					<SearchBar onSearch={this.handleSearch}/>

					<ul className='home__menu'>
						<li className='home__menu-item'>
							<NavLink
								className='link'
								activeClassName='link--active'
								to={`${match.url}/regions`}
							>Регионы</NavLink>
						</li>
						<li className='home__menu-item'>
							<NavLink
								className='link'
								activeClassName='link--active'
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


export default connect(null, { ...regionsCreators })(HomeContainer);
