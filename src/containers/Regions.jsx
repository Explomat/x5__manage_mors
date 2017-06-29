import React, { Component } from 'react';
import { regionsCreators } from '../actions';
import Region from '../components/Region';
import { connect } from 'react-redux';

class RegionsContainer extends Component {

	constructor(props){
		super(props);

		this._srollDown = this._srollDown.bind(this);
	}

	componentDidMount(){
		this.props.getRegions();
		window.addEventListener('scroll', this._srollDown);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this._srollDown);
	}

	_srollDown(){
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const offset = window.pageYOffset;

		const { isFetchingScroll, search, page, total } = this.props;
		if (scrollHeight - (clientHeight + offset) < 100 && !isFetchingScroll && (page + 1) <= total) {
			this.props.getRegionsOnScroll(search, page + 1);
		}
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
