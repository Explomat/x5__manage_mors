import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { AlertDanger, AlertInfo } from '../components/modules/alert';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
//import { dom } from '../config';
// import cx from 'classnames';

class TestContainer extends Component {

	render(){
		// const {
		// 	title,
		// 	isFetching,
		// 	access,
		// 	errorMessage,
		// 	infoMessage,
		// 	children
		// } = this.props;
		return (
			<div className='app-container'>
				TEST
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
		);
	}
}

TestContainer.propTypes = {
	children: PropTypes.node,
	isFetching: PropTypes.bool,
	errorMessage: PropTypes.string,
	infoMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { ...state.app };
}

export default connect(mapStateToProps, actionCreators)(TestContainer);
