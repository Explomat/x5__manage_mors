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
		const { isFetching, title, mor, subMor } = this.props;
		return (
			isFetching ? <div className='overlay-loading overlay-loading--show'/> :
			<div className='region-container'>
				<div className='region-container__title'>{title}</div>
				<div className='region__container-fields'>
					{mor &&
						<div className='region-container__mor-name'>
							<span className='region-container__field-label'>МОР</span>
							<span className='region-container__field-value'>{mor.name}</span>
						</div>
					}
					{subMor &&
						<div className='region-container__sub-mor-name'>
							<span className='region-container__field-label'>Заместитель</span>
							<span className='region-container__field-value'>{subMor.name}</span>
						</div>
					}
					{subMor &&
						<div className='region-container__container__sub-mor-alternate-date'>
							<span className='region-container__field-label'>Срок замены (до)</span>
							<span className='region-container__field-value'>{subMor.alternate_date}</span>
						</div>
					}
					{subMor &&
						<div className='region-container__container__sub-mor-alternate-creater-fullname'>
							<span className='region-container__field-label'>Замену поставил</span>
							<span className='region-container__field-value'>{subMor.alternate_creater_fullname}	</span>

						</div>
					}
				</div>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return { ...state.region };
}

export default connect(mapStateToProps, regionsCreators)(RegionContainer);
