import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonPrimary } from '../../button';
import { Panel, PanelHeader, PanelBody, PanelFooter, PanelTitle } from '../../panel';
import cx from 'classnames';

import './style/modal.styl';

class Modal extends Component {

	render(){
		const { title, footerButtonText, className } = this.props;
		const classes = cx('modal-dialog', className);
		return (
			<div className='modal'>
				<div className={classes}>
					<button
						type='button'
						className='close-button close-button--modal'
						onClick={this.props.onClose}
					>
						&times;
					</button>
					<Panel>
						<PanelHeader>
							<PanelTitle>
								{title}
							</PanelTitle>
						</PanelHeader>
						<PanelBody>{this.props.children}</PanelBody>
						<PanelFooter className='clearfix'>
							<ButtonPrimary
								text={footerButtonText}
								className='modal-dialog__save'
								onClick={this.props.onSave}
							/>
						</PanelFooter>
					</Panel>
				</div>
			</div>
		);
	}
}

Modal.defaultProps = {
	title: 'Подтвердите действие',
	footerButtonText: 'Сохранить'
};

Modal.propTypes = {
	title: PropTypes.string,
	footerButtonText: PropTypes.string,
	className: PropTypes.string,
	onSave: PropTypes.func,
	onClose: PropTypes.func
};

export default Modal;
