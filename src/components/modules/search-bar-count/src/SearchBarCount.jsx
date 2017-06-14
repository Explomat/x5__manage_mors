import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../search-bar';
import './style/search-bar-count.styl';

const SearchBarCount = ({ firstValue, secondValue, ...props }) => {
	return (
		<SearchBar {...props}>
			{
				(firstValue && secondValue) ?
					<span className='search-box__count'>{firstValue} / {secondValue}</span>
				: (firstValue && !secondValue) ?
					<span className='search-box__count'>{firstValue}</span>
				: null
			}
		</SearchBar>
	);
};

SearchBarCount.propTypes = {
	firstValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	secondValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default SearchBarCount;
