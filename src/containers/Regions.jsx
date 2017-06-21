import React, { Component } from 'react';
import { regionsCreators } from '../actions';
//import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import { AlertDanger, AlertInfo } from '../components/modules/alert';
import Region from '../components/Region';
import { connect } from 'react-redux';
//import { dom } from '../config';
//import cx from 'classnames';


class RegionsContainer extends Component {

	componentDidMount(){
		this.props.getRegions();
	}

	render(){
		const { regions } = this.props;
		return (
			<div className='regions'>
				{regions ? regions.map(r => <Region key={r.id} {...r} />) :
				<div className='overlay-loading overlay-loading--show'>Загрузка</div>}
			</div>
		);
	}
}

function mapStateToProps(state){
	return state.regions;
}

export default connect(mapStateToProps, regionsCreators)(RegionsContainer);
