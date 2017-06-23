import React, { Component } from 'react';
import SelectItems from '../components/modules/select-items';
import { regionsCreators, morsCreators, subMorsCreators } from '../actions';
//import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import { AlertDanger, AlertInfo } from '../components/modules/alert';
import { connect } from 'react-redux';
//import { dom } from '../config';
//import cx from 'classnames';

class RegionContainer extends Component {

	constructor(props){
		super(props);

		this.handleToggleDisplayMorModal = this.handleToggleDisplayMorModal.bind(this);
		this.handleToggleDisplaySubMorModal = this.handleToggleDisplaySubMorModal.bind(this);

		this.handleSaveSelectedMors = this.handleSaveSelectedMors.bind(this);
		this.handleSearchMors = this.handleSearchMors.bind(this);
		this.handleSaveSelectedSubMors = this.handleSaveSelectedSubMors.bind(this);
		this.handleSearchSubMors = this.handleSearchSubMors.bind(this);
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

	handleSaveSelectedMors(mors){
		this.props.saveMors(mors);
		this.setState({ isDisplayMorModal: !this.state.isDisplayMorModal });
	}

	handleSearchMors(search, page){
		this.props.getMors(search, page);
	}

	handleSaveSelectedSubMors(subMors){
		this.props.saveSubMors(subMors);
		this.setState({ isDisplaySubMorModal: !this.state.isDisplaySubMorModal });
	}

	handleSearchSubMors(search, page){
		this.props.getSubMors(search, page);
	}

	handleToggleDisplayMorModal(){
		this.setState({ isDisplayMorModal: !this.state.isDisplayMorModal });
		this.props.getMors();
	}

	handleToggleDisplaySubMorModal(){
		this.setState({ isDisplaySubMorModal: !this.state.isDisplaySubMorModal });
		this.props.getSubMors();
	}

	render(){
		const { isFetching, title, mor, subMor, mors, subMors } = this.props;
		const { isDisplayMorModal, isDisplaySubMorModal } = this.state;
		return (
			isFetching ? <div className='overlay-loading overlay-loading--show'/> :
			<div className='region-container'>
				<div className='region-container__title'>{title}</div>
				<div className='region__container-fields clearfix'>
					<div className='region-container__mor-name'>
						<span className='region-container__field-label'>МОР</span>
						<span className='region-container__field-value'>
							{mor ?
								<span>
									<span
										onClick={this.handleToggleDisplayMorModal}
										className='region-container__icon icon-edit-1'
									/>
									{mor.name}
								</span> :
								<span
									onClick={this.handleToggleDisplayMorModal}
									className='region-container__icon icon-user-plus'
								/>
							}
						</span>
					</div>
					<div className='region-container__sub-mor-name'>
						<span className='region-container__field-label'>Заместитель</span>
						<span className='region-container__field-value'>
							{subMor ?
								<span>
									<span
										onClick={this.handleToggleDisplaySubMorModal}
										className='region-container__icon icon-edit-1'
									/>
									{subMor.name}
								</span> :
								<span
									onClick={this.handleToggleDisplaySubMorModal}
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
							<span className='region-container__field-value'>{subMor.alternate_creater_fullname} </span>
						</div>
					}
				</div>
				{isDisplayMorModal &&
					<SelectItems
						{...mors}
						maxSelectedItems={1}
						onSave={this.handleSaveSelectedMors}
						onChange={this.handleSearchMors}
						onClose={this.handleToggleDisplayMorModal}
					/>}
				{isDisplaySubMorModal &&
					<SelectItems
						{...subMors}
						maxSelectedItems={1}
						onSave={this.handleSaveSelectedSubMors}
						onChange={this.handleSearchSubMors}
						onClose={this.handleToggleDisplaySubMorModal}
					/>}
			</div>

		);
	}
}

function mapStateToProps(state) {
	const { region, mors, subMors } = state;
	return {
		...region,
		mors: {
			...mors,
			selectedItems: region.mor ? [
				{
					id: region.mor.id,
					data: {
						fullname: region.mor.name
					}
				}
			] : mors.selectedItems
		},
		subMors: {
			...subMors,
			selectedItems: region.subMor ? [
				{
					id: region.subMor.id,
					data: {
						fullname: region.subMor.name
					}
				}
			] : subMors.selectedItems
		}
	};
}

export default connect(mapStateToProps, {
	...regionsCreators,
	...morsCreators,
	...subMorsCreators
})(RegionContainer);
