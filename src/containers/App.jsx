import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Regions from './Regions';
import Region from './Region';
import Mors from './Mors';

import { NavLink, Route } from 'react-router-dom';

import SearchBar from '../components/modules/search-bar';
import Header from '../components/Header';

//import { AlertDanger, AlertInfo } from '../components/modules/alert';
import { connect } from 'react-redux';
//import { dom } from '../config';
//import cx from 'classnames';

class AppContainer extends Component {

	render(){
		// const {
		// 	title,
		// 	isFetching,
		// 	access,
		// 	errorMessage,
		// 	infoMessage,
		// 	children
		// } = this.props;
		const { match, location } = this.props;
		return (
			<div className='app-container container'>
				<Header location={location}/>
				<Route path='/regions/:regionId' component={Region} />

				<div className='app-container__body'>
					<SearchBar />

					<ul className='app-container__menu'>
						<li className='app-container__menu-item'>
							<NavLink
								className='app-container__link'
								activeClassName='app-container__link--active'
								to={`${match.url}regions`}
							>Регионы</NavLink>
						</li>
						<li className='app-container__menu-item'>
							<NavLink
								className='app-container__link'
								activeClassName='app-container__link--active'
								to={`${match.url}mors`}
							>Моры</NavLink>
						</li>
					</ul>

					<Route path={`${match.url}regions`} component={Regions} />
					<Route path={`${match.url}mors`} component={Mors} />
					{/* <div className='app-container__header'>
						<h3 className='app-container__title'>{title}</h3>
						{errorMessage &&
							<AlertDanger
								text={errorMessage}
								onClose={this.props.error.bind(this, null)}
								className='app-container__error'
							/>
						}
						{infoMessage &&
							<AlertInfo
								text={infoMessage}
								onClose={this.props.info.bind(this, null)}
								className='app-container__error'
							/>
						}
					</div>
					<div className='app-container__body'>
						{isFetching ? <h2>Запрос доступа...</h2> : access ? children : <h1>Доступ запрещен</h1>}
					</div>
					<div id={dom.portalModalId} /> */}
				</div>
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: PropTypes.node,
	isFetching: PropTypes.bool,
	errorMessage: PropTypes.string,
	infoMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { ...state.app };
}

export default connect(mapStateToProps)(AppContainer);
