import React from 'react';
import PropTypes from 'prop-types';
import { AlertInfo } from '../../alert';
import SelectedItems from './SelectedItems';
import Paging from './Paging';
import { PanelTitle, PanelHeader, PanelBody, PanelFooter } from '../../panel';
import Items from './Items';
import Filters from './Filters';
import { ButtonPrimary } from '../../button';
import numDeclension from '../../../../utils/numDeclension';
import some from 'lodash/some';
import cx from 'classnames';
import './style/select-items.styl';

/*
	headerCols: [{ name: 'a', type: 'integer' }],
	items: [
		{ id: '1', data: {fullname: '1'} },
		{ id: '2', data: {fullname: '2'} },
		{ id: '3', data: {fullname: '3'} },
		{ id: '4', data: {fullname: '4'} }
	],
	selectedItems: [
		{ id: '1', data: {fullname: '1'} },
		{ id: '2', data: {fullname: '2'} },
	]
*/

class SelectItems extends React.Component {

	constructor(props){
		super(props);
		this.types = { 'integer': 'integer', 'date': 'date' };
		this.errors = {
			MAX_SELECTED_ITEMS: `Вы не можете выбрать более ${props.maxSelectedItems}
			${numDeclension(props.maxSelectedItems, 'элемента', 'элементов', 'элементов')}`
		};

		this.onSort = this.onSort.bind(this);
		this.onAddItem = this.onAddItem.bind(this);
		this.onRemoveItem = this.onRemoveItem.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleToggleSelectedItems = this.handleToggleSelectedItems.bind(this);
		this._setData = this._setData.bind(this);
		this._castType = this._castType.bind(this);
		this.handleCloseError = this.handleCloseError.bind(this);
		this.state = {
			headerCols: props.headerCols,
			items: props.items,
			selectedItems: props.selectedItems,
			search: '',
			page: 0,
			isDisplaySelectedItems: false,
			error: ''
		};
	}

