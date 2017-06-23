import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Paging extends React.Component {

	constructor(props){
		super(props);

		this.handleChangeDecrementPage = this.handleChangeDecrementPage.bind(this);
		this.handleChangeIncrementPage = this.handleChangeIncrementPage.bind(this);
		// this.handleKeyDown = this.handleKeyDown.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		// this.handleblur = this.handleblur.bind(this);

		this.state = {
			page: props.page
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({ page: nextProps.page });
	}

	handleChangeDecrementPage(){
		if (this.state.page === 1) return;
		if (this.props.onChange){
			this.props.onChange(this.state.page - 1);
		}
	}

	handleChangeIncrementPage(){
		if (this.state.page > this.props.pagesCount) return;
		if (this.props.onChange){
			this.props.onChange(this.state.page + 1);
		}
	}

	// handleKeyDown(e){
	// 	if (e.keyCode === 13){
	// 		e.target.blur();
	// 		this._changePage(e.target.value);
	// 	}
	// }
	//
	// handleChange(e){
	// 	const val = e.target.value;
	// 	const { isValid } = this.props;
	// 	if (isValid(val)){
	// 		this.setState({ value: val });
	// 	}
	// }
	//
	// handleblur(e){
	// 	if (this.props.onChange){
	// 		this.props.onChange(e.target.value);
	// 	}
	// }

	// _changePage(val){
	// 	if (this.props.onBlur){
	// 		this.props.onBlur(val);
	// 	}
	// }

	render(){
		const { page, pagesCount, className } = this.props;
		const classes = cx('paging', className);
		const lPageClasses = cx({
			'paging-icon': true,
			'paging-icon--active': page !== 1,
			'icon-left-open-1': true
		});
		const rPageClasses = cx({
			'paging-icon': true,
			'paging-icon--active': page < pagesCount,
			'icon-right-open-1': true
		});
		return (
			<div className={classes}>
				<i className={lPageClasses} onClick={this.handleChangeDecrementPage} />
				<i className={rPageClasses} onClick={this.handleChangeIncrementPage} />
			</div>
		);
	}
}

Paging.propTypes = {
	page: PropTypes.number,
	pagesCount: PropTypes.number,
	className: PropTypes.string,
	onChange: PropTypes.func
};

Paging.defaultProps = {
	page: 1,
	pagesCount: 1
	// isValid(val){
	// 	return /^[1-9]{1,}(\d+)?$/.test(val) && Number(val) >= 1;
	// }
};

export default Paging;
