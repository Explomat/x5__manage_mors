import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Region from './Region';
import Home from './Home';
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
		const { match, location, history } = this.props;
		return (
			<div className='app-container'>
				<Header location={location} history={history}/>

				<div className='app-container__body'>
					<Route path={`${match.url}home`} component={Home} />
					<Route path={`${match.url}regions/:regionId`} component={Region} />
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
