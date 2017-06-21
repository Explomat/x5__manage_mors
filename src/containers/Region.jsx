import React, { Component } from 'react';
import SelectItems from '../components/modules/select-items';
import { regionsCreators } from '../actions';
//import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import { AlertDanger, AlertInfo } from '../components/modules/alert';
import { connect } from 'react-redux';
//import { dom } from '../config';
//import cx from 'classnames';

const headerCols = [ { name: 'a', type: 'integer' } ];
const testDataItems = [
	{ id: '1', data: { fullname: '1' } },
	{ id: '2', data: { fullname: '2' } },
	{ id: '3', data: { fullname: '3' } },
	{ id: '4', data: { fullname: '4' } }
];

class RegionContainer extends Component {

	constructor(props){
		super(props);

		this.handleDisplayMorModal = this.handleDisplayMorModal.bind(this);
		this.handleDisplaySubMorModal = this.handleDisplaySubMorModal.bind(this);

		this.state = {
			isDisplayMorModal: false,
			isDisplaySubMorModal: false
		};
	}

	componentDidMount(){
		const { match } = this.props;
		this.props.getRegion(match.params.regionId);
	}

	componentWillUnmount(){
		this.props.removeRegionFromStore();
	}

	handleDisplayMorModal(){
		this.setState({ isDisplayMorModal: true });
	}

	handleDisplaySubMorModal(){
		this.setState({ isDisplaySubMorModal: true });
	}

	render(){
		const { isFetching, title, mor, subMor } = this.props;
		const { isDisplayMorModal, isDisplaySubMorModal } = this.state;
		return (
			isFetching ? <div className='overlay-loading overlay-loading--show'/> :
			<div className='region-container'>
				<div className='region-container__title'>{title}</div>
				<div className='region__container-fields'>
					{mor &&
						<div className='region-container__mor-name'>
							<span className='region-container__field-label'>МОР</span>
							<span className='region-container__field-value'>
								<span
									onClick={this.handleDisplayMorModal}
									className='region-container__icon icon-edit-1'
								/>
								{mor.name}
							</span>
						</div>
					}
					<div className='region-container__sub-mor-name'>
						<span className='region-container__field-label'>Заместитель</span>
						<span className='region-container__field-value'>
							{subMor ?
								<span>
									<span
										onClick={this.handleDisplaySubMorModal}
										className='region-container__icon icon-edit-1'
									/>
									{subMor.name}
								</span> :
								<span
									onClick={this.handleDisplaySubMorModal}
									className='region-container__icon icon-user-plus'
								/>
							}
						</span>
					</div>
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
				{isDisplayMorModal && <SelectItems items={testDataItems} headerCols={headerCols}/>}
				{isDisplaySubMorModal && <SelectItems />}
			</div>

		);
	}
}

function mapStateToProps(state) {
	return { ...state.region };
}

export default connect(mapStateToProps, regionsCreators)(RegionContainer);
