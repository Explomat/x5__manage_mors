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
	}

	handleChangeDecrementPage(){
		const { page } = this.props;
		if (page === 0) return;
		if (this.props.onChange){
			this.props.onChange(page - 1);
		}
	}

	handleChangeIncrementPage(){
		const { page, pagesCount } = this.props;
		if (page > pagesCount) return;
		if (this.props.onChange){
			this.props.onChange(page + 1);
		}
	}

	render(){
		const { page, pagesCount, className } = this.props;
		const classes = cx('paging', className);
		const lPageClasses = cx({
			'paging-icon': true,
			'paging-icon--active': page !== 0,
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
	page: 0,
	pagesCount: 1
	// isValid(val){
	// 	return /^[1-9]{1,}(\d+)?$/.test(val) && Number(val) >= 1;
	// }
};

export default Paging;
