import React, { Component } from 'react';
import { regionsCreators } from '../actions';
//import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import { AlertDanger, AlertInfo } from '../components/modules/alert';
import { connect } from 'react-redux';
//import { dom } from '../config';
//import cx from 'classnames';


class RegionContainer extends Component {

	componentDidMount(){
		const { match } = this.props;
		this.props.getRegion(match.params.regionId);
	}

	componentWillUnmount(){
		this.props.removeRegionFromStore();
	}

	render(){
		const { title, mor, subMor } = this.props;
		return (
			<div className='region'>
				<div className='region__title'>{title}</div>
				{mor && <div>{mor.name}</div>}
				{subMor && <div>{subMor.name}</div>}
				{subMor && <div>{subMor.alternate_date}</div>}
				{subMor && <div>{subMor.alternate_creater_fullname}</div>}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log(ownProps);
	return { ...state.region };
}

export default connect(mapStateToProps, regionsCreators)(RegionContainer);
