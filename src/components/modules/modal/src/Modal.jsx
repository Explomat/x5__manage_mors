import React, { Component } from 'react';
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
	title: React.PropTypes.string,
	footerButtonText: React.PropTypes.string,
	className: React.PropTypes.string,
	onSave: React.PropTypes.func,
	onClose: React.PropTypes.func
};

export default Modal;