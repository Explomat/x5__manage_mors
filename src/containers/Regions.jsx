import React, { Component } from 'react';
import { regionsCreators } from '../actions';
import Region from '../components/Region';
import { connect } from 'react-redux';

class RegionsContainer extends Component {

	componentDidMount(){
		this.props.getRegions();
	}

	render(){
		const { isFetching, regions } = this.props;
		return (
			isFetching ? <div className='overlay-loading overlay-loading--show'/> :
			<div className='regions'>
				{regions.map(r => <Region key={r.id} {...r} />)}
			</div>
		);
	}
}

function mapStateToProps(state){
	return state.regions;
}

export default connect(mapStateToProps, regionsCreators)(RegionsContainer);
