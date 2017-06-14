import React from 'react';
import PropTypes from 'prop-types';
import Tree from '../../tree';
import cx from 'classnames';

import './style/select-tree.styl';

class SelectTree extends React.Component {

	constructor(props){
		super(props);

		this.handleSaveModal = this.handleSaveModal.bind(this);
		this.handleShowModal = this.handleShowModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		this.state = {
			isShowModal: false
		};
	}

	handleSaveModal(item){
		this.setState({ isShowModal: false });
		if (this.props.onSave)			{
			this.props.onSave(item);
		}
	}

	handleShowModal(){
		this.setState({ isShowModal: true });
	}

	handleCloseModal(){
		this.setState({ isShowModal: false });
	}

	render() {
    	const inputClasses = cx({
		'select-tree__input': true,
		'select-tree__input_not-empty': this.props.selectedNode
	});
		const iconClasses = cx({
			'icon-popup': true,
			'select-tree__icon': true,
			'select-tree__icon--up': this.props.selectedNode
		});
		const name = this.props.selectedNode ? this.props.selectedNode.name : null;
		return (
			<div className={cx('select-tree-container', this.props.className)}>
				<div className='select-tree'>
					<input
						readOnly
						className={inputClasses}
						type='text'
						value={name}
						title={name}
						onClick={this.handleShowModal}
						onChange={this.handleChange}
					/>
					<label className='select-tree__label'>{this.props.placeholder}</label>
					<i className={iconClasses} onClick={this.handleShowModal}  />
				</div>
				<Tree
					onSave={this.handleSaveModal}
					onClose={this.handleCloseModal}
					data={this.props.nodes}
					title={this.props.modalTitle}
					selectedNode={this.props.selectedNode}
					isShow={this.state.isShowModal}
					isExpand={this.props.isExpand}
					isExpandAll={this.props.isExpandAll}
				/>
			</div>
		);
	}
}

SelectTree.propTypes = {
	modalTitle: PropTypes.string,
	placeholder: PropTypes.string,
	nodes: PropTypes.array,
	selectedNode: PropTypes.object,
	isExpand: PropTypes.bool,
	isExpandAll: PropTypes.bool
};

export default SelectTree;
