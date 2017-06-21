import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/search-bar.styl';

class SearchBar extends Component {

	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {
			value: props.value || ''
		};
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.value){
			this.setState({ value: nextProps.value });
		}
	}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSearch(e){
		if (e.keyCode === 13 && this.props.onSearch){
			this.props.onSearch(e.target.value);
		}
	}

	render() {
		const className = this.props.className ? this.props.className : '';
		const classNameInput = this.props.classNameInput ? this.props.classNameInput : '';
		return (
			<div className={`search-box ${  className}`}>
				<input
					onChange={this.handleChange}
					onKeyDown={this.handleSearch}
					className={`search-box__search-input ${  classNameInput}`}
					type='text' value={this.state.value}
					placeholder='Поиск...'
				/>
				<span className='search-box__search-icon icon-search' />
				{this.props.children}
			</div>
		);
	}
}

SearchBar.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string,
	classNameInput: PropTypes.string,
	onSearch: PropTypes.func
};

export default SearchBar;
