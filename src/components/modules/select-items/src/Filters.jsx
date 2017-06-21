import React from 'react';
import PropTypes from 'prop-types';
import Paging from './Paging';
import SearchBar from '../../search-bar';

class Filters extends React.Component {

	render() {
		return (
			<div className='filters'>
				<SearchBar
					onSearch={this.props.onSearch}
					value={this.props.search}
					className={'filters__searchBar'}
					classNameInput={'filters__searchBar-input'}
				/>
				<Paging
					onBlur={this.props.onPage}
					value={Number(this.props.page)}
					pagesCount={Number(this.props.pagesCount)}
				/>
			</div>
		);
	}
}

Filters.propTypes = {
	onSearch: PropTypes.func,
	onPage: PropTypes.func
};

export default Filters;