	getChildContext(){
		return {
			onSort: this.onSort,
			onAddItem: this.onAddItem,
			onRemoveItem: this.onRemoveItem
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			items: nextProps.items ? nextProps.items : []
		});
	}

	handleSave(){
		if (this.props.onSave){
			this.props.onSave(this.state.selectedItems);
		}
	}

	handleChangeSearch(search){
		this.setState({ search, page: 0 });
		if (this.props.onChange){
			this.props.onChange(search, this.state.page);
		}
	}

	handleChangePage(page){
		this.setState({ page });
		if (this.props.onChange){
			this.props.onChange(this.state.search, page);
		}
	}

	handleToggleSelectedItems(e){
		e.preventDefault();
		this.setState({ isDisplaySelectedItems: !this.state.isDisplaySelectedItems });
	}

	handleCloseError(){
		this.setState({ error: '', isShowError: false });
	}

	_castType(val, type){
		function isInteger(_val) {
			return isNaN(parseInt(_val, 10)) === false;
		}

		function isDate(_val){
			return Date.parse(_val) !== isNaN(_val);
		}

		if (val === undefined || val === null || !(type in this.types)) return val.toString();
		switch (type) {
			case this.types.integer:
				if (isInteger(val) === true){
					return Number(val);
				}
				break;
			case this.types.date:
				if (isDate(val) === true){
					return new Date(val);
				}
				break;
			default:
				return val.toString();
		}
	}

	_setData(data){
		const self = this;
		if (!data || !data.items || !data.headerCols) return;
		const items = data.items.map(item => {
			Object.keys(item.data).forEach((col, index) => {
				item.data[col] = self._castType(item.data[col], data.headerCols[index].type);
			});
			return item;
		});
		this.setState({
			...items
		});
	}

	onSort(index, isAscending){
		function getFieldByIndex(data, i){
			const keys = Object.keys(data).filter((key, _index) => {
				return i === _index;
			});
			return keys.length > 0 ? data[keys[0]] : null;
		}

		const isAsc = isAscending ? 1 : -1;
		const items = this.state.items;
		items.sort((first, second) => {
			const firstField = getFieldByIndex(first.data, index);
			const secondFiled = getFieldByIndex(second.data, index);
			if (firstField && secondFiled){
				return firstField > secondFiled ? isAsc : firstField === secondFiled ? 0 : -(isAsc);
			}
			return 0;
		});
		this.setState({ items });
	}

	onAddItem(item){
		const { selectedItems } = this.state;
		if (selectedItems.length >= this.props.maxSelectedItems){
			this.setState({ error: this.errors.MAX_SELECTED_ITEMS, isShowError: true });
			return;
		}
		if (some(selectedItems, { id: item.id })) return;
		this.setState({ selectedItems: selectedItems.concat([ item ]) });
	}

	onRemoveItem(id){
		const { selectedItems } = this.state;
		this.setState({
			selectedItems: selectedItems.filter(si => si.id !== id)
		});
	}

	render() {
		const { isFetching, title, headerCols, pagesCount } = this.props;
		const { error, page, search, items, selectedItems, isDisplaySelectedItems } = this.state;
		const selectedItemsLen = selectedItems.length;
		return (
			<div className='select-items'>
				<PanelHeader>
					<PanelTitle>
						<div className='select-item__header'>
							<button type='button' className='close-button' onClick={this.props.onClose}>&times;</button>
						</div>
						{title}
					</PanelTitle>
				</PanelHeader>
				<PanelBody>
					<div className='select-item__body clearfix'>
						<Filters
							search={search}
							onSearch={this.handleChangeSearch}
						/>
						{selectedItemsLen > 0 &&
							<div className='select-items__selected-count'>
								<a href='#' onClick={this.handleToggleSelectedItems}>
									{`${numDeclension(selectedItemsLen, 'Выбран', 'Выбрано', 'Выбраны')} ${selectedItemsLen}
										${numDeclension(selectedItemsLen, 'элемент', 'элемента', 'элементов')}`
									}
								</a>
								&nbsp;<span className={cx('caret', { 'caret--rotate': isDisplaySelectedItems })} />
							</div>
						}
						{isDisplaySelectedItems && selectedItemsLen > 0 && <SelectedItems items={selectedItems} />}
						<Paging
							className='select-items__paging select-items__paging--top'
							onChange={this.handleChangePage}
							page={Number(page)}
							pagesCount={Number(pagesCount)}
						/>
						<Items
							items={items}
							selectedItems={selectedItems}
							headerCols={headerCols}
						/>
						<Paging
							className='select-items__paging select-items__paging--bottom'
							onChange={this.handleChangePage}
							page={Number(page)}
							pagesCount={Number(pagesCount)}
						/>
					</div>
				</PanelBody>
				<PanelFooter>
					<div className='select-item__footer clearfix'>
						{error && <AlertInfo text={error} onClose={this.handleCloseError}/>}
						{!isFetching &&
							<ButtonPrimary
								className='select-item__footer-select-button'
								onClick={this.handleSave}
								text='Выбрать'
							/>}
					</div>
				</PanelFooter>
				{isFetching && <div className='overlay-loading overlay-loading--show' />}
			</div>
		);
	}
}

SelectItems.childContextTypes = {
	onSort: PropTypes.func,
	onAddItem: PropTypes.func,
	onRemoveItem: PropTypes.func
};

SelectItems.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	selectedItems: PropTypes.array,
	maxSelectedItems: PropTypes.number,
	onClose: PropTypes.func,
	onSave: PropTypes.func,
	onChange: PropTypes.func
};

SelectItems.defaultProps = {
	title: 'Подтвердите действие',
	headerCols: [],
	items: [],
	selectedItems: [],
	maxSelectedItems: Number.MAX_VALUE
};

export default SelectItems;
