import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import cx from 'classnames';

class HeaderCol extends React.Component {

	constructor(props){
		super(props);
		this.handleSort = this.handleSort.bind(this);
	}

	handleSort(){
		if (this.context.onSort) {
			const caret = this.refs.caret;
			this.context.onSort(this.props.index, caret.classList.contains('caret--rotate'));
			caret.classList.toggle('caret--rotate');
		}
	}

	render(){
		return (
			<th onClick={this.handleSort} className='header-row__col'>
				<span className='header-row__col-name'>{this.props.name}</span>
				<span ref='caret' className='caret header-row__caret' />
			</th>
		);
	}
}

HeaderCol.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	onSort: PropTypes.func
};

HeaderCol.defaultProps = {
	name: ''
};

HeaderCol.contextTypes = {
	onSort: PropTypes.func
};

class Item extends React.Component {

	constructor(props){
		super(props);
		this.handleAddItem = this.handleAddItem.bind(this);
	}

	handleAddItem(){
		if (this.context.onAddItem){
			this.context.onAddItem({ ...this.props });
		}
	}

	render(){
		const { data, isSelected } = this.props;
		const classesIcon = cx({
			'icon-plus': !isSelected,
			'icon-ok-1': isSelected,
			'body-row__icon': true,
			'body-row__icon--selected': isSelected
		});
		return (
			<tr className='body-row' onClick={this.handleAddItem}>
				<td>
					<i className={classesIcon} />
				</td>
				{Object.keys(data).map((c, index) => {
					return <td key={index} className='body-row__col oneline'>{data[c]}</td>;
				})}
			</tr>
		);
	}
}

Item.propTypes = {
	data: PropTypes.object,
	isSelected: PropTypes.bool
};

Item.defaultProps = {
	data: {},
	isSelected: false
};

Item.contextTypes = {
	onAddItem: PropTypes.func
};

class Items extends React.Component {

	getColsMarkup(){
		const { headerCols } = this.props;
		return headerCols.reduce((f, s, index) => {
			f.push(<HeaderCol key={index + 1} name={s.name} index={index}/>);
			return f;
		},  [ <th key={0} /> ]);
	}

	getRowsMarkUp(){
		const { items, selectedItems } = this.props;
		return items.map((i, index) => {
			const isSelected = some(selectedItems, { id: i.id });
			return <Item key={index} {...i} isSelected={isSelected}/>;
		});
	}

	render() {
		const cols = this.getColsMarkup();
		const items = this.getRowsMarkUp();
		return (
			<div className='items-wrapper'>
				<table className='items-wrapper__header'>
					<thead>
						<tr className='header-row'>{cols}</tr>
					</thead>
				</table>
				<div className='items-wrapper__body'>
					<table className='items'>
						<tbody className='items__body'>
							{items}
						</tbody>
					</table>
				</div>
			</div>

		);
	}
}

Items.propTypes = {
	headerCols: PropTypes.array,
	items: PropTypes.array,
	selectedItems: PropTypes.array
};

Items.defaultProps = {
	headerCols: [],
	items: [],
	selectedItems: []
};

export default Items;
